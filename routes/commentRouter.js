const router = require("express").Router();
const Post = require("../models/postModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  try {
    let { content, createdAt } = req.body;

    if (!content) {
      return res
        .status(400)
        .json({ errorMessage: "Plese enter all required fields." });
    }

    const newComment = new Comment({
      title,
      content,
      createdAt,
      postedBy: new mongoose.Types.ObjectId(),
    });

    newComment.save();
    console.log(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

module.exports = router;
