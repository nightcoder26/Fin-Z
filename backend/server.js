import finz from "./api/finz.route.js";
import express from "express";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "expense-tracker/public/index.html"));
});
app.use("/finz", finz);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
