import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Code, Zap, Cloud, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import GraphicBanner from '../components/GraphicBanner';
import LogosCarousel from '../components/LogosCarousel';
import ContactForm from '../components/ContactForm';
import { solutionsContent } from '../content/solutions.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SOLUTIONS = [
  { 
    title: '3D Web App Development', 
    description: 'Viewers, editors, and configurators with collaboration.', 
    slug: '3d-web-application',
    category: '3D Application Development',
    icon: '🌐',
    features: ['Real-time Collaboration', 'WebGL Rendering', 'Multi-user Sessions', 'Cloud Integration']
  },
  { 
    title: '3D Desktop App Development', 
    description: 'Native apps for complex engineering workflows.', 
    slug: '3d-desktop-application',
    category: '3D Application Development',
    icon: '💻',
    features: ['Native Performance', 'Offline Capability', 'Advanced Tools', 'Enterprise Integration']
  },
  { 
    title: '3D Mobile App Development', 
    description: 'Field-ready visualization, capture, and AR overlays.', 
    slug: '3d-mobile-application',
    category: '3D Application Development',
    icon: '📱',
    features: ['AR/VR Support', 'Field Capture', 'Mobile Optimization', 'Cross-platform']
  },
  { 
    title: 'Eyeshot Development', 
    description: 'Professional 3D visualization and CAD components.', 
    slug: 'eyeshot-development',
    category: '3D Application Development',
    icon: '👁️',
    features: ['CAD Components', '3D Visualization', 'Custom Controls', 'High Performance']
  },
  { 
    title: '3D Product Configurator', 
    description: 'Interactive product configuration with real-time visualization.', 
    slug: '3d-product-configurator',
    category: 'Configurators',
    icon: '🎨',
    features: ['Real-time Updates', 'Custom Options', 'Visual Preview', 'E-commerce Integration']
  },
  { 
    title: 'CPQ Configurator', 
    description: 'Configure, price, and quote solutions for complex products.', 
    slug: 'cpq-configurator',
    category: 'Configurators',
    icon: '💰',
    features: ['Pricing Engine', 'Rule-based Config', 'Quote Generation', 'Sales Integration']
  },
  { 
    title: '3D Furniture Configurator', 
    description: 'Custom furniture design and visualization tools.', 
    slug: '3d-furniture-configurator',
    category: 'Configurators',
    icon: '🪑',
    features: ['Custom Design', 'Material Selection', '3D Preview', 'Order Management']
  },
  { 
    title: 'Cloud Services', 
    description: 'Scalable microservices, APIs, and asset processing.', 
    slug: 'cloud-services',
    category: 'Platforms & Cloud',
    icon: '☁️',
    features: ['Microservices', 'REST APIs', 'Asset Processing', 'Scalable Infrastructure']
  },
  { 
    title: '3D AR/VR Development', 
    description: 'Immersive reviews and training with real-time engines.', 
    slug: '3d-ar-vr-development',
    category: 'Platforms & Cloud',
    icon: '🥽',
    features: ['AR/VR Experiences', 'Real-time Rendering', 'Immersive Training', 'Multi-platform']
  },
  { 
    title: 'Data Interoperability', 
    description: 'IFC, STEP, USDZ pipelines and validation.', 
    slug: 'data-interoperability',
    category: 'Data & CAD',
    icon: '🔄',
    features: ['Format Conversion', 'Data Validation', 'Pipeline Automation', 'Standards Compliance']
  },
  { 
    title: 'CAD Translation', 
    description: 'Seamless conversion between CAD formats with data preservation.', 
    slug: 'cad-translation',
    category: 'Data & CAD',
    icon: '📐',
    features: ['Multi-format Support', 'Data Preservation', 'Batch Processing', 'Quality Assurance']
  },
  { 
    title: 'CAD Customization', 
    description: 'Plugins and automation for AutoCAD, Revit, SolidWorks.', 
    slug: 'cad-customization',
    category: 'Data & CAD',
    icon: '⚙️',
    features: ['Plugin Development', 'Workflow Automation', 'API Integration', 'Custom Commands']
  },
  { 
    title: 'ML Data Annotation', 
    description: 'Image, text, and 3D point cloud labeling workflows.', 
    slug: 'ml-data-annotation',
    category: 'Data & CAD',
    icon: '🏷️',
    features: ['Image Annotation', '3D Point Cloud', 'Text Labeling', 'ML Training Data'],
    useServicesSlug: true // Flag to use /services/ instead of /3d-services/
  },
  { 
    title: 'BIM Application', 
    description: 'Coordination, clash detection, and authoring extensions.', 
    slug: 'bim-application',
    category: 'BIM & QA',
    icon: '🏢',
    features: ['Clash Detection', 'Model Coordination', 'Authoring Tools', 'BIM Standards']
  },
  { 
    title: 'BIM Automation', 
    description: 'Automated BIM workflows and process optimization.', 
    slug: 'bim-automation',
    category: 'BIM & QA',
    icon: '🤖',
    features: ['Workflow Automation', 'Process Optimization', 'Rule-based Processing', 'Time Savings']
  },
  { 
    title: 'Quality Assurance', 
    description: 'Manual and automated testing frameworks.', 
    slug: 'quality-assurance',
    category: 'BIM & QA',
    icon: '✅',
    features: ['Test Automation', 'Manual Testing', 'CI/CD Integration', 'Quality Gates']
  },
  { 
    title: 'Game Testing', 
    description: 'Comprehensive testing for games and interactive applications.', 
    slug: 'game-testing',
    category: 'BIM & QA',
    icon: '🎮',
    features: ['Functional Testing', 'Performance Testing', 'Compatibility Testing', 'Bug Tracking']
  },
];

