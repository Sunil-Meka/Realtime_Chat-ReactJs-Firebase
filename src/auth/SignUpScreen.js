import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, firestore } from "../config";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { TextField, Button, Typography } from "@mui/material";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Firebase sign-up logic
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      // Add user data to Firestore "users" collection
      await setDoc(doc(firestore, "users", userId), {
        name,
        email,
      });

      console.log("Sign up successful");

      // Redirect to the dashboard after successful sign-up
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error.message);
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
          Sign Up
        </Typography>
        <form onSubmit={handleSignUp}>
          <TextField
            type="text"
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginBottom: "20px" }}
          />
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
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Sign Up
          </Button>
        </form>
        <div className="auth-options" style={{ marginTop: "10px" }}>
          <Typography variant="body1">
            <Link to="/" style={{ color: "#4caf50" }}>
              Sign In
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
