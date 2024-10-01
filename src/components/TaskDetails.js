// src/components/TaskDetails.js
import React, { useEffect, useState } from 'react';
import { fetchTaskById, updateTaskStatus } from '../api';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const loadTask = async () => {
      const data = await fetchTaskById(id);
      setTask(data);
    };
    loadTask();
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    await updateTaskStatus(id, newStatus);
    setTask({ ...task, status: newStatus });
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h2>{task.name}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>

      <select value={task.status} onChange={handleStatusChange}>
        <option value="pending">Pending</option>
        <option value="working">Working</option>
        <option value="review">Review</option>
        <option value="done">Done</option>
        <option value="archive">Archive</option>
      </select>
    </div>
  );
};

export default TaskDetails;
