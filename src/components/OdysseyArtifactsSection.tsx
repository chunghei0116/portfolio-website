'use client';

import React from 'react';

const relics = [
  {
    symbol: '🏛️',
    title: 'STRATEGY',
    code: 'RELIC I',
    caption: 'SYSTEMIC DIRECTION',
  },
  {
    symbol: '⚡',
    title: 'CRAFT',
    code: 'RELIC II',
    caption: 'PRECISION LOGIC',
  },
  {
    symbol: '⚙️',
    title: 'SYSTEMS',
    code: 'RELIC III',
    caption: 'SCALABLE FORGE',
  },
  {
    symbol: '📐',
    title: 'ARCHITECTURE',
    code: 'RELIC IV',
    caption: 'HIGH DISCIPLINE',
  },
  {
    symbol: '✨',
    title: 'ALCHEMY',
    code: 'RELIC V',
    caption: 'MOTION & GLOW',
  },
  {
    symbol: '👁️',
    title: 'VISION',
    code: 'RELIC VI',
    caption: 'FUTURE DIRECTION',
  },
];

export default function OdysseyArtifactsSection() {
  return (
    <section id="relic" className="relative py-28 px-6 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-20">
        <span className="font-cinzel text-xs text-[#D4AF37] tracking-[0.35em] uppercase mb-2">
          III. RELIC
        </span>
        <h2 className="font-cinzel text-4xl sm:text-5xl text-white font-light tracking-wide mb-4">
          ARTIFACTS & DISCIPLINES
        </h2>
        <div className="w-16 h-[1px] bg-[#D4AF37]/50" />
      </div>

      {/* Clean Spacious Grid with Liquid Glass Circles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
        {relics.map((relic) => (
          <div
            key={relic.title}
            className="group relative rounded-2xl liquid-glass border border-[#ffffff1a] hover:border-[#D4AF37]/40 p-8 sm:p-10 flex flex-col items-center text-center transition-all duration-500 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)]"
          >
            {/* Framed Liquid Glass Circle */}
            <div className="relative mb-6 w-24 h-24 rounded-full liquid-glass border border-[#D4AF37]/30 group-hover:border-[#D4AF37] flex items-center justify-center transition-all duration-500 shadow-[0_0_25px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transform group-hover:scale-110">
              <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                {relic.symbol}
              </span>
              <div className="absolute inset-0 rounded-full border border-white/10 group-hover:scale-125 group-hover:opacity-0 transition-all duration-700 pointer-events-none" />
            </div>

            {/* Code */}
            <span className="font-cinzel text-[10px] text-[#D4AF37] tracking-[0.3em] uppercase mb-1">
              {relic.code}
            </span>

            {/* Single Word Title */}
            <h3 className="font-cinzel text-2xl text-white font-light tracking-widest mb-2 group-hover:text-[#D4AF37] transition-colors">
              {relic.title}
            </h3>

            {/* Tiny Caption */}
            <p className="font-montserrat text-[10px] tracking-[0.25em] text-white/50 uppercase font-light">
              {relic.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
