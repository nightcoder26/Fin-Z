import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
const Month = () => {
  return (
    <div className="container">
      <div className="sidebar child">
        <Sidebar />
      </div>
      <div className="content child">
        <Navbar pageName="Month" className="nav-1" />
      </div>
    </div>
  );
};

export default Month;
