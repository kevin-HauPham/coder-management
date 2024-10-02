const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const { validationResult } = require("express-validator");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan("dev")); // Log requests to the console

// Routes
// In your server.js or app.js
app.use("/api", userRoutes);
app.use("/api", taskRoutes);


// Express Validator Error Handling Middleware
app.use((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
});

// Global error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000; // Default to 5000 if not set
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
