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

// Create a new task
export const createTask = async (taskData) => {
  const response = await axios.post(`${API_URL}/tasks`, taskData);
  return response.data;
};

// Update task status
export const updateTaskStatus = async (id, status) => {
  const response = await axios.patch(`${API_URL}/tasks/${id}`, { status });
  return response.data;
};
