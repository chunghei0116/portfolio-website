"use client";

import { motion } from "framer-motion";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
} as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col justify-end px-6 sm:px-8 md:px-16 pt-32 pb-20 overflow-hidden bg-transparent">
      {/* Renaissance sketch blueprint grid background */}
      <div className="absolute inset-0 z-0 sketch-grid pointer-events-none select-none opacity-45" />

      {/* Classical Header bar */}
      <div className="absolute top-28 left-0 w-full flex justify-between items-center px-6 sm:px-8 md:px-16 font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-sepia-dim opacity-70 select-none z-10">
        <span>CODEX APOCRYPHA // LIBER PRIMUS</span>
        <span className="hidden sm:inline">FLORENCE, TUSCANY</span>
      </div>

      {/* Terracotta and Gold Accent Marker [Red | Gold | Red] */}
      <div className="relative z-10 flex h-[6px] w-[50px] mb-8 overflow-hidden rounded-sm border border-foreground/10 bg-card-bg">
        <div className="flex-1 bg-accent-terracotta" />
        <div className="flex-1 bg-accent-gold" />
        <div className="flex-1 bg-accent-terracotta" />
      </div>

      {/* Giant Renaissance Serif Headline */}
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          <h1 className="renaissance-heading text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8rem]">
            <motion.span variants={lineVariants} className="block text-foreground/90">
              Jones Tse
            </motion.span>
            <motion.span variants={lineVariants} className="block italic text-accent-terracotta">
              Engineering
            </motion.span>
            <motion.span variants={lineVariants} className="block text-foreground/95">
              Robust Systems
            </motion.span>
          </h1>

          {/* Subtext describing core expertise */}
          <motion.p
            variants={lineVariants}
            className="mt-8 font-serif italic text-base md:text-lg text-sepia-dim max-w-[60ch] leading-relaxed"
          >
            DevOps Infrastructure &amp; Mobile Applications. Architecting scalable, elegant automation engines and native digital crafts.
          </motion.p>

          {/* Elegant Renaissance CTAs */}
          <motion.div
            variants={lineVariants}
            className="mt-10 flex flex-wrap gap-5 items-center"
          >
            <a
              href="#projects"
              className="bg-accent-terracotta text-background px-8 py-3.5 font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 hover:bg-accent-gold hover:-translate-y-[2px] renaissance-hover-lift rounded-sm"
            >
              Explore Studies
            </a>
            <a
              href="#contact"
              className="bg-card-bg text-foreground border border-foreground/15 px-8 py-3.5 font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 hover:border-accent-gold hover:-translate-y-[2px] renaissance-hover-lift rounded-sm"
            >
              Send Message
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
