const mongoose = require("mongoose");
const DB_URI =
  "mongodb+srv://b44068845:oQCopdn8H5xPQsBx@cluster0.ba6x5e3.mongodb.net/finance_app_db?retryWrites=true&w=majority";

async function connectDatabase() {
  try {
    mongoose.connect(DB_URI);
    console.log("Connected to database");
    //debug
    // const { Transaction } = require("../models/transactionModel");
    // try {
    //   const transaction = await Transaction.findOne({ type: "expense" });
    //   console.log("Query Result:", transaction);
    // } catch (err) {
    //   console.error("Error querying data:", err);
    // }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
db = mongoose.connection;
// const Transaction = require("../models/transactionModel"); // Adjust the path based on your file structure

// // Find one document from the Transaction collection
// Transaction.findOne({ type: "expense" }, (err, transaction) => {
//   if (err) {
//     console.error("Error querying data:", err);
//     return;
//   }

//   console.log("Query Result:", transaction);
// });

module.exports = { connectDatabase };
