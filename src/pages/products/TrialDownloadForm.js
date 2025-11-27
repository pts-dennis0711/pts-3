import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, CheckCircle, Mail, AlertCircle } from 'lucide-react';
import SEO from '../../components/SEO';
import { productCategories } from '../../data/productCategories';
import { getProductDetails } from '../../data/productDetails';
import { sendTrialDownloadEmail } from '../../services/emailService';

const TrialDownloadForm = () => {
  const { categorySlug, productSlug } = useParams();

  // Find category
  const category = Object.values(productCategories).find(cat => cat.slug === categorySlug);

  // Get product details - try category-specific slug first, then generic slug
  const categorySpecificSlug = `${categorySlug}-${productSlug}`;
  const productDetails = getProductDetails(categorySpecificSlug) || getProductDetails(productSlug);

  // Find product name from category
  const product = category
    ? [...category.exporters, ...category.importers].find(p => {
      const slug = p.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      return slug === productSlug;
    })
    : null;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');

  // Generate user ID on component mount
  useEffect(() => {
    // Generate a random user ID (in real app, this would come from backend)
    const randomId = Math.floor(1000 + Math.random() * 9000);
    setUserId(randomId.toString());
  }, []);

  // Use productDetails or fallback to defaults
  const details = productDetails || {
    name: product,
    category: categorySlug,
  };

  // Get download URL - default pattern if not specified
  const downloadUrl = details.downloadUrl || `https://staging8.prototechsolutions.com/msi-softwares/${productSlug}.msi`;

  // Full product name for display
  const fullProductName = `${details.name} for ${category?.name || 'CAD Software'}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email to customer
      await sendTrialDownloadEmail({
        customerName: formData.name,
        customerEmail: formData.email,
        productName: fullProductName,
        downloadUrl,
        categoryName: category?.name || 'CAD Software',
        userId
      });

      setEmailSent(true);
    } catch (err) {
      console.error('Error sending email:', err);
      setError(err.message || 'Failed to send email. Please try again later or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!category || !product) {
    return (
      <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-6">The requested product could not be found.</p>
          <Link
            to={category ? `/3d-products/${categorySlug}` : '/3d-products'}
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
          >
            <ArrowLeft size={18} />
            {category ? `Back to ${category.name}` : 'Back to Products'}
          </Link>
        </div>
      </div>
    );
  }

  // If email sent successfully, show success message
  if (emailSent) {
    return (
      <div className="bg-gray-950 text-white min-h-screen py-12">
        <SEO
          title={`Email Sent - ${fullProductName} - ProtoTech Solutions`}
          description={`Trial download email sent for ${fullProductName}`}
        />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            to={`/3d-products/${categorySlug}/${productSlug}`}
            className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-8 transition-all group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to {details.name}</span>
          </Link>

          {/* Success Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-500/50 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 mb-6">
                <CheckCircle size={48} className="text-emerald-400" />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Email Sent Successfully!
              </h1>

              <p className="text-gray-300 text-lg mb-6">
                We've sent the trial download link to <strong className="text-emerald-400">{formData.email}</strong>
              </p>

              <div className="bg-gray-700/50 rounded-xl p-6 mb-6 text-left">
                <div className="flex items-start gap-3">
                  <Mail size={24} className="text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">What's Next?</h3>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Check your email inbox (and spam folder if needed)</li>
                      <li>• Click the download link in the email</li>
                      <li>• Follow the installation instructions provided</li>
                      <li>• Your trial will be automatically activated</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to={`/3d-products/${categorySlug}/${productSlug}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <ArrowLeft size={18} />
                  <span>Back to Product</span>
                </Link>
                <a
                  href={`mailto:${formData.email}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-colors"
                >
                  <Mail size={18} />
                  <span>Open Email Client</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show the form
  if (!emailSent) {
    return (
      <div className="bg-gray-950 text-white min-h-screen py-12">
        <SEO
          title={`Free Trial - ${fullProductName} - ProtoTech Solutions`}
          description={`Get a free trial of ${fullProductName}. No credit card required.`}
        />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            to={`/3d-products/${categorySlug}/${productSlug}`}
            className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-8 transition-all group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to {details.name}</span>
          </Link>

          {/* Form Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-sm text-emerald-300 mb-4 backdrop-blur-sm">
                  <Download size={16} />
                  <span>Free Trial</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Get FREE Product Trial</h1>
                <p className="text-gray-400 text-lg max-w-xl mx-auto">
                  Try {fullProductName} free for 30 days. No credit card required.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
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
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Email...</span>
                    </>
                  ) : (
                    <>
                      <Download size={20} className="group-hover:animate-bounce" />
                      <span>Get a Free Trial</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // This should never be reached, but included as fallback
  return null;
};

export default TrialDownloadForm;

