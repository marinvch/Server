import express from "express";

import {
  getUser,
  register,
  login,
  userLogout,
  userUpdate,
  userDelete,
} from "../controllers/users.js";

const router = express.Router();
router.get("/", getUser);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", userLogout);
router.put("/:id", userUpdate);
router.delete("/:id", userDelete);

export default router;
