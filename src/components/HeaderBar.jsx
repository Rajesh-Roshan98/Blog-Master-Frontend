import React from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarDropdown from './AvatarDropdown';
import { useAuth } from '../context/AuthContext';

const HeaderBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="absolute top-4 left-0 right-0 px-6 flex justify-between items-center z-20">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 border-2 rounded-4xl shadow"
      >
        ← Back
      </button>
      {user && <AvatarDropdown user={user} />}
    </div>
  );
};

export default HeaderBar;
