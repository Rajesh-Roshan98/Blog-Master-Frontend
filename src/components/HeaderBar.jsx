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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="absolute top-4 left-0 right-0 px-6 flex justify-between items-center z-20">
      {/* Back Button - Desktop Only */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 border-2 rounded-4xl shadow hidden sm:inline"
      >
        ← Back
      </button>

      {/* Hamburger + Dropdown - Mobile Only */}
      <div className="sm:hidden relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="text-blue-600"
          aria-label="Toggle avatar menu"
        >
          <Menu size={28} />
        </button>

        {/* Animated Dropdown */}
        <div
          className={`absolute right-0 mt-2 transform transition-all duration-200 origin-top ${
            dropdownOpen
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          {user && <AvatarDropdown user={user} />}
        </div>
      </div>

      {/* Avatar Dropdown - Desktop Only */}
      <div className="hidden sm:block">
        {user && <AvatarDropdown user={user} />}
      </div>
    </div>
  );
};

export default HeaderBar;
