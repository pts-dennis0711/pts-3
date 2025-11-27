import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { productCategories, whyChooseFeatures, cadProgrammingExamples } from '../data/productCategories';
import { initialData } from '../data/initialData';
import { ArrowRight, CheckCircle, Sparkles, Award, Zap, Shield, Globe, Code, Wrench, Download, Upload, Layers, Settings, Rocket, TrendingUp, Star, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getBreadcrumbSchema } from '../utils/structuredData';

const ShopPage = () => {
  const categories = Object.values(productCategories);
  const successStories = (initialData.successStories || []).slice(0, 2);

  useEffect(() => {
    // Ensure content is visible immediately - set before any animations
    const ensureVisibility = () => {
      const hero = document.querySelector('.products-hero');
      const cards = document.querySelectorAll('.category-card');
      const features = document.querySelectorAll('.feature-item');
      
      if (hero) hero.style.opacity = '1';
      cards.forEach(card => card.style.opacity = '1');
      features.forEach(feature => feature.style.opacity = '1');
    };

    // Set visibility immediately
    ensureVisibility();

    // Small delay to ensure DOM is ready
    let ctx = null;
    const initTimer = setTimeout(() => {
      try {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          // Hero animation - subtle fade in
          const heroElement = document.querySelector('.products-hero');
          if (heroElement) {
            gsap.fromTo(heroElement, 
              { opacity: 0.3, y: 20 },
              { 
                opacity: 1, 
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                delay: 0.2
              }
            );
          }

          // Category cards animation - only if cards exist
          const categoryCards = gsap.utils.toArray('.category-card');
          if (categoryCards.length > 0) {
            categoryCards.forEach((card, i) => {
              // Ensure card is visible first
              gsap.set(card, { opacity: 1 });
              
              // Then animate
              gsap.fromTo(card, 
                { opacity: 0.5, y: 30, scale: 0.98 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.5,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 92%',
                    toggleActions: 'play none none reverse',
                    once: true,
                    markers: false
                  },
                  delay: i * 0.03,
                  onComplete: () => {
                    gsap.set(card, { opacity: 1 });
                  }
                }
              );
            });
          }

          // Features animation - only if features exist
          const featureItems = gsap.utils.toArray('.feature-item');
          if (featureItems.length > 0) {
            // Ensure features are visible first
            featureItems.forEach(item => gsap.set(item, { opacity: 1 }));
            
            gsap.fromTo('.feature-item',
              { opacity: 0.5, x: -15 },
              {
                opacity: 1,
                x: 0,
                duration: 0.4,
                stagger: 0.06,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: '.features-section',
                  start: 'top 88%',
                  toggleActions: 'play none none reverse',
                  once: true,
                  markers: false
                },
                onComplete: () => {
                  featureItems.forEach(item => gsap.set(item, { opacity: 1 }));
                }
              }
            );
          }
        });
      } catch (error) {
        console.warn('GSAP animation error:', error);
        // Ensure visibility on error
        ensureVisibility();
      }
    }, 100);

    // Final fallback: ensure visibility after 1.5 seconds regardless
    const fallbackTimer = setTimeout(() => {
      ensureVisibility();
    }, 1500);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(fallbackTimer);
      if (ctx) {
        ctx.revert();
      }
    };
  }, [categories]);

  // Generate structured data
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://staging8.prototechsolutions.com';
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: `${siteUrl}/` },
    { name: 'Products', url: `${siteUrl}/3d-products` }
  ]);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbSchema]
  };

  // Custom development form state
  const [customFormData, setCustomFormData] = React.useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest! We will get back to you soon.');
    setCustomFormData({ name: '', company: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <style>{`
        /* Ensure content is visible by default */
        .products-hero,
        .category-card,
        .feature-item {
          opacity: 1 !important;
        }
        
        /* Only hide if GSAP is ready to animate */
        @supports (animation: none) {
          .products-hero.animate-ready,
          .category-card.animate-ready,
          .feature-item.animate-ready {
            opacity: 1;
          }
        }
      `}</style>
      <SEO 
        title="ProtoTech Plugins and Add-ons for CAD Software" 
        description="We offer a wide range of 3D file importer and exporter plugins for AutoCAD, Revit, SolidWorks, Inventor, Navisworks, 3ds Max, Fusion 360, Maya, Solid Edge, and other popular CAD software."
        structuredData={structuredData}
      />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-900 via-gray-950 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 products-hero" style={{ opacity: 1 }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300 mb-6 backdrop-blur-sm">
              <Sparkles size={16} className="text-sky-400" />
              <span>ProtoTech Solutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-cyan-100 leading-tight">
              ProtoTech Plugins and Add-ons for CAD Software
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              We offer a wide range of 3D file importer and exporter plugins, on top of various CAD software, i.e. AutoCAD, Revit, SolidWorks, Inventor, Navisworks, 3ds Max, Fusion 360, Maya, Solid Edge, or any other popular CAD software.
            </p>
            <button
              onClick={() => document.getElementById('custom-development').scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span>Request a Custom Solution</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Saves Time Section */}
      <section className="py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-sky-500/30 bg-gradient-to-r from-sky-500/20 via-cyan-500/20 to-sky-500/20 text-lg text-sky-200 font-semibold backdrop-blur-md shadow-[0_8px_32px_rgba(59,130,246,0.2)]">
            <Zap size={22} className="text-sky-400 animate-pulse" />
            <span>SAVES TIME AND BOOSTS WORKFLOWS</span>
            <TrendingUp size={22} className="text-cyan-400" />
          </div>
        </div>
      </section>

      {/* Our Plugins - CAD Platforms Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.06),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300 mb-6 backdrop-blur-sm">
              <Layers size={16} className="text-sky-400" />
              <span>ProtoTech Solutions</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-cyan-100">
              Our Plugins
            </h2>
            <p className="text-2xl text-gray-300">On The Various CAD Platforms</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/3d-products/${category.slug}`}
                className="category-card group relative bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 hover:border-sky-500/60 transition-all duration-500 hover:shadow-[0_25px_80px_rgba(59,130,246,0.3)] hover:transform hover:scale-105 hover:-translate-y-2 text-center overflow-hidden"
                style={{ opacity: 1 }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 via-cyan-500/0 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="h-24 flex items-center justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-sky-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 via-cyan-400 to-sky-500 group-hover:scale-110 transition-transform duration-500">
                        {category.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors mb-3">
                    {category.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-sky-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-medium">View Products</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  {/* Product count badge */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300">
                      <Download size={12} />
                      {category.exporters.length + category.importers.length} Plugins
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 features-section relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300 mb-6 backdrop-blur-sm">
              <Star size={16} className="text-yellow-400" />
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-cyan-100">
              Why Choose ProtoTech's
            </h2>
            <p className="text-2xl text-gray-300">CAD Plugins and Add-ons</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="feature-item group relative bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 hover:border-sky-500/60 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(59,130,246,0.2)] hover:transform hover:scale-[1.02] hover:-translate-y-1"
                style={{ opacity: 1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-cyan-500/0 group-hover:from-sky-500/10 group-hover:to-cyan-500/5 rounded-2xl transition-all duration-300"></div>
                <div className="relative flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="relative">
                      <div className="absolute inset-0 bg-sky-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <CheckCircle size={28} className="relative text-sky-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                  </div>
                  <p className="text-gray-200 text-lg font-medium leading-relaxed group-hover:text-white transition-colors">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Autodesk Partner Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.08),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-yellow-500/30 bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-yellow-500/20 text-lg text-yellow-200 font-semibold mb-8 backdrop-blur-md shadow-[0_8px_32px_rgba(234,179,8,0.2)]">
            <Award size={24} className="text-yellow-400" />
            <span>Autodesk Technology And Developer Partner</span>
            <Award size={24} className="text-yellow-400" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-amber-100">
            Discover Success Stories
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Explore documented success stories and testimonials that demonstrate our expertise of Autodesk technology and Partner services.
          </p>
          <Link
            to="/success"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <span>View All Success Stories</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Custom Development Form Section */}
      <section id="custom-development" className="py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300 mb-6 backdrop-blur-sm">
              <Rocket size={16} className="text-sky-400" />
              <span>Get Started</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-cyan-100">
              Get in touch with us
            </h2>
            <p className="text-xl text-gray-300">Custom Development Solutions</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleCustomSubmit} className="relative bg-gradient-to-br from-gray-800/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-gray-700/50">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-cyan-500/5 rounded-2xl"></div>
              <div className="relative grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">Name</label>
                  <input
                    type="text"
                    value={customFormData.name}
                    onChange={(e) => setCustomFormData({...customFormData, name: e.target.value})}
                    className="w-full bg-gray-900/80 border-2 border-gray-700/50 text-white rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500/50 transition-all placeholder-gray-500 hover:border-gray-600"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">Company Name</label>
                  <input
                    type="text"
                    value={customFormData.company}
                    onChange={(e) => setCustomFormData({...customFormData, company: e.target.value})}
                    className="w-full bg-gray-900/80 border-2 border-gray-700/50 text-white rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500/50 transition-all placeholder-gray-500 hover:border-gray-600"
                    placeholder="Your company"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">Phone Number</label>
                  <input
                    type="tel"
                    value={customFormData.phone}
                    onChange={(e) => setCustomFormData({...customFormData, phone: e.target.value})}
                    className="w-full bg-gray-900/80 border-2 border-gray-700/50 text-white rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500/50 transition-all placeholder-gray-500 hover:border-gray-600"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">Email</label>
                  <input
                    type="email"
                    value={customFormData.email}
                    onChange={(e) => setCustomFormData({...customFormData, email: e.target.value})}
                    className="w-full bg-gray-900/80 border-2 border-gray-700/50 text-white rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500/50 transition-all placeholder-gray-500 hover:border-gray-600"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-200 mb-3">Message</label>
                  <textarea
                    value={customFormData.message}
                    onChange={(e) => setCustomFormData({...customFormData, message: e.target.value})}
                    className="w-full bg-gray-900/80 border-2 border-gray-700/50 text-white rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500/50 transition-all resize-none placeholder-gray-500 hover:border-gray-600"
                    placeholder="Tell us about your project..."
                    rows="6"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full group px-8 py-4 bg-gradient-to-r from-white to-gray-100 text-gray-900 rounded-xl font-bold text-lg hover:from-gray-100 hover:to-white transition-all transform hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                  >
                    <span>Submit</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Custom Development Solutions Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300 mb-6 backdrop-blur-sm">
                <Settings size={16} className="text-sky-400" />
                <span>Custom Solutions</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-cyan-100">
                Custom Development Solutions
              </h2>
              <p className="text-xl text-gray-300 mb-4 leading-relaxed">
                ProtoTech is a recognized leader with over <span className="font-semibold text-white">20 years of experience</span> in custom software development for CAD/CAE/CAM. Reach out to us for solutions designed specifically to meet your unique needs and help drive your business forward.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Enhancing your CAD/CAE/CAM software experience involves the addition of custom commands tailored to your specific needs. CAD/CAE/CAM programming allows you to create these commands to perform desired activities efficiently. Here are some illustrative examples of what CAD/CAE/CAM programming can accomplish:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {cadProgrammingExamples.map((example, index) => (
                <div 
                  key={index} 
                  className="group relative bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl p-7 hover:border-sky-500/60 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(59,130,246,0.2)] hover:transform hover:scale-[1.02] hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-cyan-500/0 group-hover:from-sky-500/10 group-hover:to-cyan-500/5 rounded-2xl transition-all duration-300"></div>
                  <div className="relative flex items-start gap-5">
                    <div className="flex-shrink-0 mt-1">
                      <div className="relative">
                        <div className="absolute inset-0 bg-sky-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-500/20 border border-sky-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Code size={24} className="text-sky-400 group-hover:text-cyan-400 transition-colors" />
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-200 text-lg font-medium leading-relaxed pt-2 group-hover:text-white transition-colors">{example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300 mb-6 backdrop-blur-sm">
                <Star size={16} className="text-yellow-400" />
                <span>Client Success</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-cyan-100">
                See How We Helped Our Clients Succeed
              </h2>
              <p className="text-xl text-gray-300">Our Success Stories</p>
            </div>
            <Link
              to="/success"
              className="hidden md:flex items-center gap-2 px-6 py-3 border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white rounded-xl font-semibold hover:border-sky-500/50 hover:bg-sky-500/10 transition-all group"
            >
              <span>View All</span>
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {successStories.map((story) => (
              <Link
                key={story.id}
                to={`/success/${story.id}`}
                className="group relative bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden hover:border-sky-500/60 transition-all duration-500 hover:shadow-[0_25px_80px_rgba(59,130,246,0.3)] hover:transform hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-sky-500/10 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500"></div>
                <div className="relative h-56 bg-gradient-to-br from-sky-600/40 via-purple-600/30 to-pink-600/30 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
                  <div className="relative text-8xl transform group-hover:scale-110 transition-transform duration-500">{story.image}</div>
                </div>
                <div className="relative p-7">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-4 py-1.5 rounded-full bg-sky-500/10 text-sky-300 text-sm font-medium border border-sky-500/20">
                      {story.industry}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-300 line-clamp-3 mb-5 leading-relaxed">{story.description}</p>
                  <div className="flex items-center gap-2 text-sky-400 group-hover:text-cyan-400 transition-colors font-medium">
                    <span className="text-sm">Read More</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link
              to="/success"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white rounded-xl font-semibold hover:border-sky-500/50 hover:bg-sky-500/10 transition-all group"
            >
              <span>View All Success Stories</span>
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
