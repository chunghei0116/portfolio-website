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
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#B8860B]/30 bg-[#FFFFFF]/80 backdrop-blur-md text-[#B8860B] text-xs font-mono tracking-wider uppercase mb-10 shadow-[0_4px_15px_rgba(184,134,11,0.12)]">
          <span className="w-2 h-2 rounded-full bg-[#B8860B] animate-ping" />
          <span>OLYMPUS / 26 — SUNLIT MARBLE DIGITAL REALM · ORACLE ONLINE</span>
        </div>

        {/* Hero Stacked Display Header */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-extrabold tracking-tight uppercase leading-[0.95] max-w-5xl text-[#0F172A] mb-12">
          <span className="block text-[#0F172A]">FORGED FOR REALMS</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B]">
            THAT SHINE
          </span>
          <span className="block font-serif normal-case italic font-normal text-[#334155] tracking-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-1">
            under golden sun.
          </span>
        </h1>

        {/* Hero Spec-Sheet Metadata Row (Hyperlane 3-cell pattern) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#B8860B]/20 bg-[#FFFFFF]/90 backdrop-blur-md rounded-xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
          <div className="p-5">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-[#B8860B] font-semibold mb-1">
              Architect
            </span>
            <span className="block text-sm font-bold text-[#0F172A]">
              Jones Tse · Creative Technologist
            </span>
          </div>

          <div className="p-5">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-[#B8860B] font-semibold mb-1">
              Realm Clock (UTC+8)
            </span>
            <span className="block text-sm font-mono font-bold text-[#1D4ED8] tracking-widest">
              {timeString}
            </span>
          </div>

          <div className="p-5">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-[#B8860B] font-semibold mb-1">
              Coordinates
            </span>
            <span className="block text-sm font-bold text-[#0F172A]">
              Mount Olympus · 39.85° N, 22.35° E
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between pt-6 border-t border-slate-200 text-xs font-mono text-[#475569]">
        <span>Scroll to inspect labors</span>
        <span className="text-[#B8860B] font-semibold">↓ 01 · Virtues</span>
      </div>
    </section>
  );
}
