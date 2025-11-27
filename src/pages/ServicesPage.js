import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, DraftingCompass, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import InternalBanner from '../components/InternalBanner';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import { servicesContent } from '../content/services.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Services grouped by category to match navigation menu
const SERVICES_BY_CATEGORY = [
  {
    group: 'BIM Services',
    icon: Building2,
    description: 'Comprehensive BIM modeling and coordination services for building information management',
    services: [
      { 
        title: 'BIM Modeling', 
        description: 'LOD 200–400 with coordination deliverables and clash detection.', 
        slug: 'bim-modeling',
        features: ['LOD 200-400', 'Coordination', 'Clash Detection', 'Model Federation']
      },
      { 
        title: 'Revit MEP Drafting', 
        description: 'Professional MEP (Mechanical, Electrical, Plumbing) drafting services using Revit.', 
        slug: 'revit-mep-drafting',
        features: ['MEP Systems', 'Revit Modeling', 'Coordination', 'Documentation']
      },
      { 
        title: 'Scan To BIM', 
        description: 'Convert point cloud data from laser scanning to accurate BIM models.', 
        slug: 'scan-to-bim',
        features: ['Point Cloud Processing', 'Model Creation', 'Accuracy', 'As-Built Models']
      },
      { 
        title: 'Revit Family Creation', 
        description: 'Custom Revit family creation for your specific project requirements.', 
        slug: 'revit-family-creation',
        features: ['Custom Families', 'Parametric Modeling', 'Standards Compliance', 'Quality Assurance']
      },
      { 
        title: 'CAD to BIM', 
        description: 'Convert existing CAD drawings to intelligent BIM models.', 
        slug: 'cad-to-bim',
        features: ['CAD Conversion', 'BIM Modeling', 'Data Migration', 'Standards Compliance']
      },
      { 
        title: 'BIM Coordination', 
        description: 'Multi-disciplinary coordination and clash detection services.', 
        slug: 'bim-coordination',
        features: ['Clash Detection', 'Coordination', 'Model Review', 'Resolution']
      },
      { 
        title: 'As-Built Drawing', 
        description: 'Accurate as-built documentation from field surveys and existing conditions.', 
        slug: 'as-built-drawing',
        features: ['Field Surveys', 'Documentation', 'Accuracy', 'Standards Compliance']
      },
    ],
  },
  {
    group: 'Drafting Services',
    icon: DraftingCompass,
    description: 'Professional CAD drafting services for architectural, structural, and mechanical projects',
    services: [
      { 
        title: 'CAD Drafting', 
        description: 'Professional CAD drafting services with strong standards compliance.', 
        slug: 'cad-drafting',
        features: ['2D Drafting', 'Standards Compliance', 'Quality Assurance', 'Fast Turnaround']
      },
      { 
        title: 'Architectural Drafting', 
        description: 'Detailed architectural drawings and documentation services.', 
        slug: 'architectural-drafting',
        features: ['Floor Plans', 'Elevations', 'Sections', 'Details']
      },
      { 
        title: 'Millwork Drafting', 
        description: 'Specialized drafting for custom millwork and cabinetry projects.', 
        slug: 'millwork-drafting',
        features: ['Custom Millwork', 'Shop Drawings', 'Details', 'Specifications']
      },
      { 
        title: 'Structural CAD Drafting', 
        description: 'Structural engineering drawings and documentation services.', 
        slug: 'structural-cad-drafting',
        features: ['Structural Plans', 'Details', 'Reinforcement', 'Standards Compliance']
      },
      { 
        title: 'Mechanical Drafting', 
        description: 'Mechanical systems drafting including HVAC, plumbing, and piping.', 
        slug: 'mechanical-drafting',
        features: ['HVAC Systems', 'Piping', 'Equipment Layouts', 'Schematics']
      },
    ],
  },
  {
    group: 'Civil & Plant',
    icon: MapPin,
    description: 'Civil engineering and plant design services for infrastructure and industrial projects',
    services: [
      { 
        title: 'Civil CAD Drafting', 
        description: 'Civil engineering drawings for infrastructure and site development projects.', 
        slug: 'civil-cad-drafting',
        features: ['Site Plans', 'Grading', 'Utilities', 'Infrastructure']
      },
      { 
        title: 'Land Survey Drafting', 
        description: 'Topographic, boundary, and plat drawings per jurisdiction requirements.', 
        slug: 'land-survey-drafting',
        features: ['Topographic Surveys', 'Boundary Surveys', 'Plats', 'GIS Integration']
      },
      { 
        title: 'Road and Highway Design', 
        description: 'Road and highway design services including alignments and cross-sections.', 
        slug: 'road-highway-design',
        features: ['Road Design', 'Highway Engineering', 'Drainage', 'Traffic Analysis']
      },
      { 
        title: 'Plant Design Engineering', 
        description: 'Industrial plant design and engineering services for manufacturing facilities.', 
        slug: 'plant-design-engineering',
        features: ['Plant Layout', 'Process Design', 'Equipment Placement', 'Safety Compliance']
      },
    ],
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
    });
    
    const ctx = gsap.context(() => {
      // Banner animation
      const servicesBanner = document.querySelector('.services-banner');
      if (servicesBanner) {
        gsap.from(servicesBanner, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: 'power2.out',
          force3D: true,
          immediateRender: false
        });
      }

      // Category sections animation
      const categorySections = gsap.utils.toArray('.service-category-section');
      categorySections.forEach((section, i) => {
        gsap.from(section, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            once: true,
            refreshPriority: -1
          },
          delay: i * 0.15
        });
      });

      // Service cards animation
      const serviceCards = gsap.utils.toArray('.service-card');
      if (serviceCards.length > 0) {
        serviceCards.forEach((card, i) => {
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

      // Stats numbers counter animation
      gsap.utils.toArray('.stat-item').forEach((item, i) => {
        const number = item.querySelector('.stat-number');
        if (number) {
          const originalText = number.textContent;
          const hasPlus = originalText.includes('+');
          const hasPercent = originalText.includes('%');
          const targetValue = parseInt(originalText.replace(/[^0-9]/g, ''));
          
          const counter = { value: 0 };
          
          gsap.to(counter, {
            value: targetValue,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
              once: true
            },
            onUpdate: function() {
              const val = Math.round(counter.value);
              number.textContent = val + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
            },
            delay: i * 0.1
          });
        }
      });

      // Testimonials section
      const testimonialsSection = document.querySelector('.testimonials-section');
      if (testimonialsSection) {
        gsap.from(testimonialsSection, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: 'power2.out',
          force3D: true,
          immediateRender: false,
          scrollTrigger: {
            trigger: testimonialsSection,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            once: true,
            refreshPriority: -1
          }
        });
      }

      // Contact section
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
  }, []);

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO title="CAD Services" description={servicesContent.banner.subtitle} />
      
      <div className="services-banner">
        <InternalBanner 
          title="CAD Services" 
          subtitle={servicesContent.banner.subtitle}
        />
      </div>

      {/* Services by Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/20 bg-sky-500/10 text-sm text-sky-300 mb-6 backdrop-blur-sm">
            <Sparkles size={16} />
            <span>Professional CAD Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our CAD Services
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Comprehensive CAD services tailored to your engineering and design needs. From BIM modeling to drafting, we deliver precision and quality.
          </p>
        </div>

        {SERVICES_BY_CATEGORY.map((category, categoryIdx) => {
          const IconComponent = category.icon;
          return (
            <div key={categoryIdx} className="service-category-section mb-20">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-500/20 border border-sky-500/30">
                  <IconComponent size={28} className="text-sky-400" />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {category.group}
                  </h3>
                  <p className="text-gray-400 text-lg">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIdx) => (
                  <Link
                    key={serviceIdx}
                    to={`/services/${service.slug}`}
                    className="service-card group relative bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-950/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-sky-500/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(59,130,246,0.2)] hover:transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 via-cyan-500/0 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-2 text-white group-hover:text-sky-200 transition-colors">
                            {service.title}
                          </h4>
                          <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            {service.description}
                          </p>
                        </div>
                        <ArrowRight size={20} className="text-gray-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                      </div>
                      
                      <ul className="space-y-2 mb-4">
                        {service.features.map((feature, featureIdx) => (
                          <li key={featureIdx} className="flex items-center text-xs text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full mr-2 bg-sky-400 flex-shrink-0"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex items-center gap-2 text-sm font-semibold text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Learn more</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Stats Section */}
        <div className="stats-section bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-950/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-12 mb-16 mt-20">
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

      {/* Testimonials */}
      <section className="testimonials-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-900/50">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          What Our Clients Say
        </h2>
        <Testimonials />
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-950/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl shadow-xl p-12">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-center text-gray-400 mb-8 text-lg">
            Contact us to discuss your CAD service requirements
          </p>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
