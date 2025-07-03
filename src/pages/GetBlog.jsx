import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AvatarDropdown from '../components/AvatarDropdown';

const GetBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/blogs/myblogs', { withCredentials: true });
      setBlogs(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10 relative">

      {/* Back Button (top-left) */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500  hover:border-white hover:bg-blue-500 hover:text-white px-4 py-2 border-2 rounded-4xl cursor-pointer shadow"
        >
          <span className="text-lg">←</span> Back
        </button>
      </div>

      {/* Avatar Dropdown (top-right) */}
      <div className="absolute top-4 right-4 z-20">
        {user && <AvatarDropdown user={user} />}
      </div>

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
            <div key={blog._id} className="bg-white shadow rounded-xl p-6 border border-blue-100 hover:shadow-lg transition">
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
