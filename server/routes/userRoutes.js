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
router.get("/users", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.put("/profile", updateUser);


router.route("/:id")
.put(activateUserProfile);

export default router;
