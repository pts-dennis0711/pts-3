import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp } from 'lucide-react';
import { gsap } from 'gsap';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check initial scroll position
    toggleVisibility();

    // Listen for scroll events with throttling for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!buttonRef.current) return;

    if (isVisible) {
      gsap.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          scale: 0.5,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: 'back.out(1.7)',
        }
      );
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        scale: 0.5,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          // Keep element in DOM but hidden for smoother transitions
        },
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="scroll-to-top-btn group fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border-2 border-sky-400/40 bg-gradient-to-br from-sky-500/90 via-cyan-500/90 to-indigo-500/90 text-white shadow-[0_8px_32px_rgba(56,189,248,0.4),0_0_60px_rgba(129,140,248,0.3)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-sky-300/60 hover:shadow-[0_12px_48px_rgba(56,189,248,0.6),0_0_80px_rgba(129,140,248,0.5),inset_0_0_20px_rgba(56,189,248,0.2)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:ring-offset-2 focus:ring-offset-gray-950 active:scale-95 pointer-events-auto"
      aria-label="Scroll to top"
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      {/* Glow effect layers */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400/0 via-sky-400/40 to-cyan-400/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"></div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/0 via-indigo-500/50 to-purple-500/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300 -z-10"></div>
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400/0 via-cyan-400/60 to-indigo-400/0 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300 -z-10"></div>
      
      {/* Icon */}
      <ChevronUp 
        className="relative z-10 w-5 h-5 md:w-6 md:h-6 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" 
        strokeWidth={2.5}
      />
      
      {/* Pulsing ring effect */}
      <div className="absolute inset-0 rounded-full border-2 border-sky-400/0 group-hover:border-sky-300/60 transition-all duration-300 -z-10 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.8),inset_0_0_20px_rgba(56,189,248,0.2)]"></div>
    </button>
  );
};

export default ScrollToTop;

