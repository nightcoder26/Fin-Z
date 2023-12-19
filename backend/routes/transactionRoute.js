const express = require("express");
const router = express.Router();
const { Transaction } = require("../models/transactionModel.js");
router.get("/", (req, res) => {
  res.send();
});
