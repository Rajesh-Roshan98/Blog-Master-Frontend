import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import AboutUs from './pages/Aboutus';
import ContactUs from './pages/Contactus';
import Dashboard from './pages/Dashboard';
import CreateBlog from './pages/CreateBlog';
import GetBlog from './pages/GetBlog';
import ProtectedRoute from './components/ProtectedRoute';
import LogoutButton, { LoadingContext } from './components/LogoutButton';
import axios from 'axios';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;

const GlobalLoadingOverlay = ({ loading }) => (
  loading ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <svg className="animate-spin h-8 w-8 text-blue-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <span className="text-blue-700 font-semibold mt-2">Loading...</span>
      </div>
    </div>
  ) : null
);

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <GlobalLoadingOverlay loading={loading} />
      <ToastContainer />
      {/* No basename needed for Vercel deployment */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/aboutus" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
          <Route path="/contactus" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/createblog" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
          <Route path="/getblog" element={<ProtectedRoute><GetBlog /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </LoadingContext.Provider>
  );
};

export default App;
