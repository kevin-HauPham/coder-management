const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  assignTask,
  updateTaskStatus,
  softDeleteTask,
} = require("../controllers/taskController");
const { check, validationResult } = require("express-validator");
const { ObjectId } = require("mongoose").Types;

const router = express.Router();

// Create a new task
router.post(
  "/tasks",
  [
    check("name")
      .isString()
      .notEmpty()
      .withMessage("Task name is required and must be a valid string.")
      .custom(async (value) => {
        // Custom validator to check if the task name already exists
        const task = await Task.findOne({ name: value });
        if (task) {
          throw new Error(
            "Task name already exists. Please choose a different name."
          );
        }
        return true;
      }),

    check("description")
      .isString()
      .notEmpty()
      .withMessage("Task description is required and must be a valid string."),
  ],
  createTask
);

// Get all tasks with optional filtering
router.get("/tasks", getAllTasks);

// Get a single task by ID
router.get(
  "/tasks/:id",
  [check("id").isMongoId().withMessage("Invalid task ID format.")],
  getTaskById
);

// Assign a task to a user
router.put(
  "/tasks/:id/assign",
  [
    check("id").isMongoId().withMessage("Invalid task ID format."),
    check("userId").isMongoId().withMessage("Invalid user ID format."),
  ],
  assignTask
);

// Update task status
router.patch(
  "/tasks/:id/status",
  [
    check("id").isMongoId().withMessage("Invalid task ID format."),
    check("status")
      .isIn(["pending", "working", "review", "done", "archive"])
      .withMessage("Invalid status value."),
  ],
  updateTaskStatus
);

// Soft delete a task
router.delete(
  "/tasks/:id",
  [check("id").isMongoId().withMessage("Invalid task ID format.")],
  softDeleteTask
);

module.exports = router;
