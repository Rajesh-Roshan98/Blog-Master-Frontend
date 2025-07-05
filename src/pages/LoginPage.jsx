import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../utils/apiBase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true } // Send cookies (matches middleware)
      );

      const user = response.data.user;
      toast.success('Login successful! 🎉', {
        position: 'top-right',
        autoClose: 1000,
        pauseOnHover: false,
        theme: 'colored',
      });

      localStorage.setItem('user', JSON.stringify(user)); // Optional
      setTimeout(() => navigate('/profile'), 1100);
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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white overflow-hidden">
      <ToastContainer />

      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-60 z-0"
        style={{
          backgroundImage: `url('https://i.pinimg.com/736x/b1/6d/90/b16d909fa4fbf4f57c549e8a956ae81c.jpg')`,
        }}
      />

      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => navigate('/')}
          className="text-blue-500 hover:border-white hover:bg-blue-500 hover:text-white px-4 py-2 border-2 rounded-4xl cursor-pointer shadow"
        >
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>

      <div className="bg-white bg-opacity-90 shadow-xl rounded-xl p-8 max-w-md w-full z-10">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">Login to BlogMaster</h2>

        {errorMsg && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
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

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
