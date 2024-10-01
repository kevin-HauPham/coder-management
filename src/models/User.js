

const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    role: {
      type: String,
      enum: ['manager', 'employee'],
      default: 'employee', // Default role is 'employee'
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
