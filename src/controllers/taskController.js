const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all tasks with optional filters
exports.getAllTasks = async (req, res) => {
  const { name, status } = req.query;
  const filters = {};
  if (name) filters.name = new RegExp(name, "i");
  if (status) filters.status = status;

  try {
    const tasks = await Task.find(filters);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign a task to a user
exports.assignTask = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { assignedTo: userId },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.status === "done" && status !== "archive") {
      return res.status(400).json({
        message: "Cannot change status from done to anything except archive.",
      });
    }

    task.status = status;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Soft delete a task
exports.softDeleteTask = async (req, res) => {
  console.log("Received DELETE request for task ID:", req.params.id);
  const { id } = req.params;

  try {
    // Use findByIdAndDelete to permanently remove the task
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(204).send(); // Send no content on successful deletion
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle validation or other errors
  }
};
