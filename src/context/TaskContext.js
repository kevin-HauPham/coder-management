import React, { createContext, useContext, useState } from "react";
import { fetchTasks, fetchUsers } from "../api";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState([]);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };
  const loadUser = async () => {
    const data = await fetchUsers();
    setUser(data);
  };

  return (
    <TaskContext.Provider value={{ tasks, user, loadTasks, loadUser }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
