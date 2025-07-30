import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LogOut, User, Settings } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useLoading } from './LogoutButton';

const AvatarDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth(); // ✅ centralized logout
  const { setLoading } = useLoading(); // optional loading context
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Clean and reusable logout function
  const handleLogout = async () => {
    setLoading(true);
    await logout(navigate); // centralized function handles toast, state, and redirect
    setLoading(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="User menu"
        aria-expanded={open}
        aria-haspopup="true"
        className="flex rounded-full focus:outline-none hover:ring-2 hover:ring-blue-400 transition"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-400 shadow-md"
          />
        ) : (
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 text-white font-bold text-lg sm:text-xl rounded-full flex items-center justify-center border-2 border-blue-400 shadow-md">
            {user.firstname?.[0].toUpperCase()}
            {user.lastname?.[0].toUpperCase()}
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-3 w-56 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border dark:border-zinc-700 z-50 transition-all duration-200 origin-top transform ${
          open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="px-4 py-4 border-b dark:border-zinc-700 flex items-center gap-3">
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
            <div className="font-semibold text-blue-700 dark:text-white">
              {user.firstname} {user.lastname}
            </div>
            <div className="text-xs text-gray-500 dark:text-zinc-400">{user.email}</div>
          </div>
        </div>

        <ul className="flex flex-col py-2">
          <li>
            <button
              onClick={() => navigate('/profile')}
              className="w-full px-5 py-2 flex items-center gap-3 hover:bg-blue-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-white transition"
            >
              <User size={18} /> Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/settings')}
              className="w-full px-5 py-2 flex items-center gap-3 hover:bg-blue-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-white transition"
            >
              <Settings size={18} /> Settings
            </button>
          </li>
          <li className="pt-2 border-t dark:border-zinc-700">
            <button
              onClick={handleLogout}
              className="w-full px-5 py-2 flex items-center gap-3 text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800 transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AvatarDropdown;
