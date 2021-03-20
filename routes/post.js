import express from "express";
import { Router } from "express";
import auth from "../middleware/auth.js";

const router = Router();
import {
  allPosts,
  createPost,
  editPost,
  deletePost,
} from "../controllers/posts.js";

router.get("/allposts", allPosts);
router.post("/createpost", createPost);
router.delete("/deletepost", deletePost);
router.put("/editpost", editPost);

export default router;
