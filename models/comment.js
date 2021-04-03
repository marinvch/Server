import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postLink: {
    type: String,
  },
  // References User collection
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
});

export default mongoose.model("Comment", CommentSchema);
