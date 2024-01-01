import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import "../styles/Navbar2.css";
import { FaUser } from "react-icons/fa";
import logo from "../assets/5856.jpg";
const Navbar2 = ({ n1, n2, n3, n4, n5, onSelected }) => {
  const [selectedItem, setSelectedItem] = useState(1);
  const [logout, setLogout] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  const handleItemClick = (itemNumber) => {
    setSelectedItem(itemNumber);
    onSelected(itemNumber);
  };
  const handleLogout = () => {
    localStorage.removeItem("username");
    setLogout(true);
  };

  return (
    <div style={{ zIndex: "2" }}>
      {logout ? (
        <Navigate to="/" replace />
      ) : (
        <nav className="navbar">
          <ul className="left">
            <li
              className={selectedItem === 1 ? "selected new" : "new"}
              onClick={() => handleItemClick(1)}
            >
              {n1}
            </li>
            <li
              className={selectedItem === 2 ? "selected" : ""}
              onClick={() => handleItemClick(2)}
            >
              {n2}
            </li>
            <li
              className={selectedItem === 3 ? "selected" : ""}
              onClick={() => handleItemClick(3)}
            >
              {n3}
            </li>
            <li
              className={selectedItem === 4 ? "selected" : ""}
              onClick={() => handleItemClick(4)}
            >
              {n4}
            </li>
            <li
              className={selectedItem === 5 ? "selected" : ""}
              onClick={() => handleItemClick(5)}
            >
              {n5}
            </li>
          </ul>

          <ul className="right">
            {/* <img
              src={logo}
              className="logo"
              alt="account icon"
              onClick={toggleDropDown}
            /> */}
            <FaUser className="logo" onClick={toggleDropDown} />
          </ul>
          {showDropDown && (
            <div>
              <ul>
                <button onClick={handleLogout} id="logout-button">
                  Logout
                </button>
              </ul>
            </div>
          )}
        </nav>
      )}
    </div>
  );
};

export default Navbar2;
