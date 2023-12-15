import React from "react";
import "../styles/Sidebar.css";
const Sidebar = () => {
  return (
    <div>
      <div id="sidebar">
        <h1>Fin-Z</h1>
        <ul>
          <li>
            <a href="#" class="sidebar-link" data-target="overview">
              <span class="dot"></span>Overview
            </a>
          </li>
          <li>
            <a href="#" class="sidebar-link" data-target="new-entry">
              <span class="dot"></span>New Entry
            </a>
          </li>
          <li>
            <a href="#" class="sidebar-link" data-target="today">
              <span class="dot"></span>Today
            </a>
          </li>
          <li>
            <a href="#" class="sidebar-link" data-target="week">
              <span class="dot"></span>Week
            </a>
          </li>
          <li>
            <a href="#" class="sidebar-link" data-target="month">
              <span class="dot"></span>Month
            </a>
          </li>
          <li>
            <a href="#" class="sidebar-link" data-target="year">
              <span class="dot"></span>Year
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
