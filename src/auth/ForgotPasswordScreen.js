// ForgotPasswordScreen.js
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { auth } from '../config';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPasswordScreen = () => {
    const navigate = useNavigate()
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      // Firebase forgot password logic
      await sendPasswordResetEmail(auth, email);
      alert("sent a reset email")
      console.log('Password reset email sent');
      navigate('/')

    } catch (error) {
      console.error('Error sending password reset email:', error.message);
    }
  };

  return (
    <div className="auth-container" style={{ backgroundColor: '#f2f2f2', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="auth-box" style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
        <h2 style={{ color: '#333' }}>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
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
          <button type="submit" style={{ backgroundColor: '#4caf50', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reset Password</button>
        </form>
        <div className="auth-options" style={{ marginTop: '10px' }}>
          <Link to="/" style={{ marginRight: '10px', color: '#4caf50' }}>Sign In</Link>
          <Link to="/signup" style={{ color: '#4caf50' }}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
