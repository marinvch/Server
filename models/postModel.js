const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    minLength: 12,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default:new Date()
  },
  tags: {
    type: [String],
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [String],
    default: 0,
  },
});

module.exports = Post = mongoose.model("post", postSchema);
