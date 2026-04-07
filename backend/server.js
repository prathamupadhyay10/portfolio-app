import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// routes
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

const app = express();

// ✅ Allowed origins (add future domains here)
const allowedOrigins = [
  "http://localhost:5173",
  "https://portfolio-app-git-main-pratham-s-projects-ee9daf50.vercel.app",
];

// ✅ CORS middleware (dynamic + safe)
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ Health check route (Render use kari shake)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", blogRoutes);
app.use("/api/messages", messageRoutes);

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ DB Error:", err.message);
  });

// server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});