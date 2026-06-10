"use client";

import { motion } from "framer-motion";

const techItems = [
  "FLUTTER",
  "KUBERNETES",
  "DOCKER",
  "GITOPS / ARGOCD",
  "AWS",
  "TYPESCRIPT",
  "NEXT.JS",
  "THREE.JS / WEBGL",
];

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
  hidden: { opacity: 0, y: 50 },
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
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-transparent pt-24 pb-16">
      {/* Header Badge Block — subdued, atmospheric */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-3 border-b border-black/10 bg-white/60 backdrop-blur-sm z-10">
        <span className="text-decorative opacity-60">EST. 2026 // PORTFOLIO</span>
        <div className="flex items-center gap-2">
          <span className="text-decorative opacity-60">STATUS: OPEN FOR WORK</span>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
        </div>
      </div>

      {/* Main Hero Display Text */}
      <div className="flex-grow flex flex-col justify-center px-8 md:px-16">
        <div className="max-w-7xl mx-auto w-full">
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="punchy-heading text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] text-left leading-[0.9] select-none"
          >
            <motion.span variants={lineVariants} className="block">
              ENGINEERING
            </motion.span>
            <motion.span variants={lineVariants} className="block">
              ROBUST APPS
            </motion.span>
            <motion.span variants={lineVariants} className="block text-foreground">
              &amp;{" "}
              <span className="relative inline-block px-3 py-1 align-middle">
                <span className="absolute inset-y-1 inset-x-0 bg-cyber-yellow/15 -skew-x-6 rounded-xl -z-10" />
                <span className="text-neutral-900 font-sans font-punchy tracking-tight">
                  CLOUD SYSTEMS
                </span>
              </span>
            </motion.span>
          </motion.h1>
        </div>
      </div>

      {/* Ticker Banner — calmer, subdued text */}
      <div className="w-full border-t border-black/10 bg-white/40 backdrop-blur-sm py-4 overflow-hidden select-none">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="flex shrink-0 items-center justify-around gap-12 min-w-full">
            {techItems.map((tech, idx) => (
              <span
                key={idx}
                className="font-sans font-bold text-lg md:text-2xl tracking-widest text-black/30"
              >
                {tech} <span className="text-black/15 ml-6">{"//"}</span>
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center justify-around gap-12 min-w-full" aria-hidden="true">
            {techItems.map((tech, idx) => (
              <span
                key={`dup-${idx}`}
                className="font-sans font-bold text-lg md:text-2xl tracking-widest text-black/30"
              >
                {tech} <span className="text-black/15 ml-6">{"//"}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
