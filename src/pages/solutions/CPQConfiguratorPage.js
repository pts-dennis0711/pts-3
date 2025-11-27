import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CPQConfiguratorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.benefit-item').forEach((item, i) => {
        gsap.from(item, {
          x: -100,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%'
          },
          delay: i * 0.15
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen">
      <SEO title="CPQ Configurator" description="Configure, Price, Quote solutions with 3D visualization for B2B sales" />
      
      {/* Professional Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.1),rgba(147,51,234,0.1))]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="text-blue-400 font-semibold mb-4 tracking-wide">CPQ SOLUTIONS</div>
            <h1 className="text-7xl md:text-8xl font-bold mb-8 leading-tight">
              CPQ
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Configurator
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Streamline your sales process with Configure, Price, Quote solutions enhanced 
              with 3D visualization. Generate accurate quotes faster, reduce errors, and 
              close more deals with interactive product configuration.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              Request Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Benefits List */}
      <section className="py-24 bg-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold mb-16">Benefits</h2>
          <div className="space-y-8">
            {[
              { title: 'Faster Quotes', desc: 'Generate accurate quotes in minutes instead of days' },
              { title: 'Reduced Errors', desc: 'Automated configuration reduces human error' },
              { title: '3D Visualization', desc: 'Customers see exactly what they\'re ordering' },
              { title: 'Sales Enablement', desc: 'Empower sales teams with powerful tools' },
              { title: 'Integration Ready', desc: 'Seamless integration with CRM and ERP systems' },
            ].map((benefit, idx) => (
              <div key={idx} className="benefit-item flex gap-6 items-start p-6 bg-slate-900 rounded-xl border border-slate-700">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center font-bold text-xl">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{benefit.title}</h3>
                  <p className="text-gray-400 text-lg">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              'Rule-Based Configuration',
              'Dynamic Pricing',
              '3D Visualization',
              'Quote Generation',
              'CRM Integration',
              'ERP Integration',
              'Multi-Currency',
              'Approval Workflows',
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center hover:border-blue-500 transition-all">
                <div className="text-gray-300 font-semibold">{feature}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-r from-blue-600 to-purple-600 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-bold mb-6 text-white">Transform Your Sales Process</h2>
          <p className="text-xl text-white/90 mb-10">
            Get started with CPQ configurator today
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-12 py-5 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
          >
            Schedule Demo
          </button>
        </div>
      </section>
    </div>
  );
}

