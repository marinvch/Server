const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  username: {
    type: String,
    maxLength: 50,
  },
  passwordHash: {
    type: String,
    minlength: 8,
    require: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
  },
  token: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
