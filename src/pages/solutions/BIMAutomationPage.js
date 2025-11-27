import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function BIMAutomationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.automation-item').forEach((item, i) => {
        gsap.from(item, {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%'
          },
          delay: i * 0.1
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white min-h-screen">
      <SEO title="BIM Automation" description="Automate BIM workflows and processes for increased efficiency" />
      
      {/* Dark Tech Hero */}
      <section className="relative min-h-[85vh] flex items-center border-b border-teal-500/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(20,184,166,0.15),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-4xl">
            <div className="text-teal-400 font-mono text-sm mb-6 tracking-widest">AUTOMATION</div>
            <h1 className="text-7xl md:text-8xl font-black mb-8 leading-tight">
              BIM
              <br />
              <span className="text-teal-400">Automation</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Automate repetitive BIM tasks, streamline workflows, and increase productivity. 
              Custom scripts, plugins, and automation tools for Revit, AutoCAD, and other BIM platforms.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-teal-500 text-black font-bold rounded-lg hover:bg-teal-400 transition-all"
            >
              Automate Workflows
            </button>
          </div>
        </div>
      </section>

      {/* Automation Types */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold mb-16 text-center">Automation Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🤖', title: 'Model Generation', desc: 'Automated model creation from data' },
              { icon: '🔄', title: 'Data Processing', desc: 'Batch processing and updates' },
              { icon: '📊', title: 'Reporting', desc: 'Automated report generation' },
              { icon: '✅', title: 'Quality Checks', desc: 'Automated validation and QA' },
              { icon: '📤', title: 'Export/Import', desc: 'Automated file conversions' },
              { icon: '🔗', title: 'Integration', desc: 'Connect with other systems' },
            ].map((item, idx) => (
              <div key={idx} className="automation-item bg-gray-800 border border-gray-700 rounded-xl p-8 hover:border-teal-500/50 transition-all">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { stat: '80%', desc: 'Time Savings' },
              { stat: '90%', desc: 'Error Reduction' },
              { stat: '5x', desc: 'Productivity Increase' },
              { stat: '24/7', desc: 'Automated Processing' },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
                <div className="text-6xl font-bold text-teal-400 mb-4">{benefit.stat}</div>
                <div className="text-xl text-gray-400">{benefit.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-r from-teal-600 to-cyan-600 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-bold mb-6 text-white">Automate Your BIM Workflows</h2>
          <p className="text-xl text-white/90 mb-10">
            Save time and increase efficiency with BIM automation
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-12 py-5 bg-white text-teal-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

