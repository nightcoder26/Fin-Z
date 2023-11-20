import React from "react";
import "../styles/Navbar.css";
const Navbar = (props) => {
  return (
    <div className="box">
    <nav className="nav">
      <a href="#" className = "site-title">
       <h2>{props.pageName}</h2> 
      </a>
    </nav>
    </div>
  );
};

export default Navbar;
