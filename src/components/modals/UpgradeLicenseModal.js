import React, { useState } from 'react';
import { X, ArrowUp, Mail, Building } from 'lucide-react';

const UpgradeLicenseModal = ({ isOpen, onClose, productName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    currentLicense: '',
    desiredLicense: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Upgrade License Form:', formData);
    // Reset form and close modal
    setFormData({
      name: '',
      email: '',
      company: '',
      currentLicense: '',
      desiredLicense: '',
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
              <ArrowUp size={24} className="text-sky-400" />
              Upgrade License
            </h2>
            <p className="text-gray-400 text-sm mt-1">Request an upgrade for {productName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
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
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="Company name"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="currentLicense" className="block text-sm font-medium text-gray-300 mb-2">
                Current License Type *
              </label>
              <select
                id="currentLicense"
                name="currentLicense"
                required
                value={formData.currentLicense}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              >
                <option value="">Select current license</option>
                <option value="trial">Trial</option>
                <option value="locked-single">Locked-License Single Machine</option>
                <option value="locked-two">Locked Licenses Two Machine</option>
                <option value="transferable">Transferable License</option>
                <option value="automation">Automation</option>
              </select>
            </div>

            <div>
              <label htmlFor="desiredLicense" className="block text-sm font-medium text-gray-300 mb-2">
                Desired License Type *
              </label>
              <select
                id="desiredLicense"
                name="desiredLicense"
                required
                value={formData.desiredLicense}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              >
                <option value="">Select desired license</option>
                <option value="locked-single">Locked-License Single Machine</option>
                <option value="locked-two">Locked Licenses Two Machine</option>
                <option value="transferable">Transferable License</option>
                <option value="automation">Automation</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Additional Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="Tell us about your upgrade requirements..."
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
              className="flex-1 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpgradeLicenseModal;

