import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../utils/apiBase';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
          withCredentials: true, // important to send the cookie
        });
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      } catch (err) {
        console.error("Error fetching profile:", err?.response?.data || err.message);
        setError('Failed to fetch profile. Please login again.');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!user) return <div className="p-8 text-center">No user info found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center px-4 py-20">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center space-y-6">
        <img
          src={user.avatar || '/default-avatar.png'}
          alt="Profile"
          className="w-28 h-28 mx-auto rounded-full border-4 border-blue-300"
        />
        <h2 className="text-3xl font-bold text-blue-700">{user.firstname} {user.lastname}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-500">This is your public profile. Others can see this info.</p>
      </div>
    </div>
  );
};

export default Profile;
