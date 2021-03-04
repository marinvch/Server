const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  password: {
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



module.exports = User = mongoose.model("user", userSchema);
