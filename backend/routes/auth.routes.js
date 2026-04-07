import express from "express";
import { register, login, getMe, updateProfile, getDashboardStats } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getMe);
router.put("/profile", verifyToken, updateProfile);
router.get("/stats", verifyToken, isAdmin, getDashboardStats);

export default router;