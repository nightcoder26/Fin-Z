require("dotenv").config();
const cors = require("cors");
const { connectDatabase } = require("./db/connection.js");
const userRoute = require("./routes/userRoute.js");
const transactionRoute = require("./routes/transactionRoute");

const PORT = process.env.PORT || 3000;
const express = require("express");

// const homeRoute = require("./routes/homeRoute.js");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/transactions", transactionRoute);
// app.use("/api/home", homeRoute);
app.listen(PORT, () => {
  connectDatabase();
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});
