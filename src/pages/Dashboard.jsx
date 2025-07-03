import React from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarDropdown from '../components/AvatarDropdown';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-100 to-white px-6 py-16">

      {/* 🚪 Avatar Dropdown (top-right) */}
      <div className="absolute top-4 right-4 z-20">
        {user && <AvatarDropdown user={user} />}
      </div>

      {/* 🔵 Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 z-0"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1669904022334-e40da006a0a3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')`
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-2xl p-10 w-full max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4 tracking-tight">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600 text-lg mb-10">
            Manage your blogs, inspire readers, and share your thoughts with the world.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button
              onClick={() => navigate('/createblog')}
              className="flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-500 px-8 py-4 rounded-lg shadow-md transition duration-300 text-xl cursor-pointer"
            >
              ✍️ Create Blog
            </button>
            <button
              onClick={() => navigate('/getblog')}
              className="flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-500 px-8 py-4 rounded-lg shadow-md transition duration-300 text-xl cursor-pointer"
            >
              📚 Get Blogs
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <footer className="relative z-10 mt-16 text-center text-sm text-gray-600 border-t pt-6">
        <div className="flex justify-center gap-8 mb-2">
          <button
            onClick={() => navigate('/contactus')}
            className="text-blue-600 hover:underline transition text-lg font-semibold px-6 py-3 border border-blue-500 rounded-md hover:bg-blue-50 cursor-pointer"
          >
            Contact Us
          </button>
          <button
            onClick={() => navigate('/aboutus')}
            className="text-blue-600 hover:underline transition text-lg font-semibold px-6 py-3 border border-blue-500 rounded-md hover:bg-blue-50 cursor-pointer"
          >
            About Us
          </button>
        </div>
        <p className="text-xs">
          © 2025 <span className="font-medium text-blue-500">BlogMaster</span>. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
