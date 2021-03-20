import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    required: true,
    type: String,
  },
  username: {
    type: String,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});

export default mongoose.model("User", userSchema);
