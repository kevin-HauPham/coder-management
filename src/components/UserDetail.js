import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { fetchUserById } from "../api";

const UserDetail = ({ userId, onClose }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (userId) {
        const fetchedUser = await fetchUserById(userId);
        setUserData(fetchedUser);
      }
    };
    loadUser();
  }, [userId]);

  if (!userData) return <div>Loading...</div>;

  return (
    <Card variant="outlined" sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Employee Details
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {userData.name}
        </Typography>
        <Typography variant="body1">
          <strong>Role:</strong> {userData.role}
        </Typography>
        <Button variant="outlined" color="primary" onClick={onClose}>
          Close
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserDetail;
