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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b-4 border-black bg-[#F1F3F5] px-8 py-4 flex justify-between items-center`}
    >
      <span className="font-sans font-black tracking-[-0.04em] uppercase text-xl text-black">
        CHUNG HEI
      </span>
      
      <div className="flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-moss-shadow bg-white/40 border border-black/10 px-3 py-1.5 rounded-none">
        <span>🟢 AVAILABLE</span>
      </div>
    </nav>
  );
}
