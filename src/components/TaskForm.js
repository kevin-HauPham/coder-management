// src/components/TaskForm.js
import React, { useState } from 'react';
import { createTask } from '../api';

const TaskForm = () => {
  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(taskData);
    setTaskData({ name: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Task Name</label>
        <input
          type="text"
          name="name"
          value={taskData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Task Description</label>
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
