import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowRight, Download, Upload, Sparkles, Star, CheckCircle } from 'lucide-react';
import SEO from '../../components/SEO';
import ContactForm from '../../components/ContactForm';
import { productCategories, whyChooseFeatures, cadProgrammingExamples } from '../../data/productCategories';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ProductCategoryPage = () => {
  const { categorySlug: categorySlugParam } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract category slug from URL pathname (works for both specific and dynamic routes)
  const categorySlug = categorySlugParam || location.pathname.split('/3d-products/')[1]?.split('#')[0]?.split('?')[0];

  // Find category data - match by slug exactly
  const category = Object.values(productCategories).find(cat => cat.slug === categorySlug);

  // Helper function to create product slug
  const createProductSlug = (productName, type) => {
    return productName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  // Handle redirect in useEffect (after hooks are called) - only redirect if we have a slug but no category
  useEffect(() => {
    if (categorySlug && !category) {
      const timer = setTimeout(() => {
        navigate('/3d-products');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [category, categorySlug, navigate]);

  // Animate sections on scroll
  useEffect(() => {
    if (!category) return; // Early return inside useEffect is fine

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate sections on scroll - but ensure they're visible initially
      const sections = gsap.utils.toArray('.product-section');
      sections.forEach((section, i) => {
        // Set initial visible state
        gsap.set(section, { opacity: 1, y: 0 });
        
        // Then animate from hidden
        gsap.from(section, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            once: true,
            refreshPriority: -1,
            immediateRender: false // Don't hide initially
          },
          delay: i * 0.1
        });
      });

      // Animate product cards - ensure visible initially
      const productCards = gsap.utils.toArray('.product-card');
      productCards.forEach((card, i) => {
        // Set initial visible state
        gsap.set(card, { opacity: 1, x: 0 });
        
        // Then animate from hidden
        gsap.from(card, {
          opacity: 0,
          x: i % 2 === 0 ? -30 : 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            once: true,
            refreshPriority: -1,
            immediateRender: false // Don't hide initially
          },
          delay: i * 0.05
        });
      });
    });

    return () => ctx.revert();
  }, [categorySlug, category]);

  // Show loading or error state if category not found
  if (!category) {
    if (categorySlug) {
      return (
        <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <p className="text-gray-400 mb-2">Looking for: <strong>{categorySlug}</strong></p>
            <p className="text-gray-500 text-sm mt-4">Please check the URL or navigate back to products.</p>
            <button
              onClick={() => navigate('/3d-products')}
              className="mt-6 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              Go to Products
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

  // Render the category page
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO 
        title={`${category.title} - ProtoTech Solutions`} 
        description={category.description} 
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-900 via-gray-950 to-black overflow-hidden product-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.12),transparent_55%)] opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_70%)]"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300 mb-6 backdrop-blur-sm">
              <Sparkles size={16} className="text-sky-400" />
              <span>ProtoTech Solutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-cyan-100 leading-tight">
              {category.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              {category.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <span>Request Custom Solutions</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              {(category.exporters.length > 0 || category.importers.length > 0) && (
                <button
                  onClick={() => {
                    const section = category.exporters.length > 0 ? 'exporters' : 'importers';
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:border-white/40 hover:bg-white/10 transition-all"
                >
                  <span>View Products</span>
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {(category.exporters.length > 0 || category.importers.length > 0) && (
        <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 product-section relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_70%)]"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {category.exporters.length > 0 && (
              <div id="exporters" className="mb-16 scroll-mt-24">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/20 bg-sky-500/10 text-sm text-sky-300 mb-4 backdrop-blur-sm">
                    <Download size={16} />
                    <span>Export Solutions</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    {category.name} Exporters
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Seamlessly export your {category.name} designs to industry-standard formats for broader compatibility and collaboration.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.exporters.map((exporter, idx) => {
                    const productSlug = createProductSlug(exporter, 'exporter');
                    const productPath = `/3d-products/${category.slug}/${productSlug}`;
                    return (
                      <Link
                        key={idx}
                        to={productPath}
                        className="group product-card block"
                      >
                        <div className="relative h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-sky-500/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)] hover:transform hover:scale-[1.02] overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 via-sky-500/0 to-cyan-500/0 group-hover:from-sky-500/10 group-hover:via-cyan-500/5 group-hover:to-transparent transition-all duration-300"></div>
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Download size={20} className="text-white" />
                              </div>
                              <ArrowRight size={20} className="text-gray-400 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-200 transition-colors">
                              {exporter}
                            </h3>
                            <p className="text-gray-400 mb-4 leading-relaxed">
                              Export your {category.name} designs to <span className="text-sky-300 font-medium">{exporter.replace(' Exporter', '')}</span> format with precision and reliability.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-sky-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              <span>Learn more</span>
                              <ArrowRight size={14} />
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {category.importers.length > 0 && (
              <div id="importers" className="scroll-mt-24">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-sm text-emerald-300 mb-4 backdrop-blur-sm">
                    <Upload size={16} />
                    <span>Import Solutions</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    {category.name} Importers
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Import external file formats directly into {category.name} with full data preservation and accuracy.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.importers.map((importer, idx) => {
                    const productSlug = createProductSlug(importer, 'importer');
                    const productPath = `/3d-products/${category.slug}/${productSlug}`;
                    return (
                      <Link
                        key={idx}
                        to={productPath}
                        className="group product-card block"
                      >
                        <div className="relative h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(16,185,129,0.3)] hover:transform hover:scale-[1.02] overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-teal-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:via-teal-500/5 group-hover:to-transparent transition-all duration-300"></div>
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Upload size={20} className="text-white" />
                              </div>
                              <ArrowRight size={20} className="text-gray-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-200 transition-colors">
                              {importer}
                            </h3>
                            <p className="text-gray-400 mb-4 leading-relaxed">
                              Import <span className="text-emerald-300 font-medium">{importer.replace(' Importer', '')}</span> files directly into {category.name} with complete data integrity.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              <span>Learn more</span>
                              <ArrowRight size={14} />
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Why Choose ProtoTech Section */}
      <section className="py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 product-section relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-sm text-purple-300 mb-4 backdrop-blur-sm">
              <Sparkles size={16} />
              <span>Key Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Why Choose ProtoTech Plugins for {category.name}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the difference with our advanced plugins designed to enhance your {category.name} workflow.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="product-card bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(139,92,246,0.2)] hover:transform hover:scale-[1.02] group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-purple-400 font-bold text-lg">✓</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed pt-1">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 product-section relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-sm text-blue-300 mb-4 backdrop-blur-sm">
              <Star size={16} />
              <span>Trusted Partners</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Trusted by Industry Leaders
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Companies worldwide rely on ProtoTech solutions for their CAD workflows
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center">
            {['ASICS', 'SONOS', 'Microsoft', 'BUGATTI'].map((company, idx) => (
              <div
                key={idx}
                className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)] hover:transform hover:scale-105"
              >
                <div className="text-2xl md:text-3xl font-bold text-gray-400 text-center group-hover:text-white transition-colors">
                  {company}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 product-section relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06),transparent_70%)]"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-sm text-purple-300 mb-6 backdrop-blur-sm">
              <Sparkles size={16} />
              <span>Get in Touch</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Get Started?
            </h2>
            <div className="max-w-3xl mx-auto space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                ProtoTech is a recognized leader with over 20 years of experience in custom software development for CAD/CAE/CAM. 
                Reach out to us for solutions designed specifically to meet your unique needs and help drive your business forward.
              </p>
              <p>
                Enhancing your CAD/CAE/CAM software experience involves the addition of custom commands tailored to your specific needs. 
                CAD/CAE/CAM programming allows you to create these commands to perform desired activities efficiently. Here are some illustrative 
                examples of what CAD/CAE/CAM programming can accomplish:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-8 text-left max-w-3xl mx-auto">
                {cadProgrammingExamples.map((example, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-purple-500/50 transition-colors">
                    <CheckCircle size={20} className="text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{example}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductCategoryPage;

