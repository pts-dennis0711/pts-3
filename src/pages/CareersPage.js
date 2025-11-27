import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const OPEN_POSITIONS = [
  {
    title: 'Senior 3D Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Lead development of 3D web applications and rendering pipelines.'
  },
  {
    title: 'BIM Specialist',
    department: 'Engineering',
    location: 'Hybrid',
    type: 'Full-time',
    description: 'Work on BIM tools, IFC interoperability, and coordination workflows.'
  },
  {
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build modern, responsive UIs for our 3D applications and platforms.'
  },
  {
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Manage cloud infrastructure, CI/CD pipelines, and deployment processes.'
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Design intuitive interfaces for complex 3D engineering tools.'
  },
  {
    title: 'QA Engineer',
    department: 'Quality Assurance',
    location: 'Remote',
    type: 'Full-time',
    description: 'Ensure quality and reliability of our products through comprehensive testing.'
  },
];

const BENEFITS = [
  { icon: '💰', title: 'Competitive Salary', desc: 'Top-tier compensation packages' },
  { icon: '🏠', title: 'Remote Work', desc: 'Work from anywhere in the world' },
  { icon: '🏥', title: 'Health Insurance', desc: 'Comprehensive health coverage' },
  { icon: '📚', title: 'Learning Budget', desc: 'Annual budget for courses and conferences' },
  { icon: '🌴', title: 'Unlimited PTO', desc: 'Take time off when you need it' },
];

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState('All');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.career-card').forEach((card, i) => {
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

  const departments = ['All', ...new Set(OPEN_POSITIONS.map(p => p.department))];
  const filteredPositions = selectedDept === 'All' 
    ? OPEN_POSITIONS 
    : OPEN_POSITIONS.filter(p => p.department === selectedDept);

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <SEO title="Careers - Your Business" description="Join our team and build the future of 3D engineering" />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Careers
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Join cross-functional teams building cutting-edge 3D apps and platforms
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Why Work With Us</h2>
            <p className="text-xl text-gray-400">We offer competitive benefits and a great work environment</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, idx) => (
              <div key={idx} className="career-card bg-gray-800 border border-gray-700 rounded-xl p-8 text-center hover:border-gray-600 transition-all">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Open Positions</h2>
            <p className="text-xl text-gray-400">Find your next opportunity with us</p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedDept === dept
                    ? 'bg-white text-gray-900'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Positions Grid */}
          <div className="space-y-4">
            {filteredPositions.map((position, idx) => (
              <div
                key={idx}
                className="career-card bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-all cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-2 text-white">{position.title}</h3>
                    <p className="text-gray-400 mb-3">{position.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                        {position.department}
                      </span>
                      <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                        {position.location}
                      </span>
                      <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">Our Culture</h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-4">
                We believe in creating an environment where everyone can do their best work. 
                Our culture is built on trust, transparency, and continuous learning.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-4">
                We value diversity, inclusion, and different perspectives. Everyone's voice 
                matters, and we encourage open communication and collaboration.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Join us if you're passionate about technology, love solving complex problems, 
                and want to make a real impact in the industries we serve.
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-9xl">
                🤝
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

