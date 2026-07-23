'use client';

import React from 'react';

export default function OdysseyHeroSection() {
  const scrollToWorks = () => {
    const el = document.getElementById('works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="exhibit"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-12 z-10"
    >
      {/* Subtle Roman Emblem Frame Accent */}
      <div className="mb-8 animate-float-slow">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full liquid-glass border border-[#D4AF37]/40 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          <span className="font-cinzel text-xl sm:text-2xl text-[#D4AF37]">Ω</span>
        </div>
      </div>

      {/* Tiny Subtitle */}
      <p className="font-montserrat text-xs sm:text-sm text-[#D4AF37] tracking-[0.35em] uppercase mb-4 opacity-90 font-light">
        CREATIVE DIRECTORY • MMXXVI
      </p>

      {/* Giant Elegant Serif Heading */}
      <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-wider max-w-5xl leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        THE ODYSSEY
      </h1>

      <div className="my-6 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

      {/* Museum Subtitle Caption */}
      <p className="font-montserrat text-xs sm:text-sm text-white/60 tracking-[0.25em] uppercase max-w-md font-light mb-12">
        EXHIBITION OF DIGITAL ARCHITECTURE & LUXURY RELICS
      </p>

      {/* Luxury CTA Button */}
      <button
        onClick={scrollToWorks}
        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full liquid-glass-gold font-montserrat text-xs tracking-[0.3em] uppercase text-white hover:text-[#D4AF37] transition-all duration-500 overflow-hidden cursor-pointer"
      >
        <span className="relative z-10 font-medium">[ ENTER GALLERY ]</span>
        <span className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-300 text-[#D4AF37]">
          →
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/15 to-[#D4AF37]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
      </button>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-white/50">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
