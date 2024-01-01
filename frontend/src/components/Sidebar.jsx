import React, { useState, useEffect } from "react";
import "../styles/Sidebar.css";
import logo from "../assets/MAIN-LOGO.png";
import { SiZcash } from "react-icons/si";
import calendar from "../assets/CALENDAR-LIST.png";
import pen from "../assets/NEW-ENTRY-LIST.png";
import pie from "../assets/PIE-LIST.png";
import everything from "../assets/EVERYTHING-LIST.png";
import settings from "../assets/SETTINGS.png";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();

  const getBgColor = (path) => {
    switch (path) {
      case "/home":
        return location.pathname === "/home" ? "#f1f3f5" : "";
      case "/new-entry":
        return location.pathname === "/new-entry" ? "#f1f3f5" : "";
      case "/category":
        return location.pathname === "/category" ? "#f1f3f5" : "";
      case "/month":
        return location.pathname === "/month" ? "#f1f3f5" : "";
      case "/settings":
        return location.pathname === "/settings" ? "#f1f3f5" : "";
      default:
        return null;
    }
  };
  const handleSidebarClick = (num) => {
    setSelectedItem(num);
  };
  return (
    <div>
      <div id="sidebar">
        <div className="page-title">
          {/* <img src={logo} width={50} className="page-logo" /> */}
          <SiZcash className="main-logo-w" />
          <p>Fin-Z</p>
        </div>

        <ul>
          <li
            onClick={() => handleSidebarClick(1)}
            className={`list-items ${selectedItem === 1 ? " selected" : ""}}`}
            style={{
              backgroundColor: getBgColor("/home"),
            }}
            id="overview"
          >
            <Link to="/home" className="sidebar-link" data-target="overview">
              {/* <span className="dot"></span> */}
              <img src={calendar} width={18} className="list-images" />
              Overview
            </Link>
          </li>
          <li
            onClick={() => handleSidebarClick(2)}
            className={`list-items ${selectedItem === 2 ? " selected" : ""}}`}
            style={{ backgroundColor: getBgColor("/new-entry") }}
            id="new-entry"
          >
            <Link
              to="/new-entry"
              className="sidebar-link"
              data-target="new-entry"
            >
              {/* <span className="dot"></span> */}
              <img src={pen} width={18} className="list-images" />
              New Entry
            </Link>
          </li>

          <li
            onClick={() => handleSidebarClick(3)}
            className={`list-items ${selectedItem === 3 ? " selected" : ""}}`}
            style={{ backgroundColor: getBgColor("/category") }}
            id="category"
          >
            <Link to="/category" className="sidebar-link" data-target="year">
              {/* <span className="dot"></span> */}
              <img src={pie} width={18} className="list-images" />
              Category
            </Link>
          </li>
          <li
            onClick={() => handleSidebarClick(4)}
            className={`list-items ${selectedItem === 4 ? " selected" : ""}}`}
            style={{ backgroundColor: getBgColor("/month") }}
            id="everything"
          >
            <Link to="/month" className="sidebar-link" data-target="">
              {/* <span className="dot"></span> */}
              <img src={everything} width={18} className="list-images" />
              Analysis
            </Link>
          </li>
          <li
            onClick={() => handleSidebarClick(5)}
            className={`list-items ${selectedItem === 5 ? " selected" : ""}}`}
            style={{ backgroundColor: getBgColor("/settings") }}
            id="settings"
          >
            <Link to="/settings" className="sidebar-link">
              <img src={settings} width={18} className="list-images" />
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
