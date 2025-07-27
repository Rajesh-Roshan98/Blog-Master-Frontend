import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../utils/apiBase';
import { FaArrowLeft } from 'react-icons/fa';

const Signup = () => {
  const [formStage, setFormStage] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const SignupImage = new URL('../assets/BackImage.jpg', import.meta.url).href;

  useEffect(() => {
    const storedMode = localStorage.getItem('theme');
    if (storedMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);


  const showSuccessToast = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const sendOtp = async () => {
    setProcessing(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/sendotp`, { email });
      setErrorMessage('');
      showSuccessToast(response.data.message || 'OTP sent to your email');
      setFormStage(true);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setProcessing(false);
    }
  };

  const createAccount = async () => {
    setProcessing(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        email,
        otp,
        firstname: firstName,
        middlename: middleName,
        lastname: lastName,
        gender,
        password,
      });
      showSuccessToast(response.data.message || 'Signup successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Signup failed');
    } finally {
      setProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setErrorMessage('Enter a valid email');
      return;
    }
    setErrorMessage('');
    formStage ? createAccount() : sendOtp();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden px-4">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 bg-no-repeat bg-center bg-cover z-0" style={{ backgroundImage: `url(${SignupImage})` }}>
        <div className="w-full h-full bg-white/0 dark:bg-black/50"></div>
      </div>

      {/* Signup form */}
      <div className="relative z-20 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 text-black dark:text-white shadow-2xl rounded-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-500 dark:text-yellow-400 mb-6">
          {formStage ? 'Create Your Account' : 'Verify Email'}
        </h2>

        {errorMessage && (
          <div className="mb-4 text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 border border-red-400 px-4 py-2 rounded">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 border border-green-400 px-4 py-2 rounded">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {formStage && (
            <>
              <div>
                <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 border rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Middle Name</label>
                <input
                  type="text"
                  placeholder="Enter your middle name (optional)"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="w-full px-4 py-2 border rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 border rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-2 border rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
            disabled={processing}
          >
            {processing
              ? formStage
                ? 'Signing Up...'
                : 'Sending OTP...'
              : formStage
              ? 'Sign Up'
              : 'Send OTP'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:underline dark:text-yellow-400"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
