import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/profile`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Updated logout function to prevent back navigation to dashboard
  const logout = async (navigate) => {
    try {
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      setUser(null);
      localStorage.removeItem('user');
      toast.success('Logout successful!');
      if (navigate) navigate('/login', { replace: true }); // ✅ critical fix
    } catch (err) {
      toast.error('Logout failed!');
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
