// controllers/userController.js

const User = require('../models/User');
const Task = require('../models/Task');
const { validationResult } = require('express-validator');

// Create a new user
exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;

  try {
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users with optional filters
exports.getUsers = async (req, res) => {
  try {
    const filters = req.query; // Allows filtering based on query parameters
    const users = await User.find(filters);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tasks assigned to a specific user
exports.getUserTasks = async (req, res) => {
  try {
    const userId = req.params.id;
    const tasks = await Task.find({ assigned_to: userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
