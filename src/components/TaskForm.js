import React, { useState, useEffect } from "react";
import { createTask, createUser } from "../api"; // Ensure createUser function exists
import { useTasks } from "../context/TaskContext"; // Import the useTasks context
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { fetchUsers } from "../api"; // Make sure this function exists to fetch users

const TaskForm = () => {
  const { loadTasks } = useTasks(); // Get the loadTasks function from the context
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [creator, setCreator] = useState(""); // State for creator selection
  const [assignedEmployee, setAssignedEmployee] = useState(""); // State for assigned employee
  const [users, setUsers] = useState([]); // State to hold user options
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false); // State to control dialog visibility
  const [newUserName, setNewUserName] = useState(""); // State for new user name

  const handleFetchUsers = async () => {
    try {
      const userData = await fetchUsers(); // Fetch users from the API
      setUsers(userData); // Set users in the state
    } catch (error) {
      console.error("Error fetching users:", error); // Handle any errors
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const taskData = {
      name: taskName,
      description: taskDescription,
      creator, // Include the selected creator
      assigned_to: assignedEmployee, // Include the assigned employee
    };

    try {
      await createTask(taskData); // Call the API to create a new task
      loadTasks(); // Refresh the tasks after creation
      setTaskName(""); // Clear the input fields
      setTaskDescription("");
      setCreator(""); // Reset creator selection
      setAssignedEmployee(""); // Reset assigned employee selection
      setUsers([]); // Clear users after form submission if needed
    } catch (error) {
      console.error("Error creating task:", error); // Handle any errors
    }
  };

  const handleAddUser = async () => {
    try {
      await createUser({ name: newUserName }); // Call API to create new user
      setNewUserName(""); // Clear the input field
      handleFetchUsers(); // Refresh the users list
      handleCloseAddUserDialog(); // Close the dialog
    } catch (error) {
      console.error("Error adding user:", error); // Handle any errors
    }
  };

  const handleOpenAddUserDialog = () => {
    setOpenAddUserDialog(true);
  };

  const handleCloseAddUserDialog = () => {
    setOpenAddUserDialog(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: "100%", maxWidth: 500, mx: "auto", p: 2 }} // maxWidth sets the max width, and mx: 'auto' centers the form
    >
      <Typography variant="h4" gutterBottom>
        Create New Task
      </Typography>

      <Box mb={2}>
        <TextField
          label="Task Name"
          variant="outlined"
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
      </Box>

      <Box mb={2}>
        <TextField
          label="Task Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        />
      </Box>

      <Box mb={2}>
        <FormControl fullWidth required>
          <InputLabel>Assign To</InputLabel>
          <Select
            value={assignedEmployee}
            onChange={(e) => setAssignedEmployee(e.target.value)}
            label="Assign To"
            onOpen={handleFetchUsers} // Fetch users when dropdown opens
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name} {/* Adjust based on how user data is structured */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button type="submit" variant="contained" color="primary">
          Create Task
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleOpenAddUserDialog}
        >
          Add Employee
        </Button>
      </Box>

      {/* Dialog for Adding New User */}
      <Dialog open={openAddUserDialog} onClose={handleCloseAddUserDialog}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="User Name"
            type="text"
            fullWidth
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddUserDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskForm;
