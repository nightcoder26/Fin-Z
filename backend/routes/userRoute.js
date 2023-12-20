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

    res
      .status(201)
      .json({
        message: "New user added",
        userId: newUser._id,
        username: newUser.username,
      });
  } catch (error) {
    console.log("error adding new user", error);
  }
});
//Checking if username exists
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const validUsername = await User.findOne({ username });
    if (!validUsername) {
      return res.status(401).json({ message: "Username does not exist" });
    }
    if (validUsername.password !== password) {
      return res.status(401).json({ message: "Password is incorrect" });
    }
    return res.status(200).json({
      message: "Username and password are correct",
      userId: validUsername._id,
    });
  } catch (error) {
    console.log("error checking username/password", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
