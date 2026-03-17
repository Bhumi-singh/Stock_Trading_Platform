import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios to talk to your backend

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    // This fetches the live data from your working backend (Port 3002)
    axios.get("https://stock-trading-platform-r8t9.onrender.com/allHoldings", {
    headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Shows the token to the bouncer!
    },
    }).then((res) => {
      console.log(res.data);
      setAllPositions(res.data); // Use .data to get the array from MongoDB
    });
  }, []);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>
      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>
          {allPositions.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td> {/* This will now show 52! */}
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Positions;