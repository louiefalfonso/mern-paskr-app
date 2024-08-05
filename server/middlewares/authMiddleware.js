import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Not authorized. Try login again.",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId).select(
      "isAdmin email"
    );

    if (!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }

    req.user = {
      email: user.email,
      isAdmin: user.isAdmin,
      userId: decodedToken.userId,
    };

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      status: false,
      message: "Not authorized. Try login again.",
    });
  }
};

const isAdminRoute = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin.",
    });
  }

  next();
};

export { isAdminRoute, protectRoute };
