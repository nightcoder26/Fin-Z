import express from "express";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const client = req.app.locals.client;
    const db = client.db("finance_app_db");
    const collection = db.collection("transactions");

    const totalIncome = await collection
      .aggregate([
        { $match: { type: "income" } },
        {
          $group: {
            _id: null,
            totalIncome: { $sum: "$amount" },
          },
        },
      ])
      .toArray();

    if (totalIncome.length > 0) {
      res.json(totalIncome[0]);
    } else {
      res.json({ totalIncome: 0 });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
