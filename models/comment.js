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
  author: {
    type: String,
  },

  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
});

export default mongoose.model("Comment", CommentSchema);
