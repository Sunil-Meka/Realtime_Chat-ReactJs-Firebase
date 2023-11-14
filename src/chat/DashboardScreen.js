import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, firestore } from "../config";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserProfile from "../auth/UserProfile";
import { Card, CardContent, Typography, Grid } from "@mui/material"; // Import Material-UI components

const DashboardScreen = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const user =
        auth.currentUser || JSON.parse(localStorage.getItem("currentUser"));
      if (!user) {
        navigate("/");
      } else {
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    };

    checkAuthStatus();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(firestore, "users"),
        where("email", "!=", currentUser?.email || "")
      );
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map((doc) => doc.data());
      setUsers(userData);
    };

    fetchData();
  }, [currentUser]);

  return (
    <div
      className="dashboard-container"
      style={{
        backgroundColor: "#f2f2f2",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <UserProfile user={currentUser} />
      <Typography variant="h2" style={{ color: "#333", marginBottom: "20px" }}>
        Welcome to Dashboard, {currentUser?.displayName || currentUser?.email}
      </Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid key={user.email} item xs={12} sm={6} md={4}>
            <Card
              style={{
                margin: "10px",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Link
                  to={`/chat/${user.email}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="h3"
                    style={{ color: "#4caf50", textAlign: "center" }}
                  >
                    {user.name || user.email}
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DashboardScreen;
