import mongoose, { Schema } from "mongoose";

const activitySchema = new Schema({
  type: {
    type: String,
    default: "assigned",
    enum: [
      "assigned",
      "started",
      "in progress",
      "bug",
      "completed",
      "commented",
    ],
  },
  activity: { type: String, required: true },
  date: { type: Date, default: new Date() },
  by: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, default: new Date() },
    priority: {
      type: String,
      default: "normal",
      enum: ["high", "medium", "normal", "low"],
    },
    stage: {
      type: String,
      default: "todo",
      enum: ["todo", "in progress", "completed"],
    },
    activities: [activitySchema],
    assets: [String],
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
