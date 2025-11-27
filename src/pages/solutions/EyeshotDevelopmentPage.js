import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function EyeshotDevelopmentPage() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.capability-card').forEach((card, i) => {
        gsap.from(card, {
          rotationY: -15,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%'
          },
          delay: i * 0.1
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <SEO title="Eyeshot Development" description="Custom development using Eyeshot CAD library for .NET applications" />
      
      {/* Dark Hero with Accent */}
      <section className="relative min-h-[85vh] flex items-center border-b border-orange-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,140,0,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-4xl">
            <div className="text-orange-400 font-mono text-sm mb-6 tracking-widest">EYESHOT .NET</div>
            <h1 className="text-7xl md:text-8xl font-black mb-8 leading-tight">
              Eyeshot
              <br />
              <span className="text-orange-400">Development</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Leverage the power of Eyeshot CAD library for .NET to build robust 3D modeling, 
              visualization, and CAD applications. Professional-grade development with comprehensive 
              CAD functionality out of the box.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-orange-500 text-black font-bold rounded-lg hover:bg-orange-400 transition-all border-2 border-orange-500"
            >
              Start Development
            </button>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Eyeshot Capabilities</h2>
            <p className="text-xl text-gray-500">Comprehensive CAD functionality</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: '3D Modeling', desc: 'Solid and surface modeling operations' },
              { title: 'CAD Drawing', desc: '2D drafting and technical drawings' },
              { title: 'Visualization', desc: 'Advanced rendering and visualization' },
              { title: 'File Import/Export', desc: 'Support for major CAD formats' },
              { title: 'Customization', desc: 'Fully customizable UI and workflows' },
              { title: '.NET Integration', desc: 'Seamless integration with .NET ecosystem' },
            ].map((cap, idx) => (
              <div key={idx} className="capability-card bg-[#111] border border-gray-800 p-8 hover:border-orange-500/50 transition-all">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 text-2xl">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{cap.title}</h3>
                <p className="text-gray-500">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-24 bg-[#0a0a0a] border-y border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Why Eyeshot?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">✓</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Native .NET</h3>
                    <p className="text-gray-500">Built for .NET Framework and .NET Core</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">✓</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Rich Feature Set</h3>
                    <p className="text-gray-500">Comprehensive CAD operations and tools</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">✓</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Performance</h3>
                    <p className="text-gray-500">Optimized for speed and efficiency</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#111] border border-gray-800 rounded-lg p-12">
              <h3 className="text-2xl font-bold mb-6">Supported Formats</h3>
              <div className="grid grid-cols-2 gap-4">
                {['STEP', 'IGES', 'STL', 'OBJ', 'PLY', 'DXF', 'DWG', 'PDF'].map((format, idx) => (
                  <div key={idx} className="px-4 py-3 bg-black border border-gray-800 rounded text-center text-gray-400">
                    {format}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-black text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-bold mb-6">Build with Eyeshot</h2>
          <p className="text-xl text-gray-500 mb-10">
            Professional CAD applications powered by Eyeshot
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-12 py-5 bg-orange-500 text-black font-bold text-lg rounded-lg hover:bg-orange-400 transition-all"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

