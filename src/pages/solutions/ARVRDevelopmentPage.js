import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { gsap } from 'gsap';

export default function ARVRDevelopmentPage() {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState('AR');

  useEffect(() => {
    gsap.from('.arvr-hero', {
      opacity: 0,
      rotationY: 15,
      duration: 1.2,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div className="bg-gradient-to-b from-purple-950 via-violet-900 to-purple-950 text-white min-h-screen">
      <SEO title="3D AR/VR Development" description="Immersive AR and VR experiences for training, visualization, and collaboration" />
      
      {/* Immersive Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.3),transparent_70%)]"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="arvr-hero">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full mb-6">
                <span className="text-2xl">🥽</span>
                <span className="text-purple-300 font-semibold">IMMERSIVE TECH</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
                3D AR/VR
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                  Development
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Create immersive augmented and virtual reality experiences for training, 
                visualization, design review, and collaboration. Build for VR headsets, 
                AR glasses, and mobile devices.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/contact')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Explore AR/VR
                </button>
                <button className="px-8 py-4 bg-gray-800 border border-gray-700 text-white rounded-xl font-bold hover:bg-gray-700 transition-all">
                  View Portfolio
                </button>
              </div>
            </div>
            <div className="relative">
              {/* AR/VR Toggle */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30">
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setActiveMode('AR')}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                      activeMode === 'AR' 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    AR
                  </button>
                  <button
                    onClick={() => setActiveMode('VR')}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                      activeMode === 'VR' 
                        ? 'bg-fuchsia-500 text-white' 
                        : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    VR
                  </button>
                </div>
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-2xl flex items-center justify-center">
                  <div className="text-9xl">{activeMode === 'AR' ? '📱' : '🥽'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-16">Platforms & Technologies</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Unity', icon: '🎮' },
              { name: 'Unreal', icon: '🕹️' },
              { name: 'ARKit', icon: '🍎' },
              { name: 'ARCore', icon: '🤖' },
              { name: 'WebXR', icon: '🌐' },
              { name: 'Oculus', icon: '🥽' },
              { name: 'HoloLens', icon: '👓' },
              { name: 'Magic Leap', icon: '✨' },
            ].map((platform, idx) => (
              <div key={idx} className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all">
                <div className="text-5xl mb-3">{platform.icon}</div>
                <div className="text-lg font-bold text-white">{platform.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Training Simulations', desc: 'Immersive training environments' },
              { title: 'Design Review', desc: 'Virtual design walkthroughs' },
              { title: 'Remote Collaboration', desc: 'Virtual meeting spaces' },
              { title: 'Product Visualization', desc: '3D product experiences' },
              { title: 'Architecture Walkthroughs', desc: 'Virtual building tours' },
              { title: 'Maintenance Guides', desc: 'AR-assisted maintenance' },
            ].map((useCase, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-500/30 rounded-xl p-8 hover:border-purple-500 transition-all">
                <h3 className="text-2xl font-bold mb-3 text-white">{useCase.title}</h3>
                <p className="text-gray-400">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-bold mb-6 text-white">Create Immersive Experiences</h2>
          <p className="text-xl text-white/90 mb-10">
            Build the future of AR and VR applications
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-12 py-5 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
          >
            Start Your Project
          </button>
        </div>
      </section>
    </div>
  );
}

