// src/api.js
import axios from "axios";

// Set the base URL to your backend API
const API_URL = process.env.REACT_APP_API_URL;

// Fetch all users
export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

// Fetch all tasks
export const fetchTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

// Fetch single task by ID
export const fetchTaskById = async (id) => {
  const response = await axios.get(`${API_URL}/tasks/${id}`);
  return response.data;
};
// Fetch user s by ID
export const fetchUserById = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

// Create a new task
export const createTask = async (taskData) => {
  const response = await axios.post(`${API_URL}/tasks`, taskData);
  return response.data;
};
// Create a new user
export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

// delete a new task
export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`);
    return response.data; // This assumes your backend sends a response
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error; // Rethrow the error if you want to handle it later
  }
};

// Update task status
export const updateTaskStatus = async (id, status) => {
  const response = await axios.patch(`${API_URL}/tasks/${id}/status`, {
    status,
  });
  return response.data;
};
