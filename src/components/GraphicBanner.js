import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function GraphicBanner({
  title,
  subtitle,
  backgroundUrl,
  sideImageUrl,
  overlayColor = 'rgba(1,165,191,0.65)',
  ctas = [],
}) {
  const rootRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctasRef = useRef(null);
  const words = String(title || '').split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Modern split text animation with blur
      const spans = titleRef.current?.querySelectorAll('span._w');
      if (spans && spans.length) {
        spans.forEach((span, i) => {
          gsap.set(span, { y: 50, opacity: 0, filter: 'blur(15px)', scale: 0.8 });
          gsap.to(span, { 
            y: 0, 
            opacity: 1, 
            filter: 'blur(0px)',
            scale: 1,
            duration: 1,
            ease: 'expo.out',
            delay: i * 0.08,
            force3D: true
          });
        });
      } else if (titleRef.current) {
        gsap.set(titleRef.current, { y: 40, opacity: 0, filter: 'blur(15px)' });
        gsap.to(titleRef.current, { 
          y: 0, 
          opacity: 1, 
          filter: 'blur(0px)',
          duration: 1,
          ease: 'expo.out',
          force3D: true
        });
      }
      
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { y: 30, opacity: 0, scale: 0.9 });
        gsap.to(subtitleRef.current, { 
          y: 0, 
          opacity: 1,
          scale: 1,
          delay: 0.3, 
          duration: 0.9, 
          ease: 'power3.out',
          force3D: true
        });
      }
      
      if (ctasRef.current?.children) {
        Array.from(ctasRef.current.children).forEach((cta, i) => {
          gsap.set(cta, { opacity: 0, scale: 0.7, y: 20 });
          gsap.to(cta, { 
            opacity: 1, 
            scale: 1,
            y: 0,
            delay: 0.5 + i * 0.1, 
            duration: 0.8, 
            ease: 'back.out(1.4)',
            force3D: true
          });
        });
      }
      
      if (imgRef.current) {
        gsap.set(imgRef.current, { 
          y: 40, 
          opacity: 0, 
          scale: 0.85,
          rotationY: -20,
          transformPerspective: 1000
        });
        gsap.to(imgRef.current, { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          rotationY: 0,
          duration: 1.2, 
          ease: 'expo.out',
          delay: 0.4,
          force3D: true
        });
      }
      
      // Subtle background zoom with parallax
      if (rootRef.current) {
        gsap.to(rootRef.current, { 
          scale: 1.02, 
          transformOrigin: 'center center', 
          duration: 10, 
          ease: 'none',
          force3D: true
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [backgroundUrl, sideImageUrl, title]);

  useEffect(() => {
    const onMove = (e) => {
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to('.parallax-shape', { x: relX * 15, y: relY * 15, duration: 0.4, ease: 'power2.out' });
      if (imgRef.current) gsap.to(imgRef.current, { x: relX * 10, y: relY * 8, duration: 0.4, ease: 'power2.out' });
    };
    const el = rootRef.current;
    el?.addEventListener('mousemove', onMove);
    return () => el?.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <section ref={rootRef} className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'none' }}
        aria-hidden
      />

      {/* Color overlay - darker for dark theme */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-950/85 to-black/80"
        aria-hidden
      />

      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-20" aria-hidden>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dot-pattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 text-white">
          <h1 ref={titleRef} className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            {words.map((w, i) => (
              <span key={i} className="inline-block mr-2 overflow-hidden align-top">
                <span className="inline-block will-change-transform _w" style={{ display: 'inline-block' }}>{w}</span>
              </span>
            ))}
          </h1>
            {subtitle && (
              <p ref={subtitleRef} className="mt-4 text-lg md:text-xl opacity-95 max-w-2xl drop-shadow">{subtitle}</p>
            )}
            {ctas?.length > 0 && (
              <div ref={ctasRef} className="mt-8 flex flex-wrap gap-3">
                {ctas.map((cta, i) => (
                  <a
                    key={i}
                    href={cta.href || '#'}
                    onClick={cta.onClick}
                    className={`inline-flex items-center px-6 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-opacity ${
                      cta.variant === 'outline' ? 'bg-white/10 border border-white text-white' : 'bg-white text-[#01A5BF]'
                    }`}
                  >
                    {cta.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-white/20 blur-2xl" aria-hidden></div>
              <div className="relative rounded-3xl overflow-hidden border border-white/40 shadow-2xl">
                {sideImageUrl ? (
                  <img ref={imgRef} src={sideImageUrl} alt="Banner visual" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-64 bg-white/40 backdrop-blur flex items-center justify-center text-7xl">🧩</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parallax decorative shapes */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div className="parallax-shape absolute top-10 left-10 text-5xl">🧩</div>
        <div className="parallax-shape absolute bottom-12 right-16 text-5xl">📐</div>
        <div className="parallax-shape absolute top-1/3 right-1/4 text-4xl">☁️</div>
      </div>
    </section>
  );
}


