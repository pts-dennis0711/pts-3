import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function WebApplicationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
    });
    
    const ctx = gsap.context(() => {
      // Hero section animation - Modern reveal
      const heroBadge = document.querySelector('.hero-badge');
      const heroTitle = document.querySelector('.hero-title');
      const heroDescription = document.querySelector('.hero-description');
      const heroButtons = document.querySelectorAll('.hero-buttons');
      const heroImage = document.querySelector('.hero-image');
      
      const heroTimeline = gsap.timeline({ defaults: { ease: 'expo.out', force3D: true } });
      
      if (heroBadge) {
        gsap.set(heroBadge, { opacity: 0, scale: 0.5, rotation: -180 });
        heroTimeline.to(heroBadge, { 
          opacity: 1, 
          scale: 1, 
          rotation: 0,
          duration: 0.8,
          ease: 'back.out(1.7)'
        });
      }
      
      if (heroTitle) {
        gsap.set(heroTitle, { opacity: 0, y: 80, filter: 'blur(20px)' });
        heroTimeline.to(heroTitle, { 
          opacity: 1, 
          y: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'expo.out'
        }, '-=0.5');
      }
      
      if (heroDescription) {
        gsap.set(heroDescription, { opacity: 0, y: 50, scale: 0.9 });
        heroTimeline.to(heroDescription, { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out'
        }, '-=0.8');
      }
      
      if (heroButtons.length > 0) {
        heroButtons.forEach((btn, i) => {
          gsap.set(btn, { opacity: 0, scale: 0.6, y: 40 });
          heroTimeline.to(btn, { 
            opacity: 1, 
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: 'back.out(1.4)'
          }, `-=${0.7 - i * 0.15}`);
        });
      }
      
      if (heroImage) {
        gsap.set(heroImage, { opacity: 0, scale: 0.8, rotationY: -30, transformPerspective: 1000 });
        heroTimeline.to(heroImage, { 
          opacity: 1, 
          scale: 1,
          rotationY: 0,
          duration: 1.4,
          ease: 'expo.out'
        }, '-=1');
      }

      // Feature boxes - Futuristic reveal with glow
      const featureBoxes = gsap.utils.toArray('.feature-box');
      featureBoxes.forEach((box, i) => {
        const direction = i % 2 === 0 ? -1 : 1;
        gsap.set(box, { 
          opacity: 0, 
          x: direction * 120,
          scale: 0.7,
          rotationY: direction * 45,
          filter: 'blur(20px)',
          transformPerspective: 1000
        });
        
        gsap.to(box, {
          opacity: 1,
          x: 0,
          scale: 1,
          rotationY: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'expo.out',
          force3D: true,
          scrollTrigger: {
            trigger: box,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            once: true,
            refreshPriority: -1
          },
          delay: i * 0.12
        });
        
        // Glow effect on hover
        box.addEventListener('mouseenter', () => {
          gsap.to(box, {
            scale: 1.08,
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.5)',
            duration: 0.4,
            ease: 'power2.out'
          });
        });
        
        box.addEventListener('mouseleave', () => {
          gsap.to(box, {
            scale: 1,
            boxShadow: '0 0 0 rgba(59, 130, 246, 0)',
            duration: 0.4,
            ease: 'power2.out'
          });
        });
      });

      // Technology stack section
      gsap.from('.tech-stack', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.tech-stack',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          once: true
        }
      });

      // Use cases
      gsap.utils.toArray('.use-case-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            once: true
          },
          delay: i * 0.12
        });
      });

      // CTA section
      gsap.from('.cta-section', {
        opacity: 0,
        y: 50,
        scale: 0.98,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white min-h-screen">
      <SEO title="3D Web Application Development" description="Build powerful 3D web applications with WebGL and modern frameworks" />
      
      {/* Hero with Split Design */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="hero-badge inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-300 mb-6 text-sm font-semibold">
                WEB DEVELOPMENT
              </div>
              <h1 className="hero-title text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
                3D Web
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Applications
                </span>
              </h1>
              <p className="hero-description text-xl text-gray-300 mb-8 leading-relaxed">
                Build immersive 3D web experiences using WebGL, Three.js, and modern frameworks. 
                Create interactive viewers, configurators, and collaborative platforms that run seamlessly in browsers.
              </p>
              <div className="hero-buttons flex gap-4">
                <button 
                  onClick={() => navigate('/contact')}
                  className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
                >
                  Get Started
                </button>
                <button className="px-8 py-4 border-2 border-white/30 text-white rounded-lg font-bold hover:bg-white/10 transition-all">
                  View Portfolio
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="hero-image aspect-square bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
                <div className="w-full h-full bg-gray-900/50 rounded-2xl flex items-center justify-center text-9xl">
                  🌐
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid with Cards */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Key Capabilities</h2>
            <p className="text-xl text-gray-400">Everything you need for 3D web applications</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Real-time Rendering', desc: 'High-performance WebGL rendering with 60fps' },
              { icon: '🤝', title: 'Multi-user Collaboration', desc: 'Live collaboration with real-time updates' },
              { icon: '📱', title: 'Responsive Design', desc: 'Works seamlessly across all devices' },
              { icon: '🎨', title: 'Custom Shaders', desc: 'Advanced visual effects and materials' },
              { icon: '🔧', title: 'Interactive Tools', desc: 'Measurement, annotation, and markup tools' },
              { icon: '☁️', title: 'Cloud Integration', desc: 'Seamless cloud storage and processing' },
            ].map((feature, idx) => (
              <div key={idx} className="feature-box bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="tech-stack py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Technology Stack</h2>
              <div className="space-y-4">
                {['Three.js', 'React Three Fiber', 'WebGL/WebGPU', 'Babylon.js', 'A-Frame', 'PlayCanvas'].map((tech, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-900 rounded-xl border border-gray-800">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-lg text-gray-300">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-12 border border-white/10">
              <h3 className="text-2xl font-bold mb-4">Performance Metrics</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Load Time</span>
                    <span className="text-white font-bold">&lt;2s</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Frame Rate</span>
                    <span className="text-white font-bold">60fps</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">File Size</span>
                    <span className="text-white font-bold">Optimized</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Product Visualization', desc: 'Interactive 3D product viewers for e-commerce' },
              { title: 'Architectural Visualization', desc: '3D building walkthroughs and presentations' },
              { title: 'Training Simulators', desc: 'Interactive training environments' },
              { title: 'Data Visualization', desc: '3D charts and interactive data displays' },
            ].map((useCase, idx) => (
              <div key={idx} className="use-case-card bg-gray-800 border border-gray-700 rounded-xl p-8 hover:scale-105 transition-transform">
                <h3 className="text-2xl font-bold mb-3 text-white">{useCase.title}</h3>
                <p className="text-gray-400">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6 text-white">Ready to Build Your 3D Web App?</h2>
          <p className="text-xl text-white/90 mb-8">
            Let's discuss your project and create something amazing together
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Start Your Project
          </button>
        </div>
      </section>
    </div>
  );
}

