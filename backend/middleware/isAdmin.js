import User from "../models/User.js";

export const isAdmin = async (req, res, next) => {
  try {
    // 1. Check if role exists in JWT payload
    if (req.user && req.user.role === "admin") {
      return next();
    }

    // 2. Fallback: Check Database for the most current role
    const user = await User.findById(req.user.id);
    
    if (user && user.role === "admin") {
      return next();
    }

    console.warn(`Access denied for user: ${req.user?.id}. Role: ${user?.role}`);
    return res.status(403).json({ msg: "Access denied. Admin only." });
  } catch (err) {
    res.status(500).json({ msg: "Server error in admin middleware" });
  }
};
