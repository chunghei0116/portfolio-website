"use client";

import React from "react";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function BentoCard({ children, className = "" }: BentoCardProps) {
  return (
    <div
      className={`rounded-[2.4rem] p-8 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] ${className}`}
    >
      {children}
    </div>
  );
}
