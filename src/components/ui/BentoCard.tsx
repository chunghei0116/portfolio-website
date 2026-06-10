"use client";

import React from "react";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function BentoCard({ children, className = "" }: BentoCardProps) {
  return (
    <div
      className={`brutalist-border bg-card-bg p-8 brutalist-shadow brutalist-hover-lift ${className}`}
    >
      {children}
    </div>
  );
}
