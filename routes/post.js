import { Router } from "express";
import { auth } from "../middleware/auth.js";

const router = Router();

import {
  allPosts,
  createPost,
  editPost,
  getPost,
  deletePost,
  likePost,
  dislikePost,
} from "../controllers/posts.js";

router.get("/", allPosts);
router.get("/:id", getPost);
router.post("/createpost", auth, createPost);
router.put("/:id", auth, editPost);
router.delete("/delete/:id", auth, deletePost);
router.put("/like/:id", auth, likePost);
router.put("/dislike/:id", auth, dislikePost);

export default router;
