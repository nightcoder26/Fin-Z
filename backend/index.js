import { PORT, mongoDBURL } from "./config.js";
import express from "express";
import mongoose from "mongoose";
import { Transaction } from "./models/transactionsModel.js";
import router from "./routes/transactionRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Hello World!");
});

app.use("/transactions", router);

mongoose.connect(mongoDBURL).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
