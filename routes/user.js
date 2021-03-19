import express from "express";

import { register, login } from "../controllers/users.js";

import Auth from "../middleware/auth.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);

export default router;
