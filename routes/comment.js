import { Router } from "express";
import { auth } from "../middleware/auth.js";

const router = Router();

import {
  allComments,
  getComment,
  createComment,
  editComment,
  deleteComment,
  likeComment,
  dislikeComment,
} from "../controllers/comments.js";

router.get("/", allComments);
router.get("/:id", getComment);
router.post("/add", auth, createComment);
router.put("/edit/:id", auth, editComment);
router.delete("/delete/:id", auth, deleteComment);
router.put("/like/:id", auth, likeComment);
router.put("/dislike/:id", auth, dislikeComment);

export default router;
