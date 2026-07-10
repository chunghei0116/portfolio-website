"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 select-none w-[92vw] max-w-xl renaissance-frame parchment-shadow rounded-sm bg-card-bg">
      {/* Brand */}
      <Link
        href="/"
        className="font-serif font-medium tracking-tight text-base text-foreground hover:text-accent-gold transition-colors duration-300"
      >
        Jones Tse
      </Link>

      {/* Nav links + CTA */}
      <div className="flex items-center gap-2">
        <a
          href="/#projects"
          className="font-mono text-[9px] font-bold uppercase tracking-widest text-foreground/70 hover:text-accent-gold px-3 py-1 transition-all duration-300"
        >
          WORK
        </a>
        <a
          href="/#contact"
          className="font-mono text-[9px] font-bold uppercase tracking-widest text-foreground/70 hover:text-accent-gold px-3 py-1 transition-all duration-300"
        >
          CONTACT
        </a>

        {/* Status pill */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 border border-accent-gold/20 bg-accent-gold/[0.04] font-mono text-[8px] font-bold text-accent-gold uppercase tracking-wider">
          <span className="relative flex h-1 w-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-1 w-1 bg-accent-gold" />
          </span>
          AVAILABLE
        </div>
      </div>
    </nav>
  );
}
