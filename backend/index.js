import { PORT, mongoDBURL } from "./config.js";
import express from "express";
import mongoose from "mongoose";
import { Transaction } from "./models/transactionsModel.js";
const app = express();
app.use(express.json());
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Hello World!");
});

app.post("/transactions", async (request, response) => {
  try {
    if (
      !request.body.amount ||
      !request.body.type ||
      !request.body.description ||
      !request.body.date ||
      !request.body.category
    ) {
      return response.status(400).send({ message: "Missing required fields!" });
    }
    const newTransaction = {
      amount: 10000,
      type: "income",
      description: "Salary received",
      date: "2021-03-01",
      category: "Salary",
    };
    const transaction2 = {
      amount: 250,
      type: "expense",
      description: "Dinner with friends",
      date: "2023-10-15",
      category: "Entertainment",
    };

    const transaction = await Transaction.create(transaction2);
    return response.status(201).send(transaction2);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

//get transactions

app.get("/transactions", async (request, response) => {
  try {
    const transactions = await Transaction.find({});
    return response.status(200).json({
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

//get transaction by id
app.get("/transactions/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const transactions = await Transaction.findById(id);
    return response.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

//update transaction by id
app.put("/transactions/:id", async (request, response) => {});
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
