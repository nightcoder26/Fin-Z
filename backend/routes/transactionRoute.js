const express = require("express");
const router = express.Router();
const { Transaction } = require("../models/transactionModel.js");

router.get("/", async (req, res) => {
  res.send("Hello from transactions!");
});

// POST a new transaction for a specific user
router.post("/:userId", async (req, res) => {
  try {
    const { amount, time, date, type, description, category } = req.body;
    const userId = req.params.userId;

    const transaction = new Transaction({
      amount,
      time,
      date,
      type,
      description,
      category,
      user: userId,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all transactions for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const transactions = await Transaction.find({ user: userId });
    res.json(transactions);
  } catch (error) {
    console.log("error fetching transactions of this user", error);
  }
});
module.exports = router;
