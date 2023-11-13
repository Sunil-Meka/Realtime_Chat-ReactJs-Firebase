// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthScreen from './auth/AuthScreen'; // Assuming AuthScreen is in the same directory
import SignUpScreen from './auth/SignUpScreen';
import ForgotPasswordScreen from './auth/ForgotPasswordScreen';
import DashboardScreen from './chat/DashboardScreen';
import ChatScreen from './chat/ChatScreen';
// App component with routing
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<AuthScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/chat/:recipient" element={<ChatScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
