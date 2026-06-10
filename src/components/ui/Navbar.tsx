"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 mx-auto w-full max-w-sm px-4">
      <nav className="flex items-center justify-between rounded-full border border-black/[0.04] bg-white/45 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.015)] backdrop-blur-xl">
        {/* Profile/Brand Dot */}
        <Link href="/" className="ml-3.5 flex items-center gap-2 select-none group">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-yellow/60 opacity-65"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-yellow"></span>
          </span>
          <span className="font-mono text-[10px] font-bold tracking-widest text-[#121212] opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            J.TSE
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative rounded-full px-4 py-1.5 text-center font-mono text-[10px] font-bold tracking-wider text-[#121212]"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Active Indicator Underlay */}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 -z-10 rounded-full bg-white/80 border border-black/[0.03] shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover Indicator Underlay */}
                {hoveredIndex === idx && !isActive && (
                  <motion.div
                    layoutId="hoverNav"
                    className="absolute inset-0 -z-10 rounded-full bg-black/[0.02]"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}

                <span className={isActive ? "opacity-100 text-black" : "opacity-50 hover:opacity-80 transition-opacity"}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
