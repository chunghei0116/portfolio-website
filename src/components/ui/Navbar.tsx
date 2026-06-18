"use client";

import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-accent-gold/20 px-8 py-4 flex justify-between items-center ${
        scrolled ? "bg-background/90 backdrop-blur-[8px]" : "bg-transparent"
      }`}
    >
      <span className="font-serif font-bold tracking-[-0.02em] uppercase text-lg text-accent-gold">
        ⚔ CHUNG HEI
      </span>
      
      <div className="flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground bg-dark-wood border border-accent-gold/20 px-2.5 py-1.5 rounded-sm">
        <span className="text-green-500">●</span>
        <span>AVAILABLE</span>
      </div>
    </nav>
  );
}
