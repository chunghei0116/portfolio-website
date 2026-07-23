'use client';

import React from 'react';

export default function OdysseyFooter() {
  return (
    <footer className="relative py-12 px-6 border-t border-[#ffffff1a] liquid-glass z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Left emblem & title */}
        <div className="flex items-center gap-3">
          <span className="font-cinzel text-lg text-[#D4AF37]">Ω</span>
          <span className="font-cinzel text-xs text-white tracking-[0.25em] uppercase font-light">
            THE ODYSSEY • MMXXVI
          </span>
        </div>

        {/* Center Minimal Copyright */}
        <div className="font-montserrat text-[10px] text-white/40 tracking-[0.25em] uppercase">
          CURATED MUSEUM EXHIBITION • ALL RIGHTS RESERVED
        </div>

        {/* Right Roman numerals */}
        <div className="font-cinzel text-xs text-[#D4AF37] tracking-[0.3em]">
          EXHIBIT I — IV
        </div>
      </div>
    </footer>
  );
}
