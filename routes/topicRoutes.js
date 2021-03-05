const router = require("express").Router();
const Topic = require("../models/topicModel");
const User = require("../models/userModel");
const Comments = require("../models/commentsModel");

router.post("/", async (req, res) => {
  //user ID
  const user = await User.findOne(Topic);
  const { title, body, createdAt } = req.body;

  if (!title || !body) {
    return res.status(400).json({ msg: "Not all fields were not entered!!" });
  }
  if (!user._id) {
    return res.status(400).json({ msg: "User is not authorized!!!" });
  }

  const id = user._id;
  const newTopic = new Topic({
 
    title,
    body,
    createdAt,
  });
  console.log(newTopic);
});

module.exports = router;
