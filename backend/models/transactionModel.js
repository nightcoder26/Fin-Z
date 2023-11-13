const mongoose = require("mongoose");
const { Schema } = mongoose;
const transactionSchema = new Schema({
  amount: { type: Number, required: true },
  time: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  description: { type: String },
  category: { type: String },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = { Transaction };
