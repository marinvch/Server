import Post from "../models/post.js";
import Comment from "../models/comment.js";

export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      res.status(422).json({ error: "Please add all fields." });
    }

    const newComment = new Comment({
      content,
      createdAt: new Date(),
      author: req.user,
      post: req.user,
    });

    const savedComment = await newComment.save();

    await Post.findByIdAndUpdate(req.user, {
      $push: { comments: savedComment },
    });

    res.json(savedComment);
    res.status(201);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};
