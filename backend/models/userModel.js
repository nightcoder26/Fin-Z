const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
