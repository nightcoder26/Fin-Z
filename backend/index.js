const cors = require("cors");
const { connectDatabase } = require("./db/connection.js");
const userRoute = require("./routes/userRoute.js");
const transactionRoute = require("./routes/transactionRoute.js");
const express = require("express");
const PORT = 4000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // credentials: true,
    AccessControlAllowOrigin: "http://localhost:5173",
    // AccessControlAllowHeaders: "Content-Type",
    // AccessControlAllowMethods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

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
