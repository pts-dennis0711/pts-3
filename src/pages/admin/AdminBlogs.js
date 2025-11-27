import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

const AdminBlogs = ({ blogs, setBlogs }) => {
  const [formData, setFormData] = useState({ title: '', excerpt: '', author: 'Admin', image: '📝' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlogs([...blogs, { ...formData, id: Date.now(), date: new Date().toISOString().split('T')[0] }]);
    setFormData({ title: '', excerpt: '', author: 'Admin', image: '📝' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold mb-8" style={{ color: '#01A5BF' }}>Manage Blogs</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-200">
          <div className="grid gap-6">
            <input type="text" placeholder="Blog Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <textarea placeholder="Excerpt" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required rows="4" />
            <input type="text" placeholder="Emoji (e.g., 📝)" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="mt-6 px-8 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity shadow-lg" style={{ backgroundColor: '#01A5BF' }}>
            Add Blog Post
          </button>
        </form>

        <div className="grid gap-4">
          {blogs.map(blog => (
            <div key={blog.id} className="border-2 border-gray-200 rounded-xl p-6 flex justify-between items-center bg-white hover:shadow-lg transition-all">
              <div className="flex items-center gap-6">
                <span className="text-5xl">{blog.image}</span>
                <div>
                  <h3 className="font-bold text-xl mb-1">{blog.title}</h3>
                  <p className="text-gray-600 mb-2">{blog.excerpt}</p>
                  <p className="text-sm text-gray-500">{blog.date}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(blog.id)} className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;

