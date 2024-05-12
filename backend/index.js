const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute.js");
const transactionRoute = require("./routes/transactionRoute.js");
const express = require("express");
const PORT = 4000;

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://b44068845:oQCopdn8H5xPQsBx@cluster0.ba6x5e3.mongodb.net/finance_app_db?retryWrites=true&w=majority")
    .then(() => console.log('Connected to MongoDB2'))
    .catch((err) => console.log(err));


const corsOptions = {
  origin: ["https://fin-z-rho.vercel.app", 'http://localhost:5173'],
  credentials: true
};

app.use(cors(corsOptions));


app.use("/api/users", userRoute);
app.use("/api/transactions", transactionRoute);
// app.use("/api/home", homeRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});
