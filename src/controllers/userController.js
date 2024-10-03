const User = require("../models/User");
const Task = require("../models/Task");

// Create a new user
exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users with optional filters
exports.getAllUsers = async (req, res) => {
  try {
    const { name } = req.query;
    const filters = name ? { name: new RegExp(name, "i") } : {};
    const users = await User.find(filters);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search for an employee by name
exports.searchUserByName = async (req, res) => {
  const { name } = req.params;
  try {
    const users = await User.find({ name: new RegExp(name, "i") });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks of a user by ID
exports.getUserTasks = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await Task.find({ assigned_to: id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
