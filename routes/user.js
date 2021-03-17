import express from "express";

import {
  register,
  login,
  validToken,
  userDelete,
  getUser,
  allUsers,
} from "../controllers/users.js";

import Auth from "../middleware/auth.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/validToken", validToken);
router.get("/", Auth, getUser);
router.delete("/delete", Auth, userDelete);
router.get('/allusers',allUsers)

export default router;
