const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  email: {
    type: String,
    required: true,
  },
  password: {
    required: true,
    type: String,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
