import React from "react";
import "../styles/Navbar.css";
const Navbar = (props) => {
  return (
    <nav className="nav">
      <a href="/" className = "site-title">
        {props.pageName}
      </a>
    </nav>
  );
};

export default Navbar;
