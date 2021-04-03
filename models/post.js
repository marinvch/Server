import mongoose from "mongoose";

let PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: String },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: Array,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

export default mongoose.model("Post", PostSchema);
