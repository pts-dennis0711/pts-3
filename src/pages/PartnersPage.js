import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PARTNERS = [
  { name: 'Microsoft', category: 'Technology Partner', logo: '🔷' },
  { name: 'Autodesk', category: 'Technology Partner', logo: '🔴' },
  { name: 'Unity', category: 'Platform Partner', logo: '🟠' },
  { name: 'AWS', category: 'Cloud Partner', logo: '🟡' },
  { name: 'Google Cloud', category: 'Cloud Partner', logo: '🔵' },
  { name: 'Adobe', category: 'Design Partner', logo: '🔴' },
];

const PARTNERSHIP_TYPES = [
  {
    title: 'Technology Partners',
    description: 'Integrate our solutions with leading technology platforms',
    benefits: ['API Access', 'Technical Support', 'Co-marketing Opportunities']
  },
  {
    title: 'Solution Partners',
    description: 'Build and deliver solutions using our platform',
    benefits: ['Training & Certification', 'Sales Enablement', 'Revenue Sharing']
  },
  {
    title: 'Channel Partners',
    description: 'Resell our products and services to your customers',
    benefits: ['Discounts & Margins', 'Marketing Support', 'Dedicated Account Manager']
  },
];

export default function PartnersPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.partner-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.1
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO title="Partners - Your Business" description="Partner with us to deliver exceptional solutions" />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Partners
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Join our partner ecosystem and deliver exceptional solutions together
            </p>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Partners</h2>
            <p className="text-xl text-gray-400">Trusted by industry leaders</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="partner-card bg-gray-800 border border-gray-700 rounded-xl p-8 text-center hover:border-gray-600 transition-all"
              >
                <div className="text-6xl mb-4">{partner.logo}</div>
                <h3 className="text-2xl font-bold mb-2 text-white">{partner.name}</h3>
                <p className="text-gray-400">{partner.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Partnership Programs</h2>
            <p className="text-xl text-gray-400">Choose the partnership that fits your business</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PARTNERSHIP_TYPES.map((type, idx) => (
              <div
                key={idx}
                className="partner-card bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-all"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">{type.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{type.description}</p>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-white mr-3"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full px-4 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Become a Partner
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Join our partner program and unlock new opportunities for growth and innovation
          </p>
          <button className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

