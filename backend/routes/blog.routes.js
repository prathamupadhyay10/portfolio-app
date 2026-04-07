import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostBySlug, 
} from "../controllers/blogController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/slug/:slug", getPostBySlug);

router.post("/", verifyToken, isAdmin, createPost);
router.put("/:id", verifyToken, isAdmin, updatePost);
router.delete("/:id", verifyToken, isAdmin, deletePost);

export default router;