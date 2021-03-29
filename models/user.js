import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});

export default mongoose.model("User", userSchema);
