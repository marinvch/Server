const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = require("../models/commentModel");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    let { title, content, createdAt, postedBy } = req.body;

    if (!content) {
      return res
        .status(400)
        .json({ errorMessage: "Plese enter all required fields." });
    }

    const newComment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      title,
      content,
      createdAt,
      postedBy,
    });

    newComment.save();
    console.log(newComment);
    res.json(newComment)
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

//Get all Posts

router.get("/", async (req, res) => {
  const allComments = await Comment.find();
  console.log(allPosts + "--->");
});

//Edit Comments
router.put("/:id", async (req, res) => {
  const { content } = req.body;

  let editComment = {
    title,
    content,
  };
  console.log(editPost);
  const editedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    editComment,
    {
      new: true,
    }
  ).exec();
  editedComment.save();
  console.log(editedComment);
});

//DeletePost
router.delete("/:id", async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id).populate("user").exec();
  console.log("Post has been deleted");
});

module.exports = router;
