import Post from "../models/post.js";
import User from "../models/user.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(422).json({ error: "Please add all fields." });
    }

    const existingPost = await Post.findOne({ title });

    if (existingPost) {
      return res.status(404).json({ message: "Title with this name exist." });
    }

    const newPost = new Post({
      title,
      content,
      createdAt: new Date(),
      author: req.user,
    });

    const savedPost = await newPost.save();

    await User.findByIdAndUpdate(req.user, {
      $push: { posts: savedPost },
    });

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const allPosts = async (req, res) => {
  try {
    const getAllPosts = await Post.find().populate("author", "_id username ");

    res.status(200).json(getAllPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("comments");
    res.status(200).send(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(title, content);
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(post);
    res.status(200).send(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    const user = await User.findByIdAndUpdate(req.user, {
      $pull: { posts: req.params.id },
    }).populate("likedBy", "_id username");

    if (!post) {
      res.status(404).send("No post with that id");
    }

    res.send({ message: `${user.username}delete this post.` });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Something whent wrong" });
  }
};

export const likePost = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const post = await Post.findById(req.params.id);

    const existingPost = await user.posts.includes(req.params.id);

    if (!existingPost) {
      let alreadyLiked = post.likedBy.includes(user._id);

      if (alreadyLiked === false) {
        await Post.findByIdAndUpdate(req.params.id, {
          $inc: { likes: +1 },
          $push: { likedBy: user._id },
        });

        res.json({ message: "You liked the post." });
      } else {
        res.status(201).json({ message: `You already liked this post.` });
      }
    } else {
      res.status(201).json({ message: `You can't like you own post.` });
    }
  } catch (err) {
    res.status(404).json({ message: "Something whent wrong" });
  }
};

export const dislikePost = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const post = await Post.findById(req.params.id);

    let alreadyLiked = await post.likedBy.includes(user._id);

    if (alreadyLiked === true) {
      await Post.findByIdAndUpdate(req.params.id, {
        $inc: { likes: -1 },
        $pull: { likedBy: user._id },
      });

      res.json({ message: "You disliked the post." });
    } else {
      res.status(201).json({ message: "You can't disliked the post." });
    }
  } catch (err) {
    res.status(404).json({ message: "Something whent wrong" });
  }
};
