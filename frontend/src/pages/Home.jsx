import React from "react";
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Tcard from "../components/Tcard.jsx";
import Transaction from "../components/Transaction.jsx";
import logo from "../assets/5856.jpg";
import graph from "../assets/graph.png";
import "../styles/Home.css";
const Home = () => {
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
  totals;
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

  const expenseMonth = [];
  const expenseWeek = [];
  const expenseDay = [];
  const incomeMonth = [];
  const incomeWeek = [];
  const incomeDay = [];

  //   return (
  //     <div className="container">
  //       <div className="sidebar child">
  //         <Sidebar />
  //       </div>
  //       <div className="content child">
  //         <Navbar pageName="Overview" className="nav-1" />
  //         <div className="box">
  //           <div className="box1">
  //             <h1>{totalExpense}</h1>
  //           </div>
  //           <div className="box2">
  //             <h1>{totalIncome}</h1>
  //           </div>
  //           <div className="box3">
  //             <h1>{balance}</h1>
  //           </div>
  //         </div>

  //         <h2 className="heading">Expenses</h2>
  //         <div className="box-2nd">
  //           <div className="box4">
  //             <h2>1 </h2>
  //           </div>
  //           <div className="box5">
  //             <h2>2</h2>
  //           </div>
  //           <div className="box6">
  //             <h2>3</h2>
  //           </div>
  //         </div>
  //         <h2 className="heading">Income</h2>
  //         <div className="box-3rd">
  //           <div className="box7">
  //             <h2>1 </h2>
  //           </div>
  //           <div className="box8">
  //             <h2>2</h2>
  //           </div>
  //           <div className="box9">
  //             <h2>3</h2>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <nav className="navbar">
            <ul className="left">
              <li>Dashboard</li>
              <li>All-Transactions</li>
              <li>Totals</li>
            </ul>
            <ul className="right">
              <img src={logo} className="logo" alt="account icon" />
            </ul>
          </nav>
          <div className="main-content">
            <div className="overview-container">
              <div className="content-text">
                <h1>Welcome back, Username</h1>
                <p className="overview">Here's your overview</p>
                <div className="graph">
                  <img src={graph} className="graph-img" width={750} />
                </div>
                <div className="recents">
                  <h2>Details</h2>
                  <div classname="recent-cards">
                    <Tcard />
                    <Tcard />
                  </div>
                </div>
              </div>
              <div className="recent-details">
                <h2 className="recent-1">Recent Transactions</h2>
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
