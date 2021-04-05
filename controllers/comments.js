import Post from "../models/post.js";
import Comment from "../models/comment.js";
import User from "../models/user.js";

export const createComment = async (req, res) => {
  try {
    const { content, date, author, postId } = req.body;

    if ((!content, !date, !author)) {
      res.status(422).json({ error: "Please add all fields." });
    }


    const newComment = new Comment({
      content,
      createdAt: new Date(),
      author,
      post: postId,
    });

    const savedComment = await newComment.save();

    const post = await Post.findByIdAndUpdate(postId, {
      $push: { comments: savedComment },
    });
    
    res.json(post);

    res.status(201);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

export const allComments = async (req, res) => {
  try {
    const comments = await Post.findById(req.params.id);

    res.status(200).json(getAllComments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).send(comment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editComment = async (req, res) => {
  // try {
  //   const { content } = req.body;
  //   const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
  //     new: true,
  //   });
  //   res.status(200).send(comment);
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
};

export const deleteComment = async (req, res) => {
  // try {
  //   const post = await Post.findByIdAndDelete(req.params.id);
  //   const user = await User.findByIdAndUpdate(req.user, {
  //     $pull: { posts: req.params.id },
  //   }).populate("likedBy", "_id username");
  //   if (!post) {
  //     res.status(404).send("No post with that id");
  //   }
  //   res.send({ message: `${user.username}delete this post.` });
  // } catch (err) {
  //   console.log(err);
  //   res.status(404).json({ message: "Something whent wrong" });
  // }
};

export const likeComment = async (req, res) => {
  // try {
  //   const user = await User.findById(req.user);
  //   const post = await Post.findById(req.params.id);
  //   const existingPost = await user.posts.includes(req.params.id);
  //   if (!existingPost) {
  //     let alreadyLiked = post.likedBy.includes(user._id);
  //     if (alreadyLiked === false) {
  //       await Post.findByIdAndUpdate(req.params.id, {
  //         $inc: { likes: +1 },
  //         $push: { likedBy: user._id },
  //       });
  //       res.json({ message: "You liked the post." });
  //     } else {
  //       res.status(404).send(`You can't like your own post.`);
  //     }
  //   } else {
  //     res.status(404).send(`Post with this id does not exist.`);
  //   }
  // } catch (err) {
  //   console.log(err);
  //   res.status(404).json({ message: "Something whent wrong" });
  // }
};

export const dislikeComment = async (req, res) => {
  try {
    // const user = await User.findById(req.user);
    // const post = await Post.findById(req.params.id);
    // let alreadyLiked = await post.likedBy.includes(user._id);
    // if (alreadyLiked) {
    //   await Post.findByIdAndUpdate(req.params.id, {
    //     $inc: { likes: -1 },
    //     $pull: { likedBy: user._id },
    //   });
    //   res.json({ message: "You disliked the post." });
    // } else {
    //   res.status(404).send(`You can't dislike your own post.`);
    // }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Something whent wrong" });
  }
};
