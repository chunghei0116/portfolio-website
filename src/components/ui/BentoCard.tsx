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
      className={`brutalist-border bg-card-bg p-8 brutalist-shadow ${disableHover ? "" : "brutalist-hover-lift"} ${className}`}
    >
      {children}
    </div>
  );
}
