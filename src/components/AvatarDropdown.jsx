import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../utils/apiBase';
import { toast } from 'react-toastify';
import { LogOut, User, Settings, Menu } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useLoading } from './LogoutButton';

const AvatarDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);
  const { setLoading } = useLoading();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get(`${API_BASE_URL}/api/auth/logout`, { withCredentials: true });
      setUser(null);
      localStorage.removeItem('user');
      toast.success('Logout successful!');
      navigate('/login', { replace: true });
    } catch (err) {
      toast.error('Logout failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Desktop Avatar */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="hidden sm:flex rounded-full focus:outline-none hover:scale-105 transition-transform"
        aria-label="User menu"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-12 h-12 rounded-full border-2 border-blue-400 shadow-md"
          />
        ) : (
          <div className="w-12 h-12 bg-blue-500 text-white font-bold text-xl rounded-full flex items-center justify-center border-2 border-blue-400 shadow-md">
            {user.firstname?.[0].toUpperCase()}
            {user.lastname?.[0].toUpperCase()}
          </div>
        )}
      </button>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="sm:hidden flex items-center justify-center w-10 h-10 border border-blue-400 rounded-md text-blue-600 hover:bg-blue-100"
        aria-label="Mobile menu"
      >
        <Menu />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border z-50 animate-fade-in-down">
          <div className="px-4 py-4 border-b flex items-center gap-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-blue-400"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold">
                {user.firstname?.[0].toUpperCase()}
                {user.lastname?.[0].toUpperCase()}
              </div>
            )}
            <div>
              <div className="font-semibold text-blue-700">
                {user.firstname} {user.lastname}
              </div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
          </div>
          <ul className="flex flex-col py-2">
            <li>
              <button
                onClick={() => { setOpen(false); navigate('/profile'); }}
                className="w-full px-5 py-2 flex items-center gap-3 hover:bg-blue-50 text-gray-700 transition"
              >
                <User size={18} /> Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => { setOpen(false); navigate('/settings'); }}
                className="w-full px-5 py-2 flex items-center gap-3 hover:bg-blue-50 text-gray-700 transition"
              >
                <Settings size={18} /> Settings
              </button>
            </li>
            <li className="pt-2 border-t">
              <button
                onClick={handleLogout}
                className="w-full px-5 py-2 flex items-center gap-3 text-red-600 hover:bg-red-50 transition"
              >
                <LogOut size={18} /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
