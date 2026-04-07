import User from "../models/User.js";
import Post from "../models/Post.js";
import Message from "../models/Message.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const user = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    const token = generateToken(newUser._id, newUser.role);

    res.json({ msg: "User registered", user, token });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ msg: "Server error during registration", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // get user with password
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = generateToken(user._id, user.role);

    // remove password before sending response
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.json({ token, user: userData });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error during login", error: err.message, stack: err.stack });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user.id);

    if (user) {
      if (email && email !== user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(400).json({ msg: "Email already taken" });
        user.email = email;
      }
      
      user.name = name || user.name;

      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const postCount = await Post.countDocuments();
    const messageCount = await Message.countDocuments();
    
    // sum views
    const posts = await Post.find({}, "views");
    const totalViews = posts.reduce((acc, curr) => acc + (curr.views || 0), 0);
    
    res.json({
      posts: postCount,
      views: totalViews,
      messages: messageCount
    });
  } catch (err) {
    console.error("Stats fetching error:", err);
    res.status(500).json({ msg: "Error fetching dashboard stats", error: err.message });
  }
};