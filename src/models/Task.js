const mongoose = require("mongoose");

// Define Task schema
const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a task name"],
    },
    description: {
      type: String,
      required: [true, "Please provide a task description"],
    },
    status: {
      type: String,
      enum: ["pending", "working", "review", "done", "archive"],
      default: "pending",
    },
    assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      default: null, // Task can have no user assigned
    },
    assignedUserName: {
      type: String,
      default: null,
    },
    assignedDate: {
      type: Date,
      default: null, 
    },
    deleted: {
      type: Boolean,
      default: false,s
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
