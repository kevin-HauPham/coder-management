import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  return (
    <div>
      <h2>Employee</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
