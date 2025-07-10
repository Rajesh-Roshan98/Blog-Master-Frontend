import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaTimes } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [fade, setFade] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowAuthPopup(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const features = [
    {
      title: "Clean & Minimal Design",
      description: "Write without distractions in a beautiful editor tailored for focus.",
    },
    {
      title: "Powerful Dashboard",
      description: "Manage all your blogs with ease. Edit, delete, and organize effortlessly.",
    },
    {
      title: "Reader Engagement",
      description: "Connect with your audience, get feedback, and grow your following.",
    },
  ];

  const handleLoginClick = () => {
    setFade(true);
    setTimeout(() => navigate('/login'), 400);
  };

  return (
    <>
      <style>{`
        @keyframes growShrink {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .grow-shrink {
          animation: growShrink 3s ease-in-out infinite;
        }
        .fade-out {
          animation: fadeOut 0.4s forwards;
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .popup-animate {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .icon-bounce:hover {
          animation: bounce 0.6s;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>

      <div className={`min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-200 text-gray-800 font-sans ${fade ? 'fade-out' : ''}`}>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-white shadow-md px-4 py-4 md:px-6 transition duration-300">
          <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            {/* Logo */}
            <h1 className="text-2xl font-extrabold text-blue-600 whitespace-nowrap hover:scale-105 transition">
              BlogMaster
            </h1>

            {/* Search + Icon */}
            <div className="w-full flex items-center justify-between gap-3 md:w-auto">
              <input
                type="text"
                placeholder="Search blogs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
              <button
                onClick={() => setShowAuthPopup(true)}
                className="text-2xl text-gray-700 hover:text-blue-600 focus:outline-none icon-bounce"
              >
                <FaUserCircle />
              </button>
            </div>
          </div>
        </header>

        {/* Auth Popup Overlay */}
        {showAuthPopup && (
          <>
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setShowAuthPopup(false)}
            />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-sm z-50 bg-white rounded-lg shadow-lg p-6 popup-animate relative">
              {/* Close Button */}
              <button
                onClick={() => setShowAuthPopup(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg"
              >
                <FaTimes />
              </button>

              <h2 className="text-lg font-semibold mb-2 text-gray-800">Welcome to BlogMaster</h2>
              <p className="text-sm text-gray-600 mb-4">Please login or create an account to continue.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => {
                    setShowAuthPopup(false);
                    navigate('/login');
                  }}
                >
                  Login
                </button>
                <button
                  className="w-full sm:w-auto px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                  onClick={() => {
                    setShowAuthPopup(false);
                    navigate('/signup');
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </>
        )}

        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-12 py-16 md:py-24 max-w-7xl mx-auto gap-10">
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-snug hover:text-blue-600 transition">
              Share Your Thoughts <br className="hidden md:inline" /> With the World
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Create, edit, and manage blogs effortlessly with <span className="text-blue-600 font-medium">BlogMaster</span>.
              Your words, your story — amplified.
            </p>
            <button
              onClick={handleLoginClick}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition transform duration-300 font-medium"
            >
              Get Started
            </button>
          </div>

          <img
            src="https://img.freepik.com/free-photo/front-view-female-student-white-shirt-holding-pen-copybook-thinking-blue-wall_140725-38457.jpg?semt=ais_hybrid&w=740"
            alt="A thoughtful young woman with notebook"
            className="w-full max-w-xs md:max-w-lg rounded-xl shadow-lg grow-shrink"
          />
        </section>

        {/* Features Section */}
        <section className="px-4 md:px-12 py-16 bg-white text-center">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl md:text-4xl font-semibold mb-10 text-blue-600">Why Choose BlogMaster?</h3>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg hover:bg-blue-100 transition-all duration-300 group"
                >
                  <h4 className="text-lg font-semibold text-blue-700 group-hover:text-blue-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm group-hover:text-gray-800">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 py-6 border-t mt-12 bg-white text-sm">
          © 2025 <span className="text-blue-500 font-semibold">BlogMaster</span>. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default HomePage;
