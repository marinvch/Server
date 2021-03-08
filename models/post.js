const mongoose = require("mongoose");

let PostsSchema = mongoose.Schema({
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
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

let PostsSchema = mongoose.model("post", PostsSchema);
module.exports = PostsSchema;
