import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const LogosCarousel = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = document.querySelector('.logos-track');
      if (!track) return;
      const width = track.scrollWidth / 2;
      gsap.to('.logos-track', { 
        x: -width, 
        ease: 'none', 
        repeat: -1, 
        duration: 25,
        scrollTrigger: {
          trigger: '.logos-container',
          start: 'top bottom',
          toggleActions: 'play none none reverse'
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const logos = ['🚀', '🏗️', '🧠', '📐', '🛰️', '🛠️', '📊', '🏢', '💻', '🔧'];
  
  return (
    <div className="logos-container overflow-hidden border-2 border-gray-200 rounded-xl shadow-inner bg-gradient-to-r from-gray-50 to-white">
      <div className="flex logos-track" style={{ width: '200%' }}>
        {[...logos, ...logos].map((l, i) => (
          <div key={i} className="w-48 h-24 flex items-center justify-center text-5xl border-r border-gray-200 bg-white hover:bg-gray-50 transition-colors">
            {l}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogosCarousel;

