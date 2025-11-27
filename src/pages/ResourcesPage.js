import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import InternalBanner from '../components/InternalBanner';
import ContactForm from '../components/ContactForm';
import { resourcesContent } from '../content/resources.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const RESOURCE_CATEGORIES = [
  {
    title: 'Whitepapers',
    description: 'Deep dives into geometry processing, BIM data, and rendering.',
    icon: '📄',
    resources: [
      { title: '3D Geometry Processing Best Practices', type: 'PDF', date: '2024' },
      { title: 'BIM Data Interoperability Guide', type: 'PDF', date: '2024' },
      { title: 'Real-time Rendering Techniques', type: 'PDF', date: '2023' },
    ]
  },
  {
    title: 'Case Studies',
    description: 'How we delivered results in engineering and services engagements.',
    icon: '📊',
    resources: [
      { title: 'Large-Scale BIM Coordination Project', type: 'Case Study', date: '2024' },
      { title: 'AR/VR Training Platform Development', type: 'Case Study', date: '2023' },
      { title: 'Cloud-Based 3D Viewer Implementation', type: 'Case Study', date: '2023' },
    ]
  },
  {
    title: 'Guides',
    description: 'Interoperability, CAD customization, and QA setup best practices.',
    icon: '📚',
    resources: [
      { title: 'IFC File Format Guide', type: 'Guide', date: '2024' },
      { title: 'AutoCAD Plugin Development', type: 'Guide', date: '2024' },
      { title: 'QA Testing Framework Setup', type: 'Guide', date: '2023' },
    ]
  },
  {
    title: 'Webinars',
    description: 'On-demand sessions on AR/VR, pipelines, and ML data ops.',
    icon: '🎥',
    resources: [
      { title: 'Introduction to AR/VR Development', type: 'Video', duration: '45 min', date: '2024' },
      { title: 'Building Cloud Pipelines', type: 'Video', duration: '60 min', date: '2024' },
      { title: 'ML Data Annotation Workflows', type: 'Video', duration: '30 min', date: '2023' },
    ]
  },
  {
    title: 'Tools & Templates',
    description: 'Checklists, templates, and starter repos.',
    icon: '🛠️',
    resources: [
      { title: 'BIM Quality Checklist', type: 'Template', date: '2024' },
      { title: '3D Viewer Starter Template', type: 'Code', date: '2024' },
      { title: 'CI/CD Pipeline Configuration', type: 'Template', date: '2023' },
    ]
  },
  {
    title: 'Community',
    description: 'Forums and events to share knowledge.',
    icon: '👥',
    resources: [
      { title: 'Join Our Developer Forum', type: 'Community', date: 'Ongoing' },
      { title: 'Monthly Tech Meetups', type: 'Event', date: 'Monthly' },
      { title: 'Annual Engineering Conference', type: 'Event', date: '2024' },
    ]
  },
  {
    title: 'FAQ',
    description: 'Common questions about processes and services.',
    icon: '❓',
    resources: [
      { title: 'How long does a typical project take?', type: 'FAQ', date: '2024' },
      { title: 'What file formats do you support?', type: 'FAQ', date: '2024' },
      { title: 'Do you provide ongoing support?', type: 'FAQ', date: '2024' },
    ]
  },
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Banner animation
      gsap.from('.resources-banner', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out'
      });

      // Search section
      gsap.from('.search-section', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.search-section',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
          once: true
        }
      });

      // Resource categories with enhanced animations
      gsap.utils.toArray('.resource-category').forEach((category, i) => {
        gsap.from(category, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          rotation: -1,
          duration: 1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: category,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            once: true
          },
          delay: i * 0.1
        });
      });

      // Featured resources
      gsap.from('.featured-resources', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.featured-resources',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          once: true
        }
      });

      // Newsletter section
      gsap.from('.newsletter-section', {
        opacity: 0,
        y: 40,
        scale: 0.98,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.newsletter-section',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        }
      });

      // Contact section
      gsap.from('.contact-section', {
        opacity: 0,
        y: 50,
        scale: 0.98,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const filteredCategories = RESOURCE_CATEGORIES.filter(category => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return category.title.toLowerCase().includes(query) ||
             category.description.toLowerCase().includes(query) ||
             category.resources.some(r => r.title.toLowerCase().includes(query));
    }
    return true;
  });

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO title="Resources" description={resourcesContent.banner.subtitle} />
      
      <div className="resources-banner">
        <InternalBanner 
          title="Resources" 
          subtitle={resourcesContent.banner.subtitle}
        />
      </div>

      {/* Search and Filter Section */}
      <section className="search-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-grow w-full">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
              />
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category, idx) => (
            <div
              key={idx}
              className="resource-category bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-8 hover:border-gray-700 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{category.icon}</div>
                <h3 className="text-2xl font-bold text-white">
                  {category.title}
                </h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">{category.description}</p>
              
              <div className="space-y-3">
                {category.resources.map((resource, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer border border-gray-700"
                    onClick={() => setSelectedCategory(selectedCategory === idx ? null : idx)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white">{resource.title}</h4>
                      <span className="text-xs px-2 py-1 bg-gray-900 rounded text-gray-300 border border-gray-700">
                        {resource.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{resource.date}</span>
                      {resource.duration && (
                        <>
                          <span>•</span>
                          <span>{resource.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                className="mt-6 w-full px-4 py-2 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
              >
                View All {category.title}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Resources */}
      <section className="featured-resources max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Featured Resources
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold mb-2 text-white">Getting Started Guide</h3>
            <p className="text-gray-400 mb-4">Complete guide to getting started with our 3D engineering solutions</p>
            <button className="text-sm font-semibold hover:underline text-white">
              Read More →
            </button>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
            <div className="text-4xl mb-4">🔥</div>
            <h3 className="text-xl font-bold mb-2 text-white">Latest Updates</h3>
            <p className="text-gray-400 mb-4">Stay up to date with the latest features and improvements</p>
            <button className="text-sm font-semibold hover:underline text-white">
              Learn More →
            </button>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold mb-2 text-white">Best Practices</h3>
            <p className="text-gray-400 mb-4">Learn industry best practices from our expert team</p>
            <button className="text-sm font-semibold hover:underline text-white">
              Explore →
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Stay Updated</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest resources, guides, and updates delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
            />
            <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-12">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Need Help?
          </h2>
          <p className="text-center text-gray-400 mb-8 text-lg">
            Can't find what you're looking for? Contact us and we'll be happy to help
          </p>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
