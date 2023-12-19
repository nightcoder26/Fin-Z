import React from "react";
import "../styles/Sidebar.css";
import logo from "../assets/MAIN-LOGO.png";
import calendar from "../assets/CALENDAR-LIST.png";
import pen from "../assets/NEW-ENTRY-LIST.png";
import pie from "../assets/PIE-LIST.png";
import everything from "../assets/EVERYTHING-LIST.png";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div>
      <div id="sidebar">
        <div className="page-title">
          <img src={logo} width={50} className="page-logo" />
          <p>Fin-Z</p>
        </div>

        <ul>
          <li className="list-items" id="overview">
            <Link to="/home" className="sidebar-link" data-target="overview">
              {/* <span className="dot"></span> */}
              <img src={calendar} width={18} className="list-images" />
              Overview
            </Link>
          </li>
          <li className="list-items" id="new-entry">
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

          <li className="list-items" id="category">
            <Link to="/category" className="sidebar-link" data-target="year">
              {/* <span className="dot"></span> */}
              <img src={pie} width={18} className="list-images" />
              Category
            </Link>
          </li>
          <li className="list-items" id="everything">
            <Link to="/month" className="sidebar-link" data-target="">
              {/* <span className="dot"></span> */}
              <img src={everything} width={18} className="list-images" />
              Everything else
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
