import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";
import {
  createTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/create", protectRoute, isAdminRoute, createTask);
router.put("/update/:id", protectRoute, isAdminRoute, updateTask);
router.get("/alltasks", protectRoute, isAdminRoute, getTasks);