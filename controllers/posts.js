import mongoose from "mongoose";
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

    res.json(savedPost);
    res.status(201);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

export const allPosts = async (req, res) => {
  try {
    const getAllPosts = await Post.find().populate("author", "_id username");

    res.status(200).json(getAllPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const {title,content}=req.body;
    console.log(title,content)
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

    if (!post) {
      return res.status(404).send("No post with that id");
    }

    res.json({ message: "Post is been deleted." });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Something whent wrong" });
  }
};
