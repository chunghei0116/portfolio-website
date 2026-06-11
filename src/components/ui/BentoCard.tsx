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
      className={`brutalist-border bg-card-bg p-8 brutalist-shadow ${disableHover ? "" : "brutalist-hover-lift"} ${className}`}
    >
      {children}
    </div>
  );
}
