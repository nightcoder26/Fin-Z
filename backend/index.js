require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const { connectDatabase } = require("./db/connection.js");
const app = express();
app.listen(PORT, () => {
  connectDatabase();
  console.log(`Server is running on port ${PORT}`);
});