const CATEGORIES = [
  { name: 'All', icon: Sparkles },
  { name: '3D Application Development', icon: Code },
  { name: 'Configurators', icon: Zap },
  { name: 'Platforms & Cloud', icon: Cloud },
  { name: 'Data & CAD', icon: Code },
  { name: 'BIM & QA', icon: CheckCircle2 },
];

export default function SolutionsPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
    });
    
    const ctx = gsap.context(() => {
      // Banner animation
      const bannerContent = document.querySelector('.banner-content');
      if (bannerContent) {
        gsap.from(bannerContent, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: 'power2.out',
          force3D: true,
          immediateRender: false
        });
      }

      // Category filter buttons animation
      const categoryFilters = gsap.utils.toArray('.category-filter');
      if (categoryFilters.length > 0) {
        gsap.from(categoryFilters, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          force3D: true,
          immediateRender: false,
          scrollTrigger: {
            trigger: categoryFilters[0]?.parentElement,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            once: true,
            refreshPriority: -1
          }
        });
      }

      // Solutions grid animation
      const solutionCards = gsap.utils.toArray('.solution-card');
      if (solutionCards.length > 0) {
        solutionCards.forEach((card, i) => {
          gsap.set(card, { 
            opacity: 0, 
            y: 50,
            scale: 0.95
          });
          
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
              once: true,
              refreshPriority: -1
            },
            delay: i * 0.05
          });
        });
      }

      // Stats section animation
      const statsSection = document.querySelector('.stats-section');
      if (statsSection) {
        gsap.from(statsSection, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: 'power2.out',
          force3D: true,
          immediateRender: false,
          scrollTrigger: {
            trigger: statsSection,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            once: true,
            refreshPriority: -1
          }
        });
      }

      // Trusted by section
      const trustedSection = document.querySelector('.trusted-section');
      if (trustedSection) {
        gsap.from(trustedSection, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: 'power2.out',
          force3D: true,
          immediateRender: false,
          scrollTrigger: {
            trigger: trustedSection,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            once: true,
            refreshPriority: -1
          }
        });
      }

      // Contact form animation
      const contactSection = document.querySelector('.contact-section');
      if (contactSection) {
        gsap.from(contactSection, {
          opacity: 0,
          y: 40,
          scale: 0.98,
          duration: 0.7,
          ease: 'power2.out',
          force3D: true,
          immediateRender: false,
          scrollTrigger: {
            trigger: contactSection,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            once: true,
            refreshPriority: -1
          }
        });
      }
      
      ScrollTrigger.refresh();
    });
    return () => ctx.revert();
  }, [selectedCategory]);

  const filteredSolutions = selectedCategory === 'All' 
    ? SOLUTIONS 
    : SOLUTIONS.filter(s => s.category === selectedCategory);

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO title="Product Development" description={solutionsContent.banner.subtitle} />
      
      <GraphicBanner
        title="Product Development"
        subtitle={solutionsContent.banner.subtitle}
        backgroundUrl={solutionsContent.banner.backgroundUrl}
        sideImageUrl={solutionsContent.banner.sideImageUrl}
        ctas={solutionsContent.banner.ctas}
      />

      {/* Solutions Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-sm text-purple-300 mb-6 backdrop-blur-sm">
            <Sparkles size={16} />
            <span>Our Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Product Development Solutions
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">
            Comprehensive product development services for 3D applications, configurators, and engineering tools
          </p>
          
          {/* Category Filter Tabs - Enhanced Design */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((category) => {
              const IconComponent = category.icon;
              const isActive = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`category-filter group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105'
                      : 'bg-gray-900/80 backdrop-blur-sm border border-gray-800 text-gray-300 hover:border-gray-700 hover:bg-gray-800/80 hover:text-white'
                  }`}
                >
                  <IconComponent size={18} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} />
                  <span>{category.name}</span>
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl -z-10"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Solutions Grid - Enhanced Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredSolutions.map((solution, idx) => {
            const solutionPath = solution.useServicesSlug 
              ? `/services/${solution.slug}` 
              : `/3d-services/${solution.slug}`;
            return (
            <Link
              key={idx}
              to={solutionPath}
              className="solution-card group relative bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-950/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(139,92,246,0.3)] hover:transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* Icon and Category Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{solution.icon}</div>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300">
                    {solution.category}
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-200 transition-colors">
                  {solution.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {solution.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-4">
                  {solution.features.slice(0, 3).map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center text-xs text-gray-300">
                      <CheckCircle2 size={14} className="text-purple-400 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-sm font-semibold text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="stats-section bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-950/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-12 mb-20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="stat-item">
              <div className="stat-number text-4xl font-bold mb-2 text-white">500+</div>
              <div className="text-sm text-gray-400">Projects Delivered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number text-4xl font-bold mb-2 text-white">50+</div>
              <div className="text-sm text-gray-400">Expert Engineers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number text-4xl font-bold mb-2 text-white">15+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number text-4xl font-bold mb-2 text-white">98%</div>
              <div className="text-sm text-gray-400">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <section className="trusted-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-900/50">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Trusted By Industry Leaders
        </h2>
        <LogosCarousel />
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-950/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl shadow-xl p-12">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-center text-gray-400 mb-8 text-lg">
            Let's discuss how we can help build your next 3D application
          </p>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
