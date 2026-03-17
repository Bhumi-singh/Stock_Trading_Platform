// import React from "react";
import React, { useState, useEffect } from "react"; // Fixed 'useState' and 'useEffect'
import axios from "axios"; // Fixed 'axios'

// const Summary = () => {
//   return (
//     <>
//       <div className="username">
//         <h6>Hi, User!</h6>
//         <hr className="divider" />
//       </div>

//       <div className="section">
//         <span>
//           <p>Equity</p>
//         </span>

//         <div className="data">
//           <div className="first">
//             <h3>3.74k</h3>
//             <p>Margin available</p>
//           </div>
//           <hr />

//           <div className="second">
//             <p>
//               Margins used <span>0</span>{" "}
//             </p>
//             <p>
//               Opening balance <span>3.74k</span>{" "}
//             </p>
//           </div>
//         </div>
//         <hr className="divider" />
//       </div>

//       <div className="section">
//         <span>
//           <p>Holdings (13)</p>
//         </span>

//         <div className="data">
//           <div className="first">
//             <h3 className="profit">
//               1.55k <small>+5.20%</small>{" "}
//             </h3>
//             <p>P&L</p>
//           </div>
//           <hr />

//           <div className="second">
//             <p>
//               Current Value <span>31.43k</span>{" "}
//             </p>
//             <p>
//               Investment <span>29.88k</span>{" "}
//             </p>
//           </div>
//         </div>
//         <hr className="divider" />
//       </div>
//     </>
//   );
// };

// export default Summary;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

const Summary = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    // Fetching the real data from your backend Port 3002
    axios.get("https://stock-trading-platform-r8t9.onrender.com/allHoldings", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
}).then((res) => {
      setAllHoldings(res.data); // Ensure this is res.data, not res.datasets
    });
  }, []);

  // Calculate the total investment dynamically
  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + stock.avg * stock.qty, 
    0
  );

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span><p>Equity</p></span>
        <div className="data">
          <div className="first">
            {/* Displaying the dynamic calculation instead of 3.74k */}
            <h3>{(totalInvestment / 1000).toFixed(2)}k</h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>Margins used <span>0</span></p>
            <p>Opening balance <span>{(totalInvestment / 1000).toFixed(2)}k</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>
      {/* ... rest of your UI code */}
    </>
  );
};

export default Summary;