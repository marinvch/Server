const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    minlength: 8,
    require: true,
  },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
