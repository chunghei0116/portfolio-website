"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function BentoCard({ children, className = "", delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Custom "Punchy" cubic-bezier
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className={`group relative overflow-hidden rounded-[2.5rem] border border-zinc-950/10 bg-zinc-950/5 p-8 backdrop-blur-2xl transition-all duration-300 hover:bg-zinc-950/[0.08] hover:shadow-2xl hover:shadow-zinc-950/5 ${className}`}
    >
      {/* Subtle Glow Effect on Hover */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {children}
    </motion.div>
  );
}
