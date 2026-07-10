"use client";

import React from "react";
import { motion } from "framer-motion";

const history = [
  {
    index: "01",
    year: "1500 — PRESENT",
    role: "Mobile Application Developer",
    company: "AS Watson Group",
    desc: "Architecting native application landscapes. Orchestrating high-performance layouts, seamless reactive data flows, and secure cross-platform execution engines.",
    tags: ["Flutter", "Dart", "CI/CD", "Firebase"],
  },
  {
    index: "02",
    year: "1497 — 1500",
    role: "Programmer",
    company: "Asia Allied Infrastructure",
    desc: "Built scalable web engines and distributed backends. Managed automated cloud computing resources and container orchestration loops.",
    tags: ["React", "Node.js", "AWS", "Docker"],
  },
  {
    index: "03",
    year: "1495",
    role: "Summer Apprentice",
    company: "EMSD HKSAR",
    desc: "Researched telemetry aggregation, signal processing, and visual analytic tools using numerical analysis scripts.",
    tags: ["Python", "IoT", "Data Analysis"],
  },
];

/* Stagger parent */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

/* Row entrance — slide up from below */
const rowVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const;

export default function TechSection() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-16 md:py-24 select-none overflow-hidden">
      <div className="renaissance-frame bg-card-bg parchment-shadow p-6 sm:p-8 md:p-10">
        {/* ── Section Header ── */}
        <div className="mb-10 md:mb-14">
          <span className="text-sepia-mono border border-foreground/10 px-3 py-1 bg-foreground/[0.02]">
            CHRONOLOGY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl italic text-accent-terracotta mt-5 font-medium leading-none">
            Selected Work &amp; Apprenticeships
          </h2>
        </div>

        {/* ── Role Rows ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="border-t border-foreground/15"
        >
          {history.map((node) => (
            <motion.div
              key={node.index}
              variants={rowVariants}
              className="group border-b border-foreground/10 transition-colors duration-300 hover:bg-accent-gold/[0.02]"
            >
              {/* Main row — always visible */}
              <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 py-6 md:py-8 items-start md:items-center">

                {/* Index number */}
                <div className="col-span-2 sm:col-span-1">
                  <span className="font-serif italic text-sm text-sepia-dim opacity-40">
                    {node.index}
                  </span>
                </div>

                {/* Role title */}
                <div className="col-span-10 sm:col-span-4 md:col-span-4">
                  <span className="font-serif text-base sm:text-lg md:text-xl text-foreground/90 font-medium tracking-tight block">
                    {node.role}
                  </span>
                </div>

                {/* Company */}
                <div className="col-span-6 sm:col-span-4 md:col-span-4 mt-2 sm:mt-0">
                  <span className="font-serif italic text-xs md:text-sm text-sepia-dim font-medium uppercase tracking-wide">
                    {node.company}
                  </span>
                </div>

                {/* Year */}
                <div className="col-span-6 sm:col-span-3 md:col-span-3 mt-2 sm:mt-0 text-right">
                  <span className="font-mono text-[9px] font-bold text-accent-gold tracking-widest">
                    {node.year}
                  </span>
                </div>
              </div>

              {/* Detail block */}
              <div className="
                md:grid md:grid-cols-12 md:gap-x-6
                pb-6
              ">
                {/* Spacer for index column */}
                <div className="hidden md:block md:col-span-1" />

                {/* Description */}
                <div className="col-span-12 md:col-span-7 pl-0">
                  <p className="font-serif text-xs md:text-sm leading-relaxed text-sepia-dim max-w-xl mb-3 md:mb-0">
                    {node.desc}
                  </p>
                </div>

                {/* Tags */}
                <div className="col-span-12 md:col-span-4 flex flex-wrap gap-1.5 md:justify-end items-start">
                  {node.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[8px] font-bold uppercase tracking-widest text-sepia-dim bg-foreground/5 border border-foreground/5 px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
