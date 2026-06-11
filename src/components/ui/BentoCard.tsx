"use client";

import React from "react";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  disableHover?: boolean;
}

export default function BentoCard({ children, className = "", disableHover = false }: BentoCardProps) {
  return (
    <div
      className={`bg-white/60 backdrop-blur-xl border border-neutral-200/50 rounded-[2.2rem] p-8 
        shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 
        ${disableHover ? "" : "hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(10,92,255,0.08)] hover:border-accent-blue/30"} 
        ${className}`}
    >
      {children}
    </div>
  );
}
