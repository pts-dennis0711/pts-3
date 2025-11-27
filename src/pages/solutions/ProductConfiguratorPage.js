import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { gsap } from 'gsap';

export default function ProductConfiguratorPage() {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('blue');

  useEffect(() => {
    gsap.from('.config-hero', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out'
    });
  }, []);

  const colors = [
    { name: 'blue', value: '#3b82f6' },
    { name: 'red', value: '#ef4444' },
    { name: 'green', value: '#10b981' },
    { name: 'purple', value: '#8b5cf6' },
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <SEO title="3D Product Configurator" description="Interactive 3D product configurators for e-commerce and sales" />
      
      {/* Bright Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="config-hero">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6 font-semibold">
                PRODUCT CONFIGURATION
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-gray-900">
                3D Product
                <span className="block text-blue-600">Configurator</span>
              </h1>
              <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                Let customers visualize and customize products in real-time with interactive 
                3D configurators. Increase sales, reduce returns, and enhance customer experience.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/contact')}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
                >
                  Request Demo
                </button>
                <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all">
                  View Examples
                </button>
              </div>
            </div>
            <div className="relative">
              {/* Configurator Preview */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                  <div 
                    className="w-full h-full absolute"
                    style={{ backgroundColor: selectedColor }}
                  ></div>
                  <div className="text-8xl relative z-10">📦</div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                    <div className="flex gap-3">
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.value)}
                          className={`w-12 h-12 rounded-full border-4 transition-all ${
                            selectedColor === color.value ? 'border-blue-600 scale-110' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color.value }}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎨', title: 'Real-time Customization', desc: 'Instant visual updates as customers customize' },
              { icon: '💰', title: 'Increase Sales', desc: 'Higher conversion rates and order values' },
              { icon: '📱', title: 'Mobile Friendly', desc: 'Works perfectly on all devices' },
              { icon: '🔗', title: 'Easy Integration', desc: 'Seamless integration with e-commerce platforms' },
              { icon: '📊', title: 'Analytics', desc: 'Track customer preferences and behavior' },
              { icon: '⚡', title: 'Fast Performance', desc: 'Lightning-fast loading and rendering' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-200">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Perfect For</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {['Furniture', 'Automotive', 'Electronics', 'Fashion', 'Jewelry', 'Home Decor', 'Industrial', 'Medical'].map((item, idx) => (
              <div key={idx} className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center hover:border-blue-400 transition-all">
                <div className="text-3xl font-bold text-blue-600">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-bold mb-6">Ready to Customize?</h2>
          <p className="text-xl text-white/90 mb-10">
            Transform your product presentation with interactive 3D configurators
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

