'use client';

import React, { useState, useEffect } from 'react';
import HeroCanvas from './HeroCanvas';

export default function HyperlaneHero() {
  const [timeString, setTimeString] = useState<string>('00:00:00');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimeString(`${hours}:${minutes}:${seconds}`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="top" className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 overflow-hidden">
      {/* 3D Canvas Background Layer */}
      <HeroCanvas />

      <div className="max-w-5xl mx-auto w-full relative z-10 my-auto">
        {/* Hero Announcement Rail */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#C59B27]/30 bg-[#1A2B4C]/40 backdrop-blur-md text-[#C59B27] text-xs font-mono tracking-wider uppercase mb-10">
          <span className="w-2 h-2 rounded-full bg-[#C59B27] animate-ping" />
          <span>OLYMPUS / 26 — A HOMERIC DIGITAL REALM · ORACLE ONLINE</span>
        </div>

        {/* Hero Stacked Display Header */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-extrabold tracking-tight uppercase leading-[0.95] max-w-5xl text-white mb-12">
          <span className="block text-white">FORGED FOR REALMS</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C59B27] via-[#F3E5AB] to-[#C59B27]">
            THAT SHINE
          </span>
          <span className="block font-serif normal-case italic font-normal text-[#E2E8F0] tracking-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-1">
            after dark.
          </span>
        </h1>

        {/* Hero Spec-Sheet Metadata Row (Hyperlane 3-cell pattern) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-b border-white/10 bg-[#121218]/60 backdrop-blur-md rounded-xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          <div className="p-5">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-[#C59B27] mb-1">
              Architect
            </span>
            <span className="block text-sm font-semibold text-white">
              Jones Tse · Creative Technologist
            </span>
          </div>

          <div className="p-5">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-[#C59B27] mb-1">
              Realm Clock (UTC+8)
            </span>
            <span className="block text-sm font-mono font-bold text-[#F3E5AB] tracking-widest">
              {timeString}
            </span>
          </div>

          <div className="p-5">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-[#C59B27] mb-1">
              Coordinates
            </span>
            <span className="block text-sm font-semibold text-white">
              Mount Olympus · 39.85° N, 22.35° E
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between pt-6 border-t border-white/10 text-xs font-mono text-[#94A3B8]">
        <span>Scroll to inspect labors</span>
        <span className="text-[#C59B27]">↓ 01 · Virtues</span>
      </div>
    </section>
  );
}
