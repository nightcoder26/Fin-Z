import React from "react";
import logo from "../assets/5856.jpg";
import "../styles/Transaction.css";
const Transaction = () => {
  return (
    <>
      <div className="main-container">
        {/* <img src={logo} /> log is th image of the category */}
        <div className="details">
          <h2>School fee</h2>
          <h4>Time:5:00pm</h4>
        </div>
        <div className="amount">
          <h2>Rs. 5000</h2>
        </div>
      </div>
    </>
  );
};

export default Transaction;
