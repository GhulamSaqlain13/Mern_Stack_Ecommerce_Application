import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", isAuthenticated, getUserProfile);
router.get("/profile", isAuthenticated, getUserProfile);
router.get("/logout", logoutUser);

export default router;
