import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
const NewEntry = () => {
  return (
    <div>
      <div className="container">
        <div className="sidebar child">
          <Sidebar />
        </div>
        <div className="content child">
          <Navbar pageName="New Entry" className="nav-1" />
        </div>
      </div>
    </div>
  );
};
export default NewEntry;
