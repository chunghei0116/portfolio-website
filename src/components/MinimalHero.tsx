'use client';

import React from 'react';
import HeroCanvas from './HeroCanvas';

export default function MinimalHero() {
  return (
    <section id="top" className="relative min-h-[90vh] w-full flex flex-col justify-center px-6 overflow-hidden">
      {/* 3D Canvas Background Layer */}
      <HeroCanvas />

      <div className="max-w-4xl mx-auto w-full relative z-10 pt-28 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B8860B]/30 bg-[#FFFFFF]/80 backdrop-blur-md text-[#B8860B] text-xs font-mono tracking-widest uppercase mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
          Jones Tse · Creative Technologist
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[1.05] text-[#0F172A] max-w-3xl mb-6">
          Architecting Epic <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B]">
            Digital Realms.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#475569] font-normal max-w-xl leading-relaxed mb-10">
          Crafting high-performance 3D WebGL experiences, clean React 19 architectures, and interactive digital interfaces under golden sun.
        </p>

        <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
          <a
            href="#labors"
            className="px-6 py-3 rounded-full font-bold text-[#FAF8F5] bg-[#B8860B] hover:bg-[#D4AF37] transition-all shadow-[0_4px_20px_rgba(184,134,11,0.25)] hover:scale-105"
          >
            Inspect Labors →
          </a>
          <a
            href="#summon"
            className="px-6 py-3 rounded-full font-bold text-[#0F172A] bg-[#FFFFFF] border border-[#B8860B]/30 hover:border-[#B8860B] transition-all hover:scale-105"
          >
            Summon Architect
          </a>
        </div>
      </div>
    </section>
  );
}
