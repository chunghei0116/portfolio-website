"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-2.5 select-none w-[92vw] max-w-xl rounded-full liquid-glass">
      {/* Brand */}
      <Link
        href="/"
        className="font-sans font-punchy tracking-[-0.04em] uppercase text-sm text-foreground hover:text-accent-blue transition-colors duration-300"
      >
        JONES TSE
      </Link>

      {/* Nav links + CTA */}
      <div className="flex items-center gap-2">
        <a
          href="/#projects"
          className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground/60 hover:text-foreground hover:bg-black/[0.04] px-3 py-1.5 rounded-full transition-all duration-300"
        >
          WORK
        </a>
        <a
          href="/#contact"
          className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground/60 hover:text-foreground hover:bg-black/[0.04] px-3 py-1.5 rounded-full transition-all duration-300"
        >
          CONTACT
        </a>

        {/* Status pill */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.04] font-mono text-[9px] font-bold text-emerald-700 uppercase tracking-wider backdrop-blur-[2px]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          AVAILABLE
        </div>
      </div>
    </nav>
  );
}
