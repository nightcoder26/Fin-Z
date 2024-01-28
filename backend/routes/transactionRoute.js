const express = require("express");
const router = express.Router();
const { Transaction } = require("../models/transactionModel.js");
const { User } = require("../models/userModel.js");
router.use(express.json());
router.get("/", async (req, res) => {
  res.send("Welcome to the transaction route");
});
// POST a new transaction for a specific user
router.post("/:userId", async (req, res) => {
  try {
    const { amount, date, type, description, category, title } = req.body;
    const userId = req.params.userId;

    const transaction = new Transaction({
      amount,

      date,
      type,
      description,
      category,
      user: userId,
      title,
    });

    await transaction.save();
    await User.findByIdAndUpdate(
      userId,
      { $push: { transactions: transaction._id } },
      { new: true }
    );

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

// DELETE a specific transaction by ID
router.delete("/:transactionId", async (req, res) => {
  try {
    const transactionId = req.params.transactionId;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await Transaction.findByIdAndDelete(transactionId);

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
