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
router.get("/alltasks", getTasks);

router.post("/activity/:id", protectRoute, postTaskActivity);
router.get("/dashboard", dashboardStatistics);
router.get("/", getTasks);
router.get("/:id",  getTask);


router.put("/:id", protectRoute, isAdminRoute, trashTask);

router.delete(
  "/delete-restore/:id?",
  protectRoute,
  isAdminRoute,
  deleteRestoreTask
);

export default router
