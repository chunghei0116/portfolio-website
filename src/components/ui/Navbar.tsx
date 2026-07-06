"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center bg-white/80 backdrop-blur-md border-[3px] border-black px-6 py-2.5 shadow-[4px_4px_0px_#000000] gap-8 select-none max-w-[95vw] md:max-w-2xl rounded-none">
      {/* Brand logo */}
      <Link href="/" className="font-sans font-black tracking-[-0.05em] uppercase text-xs sm:text-sm text-black hover:text-accent-blue transition-colors">
        CHUNG HEI
      </Link>

      {/* Navigation links */}
      <div className="flex items-center gap-3 sm:gap-6">
        <Link
          href="/"
          className={`font-mono text-[9px] font-bold uppercase tracking-wider transition-all duration-200 ${
            pathname === "/" ? "text-accent-blue border-b-2 border-accent-blue pb-0.5" : "text-neutral-500 hover:text-black"
          }`}
        >
          HOME
        </Link>
        <Link
          href="/about"
          className={`font-mono text-[9px] font-bold uppercase tracking-wider transition-all duration-200 ${
            pathname === "/about" ? "text-accent-blue border-b-2 border-accent-blue pb-0.5" : "text-neutral-500 hover:text-black"
          }`}
        >
          ABOUT
        </Link>
        <a
          href="/#projects"
          className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-500 hover:text-black transition-all duration-200"
        >
          PROJECTS
        </a>
        <a
          href="/#contact"
          className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-500 hover:text-black transition-all duration-200"
        >
          CONTACT
        </a>
      </div>

      {/* Status indicator */}
      <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none border border-black/10 bg-black/5 font-mono text-[8px] font-bold text-moss-shadow uppercase tracking-tight">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </span>
        <span>AVAILABLE</span>
      </div>
    </nav>
  );
}
