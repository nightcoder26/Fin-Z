import React from "react";
import { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
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
  const today = new Date().toISOString().slice(0, 10);

  const currentYear = new Date().getFullYear();
  const currentWeek = moment().isoWeek();

  const currentMonth = new Date().toISOString().slice(0, 7);

  const currentYearNumber = new Date().getFullYear();
  const handleNavbarSelectedItem = (number) => {
    setSelectedItem(number);
  };
  const transactions_main = props.transactions;
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  const [selectedWeek, setSelectedWeek] = useState(""); // State for selected week
  const [selectedMonth, setSelectedMonth] = useState(""); // State for selected month
  const [selectedYear, setSelectedYear] = useState(""); // State for selected year
  const [filteredTransactions, setFilteredTransactions] = useState([]); // State for filtered transactions
  useEffect(() => {
    filterTransactionsByDate(selectedDate);
  }, [selectedDate]);

  // useEffect to filter by selectedWeek
  useEffect(() => {
    filterTransactionsByWeek(selectedWeek);
  }, [selectedWeek]);

  // useEffect to filter by selectedMonth
  useEffect(() => {
    filterTransactionsByMonth(selectedMonth);
  }, [selectedMonth]);

  // useEffect to filter by selectedYear
  useEffect(() => {
    filterTransactionsByYear(selectedYear);
  }, [selectedYear]);
  const filterTransactionsByDate = (selectedDate) => {
    // console.log("Selected Date:", selectedDate);
    const filtered = transactions_main.filter((transaction) => {
      const transactionDate = moment(transaction.date, "MMM DD, YYYY").format(
        "YYYY-MM-DD"
      );
      // console.log("Transaction Date:", transactionDate);
      return transactionDate === selectedDate;
    });
    // console.log("Filtered Transactions by Date:", filtered);
    setFilteredTransactions(filtered);
  };

  const filterTransactionsByWeek = (selectedWeek) => {
    const [year, weekNumber] = selectedWeek.split("-W");
    // console.log(selectedWeek);
    const filtered = transactions_main.filter((transaction) => {
      const transactionDate = moment(transaction.date, "MMM DD, YYYY");

      // Calculate the ISO week values for the transaction's date
      const transactionYear = transactionDate.isoWeekYear();
      const transactionWeekNumber = transactionDate.isoWeek();

      return (
        transactionWeekNumber === parseInt(weekNumber) &&
        transactionYear === parseInt(year)
      );
    });

    setFilteredTransactions([...filtered]); // Create a new array for filteredTransactions
    console.log(filtered);
  };

  const filterTransactionsByMonth = (selectedMonth) => {
    const [year, month] = selectedMonth.split("-");

    const filtered = transactions_main.filter((transaction) => {
      const transactionDate = moment(transaction.date, "MMM DD, YYYY");
      const transactionYear = transactionDate.year();
      const transactionMonth = transactionDate.month() + 1; // January is 0

      return (
        transactionYear === parseInt(year) &&
        transactionMonth === parseInt(month)
      );
    });

    setFilteredTransactions([...filtered]); // Update filteredTransactions state
  };

  const filterTransactionsByYear = (selectedYear) => {
    const filtered = transactions_main.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const transactionYear = transactionDate.getFullYear();
      return transactionYear === parseInt(selectedYear);
    });

    setFilteredTransactions(filtered);
  };

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
            <>
              <div className="main-table">
                <div className="date-divs">
                  <h1>Date</h1>
                  <input
                    type="date"
                    value={selectedDate}
                    defaultValue={today}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      filterTransactionsByDate(e.target.value);
                    }}
                  />
                </div>
                <div className="table">
                  <div className="table-row header">
                    <div className="table-cell first">Title</div>
                    <div className="table-cell">Amount</div>
                    <div className="table-cell">Date</div>
                    <div className="table-cell last">Category</div>
                  </div>
                  {filteredTransactions.map((transaction) => {
                    return (
                      <div
                        className="table-row"
                        key={transaction._id}
                        onClick={() => handleRowClick(transaction._id)}
                      >
                        <div className="table-cell first">
                          {transaction.title}
                        </div>
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
                        <div className="table-cell last">
                          {transaction.category}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : selectedItem === 3 ? (
            <div className="main-table">
              <div className="date-divs">
                <h1>Week</h1>
                <input
                  type="week"
                  value={selectedWeek}
                  defaultValue={`${currentYear}-W${currentWeek}`}
                  onChange={(e) => {
                    setSelectedWeek(e.target.value);
                    filterTransactionsByWeek(e.target.value);
                  }}
                />
              </div>
              <div className="table">
                <div className="table-row header">
                  <div className="table-cell first">Title</div>
                  <div className="table-cell">Amount</div>
                  <div className="table-cell">Date</div>
                  <div className="table-cell last">Category</div>
                </div>
                {filteredTransactions.map((transaction) => {
                  return (
                    <div
                      className="table-row"
                      key={transaction._id}
                      onClick={() => handleRowClick(transaction._id)}
                    >
                      <div className="table-cell first">
                        {transaction.title}
                      </div>
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
                      <div className="table-cell last">
                        {transaction.category}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : selectedItem === 4 ? (
            <div className="main-table">
              <div className="date-divs">
                <h1>Month</h1>
                <input
                  type="month"
                  value={selectedMonth}
                  defaultValue={currentMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    filterTransactionsByMonth(e.target.value);
                  }}
                />
              </div>
              <div className="table">
                <div className="table-row header">
                  <div className="table-cell first">Title</div>
                  <div className="table-cell">Amount</div>
                  <div className="table-cell">Date</div>
                  <div className="table-cell last">Category</div>
                </div>
                {filteredTransactions.map((transaction) => {
                  return (
                    <div
                      className="table-row"
                      key={transaction._id}
                      onClick={() => handleRowClick(transaction._id)}
                    >
                      <div className="table-cell first">
                        {transaction.title}
                      </div>
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
                      <div className="table-cell last">
                        {transaction.category}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="main-table">
              <div className="date-divs">
                <h1>Year</h1>
                <input
                  type="number"
                  min="1900"
                  max="2099"
                  step="1"
                  defaultValue={currentYearNumber}
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    filterTransactionsByYear(e.target.value);
                  }}
                />
              </div>
              <div className="table">
                <div className="table-row header">
                  <div className="table-cell first">Title</div>
                  <div className="table-cell">Amount</div>
                  <div className="table-cell">Date</div>
                  <div className="table-cell last">Category</div>
                </div>
                {filteredTransactions.map((transaction) => {
                  return (
                    <div
                      className="table-row"
                      key={transaction._id}
                      onClick={() => handleRowClick(transaction._id)}
                    >
                      <div className="table-cell first">
                        {transaction.title}
                      </div>
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
                      <div className="table-cell last">
                        {transaction.category}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Month;
