// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    loadTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    statusFilter ? task.status === statusFilter : true
  );

  return (
    <div>
      <h2>Tasks</h2>
      <select onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="working">Working</option>
        <option value="review">Review</option>
        <option value="done">Done</option>
        <option value="archive">Archive</option>
      </select>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task._id}>
            {task.name} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
