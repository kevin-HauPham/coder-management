import React, { useState } from "react";
import { createTask, createUser } from "../api";
import { useTasks } from "../context/TaskContext";
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
import { fetchUsers } from "../api";

const TaskForm = () => {
  const { loadTasks } = useTasks();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [creator, setCreator] = useState("");
  const [assignedEmployee, setAssignedEmployee] = useState("");
  const [users, setUsers] = useState([]);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [taskStatus, setTaskStatus] = useState("pending");

  const statusOptions = ["pending", "working", "review", "done", "archive"];
  const handleFetchUsers = async () => {
    try {
      const userData = await fetchUsers();
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const taskData = {
      name: taskName,
      description: taskDescription,
      creator,
      assigned_to: assignedEmployee,
      status: taskStatus,
    };

    try {
      await createTask(taskData);
      loadTasks();
      setTaskName("");
      setTaskDescription("");
      setCreator("");
      setAssignedEmployee("");
      setTaskStatus("pending");
      setUsers([]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      await createUser({ name: newUserName });
      setNewUserName("");
      handleFetchUsers();
      handleCloseAddUserDialog();
    } catch (error) {
      console.error("Error adding user:", error);
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
      sx={{ width: "100%", maxWidth: 500, mx: "auto", p: 2 }}
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
            onOpen={handleFetchUsers}
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl fullWidth required>
          <InputLabel>Status</InputLabel>
          <Select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            label="Status"
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
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
