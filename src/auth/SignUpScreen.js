// SignUpScreen.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../config';
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Access the history object

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Firebase sign-up logic
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Add user data to Firestore "users" collection
      await setDoc(doc(firestore, 'users', userId), {
        name,
        email,
      });

      console.log('Sign up successful');

      // Redirect to the dashboard after successful sign-up
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div className="auth-container" style={{ backgroundColor: '#f2f2f2', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="auth-box" style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
        <h2 style={{ color: '#333' }}>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box', borderRadius: '4px' }}
            />
          </div>
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
          <button type="submit" style={{ backgroundColor: '#4caf50', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sign Up</button>
        </form>
        <div className="auth-options" style={{ marginTop: '10px' }}>
          <Link to="/" style={{ color: '#4caf50' }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
