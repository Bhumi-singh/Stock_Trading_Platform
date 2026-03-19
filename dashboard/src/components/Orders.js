import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios.get("https://stock-trading-platform-r8t9.onrender.com/allOrders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    })
    .then((res) => {
      // Make sure we are actually getting an array
      if(Array.isArray(res.data)) {
        setAllOrders(res.data);
      }
    })
    .catch((err) => console.log("Orders fetch error:", err));
  }, []);

  return (
    <div style={{ padding: "20px", marginTop: "50px" }}>
      {allOrders.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <p>You haven't placed any orders today</p>
        </div>
      ) : (
        <>
          <h3 style={{ marginBottom: "20px" }}>Orders ({allOrders.length})</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #eee", textAlign: "left" }}>
                <th style={{ padding: "10px" }}>Name</th>
                <th style={{ padding: "10px" }}>Qty.</th>
                <th style={{ padding: "10px" }}>Price</th>
                <th style={{ padding: "10px" }}>Mode</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}>{order.name || "N/A"}</td>
                  <td style={{ padding: "10px" }}>{order.qty || 0}</td>
                  <td style={{ padding: "10px" }}>
                    {order.price ? Number(order.price).toFixed(2) : "0.00"}
                  </td>
                  <td style={{ 
                    padding: "10px", 
                    color: order.mode === "BUY" ? "green" : "red",
                    fontWeight: "bold" 
                  }}>
                    {order.mode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Orders;