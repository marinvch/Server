import { Router } from "express";
import { auth } from "../middleware/auth.js";

const router = Router();

import {
  register,
  login,
  deleteUser,
  currentUser,
  validToken,
} from "../controllers/users.js";

router.post("/register", register);
router.post("/login", login);
router.delete("/delete", deleteUser);
router.get("/currentuser", auth, currentUser);
router.post("/validtoken", validToken);

export default router;
