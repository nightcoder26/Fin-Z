import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar2 from "../components/Navbar2.jsx";
import { FaCircle } from "react-icons/fa";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import "../styles/Category.css";
const Category = (props) => {
  // const buttons = ["others", "Button 2", "Button 3"];
  const COLORS = ["#a184ff", "#361fa3", "#7c5bff", "#4d3799", "#8f6eff"];

  const [selectedButton, setSelectedButton] = useState(0);
  const transactions = props.transactions.slice().reverse();
  const buttons = [
    "All",
    ...new Set(transactions.map((transaction) => transaction.category)),
  ];
  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const income = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const calculateTotalByCategory = (transactions) => {
    const totalByCategory = {};
    transactions.forEach((transaction) => {
      if (totalByCategory[transaction.category]) {
        totalByCategory[transaction.category] += transaction.amount;
      } else {
        totalByCategory[transaction.category] = transaction.amount;
      }
    });
    return totalByCategory;
  };
  const totalExpensesByCategory = calculateTotalByCategory(expenses);

  // Calculate total income by category
  const totalIncomeByCategory = calculateTotalByCategory(income);
  const expensesChartData = Object.keys(totalExpensesByCategory).map(
    (category) => ({
      name: category,
      value: totalExpensesByCategory[category],
    })
  );

  // Format data for Recharts pie chart for income
  const incomeChartData = Object.keys(totalIncomeByCategory).map(
    (category) => ({
      name: category,
      value: totalIncomeByCategory[category],
    })
  );

  // console.log(transactions[0]);
  const selectedTransactions = transactions.filter((transaction) => {
    return transaction.category === buttons[selectedButton];
  });
  const selectedCategory = buttons[selectedButton];

  const selectedExpenses = expenses.filter(
    (transaction) => transaction.category === selectedCategory
  );
  const selectedIncome = income.filter(
    (transaction) => transaction.category === selectedCategory
  );

  const totalExpensesSelectedCategory =
    calculateTotalByCategory(selectedExpenses);
  const totalIncomeSelectedCategory = calculateTotalByCategory(selectedIncome);

  const expensesTotal = Object.values(totalExpensesSelectedCategory).reduce(
    (acc, cur) => acc + cur,
    0
  );
  const incomeTotal = Object.values(totalIncomeSelectedCategory).reduce(
    (acc, cur) => acc + cur,
    0
  );

  const mergedChartData = [
    { name: "Expenses", value: expensesTotal },
    { name: "Income", value: incomeTotal },
  ];

  // console.log(transactions);
  // console.log(selectedTransactions);
  return (
    <>
      <div className="total-category">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main">
          <Navbar2 className="navbar-home" n1="Category analysis" />
          <div className="category-content ">
            <div className="categories">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  className={
                    selectedButton === index
                      ? "category-button selected-button"
                      : "category-button"
                  }
                  onClick={() => setSelectedButton(index)}
                >
                  {button}
                </button>
              ))}
            </div>
            <div className="charts-pie">
              {buttons[selectedButton] === "All" ? (
                <>
                  <h2>All</h2>
                  <div className="all-pies">
                    <div className="single-pie">
                      <h2>Income</h2>
                      <PieChart width={445} height={445}>
                        <Pie
                          data={incomeChartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={150}
                          fill="#8884d8"
                          label
                          labelLine={false}
                          legendType="circle"
                        >
                          {incomeChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </div>
                    <div className="single-pie">
                      <h2>Expenses</h2>
                      <PieChart width={445} height={445}>
                        <Pie
                          data={expensesChartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={150}
                          fill="#8884d8"
                          label
                          labelLine={false}
                          legendType="circle"
                        >
                          {expensesChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2>{buttons[selectedButton]}</h2>
                  <div className="pie-charts">
                    <PieChart width={400} height={400}>
                      <Pie
                        data={mergedChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label
                        labelLine={false}
                        legendType="circle"
                      >
                        {mergedChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </div>
                </>
              )}
              {buttons[selectedButton] !== "All" && (
                <div>
                  <div className="table">
                    <div className="table-row header">
                      <div className="table-cell first">Title</div>
                      <div className="table-cell">Amount</div>
                      <div className="table-cell">Date</div>
                      <div className="table-cell last">Category</div>
                    </div>

                    {selectedTransactions.map((transaction) => (
                      <div
                        className="table-row"
                        key={transaction._id}
                        onClick={() => console.log(transaction._id)}
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
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Category;
