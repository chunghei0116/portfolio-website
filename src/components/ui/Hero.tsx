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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
} as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] w-full flex-col justify-end px-6 sm:px-8 md:px-16 pt-32 pb-16 overflow-hidden bg-transparent">
      {/* Simple, clean dot-grid background with no shadow overlay */}
      <div className="absolute inset-0 z-0 dot-grid pointer-events-none select-none opacity-40" />

      {/* Absolute Survey Header bar */}
      <div className="absolute top-28 left-0 w-full flex justify-between items-center px-6 sm:px-8 md:px-16 font-mono text-[8px] sm:text-[10px] tracking-wider text-neutral-500 opacity-80 select-none z-10">
        <span>ROUTE DIRECTORY v4 // EXPEDITION ACTIVE</span>
        <span className="hidden sm:inline">DAVOS, GRISONS, CH</span>
      </div>

      {/* Gundam Blue Trail Marker Segment [Blue | White | Blue] */}
      <div className="relative z-10 flex h-[8px] w-[60px] border border-black/5 rounded-full overflow-hidden mb-6 bg-white/40 backdrop-blur-xs">
        <div className="flex-1 bg-accent-blue" />
        <div className="flex-1 bg-black/10" />
        <div className="flex-1 bg-accent-blue" />
      </div>

      {/* Giant Deconstructed Swiss Grotesque Headline */}
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          <h1 className="swiss-massive-heading text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8.5rem]">
            <motion.span variants={lineVariants} className="block">
              JONES TSE
            </motion.span>
            <motion.span variants={lineVariants} className="block">
              ENGINEERING
            </motion.span>
            <motion.span variants={lineVariants} className="block text-accent-blue">
              ROBUST SYSTEMS
            </motion.span>
          </h1>

          {/* Subtext describing core expertise */}
          <motion.p
            variants={lineVariants}
            className="mt-6 font-mono text-[0.8rem] md:text-sm font-bold uppercase tracking-wide text-moss-shadow max-w-[65ch] leading-relaxed"
          >
            DEVOPS INFRASTRUCTURE &amp; MOBILE APPLICATIONS. I BUILD SCALABLE AUTOMATION SYSTEMS AND CROSS-PLATFORM NATIVE PRODUCTS.
          </motion.p>

          {/* Premium Neo-Brutalist CTAs */}
          <motion.div
            variants={lineVariants}
            className="mt-8 flex flex-wrap gap-4 items-center"
          >
            <a
              href="#projects"
              className="bg-accent-blue text-white border border-black/5 px-6 py-3 font-mono text-[0.75rem] font-bold uppercase transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.3)] rounded-full active:translate-y-[-1px] active:scale-[0.98]"
            >
              EXPLORE PROJECTS
            </a>
            <a
              href="#contact"
              className="bg-white/80 text-neutral-900 border border-black/10 px-6 py-3 font-mono text-[0.75rem] font-bold uppercase transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)] rounded-full active:translate-y-[-1px] active:scale-[0.98] backdrop-blur-xs"
            >
              CONTACT ME
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
