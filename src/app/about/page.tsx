"use client";

import Scene from "@/components/canvas/Scene";
import BentoCard from "@/components/ui/BentoCard";
import SkillsCloud from "@/components/ui/SkillsCloud";
import { motion } from "framer-motion";

export default function AboutPage() {
  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8,
      } as const,
    },
  };

  return (
    <div className="relative w-full">
      <Scene />
      
      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:py-32">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headingVariants}
          className="mb-16 md:mb-24"
        >
          <span className="text-sm font-bold tracking-[0.3em] text-black/40 uppercase">
            WHO AM I
          </span>
          <h1 className="punchy-heading mt-6 text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]">
            ABOUT ME
          </h1>
          <div className="mt-8 h-[2px] w-24 bg-black/10" />
        </motion.div>

        {/* Bento Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {/* Bio Section */}
          <BentoCard className="col-span-1 md:col-span-2 lg:col-span-3 min-h-[400px] flex flex-col justify-center" delay={0.1}>
            <div className="max-w-3xl">
              <span className="text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase">
                Biography
              </span>
              <h2 className="mt-6 text-4xl font-medium tracking-tight text-black/90 md:text-5xl lg:text-6xl">
                Bridging the gap between design and high-performance engineering.
              </h2>
              <p className="mt-8 text-xl leading-relaxed text-black/60 md:text-2xl">
                I'm a creative engineer based at the intersection of aesthetic motion and robust code. 
                My focus is on creating digital products that don't just work—they feel alive.
              </p>
            </div>
          </BentoCard>

          {/* Experience Highlights */}
          <BentoCard className="col-span-1 min-h-[400px]" delay={0.2}>
            <div className="flex h-full flex-col">
              <span className="text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase">
                Highlights
              </span>
              <div className="mt-12 space-y-12">
                <div>
                  <h3 className="text-4xl font-bold text-black/80 tracking-tight">6+</h3>
                  <p className="text-sm text-black/40 mt-1 uppercase tracking-wider font-bold">Years Experience</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-black/80 tracking-tight">40+</h3>
                  <p className="text-sm text-black/40 mt-1 uppercase tracking-wider font-bold">Projects Delivered</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-black/80 tracking-tight">3</h3>
                  <p className="text-sm text-black/40 mt-1 uppercase tracking-wider font-bold">Design Awards</p>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Skills Cloud */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 h-full">
            <SkillsCloud />
          </div>

          {/* Timeline / Detailed Experience */}
          <BentoCard className="col-span-1 md:col-span-2 lg:col-span-2 min-h-[400px]" delay={0.4}>
             <div className="flex h-full flex-col">
              <span className="text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase">
                Experience
              </span>
              <div className="mt-12 space-y-12">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                  <div className="text-sm font-bold text-black/30 min-w-[80px]">2022 — PRES</div>
                  <div>
                    <h3 className="text-xl font-bold text-black/80 uppercase">Lead Engineer @ Aesthetic Lab</h3>
                    <p className="mt-2 text-black/60 leading-relaxed max-w-md">
                      Spearheading interactive frontend systems and 3D web experiences using React-Three-Fiber.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                  <div className="text-sm font-bold text-black/30 min-w-[80px]">2020 — 2022</div>
                  <div>
                    <h3 className="text-xl font-bold text-black/80 uppercase">Interactive Designer @ Studio X</h3>
                    <p className="mt-2 text-black/60 leading-relaxed max-w-md">
                      Crafting minimalist digital identities and motion-driven user interfaces.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                   <div className="text-sm font-bold text-black/30 min-w-[80px]">2018 — 2020</div>
                  <div>
                    <h3 className="text-xl font-bold text-black/80 uppercase">Full Stack dev @ Tech Corp</h3>
                    <p className="mt-2 text-black/60 leading-relaxed max-w-md">
                      Building scalable web applications and component libraries with Next.js.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </main>
    </div>
  );
}
