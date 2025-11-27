import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.about-section').forEach((section, i) => {
        gsap.from(section, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
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
      <SEO title="About Us - Your Business" description="Learn about our mission, vision, and values" />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Building the future of 3D engineering and digital transformation
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-section grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">Our Mission</h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-4">
                We are dedicated to accelerating digital transformation in AEC and manufacturing industries 
                through world-class 3D engineering solutions. Our mission is to deliver products and services 
                that make complex engineering challenges simple, accessible, and powerful.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                We believe in empowering developers and businesses to build the future with cutting-edge 
                technology, without the complexity of traditional enterprise solutions.
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
              <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center text-9xl">
                🎯
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-section grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-gray-800 border border-gray-700 rounded-2xl p-8">
              <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-9xl">
                👁️
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-6 text-white">Our Vision</h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-4">
                To become the leading platform for 3D engineering and digital asset management, 
                recognized for innovation, reliability, and developer experience.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                We envision a world where complex 3D workflows are seamless, where interoperability 
                is standard, and where developers can focus on building amazing products instead of 
                wrestling with infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Values</h2>
            <p className="text-xl text-gray-400">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '🚀', title: 'Innovation', desc: 'Always pushing boundaries and exploring new possibilities' },
              { icon: '🤝', title: 'Collaboration', desc: 'Working together to achieve extraordinary results' },
              { icon: '💎', title: 'Quality', desc: 'Excellence in every line of code and every interaction' },
              { icon: '🌍', title: 'Impact', desc: 'Making a real difference in the industries we serve' },
            ].map((value, idx) => (
              <div key={idx} className="about-section bg-gray-800 border border-gray-700 rounded-xl p-8 text-center hover:border-gray-600 transition-all">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                <p className="text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Team</h2>
            <p className="text-xl text-gray-400">Passionate engineers, designers, and innovators</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Engineering', count: '50+', desc: 'Expert developers and architects' },
              { name: 'Design', count: '15+', desc: 'Creative designers and UX specialists' },
              { name: 'Leadership', count: '10+', desc: 'Seasoned executives and managers' },
            ].map((team, idx) => (
              <div key={idx} className="about-section bg-gray-900 border border-gray-800 rounded-xl p-8">
                <div className="text-4xl font-bold mb-2 text-white">{team.count}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{team.name}</h3>
                <p className="text-gray-400">{team.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="about-section">
              <div className="text-5xl font-bold mb-2 text-white">500+</div>
              <div className="text-gray-400">Projects Delivered</div>
            </div>
            <div className="about-section">
              <div className="text-5xl font-bold mb-2 text-white">15+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="about-section">
              <div className="text-5xl font-bold mb-2 text-white">98%</div>
              <div className="text-gray-400">Client Satisfaction</div>
            </div>
            <div className="about-section">
              <div className="text-5xl font-bold mb-2 text-white">50+</div>
              <div className="text-gray-400">Team Members</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

