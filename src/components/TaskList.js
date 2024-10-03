import React, { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { deleteTask, fetchTasks } from "../api";

const TaskList = () => {
  const { loadTasks } = useTasks();
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const filteredTasks = tasks.filter((task) =>
    statusFilter ? task.status === statusFilter : true
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTasks(); // Replace with your API call
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [tasks]);

  const handleOpenDialog = (taskId) => {
    setSelectedTask(taskId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
  };

  const handleConfirmDelete = async () => {
    await deleteTask(selectedTask);
    await loadTasks();
    handleCloseDialog();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>

      <Box mb={3}>
        <Select
          fullWidth
          displayEmpty
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="working">Working</MenuItem>
          <MenuItem value="review">Review</MenuItem>
          <MenuItem value="done">Done</MenuItem>
          <MenuItem value="archive">Archive</MenuItem>
        </Select>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Creator</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>
                  <RouterLink
                    to={`/tasks/${task._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {task.name}
                  </RouterLink>
                </TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  {task.creator ? task.creator.name : "N/A"}
                </TableCell>
                <TableCell>
                  {task.assigned_to && task.assigned_to
                    ? task.assigned_to
                    : "N/A"}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenDialog(task._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;
