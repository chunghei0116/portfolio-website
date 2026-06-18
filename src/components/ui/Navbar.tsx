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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-neutral-200/60 bg-[#FAFAFA]/80 backdrop-blur-[8px] px-8 py-4 flex justify-between items-center`}
    >
      <span className="font-sans font-black tracking-[-0.04em] uppercase text-lg text-black">
        CHUNG HEI
      </span>
      
      <div className="flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-wider text-moss-shadow bg-neutral-100 border border-neutral-200 px-2.5 py-1.5 rounded-none">
        <span>🟢 AVAILABLE</span>
      </div>
    </nav>
  );
}
