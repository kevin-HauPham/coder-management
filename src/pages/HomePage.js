// src/pages/HomePage.js
import React from 'react';
import UserList from '../components/UserList';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const HomePage = () => {
  return (
    <div>
      <h1>Task Management</h1>
      <UserList />
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default HomePage;
