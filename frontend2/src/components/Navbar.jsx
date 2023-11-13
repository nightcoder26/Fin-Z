import React from "react";
import "../styles/Navbar.css";
const Navbar = (props) => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-div">
          <h1>{props.pageName}</h1>

          <img
            src="https://www.freeiconspng.com/uploads/empty-gold-coin-icon-19.jpg"
            alt="Empty Gold Coin Icon"
            className="logo"
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
