import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { gsap } from 'gsap';

export default function FurnitureConfiguratorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from('.furniture-hero', {
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div className="bg-amber-50 text-gray-900 min-h-screen">
      <SEO title="3D Furniture Configurator" description="Interactive 3D furniture configurators for retail and e-commerce" />
      
      {/* Warm Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="furniture-hero">
              <div className="inline-block px-4 py-2 bg-amber-200 text-amber-900 rounded-full mb-6 font-bold">
                FURNITURE RETAIL
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-gray-900">
                3D Furniture
                <span className="block text-amber-600">Configurator</span>
              </h1>
              <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                Help customers design their perfect furniture pieces with interactive 3D configurators. 
                Customize materials, colors, dimensions, and see real-time previews. Increase customer 
                satisfaction and reduce returns.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/contact')}
                  className="px-8 py-4 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all shadow-lg"
                >
                  Try Demo
                </button>
                <button className="px-8 py-4 bg-white border-2 border-amber-300 text-amber-700 rounded-xl font-bold hover:bg-amber-50 transition-all">
                  View Gallery
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-amber-200">
                <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center">
                  <div className="text-9xl">🪑</div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-amber-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-amber-900">Material</div>
                  </div>
                  <div className="bg-amber-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-amber-900">Color</div>
                  </div>
                  <div className="bg-amber-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-amber-900">Size</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Customization Options</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🎨', title: 'Materials', desc: 'Wood, metal, fabric options' },
              { icon: '🌈', title: 'Colors', desc: 'Wide range of color choices' },
              { icon: '📏', title: 'Dimensions', desc: 'Custom sizes and measurements' },
              { icon: '🪑', title: 'Styles', desc: 'Multiple design styles' },
            ].map((option, idx) => (
              <div key={idx} className="bg-amber-50 border-2 border-amber-200 rounded-xl p-8 text-center hover:border-amber-400 transition-all">
                <div className="text-6xl mb-4">{option.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{option.title}</h3>
                <p className="text-gray-600">{option.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stat: '40%', desc: 'Increase in Sales' },
              { stat: '60%', desc: 'Reduction in Returns' },
              { stat: '3x', desc: 'Higher Engagement' },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 text-center shadow-lg">
                <div className="text-6xl font-bold text-amber-600 mb-4">{benefit.stat}</div>
                <div className="text-xl text-gray-700">{benefit.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-bold mb-6">Ready to Transform Furniture Sales?</h2>
          <p className="text-xl text-white/90 mb-10">
            Let customers design their perfect furniture with 3D configurators
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-12 py-5 bg-white text-amber-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

