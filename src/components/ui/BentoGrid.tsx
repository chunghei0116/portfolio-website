"use client";

import BentoCard from "./BentoCard";
import Playbox from "./Playbox";
import SkillTerminal from "./SkillTerminal";

const projects = [
  {
    title: "Project Alpha",
    category: "3D EXPERIENCES",
    description: "A high-performance 3D visualization platform using Three.js and Next.js 16.",
    tags: "NEXT.JS // R3F // GLSL",
    liveUrl: "#",
    repoUrl: "https://github.com/chunghei0116",
  },
  {
    title: "Project Beta",
    category: "CREATIVE CODING",
    description: "Generative art collection using React-Three-Fiber and custom shaders.",
    tags: "WEBGL // SHADERS",
    liveUrl: "#",
    repoUrl: "https://github.com/chunghei0116",
  },
];

export default function BentoGrid() {
  return (
    <section id="projects" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 scroll-mt-24">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Skill terminal (col-span-1) */}
        <div className="col-span-1">
          <SkillTerminal />
        </div>

        {/* Interactive Playbox (col-span-1) */}
        <div className="col-span-1">
          <Playbox />
        </div>

        {/* Project card 2 (col-span-1) */}
        <BentoCard className="col-span-1 min-h-[400px] flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
              {projects[1].category}
            </span>
            <h3 className="mt-4 text-3xl font-black tracking-tight text-black uppercase">
              {projects[1].title}
            </h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-black/70">
            {projects[1].description}
          </p>
          <div className="mt-auto border-t border-black/5 pt-4 flex flex-wrap justify-between items-center gap-2">
            <span className="font-mono text-xs font-bold text-black/60">{projects[1].tags}</span>
            <div className="flex gap-2">
              <a
                href={projects[1].liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-900 text-white hover:bg-neutral-850 font-mono text-[10px] tracking-wider px-3.5 py-1.5 rounded-lg transition-all duration-200 hover:scale-[1.03]"
              >
                DEMO
              </a>
              <a
                href={projects[1].repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 font-mono text-[10px] tracking-wider px-3.5 py-1.5 rounded-lg transition-all duration-200 hover:scale-[1.03]"
              >
                GITHUB
              </a>
            </div>
          </div>
        </BentoCard>

        {/* Project card 1 (col-span-2) */}
        <BentoCard className="col-span-1 md:col-span-2 min-h-[350px] flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
              {projects[0].category}
            </span>
            <h3 className="mt-4 text-4xl font-black tracking-tight text-black uppercase">
              {projects[0].title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-black/70 max-w-2xl">
              {projects[0].description}
            </p>
          </div>
          <div className="mt-8 border-t border-black/5 pt-4 flex flex-wrap justify-between items-center gap-2">
            <span className="font-mono text-xs font-bold text-black/60">{projects[0].tags}</span>
            <div className="flex gap-2">
              <a
                href={projects[0].liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-900 text-white hover:bg-neutral-850 font-mono text-[10px] tracking-wider px-4.5 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.03]"
              >
                VIEW LIVE DEMO
              </a>
              <a
                href={projects[0].repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 font-mono text-[10px] tracking-wider px-4.5 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.03]"
              >
                GITHUB REPO
              </a>
            </div>
          </div>
        </BentoCard>

        {/* Creative Space card (col-span-1) */}
        <BentoCard className="col-span-1 min-h-[350px] flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
              LAB NOTES
            </span>
            <h3 className="mt-4 text-3xl font-black tracking-tight text-black uppercase">
              CREATIVE SPACE
            </h3>
          </div>
          <p className="text-sm font-mono text-black/70">
            Experimenting with canvas particles, orbital controls, and hardware-accelerated shaders.
          </p>
          <div className="flex items-center gap-2 bg-neutral-950 text-white p-3 rounded-xl justify-center font-mono text-[10px] tracking-widest uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-selection-bg animate-pulse" />
            CORE PIPELINE ACTIVE
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
