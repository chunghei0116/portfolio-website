'use client';

import React from 'react';

export default function Navbar() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2.5rem)] max-w-4xl">
      <div className="bg-[#FFFFFF]/90 backdrop-blur-xl border border-[#B8860B]/25 px-6 py-3 rounded-full shadow-[0_4px_25px_rgba(15,23,42,0.06)] flex items-center justify-between">
        {/* Brand */}
        <a href="#top" className="font-mono text-xs font-bold tracking-widest uppercase text-[#0F172A] hover:text-[#B8860B] transition-colors flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B8860B]" />
          OLYMPUS<span className="text-[#B8860B] font-normal">/26</span>
        </a>

        {/* Links */}
        <nav className="flex items-center gap-6 font-mono text-xs text-[#475569]">
          <a href="#labors" className="hover:text-[#B8860B] transition-colors">Works</a>
          <a href="#stack" className="hover:text-[#B8860B] transition-colors">Stack</a>
          <a href="#summon" className="hover:text-[#B8860B] transition-colors">Contact</a>
        </nav>

        {/* CTA */}
        <a
          href="#summon"
          className="hidden sm:inline-flex px-4 py-1.5 rounded-full font-mono text-xs font-bold text-[#FAF8F5] bg-[#B8860B] hover:bg-[#D4AF37] transition-all shadow-[0_2px_10px_rgba(184,134,11,0.2)]"
        >
          Summon →
        </a>
      </div>
    </header>
  );
}
