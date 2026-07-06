"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center bg-slate-950/60 backdrop-blur-md border border-white/10 px-6 py-2.5 shadow-xl shadow-black/40 gap-8 select-none max-w-[95vw] md:max-w-2xl rounded-full">
      {/* Brand logo */}
      <Link href="/" className="font-sans font-black tracking-[-0.05em] uppercase text-xs sm:text-sm text-white hover:text-accent-blue transition-colors">
        CHUNG HEI
      </Link>

      {/* Navigation links */}
      <div className="flex items-center gap-3 sm:gap-6">
        <Link
          href="/"
          className={`font-mono text-[9px] font-bold uppercase tracking-wider transition-all duration-200 ${
            pathname === "/" ? "text-accent-blue border-b border-accent-blue pb-0.5" : "text-neutral-400 hover:text-white"
          }`}
        >
          HOME
        </Link>
        <Link
          href="/about"
          className={`font-mono text-[9px] font-bold uppercase tracking-wider transition-all duration-200 ${
            pathname === "/about" ? "text-accent-blue border-b border-accent-blue pb-0.5" : "text-neutral-400 hover:text-white"
          }`}
        >
          ABOUT
        </Link>
        <a
          href="/#projects"
          className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-all duration-200"
        >
          PROJECTS
        </a>
        <a
          href="/#contact"
          className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-all duration-200"
        >
          CONTACT
        </a>
      </div>

      {/* Status indicator */}
      <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-white/10 bg-white/5 font-mono text-[8px] font-bold text-neutral-300 uppercase tracking-tight">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </span>
        <span>AVAILABLE</span>
      </div>
    </nav>
  );
}
