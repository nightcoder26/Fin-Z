const express = require("express");
const router = express.Router();
const { Transaction } = require("../models/transactionModel.js");
router.get("/", (req, res) => {
  res.send("Hello world! FROM HOME ROUTE");
});
router.get("/totals", async (req, res) => {
  try {
    const totals = await Transaction.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);
    res.json(totals);
  } catch (err) {
    console.error("Error fetching totals from databse ", err);
    res.status(500).json({ message: "Error fetching totals from databse" });
  }
});

router.get("/expense", async (req, res) => {
  try {
    const date = new Date();
    const date_num = date.getDate();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const startMonth = new Date(Date.IST(year, month, 1, 0, 0, 0));
    const endMonth = new Date(Date.IST(year, month + 1, 0, 23, 59, 59));

    const startWeek = new Date(Date.IST(year, month, date_num - day, 0, 0, 0)); // starts from sunday to the current day
    const endWeek = new Date(
      Date.IST(year, month, date_num + (6 - day), 23, 59, 59)
    );
    // to do from the same day last week to this day
    // const startWeek = new Date(year, month, date_num - 7);
    //const endWeek = new Date()

    const startDay = new Date(Date.IST(year, month, date_num, 0, 0, 0));
    const endDay = new Date(Date.IST(year, month, date_num, 23, 59, 59));

    // console.log("Start Month:", startMonth);
    // console.log("End Month:", endMonth);
    // console.log("Start Week:", startWeek);
    // console.log("End Week:", endWeek);
    // console.log("Start Day:", startDay);
    // console.log("End Day:", endDay);

    // db.transactions.findOne({ type: "expense" });

    const expensesMonth = await Transaction.aggregate([
      {
        $match: {
          type: "expense",
          date: { $gte: startMonth, $lte: endMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalExpensesMonth: { $sum: "$amount" },
        },
      },
    ]);
    const expenseWeek = await Transaction.aggregate([
      {
        $match: {
          type: "expense",
          date: {
            $gte: startWeek,
            $lte: endWeek,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalExpensesWeek: { $sum: "$amount" },
        },
      },
    ]);

    const expenseDay = await Transaction.aggregate([
      {
        $match: {
          type: "expense",
          date: {
            $gte: startDay,
            $lte: endDay,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalExpensesDay: { $sum: "$amount" },
        },
      },
    ]);
    // console.log("Expenses Month:", expensesMonth);

    // received all expenses for this month , week and day

    //sending this data
    console.log("Start Month:", startMonth);
    console.log("End Month:", endMonth);
    console.log("Start Week:", startWeek);
    console.log("End Week:", endWeek);
    console.log("Start Day:", startDay);
    console.log("End Day:", endDay);

    console.log("Expenses Month:", expensesMonth);
    console.log("Expense Week:", expenseWeek);
    console.log("Expense Day:", expenseDay);

    res.json({
      expensesMonth,
      expenseWeek,
      expenseDay,
    });
    //sending this data for a get request to /api/home/expense
  } catch (err) {
    console.log("error getting expenses");
  }
});

module.exports = router;
