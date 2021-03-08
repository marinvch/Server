const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

let User = mongoose.model("user", UserSchema);
module.exports = User;
