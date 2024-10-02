// App.js
import React from "react";
import { TaskProvider } from "./context/TaskContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskDetail from "./components/TaskDetails";
import HomePage from "./pages/HomePage";
import UserDetail from "./components/UserDetail";

const App = () => {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
};

export default App;
