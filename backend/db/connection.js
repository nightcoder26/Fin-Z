const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;

async function connectDatabase() {
  try {
    mongoose.connect(DB_URI);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
module.exports = { connectDatabase };
