// src/components/TaskForm.js
import React, { useState } from "react";
import { createTask } from "../api"; // Make sure this function exists in your api.js file
import { useTasks } from "../context/TaskContext"; // Import the useTasks context

const TaskForm = () => {
  const { loadTasks } = useTasks(); // Get the loadTasks function from the context
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const taskData = {
      name: taskName,
      description: taskDescription,
    };

    try {
      await createTask(taskData); // Call the API to create a new task
      loadTasks(); // Refresh the tasks after creation
      setTaskName(""); // Clear the input fields
      setTaskDescription("");
    } catch (error) {
      console.error("Error creating task:", error); // Handle any errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      <div>
        <label>
          Task Name:
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Task Description:
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
