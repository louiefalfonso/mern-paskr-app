import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
  getAllUsers,
  deleteUser,
  updateUser,
  activateUserProfile
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/users", protectRoute, getAllUsers);
router.delete("/delete/:id", protectRoute, isAdminRoute, deleteUser);
router.put("/profile", protectRoute, isAdminRoute, updateUser);


router.route("/:id")
.put(protectRoute, isAdminRoute, activateUserProfile);

export default router;