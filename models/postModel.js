const mongoose = require("mongoose");

let PostSchema = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  title: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  likes: Number,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

let Post = mongoose.model("post", PostSchema);
module.exports = Post;
