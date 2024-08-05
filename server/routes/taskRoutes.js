import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  getTask,
  postTaskActivity,
  dashboardStatistics,
  trashTask,
  deleteRestoreTask
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/create", protectRoute, isAdminRoute, createTask);
router.put("/update/:id", protectRoute, isAdminRoute, updateTask);
router.get("/alltasks",getTasks);

router.post("/activity/:id", protectRoute, postTaskActivity);
router.get("/",  getTasks);

router.get("/dashboard", protectRoute, (req, res, next) => {
  try {
    const stats = dashboardStatistics(req.user);
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error fetching dashboard statistics" });
  }
});

router.get("/:id", getTask);
router.put("/:id", protectRoute, isAdminRoute, trashTask);

router.delete(
  "/delete-restore/:id?",
  protectRoute,
  isAdminRoute,
  deleteRestoreTask
);

export default router
