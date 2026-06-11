"use client";

import { motion } from "framer-motion";

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
    <section className="relative flex min-h-[85vh] w-full flex-col justify-end px-8 md:px-16 pt-32 pb-16 overflow-hidden bg-transparent">
      {/* Absolute Survey Header bar */}
      <div className="absolute top-24 left-0 w-full flex justify-between items-center px-8 md:px-16 text-alpine-mono opacity-80 select-none">
        <span>ROUTE DIRECTORY v4 // EXPEDITION ACCLIMATIZED</span>
        <span>DAVOS, GRISONS, CH</span>
      </div>

      {/* Gundam Blue Trail Marker Segment [Blue | White | Blue] */}
      <div className="relative z-10 flex h-[16px] w-[70px] brutalist-border overflow-hidden mb-6">
        <div className="flex-1 bg-accent-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-accent-blue" />
      </div>

      {/* Giant Deconstructed Swiss Grotesque Headline */}
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="swiss-massive-heading text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8.5rem]"
        >
          <motion.span variants={lineVariants} className="block">
            CHUNG HEI
          </motion.span>
          <motion.span variants={lineVariants} className="block">
            ENGINEERING
          </motion.span>
          <motion.span variants={lineVariants} className="block text-accent-blue">
            ROBUST SYSTEMS
          </motion.span>
        </motion.h1>
      </div>
    </section>
  );
}
