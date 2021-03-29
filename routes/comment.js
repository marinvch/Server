import express from "express";
import { addComment } from "../controllers/comments";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.put("/add", auth, addComment);

export default router;
