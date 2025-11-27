import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink, Info, History, ArrowUp, GraduationCap, HelpCircle, Play, Star, Mail, User, ArrowRight, CheckCircle2, CheckCircle, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import SEO from '../../components/SEO';
import PricingCard from '../../components/PricingCard';
import VersionHistoryModal from '../../components/modals/VersionHistoryModal';
import UpgradeLicenseModal from '../../components/modals/UpgradeLicenseModal';
import EducationDiscountModal from '../../components/modals/EducationDiscountModal';
import AddedToCartModal from '../../components/modals/AddedToCartModal';
import { productCategories, whyChooseFeatures } from '../../data/productCategories';
import { getProductDetails } from '../../data/productDetails';
import { getProductPricing } from '../../data/products/pricing';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProductSchema, getBreadcrumbSchema, getFAQSchema } from '../../utils/structuredData';
import { sendTrialDownloadEmail } from '../../services/emailService';

const ProductPage = () => {
  const { categorySlug, productSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart: addToEcomCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();

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

  const isExporter = category && category.exporters.includes(product);
  const isImporter = category && category.importers.includes(product);

  // Get product-specific pricing (or default pricing if no custom pricing exists)
  const productPricing = getProductPricing(productSlug);

  // Modal states
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showUpgradeLicense, setShowUpgradeLicense] = useState(false);

  const [showEducationDiscount, setShowEducationDiscount] = useState(false);
  const [showAddedToCartModal, setShowAddedToCartModal] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  // Testimonials carousel state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedTestimonials, setExpandedTestimonials] = useState([]);

  const handleToggleTestimonial = (index) => {
    setExpandedTestimonials((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // Free trial form state
  const [trialForm, setTrialForm] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleAddToCart = (pricing) => {
    if (!productDetails) return;

    const cartItem = {
      id: productDetails.id || `${categorySlug}-${productSlug}`,
      name: productDetails.name || product,
      title: productDetails.name || product,
      price: pricing.price,
      pricingType: pricing.type,
      description: productDetails.description || `Add ${productDetails.name || product} (${pricing.type}) to cart`,
      category: categorySlug,
      productSlug: productSlug,
      image: '📦',
    };

    const result = addToEcomCart(cartItem);



    if (result && result.success) {
      setLastAddedItem(cartItem);
      setShowAddedToCartModal(true);
    }
  };

  const handleTrialSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const downloadUrl = details.downloadUrl || `https://staging8.prototechsolutions.com/msi-softwares/${productSlug}.msi`;
      const fullProductName = `${details.name} for ${category.name}`;

      await sendTrialDownloadEmail({
        customerName: trialForm.name,
        customerEmail: trialForm.email,
        productName: fullProductName,
        downloadUrl,
        categoryName: category.name
      });

      setEmailSent(true);
      // setTrialForm({ name: '', email: '' }); // Keep data for success card

      // Show success toast
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-in fade-in slide-in-from-top-5 duration-300';
      toast.innerHTML = `<span>✓</span> <span>Trial link sent to your email!</span>`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 5000);

    } catch (err) {
      console.error('Error sending trial email:', err);
      setError(err.message || 'Failed to send email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use productDetails or fallback to defaults
  const details = productDetails || {
    name: product,
    category: categorySlug,
    autodeskStoreLink: '#',
    compatibility: 'Windows 10 and Windows 11 Only',
    pluginUpdates: 'All updates for the first year are free. The plugin license is perpetual, but if it stops working after the first year and you need updates or support, you\'ll need to purchase a renewal.',
    features: [
      { title: 'High Quality Export', description: 'Export with precision and reliability.' },
      { title: 'Fast Processing', description: 'Quick export times for large files.' },
      { title: 'Easy to Use', description: 'Intuitive interface for seamless workflow.' },
      { title: 'Full Support', description: 'Comprehensive documentation and support.' }
    ],
    versionHistory: [],
    testimonials: []
  };

  // Merge videoUrl from pricing if it exists (allows video customization per product)
  if (productPricing.videoUrl && !details.videoUrl) {
    details.videoUrl = productPricing.videoUrl;
  }

  // Initialize expanded testimonials state when details are available
  useEffect(() => {
    if (details?.testimonials && details.testimonials.length > 0) {
      setExpandedTestimonials(details.testimonials.map(() => false));
    }
  }, [details?.testimonials]);

  // Reset expanded state when testimonial changes
  useEffect(() => {
    if (details?.testimonials && details.testimonials.length > 0) {
      setExpandedTestimonials((prev) => {
        // Reset all to false when changing testimonials
        return details.testimonials.map(() => false);
      });
    }
  }, [currentTestimonial, details?.testimonials]);

  // Animate sections with GSAP
  useEffect(() => {
    if (!product) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Animate product detail sections
      const sections = gsap.utils.toArray('.product-detail-section');
      sections.forEach((section, i) => {
        gsap.from(section, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            once: true
          },
          delay: i * 0.1
        });
      });

      // Animate pricing cards
      const cards = gsap.utils.toArray('.pricing-card-animate');
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          scale: 0.9,
          y: 30,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            once: true
          },
          delay: i * 0.1
        });
      });

      // Animate feature cards
      const features = gsap.utils.toArray('.feature-card');
      features.forEach((feature, i) => {
        gsap.from(feature, {
          opacity: 0,
          x: i % 2 === 0 ? -30 : 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: feature,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            once: true
          },
          delay: i * 0.05
        });
      });
    });
    return () => ctx.revert();
  }, [product]);

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

  const productTitle = `${details.name} for ${category.name}`;
  const productDescription = isExporter
    ? `Export your ${category.name} designs with ${details.name}. A powerful and reliable solution for seamless data transfer.`
    : `Import files into ${category.name} with ${details.name}. Complete data preservation and accurate conversion.`;

  // Generate structured data
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://staging8.prototechsolutions.com';
  const finalProductSlug = productSlug || details.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const productSchema = getProductSchema(details, category, { ...details, pricing: productPricing });
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: `${siteUrl}/` },
    { name: 'Products', url: `${siteUrl}/3d-products` },
    { name: category.name, url: `${siteUrl}/3d-products/${categorySlug}` },
    { name: details.name, url: `${siteUrl}/3d-products/${categorySlug}/${finalProductSlug}` }
  ]);

  let structuredData = {
    '@context': 'https://schema.org',
    '@graph': [productSchema, breadcrumbSchema]
  };

  // Add FAQ schema if FAQs exist
  if (details.faqs && details.faqs.length > 0) {
    structuredData['@graph'].push(getFAQSchema(details.faqs));
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO
        title={productTitle}
        description={productDescription}
        image={details.imageUrl || `${siteUrl}/logo512.png`}
        structuredData={structuredData}
      />

      {/* Header Section with Banner */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-black border-b border-gray-800 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.12),transparent_55%)] opacity-70"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            to={`/3d-products/${categorySlug}`}
            className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-8 transition-all group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to {category.name} Products</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="product-detail-section">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300 mb-6 backdrop-blur-sm">
                <Sparkles size={16} className="text-sky-400" />
                <span>ProtoTech Solutions</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-cyan-100 leading-tight">
                {details.name}
              </h1>
              <p className="text-2xl text-gray-300 mb-8 font-medium">for {category.name}</p>

              <div className="flex flex-wrap gap-4 items-center mb-8">
                <a
                  href={details.autodeskStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span>Our Plugins are also Available on Autodesk Store</span>
                  <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-3 group/info">
                  <div className="p-2 rounded-lg bg-yellow-500/20 group-hover/info:bg-yellow-500/30 transition-colors">
                    <Info size={20} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-yellow-300 mb-1">Compatibility:</p>
                    <p className="text-sm text-gray-300">{details.compatibility}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group/info">
                  <div className="p-2 rounded-lg bg-blue-500/20 group-hover/info:bg-blue-500/30 transition-colors">
                    <Info size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-300 mb-1">Plugin Updates:</p>
                    <p className="text-sm text-gray-300">{details.pluginUpdates}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Banner Image Placeholder */}
            <div className="product-detail-section">
              <div className="relative flex items-center justify-center gap-6 lg:gap-8 p-8">
                {/* Left Portrait */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-cyan-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                  <div className="relative w-32 h-40 md:w-40 md:h-48 lg:w-48 lg:h-60 bg-gradient-to-br from-sky-600/30 via-cyan-600/30 to-blue-600/30 rounded-2xl border-2 border-sky-500/30 backdrop-blur-sm overflow-hidden shadow-2xl group-hover:border-sky-500/50 transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-4">
                        <Globe size={32} className="text-sky-300 mx-auto mb-2 animate-pulse" />
                        <div className="text-xs md:text-sm text-gray-300 font-semibold">Source Format</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="relative z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center shadow-2xl animate-pulse">
                    <ArrowRight size={24} className="text-white md:w-8 md:h-8" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                </div>

                {/* Right Portrait */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                  <div className="relative w-32 h-40 md:w-40 md:h-48 lg:w-48 lg:h-60 bg-gradient-to-br from-emerald-600/30 via-teal-600/30 to-green-600/30 rounded-2xl border-2 border-emerald-500/30 backdrop-blur-sm overflow-hidden shadow-2xl group-hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-4">
                        <Zap size={32} className="text-emerald-300 mx-auto mb-2 animate-pulse" />
                        <div className="text-xs md:text-sm text-gray-300 font-semibold">Target Format</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-sky-400 rounded-full opacity-60 animate-ping"></div>
                  <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-ping animation-delay-500"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-emerald-400 rounded-full opacity-60 animate-ping animation-delay-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 product-detail-section relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/20 bg-sky-500/10 text-sm text-sky-300 mb-4 backdrop-blur-sm">
              <Sparkles size={16} />
              <span>Pricing Options</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Choose Your Plan
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Select the perfect license option for your needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {Object.entries(productPricing)
              .filter(([key]) => key !== 'videoUrl') // Filter out non-pricing properties
              .map(([key, pricing]) => (
                <PricingCard
                  key={key}
                  pricing={pricing}
                  productName={details.name}
                  onAddToCart={handleAddToCart}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 product-detail-section relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.06),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-sm text-purple-300 mb-4 backdrop-blur-sm">
              <Zap size={16} />
              <span>Key Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Enhance collaboration and presentation with powerful features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {details.features.map((feature, idx) => {
              const icons = [Sparkles, Zap, Shield, Globe];
              const IconComponent = icons[idx % icons.length];
              return (
                <div
                  key={idx}
                  className="feature-card group bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(139,92,246,0.3)] hover:transform hover:scale-[1.02] hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <IconComponent size={24} className="text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 product-detail-section relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.04),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-sm text-blue-300 mb-4 backdrop-blur-sm">
              <Info size={16} />
              <span>Additional Resources</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Additional Information</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore version history, upgrades, discounts, and frequently asked questions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              onClick={() => setShowVersionHistory(true)}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-sky-500/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)] hover:transform hover:scale-[1.02] hover:-translate-y-1 text-left"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <History size={28} className="text-sky-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-200 transition-colors">Version History</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">View plugin updates and changelog</p>
              <div className="mt-4 flex items-center gap-2 text-sky-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View timeline</span>
                <ArrowRight size={14} />
              </div>
            </button>

            <button
              onClick={() => setShowUpgradeLicense(true)}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(139,92,246,0.3)] hover:transform hover:scale-[1.02] hover:-translate-y-1 text-left"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <ArrowUp size={28} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">Upgrade License</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Request an upgrade to a higher tier</p>
              <div className="mt-4 flex items-center gap-2 text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Upgrade now</span>
                <ArrowRight size={14} />
              </div>
            </button>

            <button
              onClick={() => setShowEducationDiscount(true)}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(16,185,129,0.3)] hover:transform hover:scale-[1.02] hover:-translate-y-1 text-left"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <GraduationCap size={28} className="text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-200 transition-colors">Education Discount</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Apply for educational pricing</p>
              <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Apply now</span>
                <ArrowRight size={14} />
              </div>
            </button>

            <Link
              to={`/3d-products/${categorySlug}/${productSlug}/faq`}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(234,179,8,0.3)] hover:transform hover:scale-[1.02] hover:-translate-y-1 text-left block"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <HelpCircle size={28} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors">FAQs</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Frequently asked questions</p>
              <div className="mt-4 flex items-center gap-2 text-yellow-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Read FAQs</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      {details.videoUrl && (
        <section className="py-16 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 product-detail-section relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]"></div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/10 text-sm text-red-300 mb-4 backdrop-blur-sm">
                <Play size={16} />
                <span>Video Demo</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Product Demo</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">Watch how {details.name} works in action</p>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-800 border-2 border-gray-700/50 shadow-2xl group hover:border-sky-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-transparent z-10 group-hover:opacity-0 transition-opacity"></div>
              <iframe
                src={details.videoUrl}
                title={`${details.name} Demo`}
                className="w-full h-full relative z-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section - HomePage Style */}
      {details.testimonials && details.testimonials.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 product-detail-section relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.18),transparent_55%)] opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-950/70 to-gray-950"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-8 md:mb-10">
              <span className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-[0.35em] text-slate-200/80">
                Outcomes our clients amplify
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white leading-tight">
                What our customers say about {details.name}
              </h2>
            </div>

            <div className="testimonial-carousel relative mx-auto max-w-4xl">
              <div className="pointer-events-none absolute -top-24 left-1/2 hidden h-64 w-64 -translate-x-1/2 rounded-full bg-sky-500/30 blur-[140px] lg:block"></div>
              <div className="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-indigo-500/25 blur-[140px]"></div>

              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/10 backdrop-blur-2xl px-6 py-6 md:px-8 md:py-8 shadow-[0_35px_140px_rgba(59,130,246,0.28)] min-h-[320px] md:min-h-[360px]">
                {details.testimonials.map((testimonial, idx) => (
                  <article
                    key={idx}
                    className="testimonial-card absolute inset-0 flex flex-col p-4 md:p-6 transition-opacity duration-500"
                    style={{
                      opacity: idx === currentTestimonial ? 1 : 0,
                      pointerEvents: idx === currentTestimonial ? 'auto' : 'none',
                      zIndex: idx === currentTestimonial ? 10 : 1
                    }}
                  >
                    <div className="absolute inset-0 pointer-events-none rounded-[28px] bg-gradient-to-br from-white/15 via-transparent to-transparent"></div>
                    <div className="relative flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-4 mb-4 md:mb-5">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl md:rounded-3xl border border-white/20 bg-white/15 text-sm md:text-base font-semibold text-white/80 shadow-[0_16px_40px_rgba(56,189,248,0.25)]">
                            {testimonial.name.split(' ').map((part) => part.charAt(0)).slice(0, 2).join('')}
                          </div>
                          <div>
                            <p className="text-base md:text-lg font-semibold text-white tracking-tight">
                              {testimonial.name}
                            </p>
                            <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-slate-200/70">
                              {testimonial.role}
                            </p>
                            <p className="mt-0.5 md:mt-1 text-[10px] md:text-xs text-slate-300/70">
                              {testimonial.company}
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-3xl font-serif text-white/20 shadow-[0_25px_60px_rgba(79,70,229,0.35)]">
                          "
                        </div>
                      </div>

                      <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-slate-200/70">
                        <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-slate-200/80">
                          {details.name}
                        </span>
                        <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-5 py-2 text-sky-200/80">
                          {testimonial.rating}★ Rating
                        </span>
                      </div>

                      <div className="relative flex-1 min-h-[100px] md:min-h-[120px]">
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-out ${expandedTestimonials[idx] ? 'max-h-[800px]' : 'max-h-28'
                            }`}
                        >
                          <p className="text-base md:text-lg text-slate-100/90 leading-relaxed tracking-tight">
                            "{testimonial.quote}"
                          </p>
                        </div>
                        {!expandedTestimonials[idx] && (
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-900/98 via-gray-900/50 to-transparent rounded-b-[28px]"></div>
                        )}
                      </div>

                      <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                        <button
                          type="button"
                          onClick={() => handleToggleTestimonial(idx)}
                          className="group inline-flex items-center gap-2 rounded-full border-2 border-sky-400/60 bg-gradient-to-r from-sky-500/20 to-cyan-500/20 px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-bold text-sky-200 transition-all duration-300 hover:border-sky-300/80 hover:from-sky-500/30 hover:to-cyan-500/30 hover:text-white hover:scale-105 hover:shadow-[0_8px_24px_rgba(56,189,248,0.4)]"
                        >
                          <span>{expandedTestimonials[idx] ? 'Show less' : 'Read more'}</span>
                          <span className={`inline-flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border-2 border-sky-400/70 bg-sky-400/20 text-[10px] md:text-xs font-bold transition-all duration-300 group-hover:border-sky-300 group-hover:bg-sky-400/30 group-hover:rotate-90 ${expandedTestimonials[idx] ? 'rotate-45' : ''}`}>
                            {expandedTestimonials[idx] ? '–' : '+'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Navigation Controls */}
              {details.testimonials.length > 1 && (
                <div className="relative z-50 mt-8 md:mt-10 flex items-center justify-center gap-4 md:gap-6">
                  <button
                    type="button"
                    onClick={() => setCurrentTestimonial((prev) => (prev - 1 + details.testimonials.length) % details.testimonials.length)}
                    className="group flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border-2 border-sky-400/80 bg-sky-500/60 backdrop-blur-md text-white font-bold transition-all duration-300 hover:border-sky-300 hover:bg-sky-400 hover:text-white hover:scale-110 hover:shadow-[0_12px_40px_rgba(56,189,248,0.8)] shadow-xl active:scale-95"
                    aria-label="Previous testimonial"
                  >
                    <span className="text-2xl md:text-3xl font-bold transition-transform duration-300 group-hover:-translate-x-1">‹</span>
                  </button>

                  <div className="flex items-center gap-2 md:gap-3">
                    {details.testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentTestimonial(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${idx === currentTestimonial
                          ? 'w-8 bg-sky-400'
                          : 'w-2 bg-white/20 hover:bg-white/40'
                          }`}
                        aria-label={`Go to testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentTestimonial((prev) => (prev + 1) % details.testimonials.length)}
                    className="group flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border-2 border-sky-400/80 bg-sky-500/60 backdrop-blur-md text-white font-bold transition-all duration-300 hover:border-sky-300 hover:bg-sky-400 hover:text-white hover:scale-110 hover:shadow-[0_12px_40px_rgba(56,189,248,0.8)] shadow-xl active:scale-95"
                    aria-label="Next testimonial"
                  >
                    <span className="text-2xl md:text-3xl font-bold transition-transform duration-300 group-hover:translate-x-1">›</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Free Trial Form Section */}
      <section id="free-trial" className="py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 product-detail-section relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06),transparent_70%)]"></div>
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              {emailSent ? (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 mb-6">
                    <CheckCircle size={48} className="text-emerald-400" />
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Email Sent Successfully!
                  </h2>

                  <p className="text-gray-300 text-lg mb-6">
                    We've sent the trial download link to <strong className="text-emerald-400">{trialForm.email}</strong>
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
                    <a
                      href={`mailto:${trialForm.email}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-colors"
                    >
                      <Mail size={18} />
                      <span>Open Email Client</span>
                    </a>
                    <button
                      onClick={() => {
                        setEmailSent(false);
                        setTrialForm({ name: '', email: '' });
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <span>Send to another email</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-sm text-emerald-300 mb-4 backdrop-blur-sm">
                      <Download size={16} />
                      <span>Free Trial</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Get FREE Product Trial</h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">Try {details.name} free for 30 days. No credit card required.</p>
                  </div>
                  <form onSubmit={handleTrialSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="trial-name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name *
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="trial-name"
                          required
                          value={trialForm.name}
                          onChange={(e) => setTrialForm({ ...trialForm, name: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                          placeholder="Your name"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="trial-email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          id="trial-email"
                          required
                          value={trialForm.email}
                          onChange={(e) => setTrialForm({ ...trialForm, email: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Download size={20} className="group-hover:animate-bounce" />
                          <span>Get a Free Trial</span>
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    {error && (
                      <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                        {error}
                      </div>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* Modals */}
      <VersionHistoryModal
        isOpen={showVersionHistory}
        onClose={() => setShowVersionHistory(false)}
        versionHistory={details.versionHistory || []}
      />
      <UpgradeLicenseModal
        isOpen={showUpgradeLicense}
        onClose={() => setShowUpgradeLicense(false)}
        productName={details.name}
      />
      <EducationDiscountModal
        isOpen={showEducationDiscount}
        onClose={() => setShowEducationDiscount(false)}
        productName={details.name}
      />
      <AddedToCartModal
        isOpen={showAddedToCartModal}
        onClose={() => setShowAddedToCartModal(false)}
        product={lastAddedItem}
        onContinueShopping={() => setShowAddedToCartModal(false)}
        onViewCart={() => navigate('/cart')}
      />
    </div>
  );
};

export default ProductPage;
