import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function MobileApplicationPage() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.mobile-hero', {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out'
      });
    });
    return () => ctx.revert();
  }, []);

  const features = [
    { icon: '📱', title: 'AR Integration', desc: 'Augmented reality overlays and experiences' },
    { icon: '📍', title: 'Location Services', desc: 'GPS and location-based features' },
    { icon: '📷', title: 'Camera Integration', desc: 'Capture and process images on-device' },
    { icon: '💾', title: 'Offline Mode', desc: 'Work without connectivity' },
  ];

  return (
    <div className="bg-gradient-to-b from-purple-950 via-gray-950 to-black text-white min-h-screen">
      <SEO title="3D Mobile Application Development" description="Native mobile 3D applications with AR capabilities for iOS and Android" />
      
      {/* Animated Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-red-600/20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="mobile-hero">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full mb-6">
                <span className="text-2xl">📱</span>
                <span className="text-purple-300 font-semibold">MOBILE FIRST</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
                3D Mobile
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Applications
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Build native iOS and Android applications with immersive 3D graphics, 
                AR capabilities, and seamless performance. Perfect for field work, 
                visualization, and on-the-go experiences.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/contact')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Get Started
                </button>
                <button className="px-8 py-4 bg-gray-800 border border-gray-700 text-white rounded-xl font-bold hover:bg-gray-700 transition-all">
                  View Demo
                </button>
              </div>
            </div>
            <div className="relative">
              {/* Phone Mockup */}
              <div className="relative mx-auto w-64 h-[500px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-800">
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-[2.5rem] flex items-center justify-center">
                  <div className="text-8xl">📱</div>
                </div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveFeature(idx)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all ${
                    activeFeature === idx
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-transparent'
                      : 'bg-gray-800 border-2 border-gray-700 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                      <p className="text-sm opacity-90">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-800 rounded-2xl p-12 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-9xl mb-4">{features[activeFeature].icon}</div>
                <h3 className="text-3xl font-bold mb-4">{features[activeFeature].title}</h3>
                <p className="text-gray-400 text-lg">{features[activeFeature].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Support */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Platform Support</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { platform: 'iOS', tech: 'Swift, ARKit', icon: '🍎' },
              { platform: 'Android', tech: 'Kotlin, ARCore', icon: '🤖' },
              { platform: 'Cross-Platform', tech: 'React Native, Flutter', icon: '🌐' },
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-center border border-gray-700">
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-white">{item.platform}</h3>
                <p className="text-gray-400">{item.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-r from-purple-600 to-pink-600 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-bold mb-6 text-white">Ready for Mobile?</h2>
          <p className="text-xl text-white/90 mb-10">
            Bring your 3D experiences to mobile devices with native performance
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-10 py-5 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
          >
            Start Mobile Project
          </button>
        </div>
      </section>
    </div>
  );
}

