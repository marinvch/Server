const router = require("express").Router();
const Post = require("../models/postModel");

router.post("/", async (req, res) => {
  const { title, createdAt, tags, html } = req.body;
  console.log(title, createdAt, tags, html);

  const newPost = new Post({
    title,
    createdAt,
    tags,
    html,
  });

  try {
    if (newPost.title === "") {
      return console.error("need to enter a Title");
    }
    if (newPost.createdAt === "") {
      return console.error("There is no Date");
    }

    if (newPost.html === "") {
      return console.error("Need to fill some text");
    }

    const savedPost = await newPost.save();
    res.json(savedPost);
    console.log(savedPost);
  } catch (err) {
    console.error(err);
  }
});

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});
module.exports = router;
