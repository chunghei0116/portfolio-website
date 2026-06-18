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
    <section className="relative flex min-h-[80vh] w-full flex-col justify-end px-6 sm:px-8 md:px-16 pt-32 pb-16 overflow-hidden brick-wall-bg">
      {/* Medieval header bar */}
      <div className="absolute top-24 left-0 w-full flex justify-between items-center px-6 sm:px-8 md:px-16 font-serif text-[10px] tracking-[0.2em] text-accent-gold/60 select-none z-10 border-b border-accent-gold/20 pb-3">
        <span>CHUNG HEI &bull; MOBILE & GITOPS</span>
        <span className="hidden sm:inline">HONG KONG</span>
      </div>

      {/* Shield decoration corners */}
      <div className="absolute top-40 left-6 sm:left-8 md:left-16 w-12 h-16 border-l-2 border-t-2 border-accent-gold/30 rounded-tl-sm" />
      <div className="absolute top-40 right-6 sm:right-8 md:right-16 w-12 h-16 border-r-2 border-t-2 border-accent-gold/30 rounded-tr-sm" />
      <div className="absolute bottom-16 left-6 sm:left-8 md:left-16 w-12 h-16 border-l-2 border-b-2 border-accent-gold/30 rounded-bl-sm" />
      <div className="absolute bottom-16 right-6 sm:right-8 md:right-16 w-12 h-16 border-r-2 border-b-2 border-accent-gold/30 rounded-br-sm" />

      {/* Torch light effects */}
      <div className="absolute top-32 left-10 w-2 h-2 rounded-full bg-fire/60 torch-light flame-flicker" />
      <div className="absolute top-32 right-10 w-2 h-2 rounded-full bg-fire/60 torch-light flame-flicker" style={{ animationDelay: '0.5s' }} />

      {/* Main content */}
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="medieval-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <motion.span variants={lineVariants} className="block">
            I forge software that
          </motion.span>
          <motion.span variants={lineVariants} className="block text-fire fire-glow">
            helps kingdoms thrive.
          </motion.span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 text-sm sm:text-base text-muted-foreground max-w-xl font-sans font-medium leading-relaxed"
        >
          I am Chung Hei, a developer wielding mobile infrastructure, native integrations, web applications, and DevOps services as my arsenal.
        </motion.p>

        {/* Medieval CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 flex gap-4"
        >
          <button className="medieval-btn">
            Enter the Realm
          </button>
          <button className="medieval-btn bg-transparent">
            View Armory
          </button>
        </motion.div>
      </div>

      {/* Bottom rune decoration */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 text-accent-gold/30 text-xs font-serif tracking-[0.3em]">
        <span>✦</span>
        <span>⚔</span>
        <span>✦</span>
      </div>
    </section>
  );
}
