require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const { connectDatabase } = require("./db/connection.js");
const homeRoute = require("./routes/homeRoute.js");
const app = express();
app.use("/api", homeRoute);
app.listen(PORT, () => {
  connectDatabase();
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});
