import React, { useEffect, useState } from "react";
import { fetchTaskById, updateTaskStatus } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [newStatus, setNewStatus] = useState(""); // State for the new status
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility

  useEffect(() => {
    const loadTask = async () => {
      const data = await fetchTaskById(id);
      setTask(data);
    };
    loadTask();
  }, [id]);

  const handleBack = () => {
    navigate("/");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateTask = () => {
    setOpenDialog(true); // Open dialog to choose new status
    handleMenuClose(); // Close the options menu
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleStatusChange = async () => {
    if (newStatus) {
      await updateTaskStatus(id, newStatus);
      setTask({ ...task, status: newStatus });
    }
    setOpenDialog(false);
  };

  const statusOptions = ["pending", "working", "review", "done", "archive"]; // Possible status values

  if (!task) return <div>Loading...</div>;

  return (
    <>
      <Card variant="outlined" sx={{ margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Task Title: {task.name}
          </Typography>

          <Divider sx={{ marginBottom: 2 }} />

          <Typography variant="body1" color="text.secondary">
            Description: {task.description}
          </Typography>

          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              <strong>Status:</strong>
              <Chip
                label={task.status}
                color="primary"
                variant="outlined"
                sx={{ marginLeft: 1 }}
              />
            </Typography>
          </Box>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem onClick={handleUpdateTask}>Update Task</MenuItem>
              {/* Add more options as needed */}
            </Menu>
          </Box>
        </CardContent>
      </Card>

      <Box mt={2} sx={{ margin: 2 }}>
        <Button variant="outlined" color="primary" onClick={handleBack}>
          Home
        </Button>
      </Box>

      {/* Dialog for Updating Task Status */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Update Task Status</DialogTitle>
        <DialogContent>
          <TextField
            select
            label=""
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            fullWidth
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Select status</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleStatusChange} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskDetails;
