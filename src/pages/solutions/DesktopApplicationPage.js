import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function DesktopApplicationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });
      gsap.utils.toArray('.tech-item').forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%'
          }
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <SEO title="3D Desktop Application Development" description="High-performance native 3D desktop applications for complex engineering workflows" />
      
      {/* Minimalist Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="hero-content text-center">
            <div className="text-sm text-green-400 mb-4 font-mono tracking-wider">DESKTOP APPLICATIONS</div>
            <h1 className="text-7xl md:text-8xl font-light mb-8 tracking-tight">
              3D Desktop
              <br />
              <span className="font-bold text-green-400">Applications</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Native desktop applications built for performance, precision, and power. 
              Handle complex 3D models, large datasets, and intensive computations with ease.
            </p>
            <div className="flex justify-center gap-6">
              <button 
                onClick={() => navigate('/contact')}
                className="px-10 py-4 bg-green-500 text-black rounded-full font-bold hover:bg-green-400 transition-all"
              >
                Get Quote
              </button>
              <button className="px-10 py-4 border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Timeline Features */}
      <section className="py-32 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold mb-16 text-center">Why Choose Desktop?</h2>
          <div className="space-y-16">
            {[
              { num: '01', title: 'Native Performance', desc: 'Direct hardware access for maximum speed and efficiency' },
              { num: '02', title: 'Offline Capabilities', desc: 'Work without internet connection, full local processing' },
              { num: '03', title: 'Large File Handling', desc: 'Process massive 3D models and datasets effortlessly' },
              { num: '04', title: 'System Integration', desc: 'Seamless integration with OS and other desktop tools' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="text-6xl font-bold text-green-400/30">{item.num}</div>
                </div>
                <div className="flex-grow pt-4">
                  <h3 className="text-3xl font-bold mb-4 text-white">{item.title}</h3>
                  <p className="text-lg text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Cards */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['C++', 'C#', '.NET', 'Electron', 'Qt', 'Unity', 'Unreal', 'OpenGL'].map((tech, idx) => (
              <div key={idx} className="tech-item bg-gray-900 border border-gray-800 rounded-lg p-6 text-center hover:border-green-500/50 transition-all">
                <div className="text-2xl font-bold text-white">{tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="border-l-2 border-green-500 pl-6 text-left">
              <div className="text-5xl font-bold text-green-400 mb-2">10x</div>
              <div className="text-gray-400">Faster Performance</div>
            </div>
            <div className="border-l-2 border-green-500 pl-6 text-left">
              <div className="text-5xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-gray-400">Offline Capable</div>
            </div>
            <div className="border-l-2 border-green-500 pl-6 text-left">
              <div className="text-5xl font-bold text-green-400 mb-2">∞</div>
              <div className="text-gray-400">File Size Limit</div>
            </div>
            <div className="border-l-2 border-green-500 pl-6 text-left">
              <div className="text-5xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-400">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-black text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-bold mb-8">Build Powerful Desktop Apps</h2>
          <p className="text-xl text-gray-400 mb-12">
            Let's create a desktop application that pushes the boundaries of what's possible
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-12 py-5 bg-green-500 text-black rounded-full font-bold text-lg hover:bg-green-400 transition-all transform hover:scale-105"
          >
            Start Building
          </button>
        </div>
      </section>
    </div>
  );
}

