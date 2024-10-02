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
import UserDetail from "./UserDetail";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [newStatus, setNewStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [assignedUser, setAssignedUser] = useState(null);

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
    setOpenDialog(true);
    handleMenuClose();
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

  const statusOptions = ["pending", "working", "review", "done", "archive"];

  const handleShowUserDetail = () => {
    setAssignedUser(task.assigned_to);
    setShowUserDetail(true);
  };

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

          {task.assigned_to && (
            <Box mt={2}>
              <Typography variant="body2" color="text.secondary">
                <strong>Assigned Employee:</strong>{" "}
                <Button onClick={handleShowUserDetail}>
                  {task.assigned_to}
                </Button>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Date Assigned:</strong>{" "}
                {new Date(task.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          )}

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem onClick={handleUpdateTask}>Update Task</MenuItem>
            </Menu>
          </Box>
        </CardContent>
      </Card>

      <Box mt={2} sx={{ margin: 2 }}>
        <Button variant="outlined" color="primary" onClick={handleBack}>
          Home
        </Button>
      </Box>

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
      {showUserDetail && (
        <UserDetail
          userId={task.assigned_to}
          onClose={() => setShowUserDetail(false)}
        />
      )}
    </>
  );
};

export default TaskDetails;
