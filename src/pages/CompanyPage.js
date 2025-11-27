import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import InternalBanner from '../components/InternalBanner';
import ContactForm from '../components/ContactForm';
import { companyContent } from '../content/company.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const COMPANY_SECTIONS = [
  {
    title: 'Our Mission',
    description: 'Accelerate digital transformation with world-class 3D engineering.',
    icon: '🎯',
    content: 'We are committed to helping AEC and manufacturing companies transform their workflows through cutting-edge 3D engineering solutions. Our mission is to deliver products that make complex engineering challenges simple and accessible.'
  },
  {
    title: 'Leadership',
    description: 'Experienced product and engineering leaders.',
    icon: '👥',
    content: 'Our leadership team brings decades of combined experience in 3D engineering, product development, and enterprise software. We understand the unique challenges of building production-grade 3D applications.'
  },
  {
    title: 'Culture',
    description: 'Customer-obsessed, transparent, quality-first.',
    icon: '🌟',
    content: 'We believe in building strong relationships with our clients through transparency, quality delivery, and a customer-first mindset. Our culture emphasizes collaboration, innovation, and continuous learning.'
  },
  {
    title: 'Global Presence',
    description: 'Distributed teams across time zones.',
    icon: '🌍',
    content: 'With team members across multiple time zones, we provide round-the-clock support and faster delivery cycles. Our distributed model allows us to tap into global talent and serve clients worldwide.'
  },
  {
    title: 'Careers',
    description: 'Join cross-functional squads building modern 3D products.',
    icon: '💼',
    content: 'We are always looking for talented engineers, designers, and product managers who are passionate about 3D technology. Join us in building the next generation of engineering tools and applications.'
  },
  {
    title: 'Security & Compliance',
    description: 'Data governance and compliance as a foundation.',
    icon: '🔒',
    content: 'Security and compliance are at the core of everything we do. We implement strict data governance practices, access controls, and adhere to industry standards to protect our clients\' sensitive information.'
  },
  {
    title: 'Sustainability',
    description: 'Efficient compute and greener workflows.',
    icon: '🌱',
    content: 'We are committed to reducing our environmental impact through optimized compute resources, efficient workflows, and sustainable practices. Every project we deliver is designed with efficiency in mind.'
  },
];

const TIMELINE = [
  { year: '2010', event: 'Company Founded', description: 'Started with a vision to revolutionize 3D engineering' },
  { year: '2015', event: 'First Major Product', description: 'Launched our first commercial 3D application platform' },
  { year: '2018', event: 'Global Expansion', description: 'Expanded operations to serve clients worldwide' },
  { year: '2021', event: 'AI Integration', description: 'Integrated machine learning into our product suite' },
  { year: '2024', event: 'Industry Leader', description: 'Recognized as a leader in 3D engineering solutions' },
];

export default function CompanyPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Banner animation
      gsap.from('.company-banner', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out'
      });

      // Mission statement
      gsap.from('.mission-statement', {
        opacity: 0,
        y: 50,
        scale: 0.98,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.mission-statement',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        }
      });

      // Company sections with enhanced stagger
      gsap.utils.toArray('.company-section').forEach((section, i) => {
        gsap.from(section, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          rotation: -1,
          duration: 1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            once: true
          },
          delay: i * 0.1
        });
      });

      // Timeline with enhanced animations
      gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        const direction = i % 2 === 0 ? -80 : 80;
        gsap.from(item, {
          opacity: 0,
          x: direction,
          scale: 0.9,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            once: true
          },
          delay: i * 0.15
        });
      });

      // Values section
      gsap.from('.values-section', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.values-section',
          start: 'top 80%',
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

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO title="Company" description={companyContent.banner.subtitle} />
      
      <div className="company-banner">
        <InternalBanner 
          title="About Our Company" 
          subtitle={companyContent.banner.subtitle}
        />
      </div>

      {/* Mission Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mission-statement bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-white">Building the Future of 3D Engineering</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We are a team of passionate engineers, designers, and innovators dedicated to creating 
            world-class 3D engineering solutions. Our expertise spans 3D applications, BIM tools, 
            AR/VR experiences, and cloud services that transform how companies work with complex engineering data.
          </p>
        </div>
      </section>

      {/* Company Sections Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {COMPANY_SECTIONS.map((section, idx) => (
            <div
              key={idx}
              className="company-section bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-8 hover:border-gray-700 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-5xl mb-4">{section.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                {section.title}
              </h3>
              <p className="text-gray-400 mb-3 font-semibold">{section.description}</p>
              <p className="text-gray-300 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Our Journey
        </h2>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-700 hidden md:block"></div>
          
          <div className="space-y-12">
            {TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className="timeline-item relative flex flex-col md:flex-row items-center gap-8"
              >
                <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8 md:ml-auto'}`}>
                  <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
                    <div className="text-3xl font-bold mb-2 text-white">
                      {item.year}
                    </div>
                    <div className="text-xl font-semibold mb-2 text-white">{item.event}</div>
                    <div className="text-gray-400">{item.description}</div>
                  </div>
                </div>
                
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-gray-900 bg-white shadow-lg hidden md:block"></div>
                
                <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'md:text-left md:pl-8' : 'md:text-right md:pr-8'}`}>
                  {/* Empty space for alternating layout */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2 text-white">Excellence</h3>
              <p className="text-gray-400">Delivering exceptional quality in every project</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2 text-white">Collaboration</h3>
              <p className="text-gray-400">Working together to achieve common goals</p>
            </div>
            <div>
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-2 text-white">Innovation</h3>
              <p className="text-gray-400">Pushing boundaries with cutting-edge technology</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2 text-white">Impact</h3>
              <p className="text-gray-400">Making a difference in the industries we serve</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-12">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Work With Us
          </h2>
          <p className="text-center text-gray-400 mb-8 text-lg">
            Interested in partnering with us or joining our team? Get in touch!
          </p>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
