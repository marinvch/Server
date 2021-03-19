import Post from "../models/post.js";

export const allPosts = async (req, res) => {
  try {
    const getAllPosts = await Post.find().populate("author", "_id username");

    res.status(200).json(getAllPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, content, createdAt, author } = req.body;

  try {
    if (!title || !content) {
      res.status(422).json({ error: "Please add all fields." });
    }

    const existingPost = await Post.findOne({ title });

    if (existingPost) {
      return res.status(404).json({ message: "Title with this name exist." });
    }
    req.user.password = undefined;

    const newPost = new Post({
      title,
      content,
      createdAt,
      author: req.user,
    });
    const post = await newPost.save();

    res.json({ post });
    res.status(201);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const userPosts = async (req, res) => {
  try {
    const post = await Post.find({ author: req.user._id }).populate(
      "author",
      "_id username"
    );
    res.json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
// export const updatePost = async (req, res) => {
//   const { id: _id } = req.params;
//   const post = req.body;

//   if (!mongoose.Types.ObjectId.isValid(_id)) {
//     return res.status(404).send("No post with that id");
//   }

//   const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });

//   res.json(updatedPost);
// };
// export const getPost = async (req, res) => {
//   const { id: _id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(_id)) {
//     return res.status(404).send("No post with that id");
//   }

//   const post = -Post.findById({ id });

//   res.json(post);
// };
// export const likePost = async (req, res) => {};
// export const deletePost = async (req, res) => {};

// export const userPost = async (req, res) => {
//   try {
//     const userPosts = Post.find({ author: req.user._id }).populate(
//       "author",
//       "_id username"
//     );

//     console.log(userPosts);
//     res.json(userPosts);
//   } catch (error) {
//     res.json({ error: "Something went wrong" });
//   }
// };
