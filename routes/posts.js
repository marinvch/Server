import express from "express";

import { createPost, allPosts, userPosts } from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/createpost", auth, createPost);
router.get("/allposts", allPosts);
router.get("/userpost", auth, userPosts);

export default router;
