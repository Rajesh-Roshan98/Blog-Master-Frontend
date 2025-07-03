import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [fade, setFade] = useState(false); // new state for animation trigger

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
    setTimeout(() => navigate('/login'), 400); // wait for fade animation
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
      `}</style>

      <div className={`min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-200 text-gray-800 font-sans ${fade ? 'fade-out' : ''}`}>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 transition duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between">

            {/* Logo and Search Bar */}
            <div className="flex items-center gap-6 w-full max-w-xl">
              <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight whitespace-nowrap transition duration-300 hover:scale-105">BlogMaster</h1>
              <input
                type="text"
                placeholder="Search blogs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-grow border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
              />
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleLoginClick}
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition text-sm"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
              >
                Sign Up
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 py-20 max-w-7xl mx-auto gap-12">
          <div className="md:w-1/2 text-center md:text-left space-y-6 transition-all duration-300">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight transition hover:text-blue-600">
              Share Your Thoughts <br className="hidden md:block" /> With the World
            </h2>
            <p className="text-lg text-gray-600">
              Create, edit, and manage blogs effortlessly with <span className="text-blue-600 font-medium">BlogMaster</span>. 
              Your words, your story — amplified.
            </p>
            <button
              onClick={handleLoginClick}
              className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 transition transform duration-300 font-medium"
            >
              Get Started
            </button>
          </div>

          <img
            src="https://img.freepik.com/free-photo/front-view-female-student-white-shirt-holding-pen-copybook-thinking-blue-wall_140725-38457.jpg?semt=ais_hybrid&w=740"
            alt="Hero"
            className="w-full max-w-sm md:max-w-lg rounded-xl shadow-lg grow-shrink"
          />
        </section>

        {/* Why BlogMaster Section */}
        <section className="px-6 md:px-12 py-20 bg-white text-center">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-semibold mb-10 text-blue-600">Why Choose BlogMaster?</h3>

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg hover:bg-blue-100 transition-all duration-300 group"
                >
                  <h4 className="text-xl font-semibold text-blue-700 group-hover:text-blue-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm group-hover:text-gray-800">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 py-8 border-t mt-12 text-sm bg-white">
          <p>
            © 2025 <span className="text-blue-500 font-semibold">BlogMaster</span>. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
