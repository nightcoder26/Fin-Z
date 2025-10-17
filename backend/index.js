const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./api/userRoute.js");
const transactionRoute = require("./api/transactionRoute.js");
const express = require("express");
const PORT = process.env.PORT || 4000;
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
dotenv.config();


mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => console.log("Connected to MongoDB2"))
  .catch((err) => console.log(err));

const corsOptions = {
  origin: ["https://fin-z-app.vercel.app", "http://localhost:5173"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/users", userRoute);
app.use("/api/transactions", transactionRoute);
// app.use("/api/home", homeRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});
