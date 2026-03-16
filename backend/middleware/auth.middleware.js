import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1]; // "Bearer <token>"
    if (!token) {
      return res.status(401).json({ error: "Unauthorized! Please log in." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized! Invalid token." });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // user admin hai, continue
  } else {
    res.status(403).json({ message: "Access denied, admin only" });
  }
};
