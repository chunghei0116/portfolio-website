'use client';

import React, { useEffect, useState } from 'react';

export default function AtmosphericBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [activeBgIndex, setActiveBgIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const height = window.innerHeight;
      const index = Math.min(3, Math.floor((window.scrollY + height * 0.4) / height));
      setActiveBgIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bgImages = [
    // Hero Entrance: Aegean Sea / Ancient Greek Twilight Coast
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2400&q=85',
    // Section I: Selected Works (Ancient Sculpture Spotlight)
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=2400&q=85',
    // Section II: Artifacts (Dark Obsidian & Gold Vein Marble)
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    // Section III: Registry / Contact (Classical Temple Columns in Starlight)
    'https://images.unsplash.com/photo-1548783469-d82f342be810?auto=format&fit=crop&w=2400&q=85',
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {bgImages.map((src, idx) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000 ease-out"
          style={{
            opacity: activeBgIndex === idx ? 0.35 : 0,
            transform: `scale(${1 + scrollY * 0.00025}) translateY(${scrollY * (idx % 2 === 0 ? 0.08 : -0.05)}px)`,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Atmospheric Dark Grain Vignette & Grid Lines Overlay */}
      <div className="absolute inset-0 vignette-overlay opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:64px_64px] opacity-[0.03]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A0B0D] to-transparent pointer-events-none" />
    </div>
  );
}
