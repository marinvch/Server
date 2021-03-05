const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: {
    type: String,
    minLength: 8,
    require: true,
    unique: true,
  },
  body: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
});
const Topic = mongoose.model("topic", topicSchema);

module.exports = Topic;
