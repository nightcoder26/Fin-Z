import React from "react";
import "../styles/Navbar.css";
const Navbar = (props) => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-div">
          <h1>{props.pageName}</h1>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
