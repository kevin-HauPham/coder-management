// TaskList.js
import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

const TaskList = () => {
  const { tasks } = useTasks();
  const [statusFilter, setStatusFilter] = useState("");

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
