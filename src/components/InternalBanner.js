import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Code, 
  Zap, 
  Cloud, 
  Database, 
  Cpu, 
  Globe, 
  Sparkles, 
  Rocket,
  Layers,
  Box,
  Package,
  Network
} from 'lucide-react';

const InternalBanner = ({ title, subtitle }) => {
  const bannerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const floatingIconsRef = useRef([]);

  // Floating icons configuration
  const floatingIcons = [
    { icon: Code, size: 24, delay: 0, x: '10%', y: '20%', color: 'text-sky-400' },
    { icon: Zap, size: 20, delay: 0.2, x: '85%', y: '15%', color: 'text-yellow-400' },
    { icon: Cloud, size: 22, delay: 0.4, x: '15%', y: '75%', color: 'text-blue-400' },
    { icon: Database, size: 20, delay: 0.6, x: '80%', y: '70%', color: 'text-purple-400' },
    { icon: Cpu, size: 24, delay: 0.8, x: '50%', y: '10%', color: 'text-green-400' },
    { icon: Globe, size: 22, delay: 1, x: '5%', y: '50%', color: 'text-cyan-400' },
    { icon: Sparkles, size: 18, delay: 1.2, x: '90%', y: '50%', color: 'text-pink-400' },
    { icon: Rocket, size: 20, delay: 1.4, x: '70%', y: '25%', color: 'text-orange-400' },
    { icon: Layers, size: 22, delay: 1.6, x: '25%', y: '30%', color: 'text-indigo-400' },
    { icon: Box, size: 20, delay: 1.8, x: '60%', y: '80%', color: 'text-emerald-400' },
    { icon: Package, size: 18, delay: 2, x: '40%', y: '60%', color: 'text-violet-400' },
    { icon: Network, size: 22, delay: 2.2, x: '75%', y: '55%', color: 'text-rose-400' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with 3D effect
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 60,
          z: -100,
          rotationX: -15,
          scale: 0.8,
          duration: 1.2,
          ease: 'power3.out',
          transformPerspective: 1000,
          transformOrigin: 'center center'
        });
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3
        });
      }

      // Floating icons 3D animations
      floatingIconsRef.current.forEach((iconEl, index) => {
        if (!iconEl) return;
        
        const icon = floatingIcons[index];
        
        // Initial position
        gsap.set(iconEl, {
          x: icon.x,
          y: icon.y,
          opacity: 0,
          scale: 0,
          rotation: 0,
          z: -50
        });

        // Entrance animation
        gsap.to(iconEl, {
          opacity: 0.6,
          scale: 1,
          rotation: 360,
          z: 0,
          duration: 1.5,
          ease: 'back.out(1.7)',
          delay: icon.delay
        });

        // Continuous floating animation
        gsap.to(iconEl, {
          y: `+=${30 + Math.random() * 20}`,
          x: `+=${20 + Math.random() * 15}`,
          rotation: `+=${180 + Math.random() * 180}`,
          z: `+=${30 + Math.random() * 20}`,
          duration: 3 + Math.random() * 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: icon.delay + 1.5
        });

        // 3D tilt on mouse move
        iconEl.addEventListener('mousemove', (e) => {
          const rect = iconEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) / 10;
          const deltaY = (e.clientY - centerY) / 10;

          gsap.to(iconEl, {
            rotationY: deltaX,
            rotationX: -deltaY,
            scale: 1.2,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000
          });
        });

        iconEl.addEventListener('mouseleave', () => {
          gsap.to(iconEl, {
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
          });
        });
      });

      // Parallax effect for background gradients
      const gradientElements = bannerRef.current?.querySelectorAll('.gradient-orb');
      if (gradientElements) {
        gradientElements.forEach((el, i) => {
          gsap.to(el, {
            x: `+=${50 + i * 20}`,
            y: `+=${30 + i * 15}`,
            rotation: `+=${45 + i * 10}`,
            duration: 10 + i * 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
          });
        });
      }

    }, bannerRef);

    return () => ctx.revert();
  }, [title, subtitle]);

  return (
    <div 
      ref={bannerRef} 
      className="relative h-[400px] md:h-[500px] flex items-center justify-center text-white overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="gradient-orb absolute top-0 left-0 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl"></div>
        <div className="gradient-orb absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="gradient-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((iconConfig, index) => {
          const IconComponent = iconConfig.icon;
          return (
            <div
              key={index}
              ref={(el) => (floatingIconsRef.current[index] = el)}
              className={`absolute ${iconConfig.color} opacity-0 pointer-events-auto cursor-pointer transition-opacity hover:opacity-100`}
              style={{
                left: iconConfig.x,
                top: iconConfig.y,
                transform: 'translate(-50%, -50%)',
                transformStyle: 'preserve-3d'
              }}
            >
              <IconComponent size={iconConfig.size} />
              {/* Glow effect */}
              <div 
                className={`absolute inset-0 ${iconConfig.color.replace('text-', 'bg-')} rounded-full blur-md opacity-30 -z-10`}
                style={{ transform: 'translateZ(-10px)' }}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="text-center px-4 relative z-10 max-w-5xl mx-auto">
        {/* Decorative elements */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-transparent via-sky-500/50 to-transparent"></div>
        
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-cyan-100 leading-tight"
          style={{ 
            transformStyle: 'preserve-3d',
            textShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
          }}
        >
          {title}
        </h1>
        
        {subtitle && (
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl opacity-90 font-light text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </p>
        )}

        {/* Bottom decorative line */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* CSS for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateX(10px) scale(1.2);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};

export default InternalBanner;
