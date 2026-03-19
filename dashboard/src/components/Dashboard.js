import React from "react";

import { Route, Routes } from "react-router-dom";



import Funds from "./Funds";

import Holdings from "./Holdings";

import Orders from "./Orders";

import Positions from "./Positions";

import Summary from "./Summary";

import WatchList from "./WatchList";

import { GeneralContextProvider } from "./GeneralContext";



// Note: Removed the BuyActionWindow import!



const Dashboard = () => {

  return (

    <div className="dashboard-container">

      {/* Wrap everything inside the provider so all routes have access */}

      <GeneralContextProvider>

        <WatchList />

        <div className="content">

          <Routes>

            <Route exact path="/" element={<Summary />} />

            <Route path="/orders" element={<Orders />} />

            <Route path="/holdings" element={<Holdings />} />

            <Route path="/positions" element={<Positions />} />

            <Route path="/funds" element={<Funds />} />

          </Routes>

        </div>

       

      </GeneralContextProvider>

    </div>

  );

};



export default Dashboard;