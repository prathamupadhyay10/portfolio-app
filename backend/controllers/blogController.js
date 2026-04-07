import Post from "../models/Post.js";

// 🔥 helper function for slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

// ================= CREATE POST =================
export const createPost = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    const slug = generateSlug(title + Date.now()); // unique slug

    const post = await Post.create({
      ...req.body,
      slug,
      author: req.user.id,
    });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= GET ALL POSTS =================
export const getPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= GET POST BY SLUG =================
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      "author",
      "name email"
    );

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // 🔥 increment views
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= UPDATE POST =================
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // only owner can update
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    // 🔥 update slug if title changes
    let updatedData = { ...req.body };

    if (req.body.title) {
      updatedData.slug = generateSlug(req.body.title + Date.now());
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= DELETE POST =================
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // only owner can delete
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await post.deleteOne();

    res.json({ msg: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};