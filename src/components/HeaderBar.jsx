import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarDropdown from './AvatarDropdown';
import { useAuth } from '../context/AuthContext';
import { Menu } from 'lucide-react';

const HeaderBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close sidebar on outside click (for desktop dropdown safety)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      <div className="absolute top-4 left-0 right-0 px-6 flex justify-between items-center z-30">
        {/* Back Button - Desktop Only */}
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 border-2 rounded-4xl shadow hidden sm:inline"
        >
          ← Back
        </button>

        {/* Hamburger - Mobile Only */}
        <div className="sm:hidden relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-blue-600"
            aria-label="Toggle mobile menu"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Avatar Dropdown - Desktop Only */}
        <div className="hidden sm:block">
          {user && <AvatarDropdown user={user} />}
        </div>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg border-l z-50 transform transition-transform duration-300 sm:hidden ${
          dropdownOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-semibold text-blue-600">Menu</span>
          <button
            onClick={() => setDropdownOpen(false)}
            className="text-blue-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="p-4">
          {user && <AvatarDropdown user={user} />}
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 sm:hidden"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default HeaderBar;
