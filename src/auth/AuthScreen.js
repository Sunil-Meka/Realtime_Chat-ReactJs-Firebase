// AuthScreen.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  CssBaseline,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Access the history object

  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      if (storedUser) {
        // Redirect to the dashboard if the user is already logged in
        navigate("/dashboard");
      }
    };

    checkAuthStatus();
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Firebase sign-in logic
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Sign in successful");

      // Get the user after successful sign-in
      const user = auth.currentUser;

      // Store the user information in localStorage for persistence
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Redirect to the dashboard after successful sign-in
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={3}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Avatar style={{ backgroundColor: "#4caf50" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{ marginTop: "10px", color: "#333" }}
        >
          Sign In
        </Typography>
        <form
          onSubmit={handleSignIn}
          style={{ width: "100%", marginTop: "20px" }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              marginTop: "20px",
              backgroundColor: "#4caf50",
              color: "#fff",
            }}
          >
            Sign In
          </Button>
        </form>
        <div style={{ marginTop: "20px" }}>
          <Link to="/signup" style={{ marginRight: "10px", color: "#4caf50" }}>
            Sign Up
          </Link>
          <Link to="/forgot-password" style={{ color: "#4caf50" }}>
            Forgot Password?
          </Link>
        </div>
      </Paper>
    </Container>
  );
};

export default AuthScreen;
