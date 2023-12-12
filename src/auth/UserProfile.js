import React from "react";
import { auth } from "../config";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const UserProfile = ({ user }) => {
  // State variables
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      if (localStorage.getItem("currentUser")) {
        localStorage.removeItem("currentUser");
      }
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "20px",
      }}
    >
      <div style={{ marginRight: "20px" }}>
        <Typography
          variant="body1"
          style={{ marginRight: "10px", color: "#333" }}
        >
          {user?.displayName || user?.email}
        </Typography>
        <Button onClick={handleLogout} style={{ color: "#4caf50" }}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
