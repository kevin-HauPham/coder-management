// App.js
import React from "react";
import { TaskProvider } from "./context/TaskContext";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm"; // Assuming you have a TaskForm component to add new tasks

const App = () => {
  return (
    <TaskProvider>
      <h1>Task Management</h1>
      <TaskForm />
      <TaskList />
    </TaskProvider>
  );
};

export default App;
