import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config";
import { sendPasswordResetEmail } from "firebase/auth";
import { TextField, Button, Typography } from "@mui/material";

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      // Firebase forgot password logic
      await sendPasswordResetEmail(auth, email);
      alert("Sent a reset email");
      console.log("Password reset email sent");
      navigate("/");
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundColor: "#f2f2f2",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="auth-box"
        style={{
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h5"
          style={{ color: "#333", marginBottom: "20px" }}
        >
          Forgot Password
        </Typography>
        <form onSubmit={handleForgotPassword}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: "20px" }}
          />
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#4caf50",
              color: "#fff",
              borderRadius: "4px",
            }}
          >
            Reset Password
          </Button>
        </form>
        <div className="auth-options" style={{ marginTop: "20px" }}>
          <Typography variant="body1" style={{ marginRight: "10px" }}>
            <Link to="/" style={{ color: "#4caf50" }}>
              Sign In
            </Link>
          </Typography>
          <Typography variant="body1">
            <Link to="/signup" style={{ color: "#4caf50" }}>
              Sign Up
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
