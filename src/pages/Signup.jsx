import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../utils/apiBase';

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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-100 to-white relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-60 z-0"
        style={{
          backgroundImage: `url('https://i.pinimg.com/736x/b1/6d/90/b16d909fa4fbf4f57c549e8a956ae81c.jpg')`,
        }}
      />

      {/* Toast Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded shadow-lg text-sm">
          {successMessage}
        </div>
      )}

      {/* Signup Box */}
      <div className="relative bg-white bg-opacity-90 z-10 p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          {formStage ? 'Complete Registration' : 'Verify Email to Continue'}
        </h2>

        {/* Error */}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded text-sm border border-red-300">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {formStage && (
            <>
              <div>
                <label className="block text-sm mb-1 text-gray-700">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border rounded border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 border rounded border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">Middle Name</label>
                <input
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="w-full px-4 py-2 border rounded border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 border rounded border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-2 border rounded border-gray-300"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded border-gray-300"
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

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
