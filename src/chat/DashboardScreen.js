// DashboardScreen.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import UserProfile from '../auth/UserProfile'; // Import the UserProfile component

const DashboardScreen = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate(); // Access the history object

  useEffect(() => {
    const checkAuthStatus = () => {
      const user = auth.currentUser || JSON.parse(localStorage.getItem('currentUser'));
      if (!user) {
        // Redirect to the sign-in screen if the user is not logged in
        navigate('/');
      } else {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    };

    checkAuthStatus();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the list of users from Firestore, excluding the current user
      const q = query(collection(firestore, 'users'), where('email', '!=', currentUser?.email || ''));
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map((doc) => doc.data());
      setUsers(userData);
    };

    fetchData();
  }, [currentUser]);

  return (
    <div className="dashboard-container" style={{ backgroundColor: '#f2f2f2', minHeight: '100vh', padding: '20px' }}>
      <UserProfile user={currentUser} /> {/* Display the user profile component */}
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Welcome to Dashboard, {currentUser?.displayName || currentUser?.email}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {users.map((user) => (
          <div key={ user.email} className="user-card" style={{ margin: '10px', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', width: '200px' }}>
            <Link to={`/chat/${user.email}`} style={{ textDecoration: 'none' }}>
              <h3 style={{ color: '#4caf50', textAlign: 'center' }}>{user.name || user.email}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardScreen;
