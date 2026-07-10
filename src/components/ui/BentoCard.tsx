"use client";

import React from "react";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  disableHover?: boolean;
  onClick?: () => void;
}

export default function BentoCard({ children, className = "", disableHover = false, onClick }: BentoCardProps) {
  return (
    <div
      onClick={onClick}
      className={`renaissance-frame bg-card-bg p-5 sm:p-8 parchment-shadow ${disableHover ? "" : "renaissance-hover-lift"} ${className}`}
    >
      {children}
    </div>
  );
}
