require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const express = require("express");
const { connectDatabase } = require("./db/connection.js");
const homeRoute = require("./routes/homeRoute.js");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(cors());

app.use("/api", homeRoute);
app.listen(PORT, () => {
  connectDatabase();
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});
