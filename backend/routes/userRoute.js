const express = require("express");

const router = express.Router();
const { User } = require("../models/userModel.js");

router.get("/", async (req, res) => {
  res.send("Hello from users!");
});

// post a new user
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "New user added" });
  } catch (error) {
    console.log("error adding new user", error);
  }
});

module.exports = router;
