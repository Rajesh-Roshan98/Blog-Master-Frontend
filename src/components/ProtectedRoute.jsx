import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check for token in localStorage or as a cookie
  const hasLocalToken = !!localStorage.getItem('token');
  const hasCookieToken = document.cookie.split(';').some(cookie => cookie.trim().startsWith('token='));
  const isLoggedIn = hasLocalToken || hasCookieToken;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
