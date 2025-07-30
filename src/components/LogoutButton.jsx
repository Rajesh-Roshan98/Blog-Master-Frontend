import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
import { useAuth } from '../context/AuthContext'; // Centralized auth
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogoutButton = () => {
  const { logout } = useAuth(); // ✅ Use centralized logout
  const { setLoading } = useLoading(); // Global overlay
  const [localLoading, setLocalLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLocalLoading(true);
    setLoading(true);
    try {
      await logout(navigate); // ✅ Clean call to context logout
    } catch (err) {
      toast.error('Logout failed!', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false,
        theme: 'colored',
      });
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center justify-center min-w-[90px]"
      disabled={localLoading}
    >
      {localLoading ? (
        <>
          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <span>Logging out...</span>
        </>
      ) : 'Logout'}
    </button>
  );
};

export default LogoutButton;
