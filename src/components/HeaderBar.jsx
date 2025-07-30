import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AvatarDropdown from './AvatarDropdown';
import { Loader2 } from 'lucide-react'; // Spinner icon

const HeaderBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout(navigate);
    } catch (err) {
      // already handled in context
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="absolute top-4 left-0 right-0 px-6 flex justify-between items-center z-20">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 border-2 rounded-4xl shadow hidden sm:inline"
      >
        ← Back
      </button>

      <div className="sm:hidden relative">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-blue-600"
          aria-label="Toggle sidebar menu"
        >
          <Menu size={28} />
        </button>
      </div>

      <div className="hidden sm:block">
        {user && <AvatarDropdown user={user} />}
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/10 sm:hidden" />
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r z-50 transform transition-transform duration-300 sm:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Menu</h2>

          <button
            onClick={() => {
              navigate('/profile');
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 text-gray-800 hover:text-blue-600"
          >
            <User size={20} /> Profile
          </button>

          <button
            onClick={() => {
              navigate('/settings');
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 text-gray-800 hover:text-blue-600"
          >
            <Settings size={20} /> Settings
          </button>

          <button
            onClick={() => {
              setSidebarOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-3 text-gray-800 hover:text-red-600 disabled:opacity-50"
            disabled={loggingOut}
          >
            {loggingOut ? (
              <>
                <Loader2 size={18} className="animate-spin text-red-500" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut size={20} />
                Logout
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
