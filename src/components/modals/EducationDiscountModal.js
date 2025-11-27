import React, { useState } from 'react';
import { X, GraduationCap, Mail, Building, Book } from 'lucide-react';

const EducationDiscountModal = ({ isOpen, onClose, productName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    role: '',
    studentId: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Education Discount Form:', formData);
    // Reset form and close modal
    setFormData({
      name: '',
      email: '',
      institution: '',
      role: '',
      studentId: '',
      message: ''
    });
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between backdrop-blur-sm z-10">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <GraduationCap size={24} className="text-purple-400" />
              Education Discount
            </h2>
            <p className="text-gray-400 text-sm mt-1">Apply for educational pricing for {productName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
            <p className="text-purple-300 text-sm">
              <strong>Educational Discount:</strong> Eligible students, educators, and educational institutions can receive special pricing. Please provide verification documents when submitting your request.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="institution" className="block text-sm font-medium text-gray-300 mb-2">
              Educational Institution *
            </label>
            <input
              type="text"
              id="institution"
              name="institution"
              required
              value={formData.institution}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="University / School name"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                Role *
              </label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="">Select role</option>
                <option value="student">Student</option>
                <option value="educator">Educator / Teacher</option>
                <option value="administrator">Administrator</option>
                <option value="researcher">Researcher</option>
              </select>
            </div>

            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-300 mb-2">
                Student ID / Employee ID
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="Optional"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Additional Information
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Tell us more about your educational use case..."
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationDiscountModal;

