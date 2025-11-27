import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CloudServicesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.cloud-service').forEach((service, i) => {
        gsap.from(service, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: service,
            start: 'top 85%'
          },
          delay: i * 0.1
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-gradient-to-b from-sky-50 via-blue-50 to-white text-gray-900 min-h-screen">
      <SEO title="Cloud Services" description="Scalable cloud services for 3D applications, processing, and storage" />
      
      {/* Sky Blue Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-6 py-3 bg-blue-100 text-blue-700 rounded-full mb-8 font-bold text-lg">
              ☁️ CLOUD SERVICES
            </div>
            <h1 className="text-7xl md:text-8xl font-extrabold mb-8 text-gray-900">
              Cloud
              <span className="block text-blue-600">Services</span>
            </h1>
            <p className="text-2xl text-gray-700 mb-12 leading-relaxed">
              Scalable, reliable cloud infrastructure for 3D applications, 
              asset processing, and data management. Built for performance and scale.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-5 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Our Cloud Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🚀', title: 'API Services', desc: 'RESTful APIs for 3D operations' },
              { icon: '⚙️', title: 'Asset Processing', desc: 'Automated 3D model processing' },
              { icon: '💾', title: 'Cloud Storage', desc: 'Scalable storage solutions' },
              { icon: '🔄', title: 'Data Pipeline', desc: 'ETL and data transformation' },
              { icon: '📊', title: 'Analytics', desc: 'Real-time analytics and insights' },
              { icon: '🔒', title: 'Security', desc: 'Enterprise-grade security' },
            ].map((service, idx) => (
              <div key={idx} className="cloud-service bg-gradient-to-br from-blue-50 to-sky-50 border-2 border-blue-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-xl transition-all">
                <div className="text-6xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-700 text-lg">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-gray-900">Why Choose Our Cloud?</h2>
              <div className="space-y-6">
                {[
                  'Auto-scaling infrastructure',
                  '99.9% uptime guarantee',
                  'Global CDN distribution',
                  '24/7 monitoring and support',
                  'Cost-effective pricing',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                    <span className="text-xl text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-12 shadow-2xl border border-blue-200">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Performance Metrics</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-semibold">Uptime</span>
                    <span className="text-blue-600 font-bold">99.9%</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '99.9%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-semibold">Response Time</span>
                    <span className="text-blue-600 font-bold">&lt;100ms</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-semibold">Scalability</span>
                    <span className="text-blue-600 font-bold">Unlimited</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-r from-blue-600 to-sky-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-bold mb-6">Scale Your 3D Applications</h2>
          <p className="text-xl text-white/90 mb-10">
            Leverage our cloud infrastructure for unlimited scale and performance
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-12 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

