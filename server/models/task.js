import mongoose, { Schema } from "mongoose";

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
    activities: [
      {
        type: {
          type: String,
          enum: ["create", "update", "delete", "restore",],
        },
        activity: String,
        by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        updates: {
          type: String,
          enum: ["Started","Completed","In Progress","Commented","Bug","Assigned"]
        }
      },
    ],
    
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Task = mongoose.model("Task", taskSchema);

export default Task;
