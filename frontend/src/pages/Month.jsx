import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar2 from "../components/Navbar2.jsx";
import "../styles/Month.css";
const Month = (props) => {
  const transactions = props.transactions;

  return (
    <div className="main-div">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content-month">
        <Navbar2 n1="Analysis" />
        <div className="main-content-month"></div>
      </div>
    </div>
  );
};

export default Month;
