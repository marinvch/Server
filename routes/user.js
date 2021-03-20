import express from "express";
import { Router } from "express";
import auth from "../middleware/auth.js";

const router = Router();

import {
  register,
  login,
  deleteUser,
//   home,
  validToken,
} from "../controllers/users.js";

router.post("/register", register);
router.post("/login", login);
router.delete("/register", auth, deleteUser);
// router.get("/", auth, home);
router.post("/validtoken", validToken);

export default router;
