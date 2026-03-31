"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const words = "PUNCHY MODERN PORTFOLIO".split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  } as const;

  const subVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.2,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  } as const;

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-transparent px-6 text-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
      >
        <h1 className="punchy-heading flex flex-wrap justify-center gap-x-4 text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        
        <motion.div
          variants={subVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-col items-center gap-6"
        >
          <p className="max-w-2xl text-lg font-medium tracking-[0.2em] text-black/60 uppercase md:text-xl">
            Clean aesthetics & 3D experiences
          </p>
          <div className="h-px w-24 bg-black/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
