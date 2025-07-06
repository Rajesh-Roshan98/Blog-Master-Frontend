import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarDropdown from './AvatarDropdown';
import { useAuth } from '../context/AuthContext';
import { Menu } from 'lucide-react';

const HeaderBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="absolute top-4 left-0 right-0 px-6 flex justify-between items-center z-20">
      {/* Back Button - hidden on mobile */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 border-2 rounded-4xl shadow hidden sm:inline"
      >
        ← Back
      </button>

      {/* Hamburger Menu - visible only on mobile */}
      <button
        onClick={() => setDrawerOpen(!drawerOpen)}
        className="sm:hidden text-blue-600"
        aria-label="Toggle menu"
      >
        <Menu size={28} />
      </button>

      {/* AvatarDropdown - visible on desktop or when drawer is open on mobile */}
      <div className="hidden sm:block">
        {user && <AvatarDropdown user={user} />}
      </div>

      {/* Slide-Out Drawer for mobile */}
      {drawerOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg border-l z-50 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-blue-600">Menu</span>
            <button onClick={() => setDrawerOpen(false)} className="text-blue-600 font-bold text-xl">×</button>
          </div>
          {user && <AvatarDropdown user={user} />}
        </div>
      )}
    </div>
  );
};

export default HeaderBar;
