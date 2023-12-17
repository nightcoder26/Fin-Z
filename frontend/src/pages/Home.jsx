import React from "react";
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Tcard from "../components/Tcard.jsx";
import Transaction from "../components/Transaction.jsx";
import Navbar2 from "../components/Navbar2.jsx";
import logo from "../assets/5856.jpg";
import graph from "../assets/graph.png";
import "../styles/Home.css";

const Recents = () => {
  return (
    <div className="recent-details">
      <h2 className="recent-1">Recent Transactions</h2>
      <Transaction />
      <Transaction />
      <Transaction />
      <Transaction />
      <Transaction />
    </div>
  );
};
const Dashboard = () => {
  return (
    <div className="content-text">
      <h1 className="welcome">
        Welcome back, <h4 className="user-name"> Username</h4>
      </h1>
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
  );
};

const Transactions = () => {
  const recentArray = [];
  return (
    <div>
      <div>
        <h2 className="transaction-h2">Transactions</h2>
        <div className="table">
          <div className="table-row header">
            <div className="table-cell first">Source</div>
            <div className="table-cell">Amount</div>
            <div className="table-cell">Date</div>
            <div className="table-cell last">Category</div>
          </div>
          <div className="table-row">
            <div className="table-cell first">Amazon</div>
            <div className="table-cell">1000</div>
            <div className="table-cell">12/12/2020</div>
            <div className="table-cell last">Shopping</div>
          </div>
          <div className="table-row">
            <div className="table-cell first">Amazon</div>
            <div className="table-cell">1000</div>
            <div className="table-cell">12/12/2020</div>
            <div className="table-cell last">Shopping</div>
          </div>
          <div className="table-row">
            <div className="table-cell first">Amazon</div>
            <div className="table-cell">1000</div>
            <div className="table-cell">12/12/2020</div>
            <div className="table-cell last">Shopping</div>
          </div>
          {/* Mapping the recentArray as table rows */}
        </div>
      </div>
    </div>
  );
};
const Totals = () => {
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
  const balance = totalIncome - totalExpense;
  {
    //html from - Dinesh - 30-11-2023
    // <div className="container">
    //   <div className="content child">
    //     <div className="box">
    //       <div className="box1">
    //         <h1>{totalExpense}</h1>
    //       </div>
    //       <div className="box2">
    //         <h1>{totalIncome}</h1>
    //       </div>
    //       <div className="box3">
    //         <h1>{balance}</h1>
    //       </div>
    //     </div>
    //     <h2 className="heading">Expenses</h2>
    //     <div className="box-2nd">
    //       <div className="box4">
    //         <h2>1 </h2>
    //       </div>
    //       <div className="box5">
    //         <h2>2</h2>
    //       </div>
    //       <div className="box6">
    //         <h2>3</h2>
    //       </div>
    //     </div>
    //     <h2 className="heading">Income</h2>
    //     <div className="box-3rd">
    //       <div className="box7">
    //         <h2>1 </h2>
    //       </div>
    //       <div className="box8">
    //         <h2>2</h2>
    //       </div>
    //       <div className="box9">
    //         <h2>3</h2>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  }
  return <div>Totals</div>;
};
const Home = () => {
  //Navbar code
  const [selectedNumber, setSelectedNumber] = useState(1);
  const handleNavbarSelectedItem = (number) => {
    setSelectedNumber(number);
  };
  //passing the callback handleNavbarSelectedItem to the Navbar2 component
  //navbar code ends here
  //total income and expense

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

  //total expense for a month

  const expenseMonth = [];
  const expenseWeek = [];
  const expenseDay = [];
  const incomeMonth = [];
  const incomeWeek = [];
  const incomeDay = [];

  return (
    <>
      <div className="container-1">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Navbar2
            n1="Dashboard"
            n2="All-Transactions"
            n3="Totals"
            onSelected={handleNavbarSelectedItem}
          />
          <div className="main-content">
            <div className="overview-container">
              {selectedNumber == 1 ? (
                <>
                  <Dashboard />
                  <Recents />
                </>
              ) : selectedNumber == 2 ? (
                <Transactions />
              ) : (
                <>
                  <Totals />
                  <Recents />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
