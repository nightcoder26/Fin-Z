import React from "react";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import moment from "moment-timezone";
import Sidebar from "../components/Sidebar.jsx";
import Tcard from "../components/Tcard.jsx";
import Transaction from "../components/Transaction.jsx";
import Navbar2 from "../components/Navbar2.jsx";
import graph from "../assets/graph.png";
import Tcard2 from "../components/Tcard2.jsx";
import "../styles/Home.css";
import { FaCircle } from "react-icons/fa";

const Recents = (props) => {
  const transactions = props.transactions;
  const setSelectedNumber = props.numFunc;
  if (transactions.length === 0) {
    return (
      <div className="recent-details">
        <h2 className="recent-1">Recent Transactions</h2>
        <p className="empty">
          Wow, Such empty. <br /> Add a new income/expense
        </p>
      </div>
    );
  }

  const recentTransactions = transactions.slice(-5).reverse();
  const handleViewAll = () => {
    setSelectedNumber(2);
  };
  // console.log(transactions);
  return (
    <div className="recent-details">
      <div className="recent-container">
        <h2 className="recent-1">Recent Transactions</h2>
        <button className="view-all" onClick={handleViewAll}>
          View all
        </button>
      </div>
      {recentTransactions.map((transaction) => {
        const istDateTime = moment(transaction.date)
          .tz("Asia/Kolkata")
          .format("MMMM DD, YYYY h:mmA");

        return (
          <Transaction
            key={transaction._id}
            title={transaction.title}
            amount={transaction.amount}
            time={istDateTime}
            type={transaction.type}
          />
        );
      })}
    </div>
  );
};
const Dashboard = (props) => {
  const transactions = props.transactions;

  transactions.forEach((transaction) => {
    transaction.date = moment(transaction.date)
      .tz("Asia/Kolkata")
      .format("MMM DD, YYYY");
  });
  const expense = transactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const income = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const combinedData = transactions
    .map((transaction) => {
      const { date } = transaction;
      const incomeAmount =
        income.find((item) => item.date === transaction.date)?.amount || 0;
      const expenseAmount =
        expense.find((item) => item.date === transaction.date)?.amount || 0;

      return {
        date,
        incomeAmount,
        expenseAmount,
      };
    })
    .filter((data, index, combinedData) => {
      return index === combinedData.findIndex((t) => t.date === data.date);
    });
  // transactions.forEach((transaction) => {
  //   if (transaction.type === "expense") {
  //     expense.push({
  //       date: transaction.date.split("T")[0],
  //       amount: transaction.amount,
  //     });
  //   } else if (transaction.type === "income") {
  //     income.push({
  //       date: transaction.date.split("T")[0],
  //       amount: transaction.amount,
  //     });
  //   }
  // });

  // const combinedData = [
  //   ...income.map((item) => ({ ...item, type: "income" })),
  //   ...expense.map((item) => ({ ...item, type: "expense" })),
  // ];
  // console.log(transactions);
  return (
    <div className="content-text">
      <div className="welcome-message">
        <h1 className="welcome">Hey, {props.username} 👋</h1>
        <p className="overview">Here's your overview</p>
      </div>

      <div className="graph">
        {/* <img src={graph} className="graph-img" width={750} /> */}

        <LineChart
          width={730}
          height={250}
          data={combinedData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          className="graph-recent"
        >
          <CartesianGrid />
          <XAxis dataKey="date" tick={{ fill: "black" }} />
          <YAxis tick={{ fill: "black" }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="incomeAmount" stroke="#00FF00" />
          <Line type="monotone" dataKey="expenseAmount" stroke="#FF0000" />
        </LineChart>
      </div>
      <div className="recents">
        <h2>Details</h2>
        <div className="recent-cards">
          <Tcard />
          <Tcard />
          <Tcard />
          <Tcard />
        </div>
      </div>
    </div>
  );
};

const Transactions = (props) => {
  //getting all transactions of a user
  const transactions_array = props.transactions.slice().reverse();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const handleRowClick = (transactionId) => {
    setSelectedTransaction(transactionId);
  };
  return (
    <div>
      <div>
        <h2 className="transaction-h2">Transactions</h2>
        <div className="table">
          <div className="table-row header">
            <div className="table-cell first">Title</div>
            <div className="table-cell">Amount</div>
            <div className="table-cell">Date</div>
            <div className="table-cell last">Category</div>
          </div>
          {/* <div className="table-row">
              <div className="table-cell first">Amazon</div>
              <div className="table-cell">1000</div>
              <div className="table-cell">12/12/2020</div>
              <div className="table-cell last">Shopping</div>
            </div> */}
          {transactions_array.map((transaction) => {
            return (
              <div
                className="table-row"
                key={transaction._id}
                onClick={() => handleRowClick(transaction._id)}
              >
                <div className="table-cell first">{transaction.title}</div>
                <div className="table-cell">
                  <span>
                    <FaCircle
                      className={`circle ${
                        transaction.type === "income"
                          ? "green-circle"
                          : "red-circle"
                      }`}
                    />
                  </span>
                  {transaction.amount}
                </div>
                <div className="table-cell">
                  {transaction.date
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </div>
                <div className="table-cell last">{transaction.category}</div>
              </div>
            );
          })}

          {/* <div className="table-row">
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
          </div> */}
          {/* Mapping the recentArray as table rows */}
        </div>
      </div>
    </div>
  );
};
const Totals = () => {
  // const [totals, setTotals] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:4000/api/home/totals", {
  //     method: "GET",
  //   })
  //     .then((response) => response.json()) // Corrected this line
  //     .then((data) => {
  //       setTotals(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
  // totals;
  // //total expense to display on the overview page
  // let totalExpense = 0;
  // for (let i = 0; i < totals.length; i++) {
  //   if (totals[i]._id === "expense") {
  //     totalExpense = totals[i].total;
  //     break;
  //   }
  // }
  // //total income to display on the overview page
  // let totalIncome = 0;
  // for (let i = 0; i < totals.length; i++) {
  //   if (totals[i]._id === "income") {
  //     totalIncome = totals[i].total;
  //     break;
  //   }
  // }
  // const balance = totalIncome - totalExpense;

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

  return <div>Totals</div>;
};
const Home = () => {
  const [username, setUsername] = useState("");
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    try {
      fetch(`http://localhost:4000/api/transactions/${userId}`, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setTransactions(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  //Navbar code
  const [selectedNumber, setSelectedNumber] = useState(1);
  const handleNavbarSelectedItem = (number) => {
    setSelectedNumber(number);
  };
  //passing the callback handleNavbarSelectedItem to the Navbar2 component
  //navbar code ends here
  //total income and expense

  //total expense for a month, week and day
  // const [expense, setExpense] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:4000/api/home/expense", {
  //     method: "GET",
  //   })
  //     .then((response) => response.json()) // Corrected this line
  //     .then((data) => {
  //       setExpense(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  // console.log(expense);

  // //total expense for a month

  // const expenseMonth = [];
  // const expenseWeek = [];
  // const expenseDay = [];
  // const incomeMonth = [];
  // const incomeWeek = [];
  // const incomeDay = [];

  return (
    <>
      <div className="container-1">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Navbar2
            className="navbar-home"
            n1="Dashboard"
            n2="All-Transactions"
            n3="Totals"
            onSelected={handleNavbarSelectedItem}
          />
          <div className="main-content">
            <div className="overview-container">
              {selectedNumber == 1 ? (
                <>
                  <Dashboard username={username} transactions={transactions} />
                  <Recents
                    transactions={transactions}
                    numFunc={setSelectedNumber}
                  />
                </>
              ) : selectedNumber == 2 ? (
                <Transactions transactions={transactions} />
              ) : (
                <>
                  <Totals />
                  <Recents
                    transactions={transactions}
                    numFunc={setSelectedNumber}
                  />
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
