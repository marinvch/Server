import Post from "../models/post.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();

    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, content, createdAt, author } = req.body;

  try {
    const existingPost = await Post.findOne({ title });

    if (existingPost) {
      return res.status(404).json({ message: "Title with this name exist." });
    }

    const newPost = new Post({
      title,
      content,
      createdAt,
      author,
    });
    await newPost.save();

    console.log(newPost);

    res.send("Post created");

    res.status(201);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });

  res.json(updatedPost);
};
export const getPost = async (req, res) => {};
export const likePost = async (req, res) => {};
export const deletePost = async (req, res) => {};
