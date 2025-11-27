import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FAQ_ITEMS = [
  {
    question: 'How do I get started with your platform?',
    answer: 'You can get started by signing up for a free account. We offer comprehensive documentation and tutorials to help you get started quickly.'
  },
  {
    question: 'What file formats do you support?',
    answer: 'We support a wide range of formats including IFC, STEP, USDZ, DWG, and many others. Check our documentation for the complete list.'
  },
  {
    question: 'Do you provide technical support?',
    answer: 'Yes, we offer 24/7 technical support for all our customers. You can reach us through email, chat, or our support portal.'
  },
  {
    question: 'Can I customize the platform to fit my needs?',
    answer: 'Absolutely! Our platform is highly customizable. You can extend functionality through our API, plugins, and customization options.'
  },
  {
    question: 'What is your pricing model?',
    answer: 'We offer flexible pricing plans based on your needs. Contact our sales team for a custom quote tailored to your requirements.'
  },
  {
    question: 'Do you offer training and onboarding?',
    answer: 'Yes, we provide comprehensive training and onboarding sessions to help your team get up to speed quickly and efficiently.'
  },
];

const SUPPORT_OPTIONS = [
  {
    icon: '📚',
    title: 'Documentation',
    description: 'Comprehensive guides and API references',
    link: '/resources'
  },
  {
    icon: '🎥',
    title: 'Video Tutorials',
    description: 'Step-by-step video guides and walkthroughs',
    link: '/resources'
  },
  {
    icon: '💬',
    title: 'Community Forum',
    description: 'Connect with other users and get help',
    link: '#'
  },
  {
    icon: '🎫',
    title: 'Support Tickets',
    description: 'Submit a ticket for technical assistance',
    link: '#contact'
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.support-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
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
      <SEO title="Support - Your Business" description="Get help and support for our platform" />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Support
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We're here to help you succeed. Get the support you need, when you need it.
            </p>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">How Can We Help?</h2>
            <p className="text-xl text-gray-400">Choose the support option that works best for you</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SUPPORT_OPTIONS.map((option, idx) => (
              <div
                key={idx}
                className="support-card bg-gray-800 border border-gray-700 rounded-xl p-8 text-center hover:border-gray-600 transition-all cursor-pointer"
                onClick={() => window.location.href = option.link}
              >
                <div className="text-5xl mb-4">{option.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{option.title}</h3>
                <p className="text-gray-400">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400">Find answers to common questions</p>
          </div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, idx) => (
              <div
                key={idx}
                className="support-card bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800 transition-colors"
                >
                  <span className="text-lg font-semibold text-white">{faq.question}</span>
                  <span className="text-2xl text-gray-400">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 py-4 border-t border-gray-800">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Still Need Help?</h2>
            <p className="text-xl text-gray-400">Contact our support team and we'll get back to you as soon as possible</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

