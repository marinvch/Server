const router = require("express").Router();
const mongoose = require("mongoose");
const Post = require("../models/postModel");
const auth = require("../middleware/auth");
const User = require("../models/commentModel");

router.post("/", auth, async (req, res) => {
  try {
    const { title, content, createdAt, author } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ errorMessage: "Plese enter all required fields." });
    }

    const existingTitle = await Post.findOne({ title });

    if (existingTitle) {
      return res
        .status(400)
        .json({ errorMessage: "Title with that name exist" });
    }

    const newPost = new Post({
      _id: new mongoose.Types.ObjectId(),
      title,
      content,
      createdAt,
      author,
    });
    console.log(userPosts);

    console.log(author);
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//Get all Posts

router.get("/", async (req, res) => {
  const allPosts = await Post.find();
  console.log(allPosts + "--->");
});

//Edit Posts
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;

  let editPost = {
    title,
    content,
  };
  console.log(editPost);
  const editedPost = await Post.findByIdAndUpdate(req.params.id, editPost, {
    new: true,
  }).exec();
  editedPost.save();
  console.log(editedPost);
});

//DeletePost
router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id).populate("user").exec();
  console.log("Post has been deleted");
});

module.exports = router;
