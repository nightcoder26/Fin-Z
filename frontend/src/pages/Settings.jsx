import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar2 from "../components/Navbar2";
const Settings = () => {
  return (
    <div className="main-settings-container">
      <div className="sidebar-settings">
        <Sidebar />
      </div>
      <div className="main-content-settings">
        <Navbar2 n1="Settings" />
      </div>
    </div>
  );
};

export default Settings;
