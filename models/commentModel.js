const mongoose = require("mongoose");

let CommentSchema = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  content: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

let Comment = mongoose.model("comment", CommentSchema);
module.exports = Comment;
