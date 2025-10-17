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

router.get("/");
