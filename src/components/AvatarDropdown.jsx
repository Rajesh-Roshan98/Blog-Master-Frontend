import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from './LogoutButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LogOut, User, Settings } from 'lucide-react';

const AvatarDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);
  const { setLoading } = useLoading();
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
      await axios.get('http://localhost:3000/api/auth/logout', { withCredentials: true });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.success('Logout successful!', { position: 'top-right', autoClose: 2000 });
      setTimeout(() => navigate('/login', { replace: true }), 2000);
    } catch (err) {
      toast.error('Logout failed!', { position: 'top-right', autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full focus:outline-none hover:scale-105 transition-transform"
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

      {/* Dropdown menu */}
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
