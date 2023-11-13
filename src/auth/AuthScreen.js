// AuthScreen.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Access the history object

  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      if (storedUser) {
        // Redirect to the dashboard if the user is already logged in
        navigate('/dashboard');
      }
    };

    checkAuthStatus();
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Firebase sign-in logic
      await signInWithEmailAndPassword(auth, email, password,);
      console.log('Sign in successful');

      // Get the user after successful sign-in
      const user = auth.currentUser;

      // Store the user information in localStorage for persistence
      localStorage.setItem('currentUser', JSON.stringify(user));

      // Redirect to the dashboard after successful sign-in
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <div className="auth-container" style={{ backgroundColor: '#f2f2f2', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="auth-box" style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
        <h2 style={{ color: '#333' }}>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box', borderRadius: '4px' }}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box', borderRadius: '4px' }}
            />
          </div>
          <button type="submit" style={{ backgroundColor: '#4caf50', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sign In</button>
        </form>
        <div className="auth-options" style={{ marginTop: '10px' }}>
          <Link to="/signup" style={{ marginRight: '10px', color: '#4caf50' }}>Sign Up</Link>
          <Link to="/forgot-password" style={{ color: '#4caf50' }}>Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
