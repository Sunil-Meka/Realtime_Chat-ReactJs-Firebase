// UserProfile.js
import React from 'react';
import { auth } from '../config';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ user }) => {
    const navigate = useNavigate(); // Access the history object

  const handleLogout = async () => {
    try {
      await auth.signOut();
      if (localStorage.getItem('currentUser')) {
        localStorage.removeItem('currentUser');
      }
      navigate("/")
    
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
      <div style={{ marginRight: '20px' }}>
        <span style={{ marginRight: '10px' }}>{user?.displayName || user?.email}</span>
        <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4caf50' }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
