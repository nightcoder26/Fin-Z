import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
const Home = () => {
  // const data = ["a", "b"];
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:4000/api/totals");
  //   const data = response.json();
  //   setData(data);
  // }, []);

  //total income and expense
  const [totals, setTotals] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/api/home/totals", {
      method: "GET",
    })
      .then((response) => response.json()) // Corrected this line
      .then((data) => {
        setTotals(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  //total expense for a month, week and day
  const [expense, setExpense] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/api/home/expense", {
      method: "GET",
    })
      .then((response) => response.json()) // Corrected this line
      .then((data) => {
        setExpense(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //total expense to display on the overview page
  let totalExpense = 0;
  for (let i = 0; i < totals.length; i++) {
    if (totals[i]._id === "expense") {
      totalExpense = totals[i].total;
      break;
    }
  }
  //total income to display on the overview page
  let totalIncome = 0;
  for (let i = 0; i < totals.length; i++) {
    if (totals[i]._id === "income") {
      totalIncome = totals[i].total;
      break;
    }
  }

  //total expense for a month

  const balance = totalIncome - totalExpense;

  return (
    <div>
      {/* <Sidebar/> sidebar goes here 
          each page with 3 components a sidebar, navbar and main content, main content has other components
      */}
      <Navbar pageName="Overview" />
      <div className="container">
    <div className="box1"><h1>{totalExpense}</h1></div>
    <div className="box2"><h1>{totalIncome}</h1></div>
    <div className="box3"><h1>{balance}</h1></div>
    </div>
    </div>
  );
};
export default Home;
