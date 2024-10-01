// controllers/taskController.js

const Task = require("../models/Task");
const User = require("../models/User");
const { validationResult } = require("express-validator");

// Create a new task
exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description } = req.body;

  try {
    const newTask = new Task({ name, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tasks with optional filters
exports.getTasks = async (req, res) => {
  try {
    const filters = req.query; // Allows filtering by query parameters (status, name, etc.)
    const tasks = await Task.find(filters).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Assign a task to a user
exports.assignTask = async (req, res) => {
  const { userId } = req.body;
  const taskId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      { assigned_to: userId },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update the status of a task
exports.updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Ensure the status cannot change from 'done' to any other status except 'archive'
    if (task.status === "done" && status !== "archive") {
      return res.status(400).json({
        message:
          "Cannot change status from done to anything other than archive",
      });
    }

    task.status = status;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Soft delete a task
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Soft delete: instead of removing the document, update the status to 'archive'
    task.status = "archive";
    await task.save();
    res.status(200).json({ message: "Task archived successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
