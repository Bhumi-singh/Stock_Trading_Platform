# 📈 Stock Trading Platform

A full-stack, comprehensive stock trading platform and portfolio management dashboard. Built to simulate a real-world brokerage interface, this application allows users to securely sign up, view live market visualizations, manage their holdings, and execute buy/sell orders.

**Live Demo:** [Trading Dashboard](https://stock-trading-platform-blush.vercel.app)  
**Backend API:** [Render Server](https://stock-trading-platform-r8t9.onrender.com)

---

## ✨ Key Features

* **Secure Authentication:** User signup and login utilizing encrypted passwords (`bcryptjs`) and JSON Web Tokens (JWT) for session management.
* **Interactive Dashboard:** Real-time visualization of equity and market trends using dynamic graphs.
* **Portfolio Management:** Automatically calculates Total Investment, Current Value, and Total P&L across all user holdings.
* **Order Execution:** A functional Watchlist that allows users to seamlessly place 'Buy' and 'Sell' orders.
* **Database Integration:** Fully persistent data storage for user positions, holdings, and order history, with the ability to delete past orders.

---

## 💻 Tech Stack

**Frontend (`/dashboard` & `/frontend`)**
* React.js
* React Router DOM
* Axios (for API communication)
* Custom CSS / Flexbox Layouts

**Backend (`/backend`)**
* Node.js & Express.js
* MongoDB Atlas & Mongoose (ODM)
* JWT (Authentication)

---

## 📂 Repository Structure

The project is structured into three main directories to separate the landing page, the authenticated dashboard, and the server logic:

```text
📦 Stock_Trading_Platform
 ┣ 📂 backend       # Express server, MongoDB models, Auth middleware, API routes
 ┣ 📂 dashboard     # The authenticated React application (Trading View, Holdings, Orders)
 ┗ 📂 frontend      # The public-facing React landing page

##  Local Installation & Setup

To run this project locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone [https://github.com/saakshiscode19/Stock_Trading_Platform.git](https://github.com/saakshiscode19/Stock_Trading_Platform.git)
cd Stock_Trading_Platform
```

### 2. Setup the Backend
Open a terminal and navigate to the backend directory, then install the dependencies:
```bash
cd backend
npm install
```

**Configure Environment Variables:** Create a `.env` file in the `backend` folder and add your specific database credentials and secret keys. *(Note: Make sure your `.env` file is added to `.gitignore` so your keys stay private!)*
```env
PORT=3002
MONGO_URL=your_mongodb_atlas_connection_string
TOKEN_KEY=your_jwt_secret_key
```

**Start the Server:**
```bash
node index.js
```

### 3. Setup the Dashboard (Frontend)
Open a **new** terminal window and navigate to the dashboard directory:
```bash
cd dashboard
npm install
npm start
```
The dashboard will automatically launch in your browser at `http://localhost:3000`.

---

## 🤝 Contributors

* **Saakshi Sharma** ([@saakshiscode19](https://github.com/saakshiscode19))
* **Bhumi Singh**  ([Bhumi-singh](https://github.com/Bhumi-singh))

---
<div align="center">
  <i>Built with ❤️ using the MERN Stack.</i>
</div>


