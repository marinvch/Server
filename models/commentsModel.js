const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
  },
  body: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;
