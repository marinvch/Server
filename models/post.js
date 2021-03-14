import mongoose from "mongoose";

let PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  _comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

export default mongoose.model("Post", PostSchema);
