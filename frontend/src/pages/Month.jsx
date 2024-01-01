import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar2 from "../components/Navbar2.jsx";
import moment from "moment-timezone";
import "../styles/Month.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const Month = (props) => {
  const [selectedItem, setSelectedItem] = useState(1);

  const handleNavbarSelectedItem = (number) => {
    setSelectedItem(number);
  };
  const transactions_main = props.transactions;
  transactions_main.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  transactions_main.forEach((transaction) => {
    transaction.date = moment(transaction.date)
      .tz("Asia/Kolkata")
      .format("MMM DD, YYYY");
  });
  const expense = transactions_main.filter(
    (transaction) => transaction.type === "expense"
  );
  const income = transactions_main.filter(
    (transaction) => transaction.type === "income"
  );
  const combinedData = transactions_main
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
  return (
    <div className="total-month-page">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-month-container ">
        <Navbar2
          n1="Analysis"
          n2="Day"
          n3="Week"
          n4="Month"
          n5="Year"
          onSelected={handleNavbarSelectedItem}
        />
        <div className="main-div-month">
          {selectedItem === 1 ? (
            <div>
              <div className="all-graph">
                <h1 className="graph-heading">All transactions</h1>
                <LineChart
                  width={700}
                  height={300}
                  data={combinedData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  className="graph-recent"
                >
                  <CartesianGrid />
                  <XAxis dataKey="date" tick={{ fill: "black" }} />
                  <YAxis tick={{ fill: "black" }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="incomeAmount"
                    stroke="#00FF00"
                  />
                  <Line
                    type="monotone"
                    dataKey="expenseAmount"
                    stroke="#FF0000"
                  />
                </LineChart>
              </div>
            </div>
          ) : selectedItem === 2 ? (
            <div>Day</div>
          ) : selectedItem === 3 ? (
            <div>Week</div>
          ) : selectedItem === 4 ? (
            <div>Month</div>
          ) : (
            <div>Year</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Month;
