import React, { useEffect, useState } from 'react';
import { FiUser, FiLock, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [avatar, setAvatar] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/profile', { withCredentials: true });
        setUser(res.data.user);
        setName(res.data.user.firstname + (res.data.user.lastname ? ' ' + res.data.user.lastname : ''));
        setGender(res.data.user.gender || '');
        setAvatar(res.data.user.avatar || '');
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const [firstname, ...rest] = name.split(' ');
      const lastname = rest.join(' ');
      const res = await axios.put('http://localhost:3000/api/auth/profile', {
        firstname,
        lastname,
        gender,
        avatar,
      }, { withCredentials: true });
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('✅ Profile updated!');
    } catch (e) {
      alert('❌ Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert('❌ New password must be at least 6 characters.');
      return;
    }
    try {
      await axios.put('http://localhost:3000/api/auth/password', {
        currentPassword,
        newPassword,
      }, { withCredentials: true });
      alert('🔐 Password changed!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (e) {
      alert('❌ Failed to change password.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    try {
      await axios.delete('http://localhost:3000/api/auth/account', { withCredentials: true });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert('⚠️ Account deleted!');
      window.location.href = '/signup';
    } catch (e) {
      alert('❌ Failed to delete account.');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!user) return <div className="p-8 text-center">No user info found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex justify-center items-start px-4 py-20">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl space-y-12 border border-gray-200">
        <h2 className="text-4xl font-extrabold text-center text-blue-700">⚙️ Settings</h2>

        {/* 👤 Profile Info */}
        <form className="space-y-6" onSubmit={handleUpdateProfile}>
          <div className="flex items-center gap-3 text-blue-700 text-lg font-semibold">
            <FiUser className="text-xl" /> Profile Information
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email (read-only)</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste image URL"
              />
              {avatar && (
                <img src={avatar} alt="avatar" className="w-16 h-16 rounded-full mt-2 border-2 border-blue-400" />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Update Profile'}
          </button>
        </form>

        {/* 🔒 Change Password */}
        <form className="space-y-6" onSubmit={handleChangePassword}>
          <div className="flex items-center gap-3 text-blue-700 text-lg font-semibold">
            <FiLock className="text-xl" /> Change Password
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
          >
            Change Password
          </button>
        </form>

        {/* 🗑️ Delete Account */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-red-600 text-lg font-semibold mt-8">
            <FiTrash2 className="text-xl" /> Delete Account
          </div>
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
