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
    // const date = new Date();
    // const date_num = date.getDate();
    // const day = date.getDay();
    // const month = date.getMonth();
    // const year = date.getFullYear();
    // const startMonth = new Date(Date(year, month, 1, 0, 0, 0));
    // const endMonth = new Date(Date(year, month + 1, 0, 23, 59, 59));

    // const startWeek = new Date(
    //   Date(year, month, date.getDate() - date.getDay(), 0, 0, 0)
    // );
    // const endWeek = new Date(
    //   Date(year, month, date.getDate() + (6 - date.getDay()), 23, 59, 59)
    // );

    // to do from the same day last week to this day
    // const startWeek = new Date(year, month, date_num - 7);
    //const endWeek = new Date()

    // const startDay = new Date(Date(year, month, date_num, 0, 0, 0));
    // const endDay = new Date(Date(year, month, date_num, 23, 59, 59));

    const date = new Date();
    const date_num = date.getUTCDate();
    const day = date.getUTCDay();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();

    const startMonth = new Date(Date.UTC(year, month, 1, 0, 0, 0));
    const endMonth = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59));

    const startWeek = new Date(
      Date.UTC(year, month, date.getUTCDate() - date.getUTCDay(), 0, 0, 0)
    );
    const endWeek = new Date(
      Date.UTC(
        year,
        month,
        date.getUTCDate() + (6 - date.getUTCDay()),
        23,
        59,
        59
      )
    );

    const startDay = new Date(Date.UTC(year, month, date_num, 0, 0, 0));
    const endDay = new Date(Date.UTC(year, month, date_num, 23, 59, 59));

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

    res.json({
      expensesMonth,
      expenseWeek,
      expenseDay,
    });
    //sending this data for a get request to /api/home/expense
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
