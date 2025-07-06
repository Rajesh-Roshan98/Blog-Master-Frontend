import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../utils/apiBase';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import { useAuth } from '../context/AuthContext';

const GetBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/blogs/myblogs`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBlogs(response.data.data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10 relative">
      {/* ✅ Shared Header */}
      <HeaderBar />

      {/* Header */}
      <div className="flex items-center justify-between mb-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-600">My Blogs</h2>
        <button
          onClick={() => navigate('/createblog')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Create Your Own Blog
        </button>
      </div>

      {/* Blog List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {loading ? (
          <p className="col-span-full text-center text-gray-600">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow rounded-xl p-6 border border-blue-100 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{blog.title}</h3>
              <p className="text-gray-700 mb-3">{blog.content.slice(0, 100)}...</p>
              <div className="text-sm text-gray-500 mb-1">
                <span className="font-medium">Category:</span> {blog.category}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Author:</span> {user?.firstname} {user?.lastname}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GetBlog;
