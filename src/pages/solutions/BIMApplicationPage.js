import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { gsap } from 'gsap';

export default function BIMApplicationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from('.bim-hero', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div className="bg-emerald-50 text-gray-900 min-h-screen">
      <SEO title="BIM Application Development" description="Building Information Modeling applications for AEC industry" />
      
      {/* Green Hero */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-emerald-100 to-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="bim-hero">
              <div className="inline-block px-4 py-2 bg-emerald-200 text-emerald-900 rounded-full mb-6 font-bold">
                BIM DEVELOPMENT
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-gray-900">
                BIM
                <span className="block text-emerald-600">Applications</span>
              </h1>
              <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                Build powerful Building Information Modeling applications for architecture, 
                engineering, and construction. Support IFC, BCF, and industry standards for 
                seamless collaboration and coordination.
              </p>
              <button 
                onClick={() => navigate('/contact')}
                className="px-10 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg"
              >
                Learn More
              </button>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-emerald-200">
                <div className="aspect-video bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
                  <div className="text-8xl">🏗️</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIM Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">BIM Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'IFC Support', desc: 'Full IFC import/export' },
              { title: 'BCF Integration', desc: 'Issue tracking and coordination' },
              { title: 'Clash Detection', desc: 'Automated conflict detection' },
              { title: 'Model Federation', desc: 'Multi-model coordination' },
              { title: '4D Scheduling', desc: 'Time-based visualization' },
              { title: '5D Costing', desc: 'Quantity takeoff and costing' },
              { title: 'VR/AR View', desc: 'Immersive model review' },
              { title: 'Cloud Collaboration', desc: 'Real-time team collaboration' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6 hover:border-emerald-400 transition-all">
                <h3 className="text-lg font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards Support */}
      <section className="py-20 bg-emerald-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Industry Standards</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['IFC', 'BCF', 'COBie', 'gbXML', 'DWG', 'RVT', 'NWD', 'DGN'].map((standard, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 text-center border-2 border-emerald-200 hover:border-emerald-400 transition-all">
                <div className="text-2xl font-bold text-emerald-600">{standard}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-bold mb-6">Build Better with BIM</h2>
          <p className="text-xl text-white/90 mb-10">
            Create powerful BIM applications for the AEC industry
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-12 py-5 bg-white text-emerald-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
          >
            Start Building
          </button>
        </div>
      </section>
    </div>
  );
}

