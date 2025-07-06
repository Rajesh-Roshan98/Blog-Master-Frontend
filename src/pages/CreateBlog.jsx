import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../utils/apiBase';
import { useNavigate } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import HeaderBar from '../components/HeaderBar';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleEmojiClick = (emojiData) => {
    setContent((prev) => prev + emojiData.emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm('Are you sure you want to publish this blog?');
    if (!confirmed) return;

    setSubmitting(true);

    try {
      await axios.post(
        `${API_BASE_URL}/api/blogs/createblog`,
        { title, content, category },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('Blog created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create blog');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center relative px-4">
      <HeaderBar />

      <div className="relative z-10 bg-white p-8 rounded-xl shadow-2xl w-full max-w-xl">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Create a New Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Author */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Author</label>
            <input
              type="text"
              value={`${user?.firstname || ''} ${user?.lastname || ''}`}
              disabled
              className="w-full border border-gray-300 px-4 py-2 rounded bg-gray-100 cursor-not-allowed text-gray-600"
            />
          </div>

          {/* Blog Title */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Blog Type</label>
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
            >
              <option value="" disabled>Select a title</option>
              <option value="FOOD">FOOD</option>
              <option value="MOTIVATION">MOTIVATION</option>
              <option value="TRAVEL">TRAVEL</option>
            </select>
          </div>

          {/* Blog Content */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded h-40"
              required
            />
            <button
              type="button"
              onClick={() => setShowEmoji(!showEmoji)}
              className="mt-2 text-blue-500 hover:underline text-sm"
            >
              {showEmoji ? 'Hide Emoji Picker 😶' : 'Add Emoji 😊'}
            </button>
            {showEmoji && (
              <div className="mt-2">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          {/* Blog Category */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              placeholder="e.g., Healthy Food, Solo Travel, Morning Routine"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full text-white py-2 rounded transition ${
              submitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {submitting ? 'Publishing...' : 'Publish Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
