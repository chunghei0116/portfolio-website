import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#09090D] border-t border-[#C59B27]/20 py-12 px-6 text-[#94A3B8]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-[#1A2B4C] border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-sm tracking-wider text-white font-bold block">
              OLYMPUS<span className="text-[#C59B27]">.DEV</span>
            </span>
            <span className="text-[11px] font-mono text-[#64748B]">
              CHRONICLES OF THE DIGITAL REALM
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
          <a href="#pantheon" className="hover:text-[#C59B27] transition-colors">
            PILLARS
          </a>
          <a href="#odyssey" className="hover:text-[#C59B27] transition-colors">
            ODYSSEY
          </a>
          <a href="#armory" className="hover:text-[#C59B27] transition-colors">
            ARMORY
          </a>
          <a href="#oracle" className="hover:text-[#C59B27] transition-colors">
            ORACLE
          </a>
        </div>

        {/* Back to Top */}
        <a
          href="#"
          className="flex items-center gap-2 text-xs font-mono text-[#C59B27] hover:text-[#F3E5AB] transition-colors p-2 rounded bg-[#1A2B4C]/40 border border-[#C59B27]/20 hover:border-[#C59B27]"
        >
          <span>ASCEND</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#64748B] gap-2 text-center sm:text-left">
        <div>© {new Date().getFullYear()} OLYMPUS.DEV · FORGED WITH THREE.JS & NEXT.JS</div>
        <div>COORDINATES: MOUNT OLYMPUS · 39.8579° N, 22.3586° E</div>
      </div>
    </footer>
  );
}
