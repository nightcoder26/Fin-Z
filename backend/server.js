import express from "express";
import cors from "cors";
import finz from "./api/finz.route.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/finz", finz);
//app.use("*", (a,b)=> b.statusCode(404).json({error: "notfound"}))

export default app;
