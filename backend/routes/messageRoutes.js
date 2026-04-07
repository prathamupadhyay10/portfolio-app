import express from "express";
import { 
  createMessage, 
  getMessages, 
  deleteMessage, 
  markAsRead 
} from "../controllers/messageController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Public route for contact form
router.post("/", createMessage);

// Protected routes for admin
router.get("/", verifyToken, getMessages);
router.put("/:id/read", verifyToken, markAsRead);
router.delete("/:id", verifyToken, deleteMessage);

export default router;
