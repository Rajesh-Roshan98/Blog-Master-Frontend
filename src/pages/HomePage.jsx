import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaTimes, FaMoon, FaSun } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [fade, setFade] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  // Toggle dark mode class and store preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowAuthPopup(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = showAuthPopup ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [showAuthPopup]);

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
        html, body {
          transition: background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease;
        }
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

      <div className={`min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
        text-gray-800 dark:text-gray-100 font-sans transition-colors duration-500 ease-in-out ${fade ? 'fade-out' : ''}`}>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md px-4 py-4 md:px-6 transition-colors duration-300">
          <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-extrabold text-blue-600 dark:text-white whitespace-nowrap hover:scale-105 transition">
              BlogMaster
            </h1>

            <div className="w-full flex items-center justify-between gap-3 md:w-auto">
              <input
                type="text"
                placeholder="Search blogs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 
                  focus:ring-blue-300 dark:bg-gray-700 dark:text-white transition-colors duration-300"
              />
              <button
                onClick={() => setShowAuthPopup(true)}
                className="text-2xl text-gray-700 dark:text-gray-300 hover:text-blue-600 focus:outline-none icon-bounce"
              >
                <FaUserCircle />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`text-xl text-gray-600 dark:text-yellow-300 ml-2 transition-colors duration-300 icon-bounce ${
                  darkMode ? 'rotate-180' : 'rotate-0'
                } transition-transform duration-500`}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
        </header>

        {/* Auth Popup */}
        {showAuthPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="w-11/12 max-w-sm bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 popup-animate relative transition-colors duration-300">
              <button
                onClick={() => setShowAuthPopup(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg"
              >
                <FaTimes />
              </button>

              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Welcome to BlogMaster</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Please login or create an account to continue.</p>
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
                  className="w-full sm:w-auto px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                  onClick={() => {
                    setShowAuthPopup(false);
                    navigate('/signup');
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-12 py-16 md:py-24 max-w-7xl mx-auto gap-10">
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6 transition-colors duration-300">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-snug hover:text-blue-600 transition">
              Share Your Thoughts <br className="hidden md:inline" /> With the World
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
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
        <section className="px-4 md:px-12 py-16 bg-white dark:bg-gray-800 text-center transition-colors duration-300">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl md:text-4xl font-semibold mb-10 text-blue-600 dark:text-blue-300">Why Choose BlogMaster?</h3>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-blue-50 dark:bg-gray-700 rounded-xl p-6 shadow hover:shadow-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition-all duration-300 group"
                >
                  <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 group-hover:text-blue-900 dark:group-hover:text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm group-hover:text-gray-800 dark:group-hover:text-white">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 dark:text-gray-400 py-6 border-t dark:border-gray-700 mt-12 bg-white dark:bg-gray-900 text-sm transition-colors duration-300">
          © 2025 <span className="text-blue-500 font-semibold">BlogMaster</span>. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default HomePage;
