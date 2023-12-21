import React from "react";
import logo from "../assets/5856.jpg";
import "../styles/Transaction.css";
const Transaction = (props) => {
  return (
    <>
      <div className="main-container">
        {/* <img src={logo} /> log is th image of the category */}
        <div className="details">
          <h2>{props.title}</h2>
          <h4 className="time">Time: {props.time}</h4>
        </div>
        <div className="amount">
          <h2>Rs. {props.amount}</h2>
        </div>
      </div>
    </>
  );
};

export default Transaction;
