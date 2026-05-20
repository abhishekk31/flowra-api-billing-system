const jwt = require("jsonwebtoken");
const User = require("../Modal/modal.js");
exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 🔥 FIXED BLOCK CHECK
    if (user.isBlocked) {
      return res.status(403).json({
        message: "Your account is blocked by admin"
      });
    }

    req.user = user; 
    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.isProvider = (req, res, next) => {
  if (req.user.role !== "provider") {
    return res.status(403).json({ message: "Only providers allowed" });
  }
  next();
};