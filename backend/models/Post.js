import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    content: String,
    excerpt: String,
    coverImage: String,
    tags: [String],
    status: { type: String, default: "draft" },
    views: { type: Number, default: 0 },

    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);