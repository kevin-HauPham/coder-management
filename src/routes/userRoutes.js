const express = require("express");
const {
  createUser,
  getAllUsers,
  searchUserByName,
  getUserTasks,
  getUserById,
} = require("../controllers/userController");
const { check, validationResult } = require("express-validator");
const { ObjectId } = require("mongoose").Types;

const router = express.Router();

// Create a new user
router.post(
  "/users",
  [
    check("name")
      .isString()
      .notEmpty()
      .withMessage("Name is required and must be a valid string."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await createUser(req, res);
  }
);

// Get all users with optional filtering
router.get("/users", getAllUsers);
//
router.get("/users/:id", getUserById);

// Search user by name
router.get("/users/search/:name", searchUserByName);

// Get all tasks for a user by ID
router.get(
  "/users/:id/tasks",
  [check("id").isMongoId().withMessage("Invalid user ID format.")],
  getUserTasks
);

module.exports = router;
