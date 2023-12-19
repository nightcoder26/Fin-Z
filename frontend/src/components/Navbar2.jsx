import React from "react";
import { useState } from "react";
import "../styles/Navbar2.css";
import logo from "../assets/5856.jpg";
const Navbar2 = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemNumber) => {
    setSelectedItem(itemNumber);
    props.onSelected(itemNumber);
    console.log(itemNumber);
  };
  // const handleLogout =()={

  // }
  return (
    <nav className="navbar">
      <ul className="left">
        <li
          className={selectedItem === 1 ? "selected" : ""}
          onClick={() => handleItemClick(1)}
        >
          {props.n1}
        </li>
        <li
          className={selectedItem === 2 ? "selected" : ""}
          onClick={() => handleItemClick(2)}
        >
          {props.n2}
        </li>
        <li
          className={selectedItem === 3 ? "selected" : ""}
          onClick={() => handleItemClick(3)}
        >
          {props.n3}
        </li>
      </ul>
      <ul className="right">
        <img
          src={logo}
          className="logo"
          alt="account icon"
          // onClick={handleLogout}
        />
      </ul>
    </nav>
  );
};

export default Navbar2;
