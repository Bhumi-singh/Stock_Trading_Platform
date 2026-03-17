import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext"; 
import "./BuyActionWindow.css"; // We can reuse the exact same CSS file!

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  // 1. Extract the new closeSellWindow function
  const { closeSellWindow } = useContext(GeneralContext);

  
  const handleSellClick = (e) => {
    e.preventDefault(); 
    
    axios.post(
      "https://stock-trading-platform-r8t9.onrender.com/newOrder", // 1. The URL
      {
        // 2. The Data (Body)
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
      },
      {
        // 3. The Headers (Your VIP Pass)
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Close the window after submitting
    closeSellWindow(); 
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    closeSellWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          {/* 2. Notice the btn-red class here */}
          <Link className="btn btn-red" onClick={handleSellClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;