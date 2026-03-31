"use client";

import { motion } from "framer-motion";
import BentoCard from "./BentoCard";

const projects = [
  {
    title: "Project Alpha",
    category: "3D EXPERIENCES",
    description: "A high-performance 3D visualization platform using Three.js and Next.js 16.",
    className: "col-span-1 md:col-span-2 row-span-1 md:row-span-2 min-h-[400px]",
    delay: 0.1,
  },
  {
    title: "Project Beta",
    category: "UX/UI DESIGN",
    description: "Minimalist dashboard for crypto analytics with real-time data streaming.",
    className: "col-span-1 row-span-1 min-h-[300px]",
    delay: 0.2,
  },
  {
    title: "Project Gamma",
    category: "CREATIVE CODING",
    description: "Generative art collection using React-Three-Fiber and shaders.",
    className: "col-span-1 row-span-1 min-h-[300px]",
    delay: 0.3,
  },
  {
    title: "Project Delta",
    category: "MOBILE APP",
    description: "Next-gen fitness tracking app with haptic feedback and custom animations.",
    className: "col-span-1 md:col-span-2 row-span-1 min-h-[300px]",
    delay: 0.4,
  },
];

export default function BentoGrid() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 flex flex-col gap-4"
      >
        <h2 className="text-sm font-bold tracking-[0.3em] text-black/40 uppercase">
          Featured Projects
        </h2>
        <div className="h-[2px] w-12 bg-black/10" />
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-3">
        {projects.map((project, index) => (
          <BentoCard 
            key={index} 
            className={project.className}
            delay={project.delay}
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase">
                  {project.category}
                </span>
                <h3 className="mt-4 text-3xl font-medium tracking-tight text-black/90 md:text-4xl">
                  {project.title}
                </h3>
              </div>
              <p className="mt-auto text-lg leading-relaxed text-black/60">
                {project.description}
              </p>
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}
