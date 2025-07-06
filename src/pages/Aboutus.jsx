import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AvatarDropdown from '../components/AvatarDropdown';
import { useAuth } from '../context/AuthContext'; // ✅ Import useAuth

const AboutUs = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth(); // ✅ Get user from context

  const team = [
    { name: 'Ganesh', role: 'Leader', info: 'Coordinates and leads the project development with a clear vision.' },
    { name: 'Ankita', role: 'Designer', info: 'Designs beautiful and intuitive user interfaces for BlogMaster.' },
    { name: 'Om', role: 'Frontend Developer', info: 'Implements responsive and interactive UI using ReactJS.' },
    { name: 'Rajesh', role: 'Frontend Developer', info: 'Works closely on styling, layout, and component logic.' },
    { name: 'Badal', role: 'Backend Developer', info: 'Handles APIs, database logic, and server-side operations.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white text-gray-800">
      {/* Back Button (top-left) */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:border-white hover:bg-blue-500 hover:text-white px-4 py-2 border-2 rounded-4xl cursor-pointer shadow"
        >
          <span className="text-lg">←</span> Back
        </button>
      </div>

      {/* Avatar Dropdown */}
      <div className="absolute top-4 right-4 z-20">
        {!loading && user && <AvatarDropdown user={user} />}
      </div>

      {/* Header Section */}
      <header className="px-6 py-12 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">About BlogMaster</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          BlogMaster is your go-to platform to express ideas, share experiences, and connect with readers around the world.
          We provide creators with intuitive tools to help turn thoughts into beautiful blogs.
        </p>
      </header>

      {/* Mission Section */}
      <section className="px-6 py-12 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-blue-500">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our goal is to empower storytellers by providing a distraction-free, powerful, and modern blogging platform.
              Whether you’re writing personal stories, technical guides, or creative fiction, BlogMaster has you covered.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Join thousands of writers sharing their knowledge, experience, and creativity on BlogMaster.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-vector/online-articles-concept-illustration_114360-5565.jpg?size=626&ext=jpg"
            alt="About us illustration"
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-white to-blue-50 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-8">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="relative group bg-white shadow-lg rounded-xl p-6 w-60 hover:shadow-2xl transition-all"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, type: 'spring' }}
            >
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-blue-500 mt-2">{member.role}</p>

              {/* Hover Pop-up */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-4 bg-blue-100 text-blue-800 text-sm rounded-xl shadow-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 z-20 pointer-events-none">
                {member.info}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to share your story?</h2>
        <p className="text-lg text-gray-600 mb-6">Start writing today and become part of our vibrant community.</p>
        <button
          onClick={() => navigate('/createblog')}
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 border-t mt-8">
        © 2025 <span className="text-blue-500 font-medium">BlogMaster</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default AboutUs;
