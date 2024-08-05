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

router.post("/create", createTask);
router.put("/update/:id", updateTask);
router.get("/alltasks", getTasks);

router.post("/activity/:id", postTaskActivity);
router.get("/dashboard", dashboardStatistics);
router.get("/", getTasks);
router.get("/:id", getTask);


router.put("/:id", trashTask);

router.delete("/delete-restore/:id?", deleteRestoreTask);

export default router
