import mongoose from "mongoose";

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postLink: {
    type: String,
    required: true,
  },
  // References User collection
  author: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  // References Post collection
  post: {
    type: Schema.ObjectId,
    ref: "Post",
  },
});

// Show author reference when queried
const populateAuthor = function (next) {
  this.populate({
    path: "_author",
    select: "username createdAt -_id",
    match: {
      isDeleted: false,
    },
  });
  next();
};
// Show post reference when queried
// CAUSES INFINITE LOOP WHEN Post ALSO POPULATES COMMENTS
// const populatePost = function(next) {
//     this.populate({
//         path: '_post',
//         select: 'title createdAt -_id'
//     });
//     next();
// };
// Execute populate methods before find query
CommentSchema.pre("find", populateAuthor);
CommentSchema.pre("findOne", populateAuthor);
//commentSchema.pre('find', populatePost);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
