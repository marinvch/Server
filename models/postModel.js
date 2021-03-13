import mongoose from "mongoose";

const postSchema = mongoose.Schema({});

let PostSchema = new mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selected: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("post", PostSchema);
export default Post;
