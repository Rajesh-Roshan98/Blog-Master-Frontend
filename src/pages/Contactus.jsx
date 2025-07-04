import React, { useState } from 'react';
import axios from 'axios';
import AvatarDropdown from '../components/AvatarDropdown';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Use Vite-compatible dynamic URL import
const telephoneImage = new URL(
  '../assets/top-view-blue-monday-concept-composition-with-telephone.jpg',
  import.meta.url
).href;

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://rajesh-roshan98.github.io/Blog-Master-Frontend/api/auth/createcontact', formData);
      toast.success('Message sent successfully!', {
        position: 'top-right',
        autoClose: 2500,
        pauseOnHover: false,
        theme: 'colored',
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Something went wrong.', {
        position: 'top-right',
        autoClose: 2500,
        pauseOnHover: false,
        theme: 'colored',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white flex items-center justify-center px-4 relative">
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover z-0"
        style={{ backgroundImage: `url(${telephoneImage})` }}
      ></div>

      <div className="relative bg-white/100 backdrop-blur-md shadow-2xl rounded-lg p-8 max-w-md w-full z-10">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Contact Us</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Type your message here..."
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Back Button (top-left) */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:border-white hover:bg-blue-500 hover:text-white px-4 py-2 border-2 rounded-4xl cursor-pointer shadow"
        >
          <span className="text-lg">←</span> Back
        </button>
      </div>

      {/* Avatar Dropdown (top-right) */}
      <div className="absolute top-4 right-4 z-20">
        {user && <AvatarDropdown user={user} />}
      </div>
    </div>
  );
};

export default ContactUs;
