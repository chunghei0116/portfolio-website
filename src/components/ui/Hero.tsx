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
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
} as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] w-full flex-col justify-end px-6 sm:px-8 md:px-16 pt-32 pb-16 overflow-hidden bg-transparent">
      {/* Absolute Survey Header bar */}
      <div className="absolute top-24 left-0 w-full flex justify-between items-center px-6 sm:px-8 md:px-16 font-mono text-[9px] tracking-wider text-moss-shadow select-none z-10 border-b border-neutral-100 pb-3">
        <span>CHUNG HEI &bull; MOBILE & GITOPS</span>
        <span className="hidden sm:inline">HONG KONG</span>
      </div>

      {/* Giant Clean Headline */}
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="swiss-massive-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <motion.span variants={lineVariants} className="block font-medium">
            I build software that
          </motion.span>
          <motion.span variants={lineVariants} className="block font-medium">
            helps teams move with confidence.
          </motion.span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 text-sm sm:text-base text-moss-shadow max-w-xl font-sans font-medium leading-relaxed"
        >
          I’m Chung Hei, a developer operating across mobile infrastructure, native integrations, web applications, and DevOps services.
        </motion.p>
      </div>
    </section>
  );
}
