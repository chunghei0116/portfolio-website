"use client";

import React from "react";
import { motion } from "framer-motion";

const history = [
  {
    index: "01",
    year: "2025 — PRESENT",
    role: "Mobile Application Developer",
    company: "AS Watson Group",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    tags: ["Flutter", "Dart", "CI/CD", "Firebase"],
  },
  {
    index: "02",
    year: "2023 — 2025",
    role: "Programmer",
    company: "Asia Allied Infrastructure",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
    tags: ["React", "Node.js", "AWS", "Docker"],
  },
  {
    index: "03",
    year: "2021",
    role: "Summer Intern",
    company: "EMSD HKSAR",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mollis nunc sed id semper risus in hendrerit gravida rutrum.",
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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const;

export default function TechSection() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-16 md:py-24 select-none overflow-hidden">
      <div className="bg-white/78 backdrop-blur-md border border-black/8 rounded-2xl p-6 sm:p-8 md:p-10">
      {/* ── Section Header ── */}
      <div className="mb-10 md:mb-14">
        <span className="text-accent-blue font-mono text-[10px] font-bold uppercase tracking-wider bg-accent-blue/5 border border-black/5 px-2.5 py-0.5 inline-block">
          EXPERIENCE
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-punchy tracking-[-0.04em] leading-none uppercase mt-4 text-foreground">
          WHERE I&apos;VE WORKED
        </h2>
      </div>

      {/* ── Role Rows ── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="border-t border-black/8"
      >
        {history.map((node) => (
          <motion.div
            key={node.index}
            variants={rowVariants}
            className="group border-b border-black/8 transition-colors duration-300 hover:bg-accent-blue/[0.02]"
          >
            {/* Main row — always visible */}
            <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 py-6 md:py-8 items-start md:items-center">

              {/* Index number */}
              <div className="col-span-2 sm:col-span-1">
                <span className="font-mono text-[11px] font-bold text-black/20 tracking-wider">
                  {node.index}
                </span>
              </div>

              {/* Role title */}
              <div className="col-span-10 sm:col-span-4 md:col-span-4">
                <span className="font-sans font-punchy text-base sm:text-lg md:text-xl text-foreground tracking-tight leading-snug block">
                  {node.role}
                </span>
              </div>

              {/* Company */}
              <div className="col-span-6 sm:col-span-4 md:col-span-4 mt-2 sm:mt-0">
                <span className="font-mono text-[11px] font-bold text-foreground/60 uppercase tracking-wider">
                  {node.company}
                </span>
              </div>

              {/* Year */}
              <div className="col-span-6 sm:col-span-3 md:col-span-3 mt-2 sm:mt-0 text-right">
                <span className="font-mono text-[11px] font-bold text-black/30 tracking-wider">
                  {node.year}
                </span>
              </div>
            </div>

            {/* Expandable detail — revealed on hover (desktop) / always visible (mobile) */}
            <div className="
              md:grid md:grid-cols-12 md:gap-x-6
              md:max-h-0 md:overflow-hidden md:opacity-0
              md:group-hover:max-h-40 md:group-hover:opacity-100
              transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
              pb-5 md:pb-0 md:group-hover:pb-6
            ">
              {/* Spacer for index column */}
              <div className="hidden md:block md:col-span-1" />

              {/* Description */}
              <div className="col-span-12 md:col-span-7 pl-0 sm:pl-0">
                <p className="text-xs leading-relaxed text-foreground/55 font-semibold max-w-xl mb-3 md:mb-0 pl-0 sm:pl-0 md:pl-0">
                  {node.desc}
                </p>
              </div>

              {/* Tags */}
              <div className="col-span-12 md:col-span-4 flex flex-wrap gap-1.5 md:justify-end items-start">
                {node.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] font-bold uppercase tracking-wider text-moss-shadow bg-black/[0.03] border border-black/5 px-2 py-0.5"
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
