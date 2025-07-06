import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../utils/apiBase';
import { useContext } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // If user is already set in context, skip fetch
        if (user) {
          setChecking(false);
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
          withCredentials: true
        });

        if (res.data?.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        // Optional: log or toast
      } finally {
        setChecking(false);
      }
    };

    fetchUser();
  }, [user, setUser]);

  if (checking) return null; // Or show a loading spinner

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
