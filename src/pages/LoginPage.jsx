import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../utils/apiBase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';
import { FaArrowLeft } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const LoginImage = new URL('../assets/BackImage.jpg', import.meta.url).href;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      const user = response.data.user;

      toast.success('Login successful! 🎉', {
        position: 'top-right',
        autoClose: 1000,
        pauseOnHover: false,
        theme: 'colored',
      });

      setUser(user);
      navigate('/dashboard');
    } catch (error) {
      const msg = error?.response?.data?.message || 'Login failed. Please try again.';
      setErrorMsg(msg);
      toast.error(msg, {
        position: 'top-right',
        autoClose: 1000,
        pauseOnHover: false,
        theme: 'colored',
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden px-4">
      <ToastContainer />

      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover z-0"
        style={{ backgroundImage: `url(${LoginImage})` }}
      >
        <div className="w-full h-full bg-white/0 dark:bg-black/40"></div>
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20 hidden md:block">
        <button
          onClick={() => navigate('/')}
          className="glow-on-hover flex items-center gap-2 px-4 py-2 rounded-4xl shadow border-2 transition duration-300
                     text-blue-600 border-blue-500 bg-white 
                     hover:bg-blue-500 hover:text-white 
                     dark:text-white dark:border-gray-500 dark:bg-gray-800 
                     dark:hover:bg-gray-700 dark:hover:border-white"
        >
          <FaArrowLeft className="text-sm" />
          Back
        </button>
      </div>

      {/* Login Form */}
      <div className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 text-black dark:text-white shadow-2xl rounded-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md z-10">
        <h2 className="text-2xl font-bold text-center text-blue-500 dark:text-yellow-400 mb-6">
          Login to BlogMaster
        </h2>

        {errorMsg && (
          <div className="mb-4 text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 border border-red-400 px-4 py-2 rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
            disabled={processing}
          >
            {processing ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-500 hover:underline dark:text-yellow-400"
          >
            Sign Up
          </button>
        </p>
      </div>

      {/* Glow animation for back button */}
      <style>
        {`
          .glow-on-hover:hover {
            animation: glow 2s ease-in-out infinite;
          }

          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 10px #3b82f6, 0 0 20px #3b82f6;
            }
            50% {
              box-shadow: 0 0 20px #3b82f6, 0 0 30px #3b82f6;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
