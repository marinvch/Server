const { Mongoose } = require("mongoose");

const mongoose = reqire("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, require: true },
  createdAt: { type: Date, require: true },
  tags: { type: [String] },
  html: { type: String, require: true },
});

module.exports = Post = mongoose.model("post", postSchema);
