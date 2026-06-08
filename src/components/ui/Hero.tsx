"use client";

import { motion } from "framer-motion";

const techItems = [
  "REACT",
  "THREE.JS",
  "WEBGL",
  "SHADERS",
  "TAILWIND",
  "TYPESCRIPT",
  "STYLISH MOTION",
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
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
} as const;

const EST_TEXT = "EST. 2026 // PORTFOLIO";
const STATUS_TEXT = "STATUS: OPEN FOR WORK";
const TEXT_CREATIVE = "CREATIVE";
const TEXT_DEVELOPER = "DEVELOPER";
const TEXT_3D_ENGINEER = "[3D ENGINEER]";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-transparent pt-24 pb-12">
      {/* Header Badge Block */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 border-b-4 border-black bg-white z-10 font-sans font-bold text-xs md:text-sm tracking-widest uppercase">
        <div>{EST_TEXT}</div>
        <div className="flex items-center gap-2">
          {STATUS_TEXT}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
      </div>

      {/* Main Hero Display Text */}
      <div className="flex-grow flex flex-col justify-center px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="punchy-heading text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] text-left leading-[0.85] select-none"
          >
            <motion.span variants={lineVariants} className="block">
              {TEXT_CREATIVE}
            </motion.span>
            <motion.span variants={lineVariants} className="block">
              {TEXT_DEVELOPER}
            </motion.span>
            <motion.span variants={lineVariants} className="block text-foreground">
              &amp;{" "}
              <span className="text-cyber-yellow [text-shadow:_-2px_-2px_0_#000,_2px_-2px_0_#000,_-2px_2px_0_#000,_2px_2px_0_#000] font-sans font-punchy tracking-tight">
                {TEXT_3D_ENGINEER}
              </span>
            </motion.span>
          </motion.h1>
        </div>
      </div>

      {/* Ticker Banner (Infinite scrolling marquee) */}
      <div className="w-full border-t-4 border-b-4 border-black bg-white py-4 overflow-hidden select-none">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="flex shrink-0 items-center justify-around gap-12 min-w-full">
            {techItems.map((tech, idx) => (
              <span
                key={idx}
                className="font-sans font-bold text-xl md:text-3xl tracking-widest text-foreground"
              >
                {tech} <span className="text-neo-red ml-6">//</span>
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center justify-around gap-12 min-w-full" aria-hidden="true">
            {techItems.map((tech, idx) => (
              <span
                key={`dup-${idx}`}
                className="font-sans font-bold text-xl md:text-3xl tracking-widest text-foreground"
              >
                {tech} <span className="text-neo-red ml-6">//</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


