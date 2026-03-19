require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser= require('body-parser');
const cors=require('cors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./model/UserModel");

const { userVerification } = require("./middlewares/AuthMiddleware");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel }= require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const app = express();

app.use(cors({
    origin: "https://stock-trading-platform-blush.vercel.app", // Your Vercel URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(bodyParser.json());

// 1. Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 2. Define Routes
// app.get('/addHoldings', async (req, res) => {
//   let tempHoldings = [
//     { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
//     { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
//     { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
//     { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
//     { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
//     { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
//     { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
//     { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
//     { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
//     { name: "SGBMAY29", qty: 2, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
//     { name: "TATAPOWER", qty: 5, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: true },
//     { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
//     { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" },
//   ];

//   try {
//     // 3. Use a for...of loop to properly await each save operation
//     for (let item of tempHoldings) {
//       let newHolding = new HoldingsModel({
//         name: item.name,
//         qty: item.qty,
//         avg: item.avg,
//         price: item.price,
//         net: item.net,
//         day: item.day,
//         // Note: isLoss will only save if you add `isLoss: Boolean` to HoldingsSchema.js
//         ...(item.isLoss && { isLoss: item.isLoss }) 
//       });
//       await newHolding.save();
//     }
    
//     res.send("Done! Holdings added to DB.");
//   } catch (error) {
//     console.error("Error saving holdings:", error);
//     res.status(500).send("An error occurred while saving to the database.");
//   }
// });

// app.get('/addPositions',async(req,res)=>{
//   let tempPositions=[
//   {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ];
// try {
//     for (let item of tempPositions) {
//       let newPosition = new PositionsModel({
//         product: item.product,
//         name: item.name,
//         qty: item.qty,
//         avg: item.avg,
//         price: item.price,
//         net: item.net,
//         day: item.day,
//         isLoss: item.isLoss,
//       });
//       await newPosition.save();
//     }
//     res.send("Done! Positions added to DB.");
//   } catch (error) {
//     console.error("Error saving positions:", error);
//     res.status(500).send("An error occurred while saving to the database.");
//   }
// });

app.get('/allHoldings',userVerification,async(req,res)=>{
  let allHoldings=await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get('/allPositions',userVerification,async(req,res)=>{
  let allPositions=await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", userVerification, async (req, res) => {
  let newOrder= new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  newOrder.save();
  res.send("Order saved");
});

// Fetch all orders
app.get("/allOrders", userVerification, async (req, res) => {
  try {
    let allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error });
  }
});



app.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash the password (scramble it 12 times)
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Create the new user in the database
    const user = await UserModel.create({
      email,
      username,
      password: hashedPassword,
    });

    // 4. Create the JWT Token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "3d", // Token expires in 3 days
    });

    return res.status(201).json({ message: "User created successfully", success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    // 2. Compare the typed password with the hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    // 3. Generate a new token if password is correct
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "3d",
    });

    res.status(200).json({ message: "Login successful", success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 4. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});