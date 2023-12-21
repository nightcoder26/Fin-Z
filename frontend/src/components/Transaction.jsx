import React from "react";
import "../styles/Transaction.css";
import { FaCircle } from "react-icons/fa";

const Transaction = (props) => {
  return (
    <>
      <div className="main-container">
        {/* <img src={logo} /> log is th image of the category */}
        <div className="details">
          <h2>{props.title}</h2>
          <h4 className="time">{props.time}</h4>
        </div>
        <div className="amount">
          <FaCircle
            className={`dot ${props.type === "income" ? "green" : "red"}`}
          />
          <h2>Rs. {props.amount}</h2>
        </div>
      </div>
    </>
  );
};

export default Transaction;
