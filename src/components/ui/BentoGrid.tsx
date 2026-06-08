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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
          <div className="mt-auto border-t-2 border-black pt-4 flex flex-wrap justify-between items-center gap-2">
            <span className="font-mono text-xs font-bold text-black/60">{projects[1].tags}</span>
            <div className="flex gap-2">
              <a
                href={projects[1].liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white hover:bg-cyber-yellow hover:text-black font-mono text-xs font-bold px-3 py-1.5 brutalist-border border-2 brutalist-press"
              >
                DEMO
              </a>
              <a
                href={projects[1].repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black hover:bg-electric-cyan hover:text-black font-mono text-xs font-bold px-3 py-1.5 brutalist-border border-2 brutalist-press"
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
          <div className="mt-8 border-t-2 border-black pt-4 flex flex-wrap justify-between items-center gap-2">
            <span className="font-mono text-xs font-bold text-black/60">{projects[0].tags}</span>
            <div className="flex gap-2">
              <a
                href={projects[0].liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white hover:bg-cyber-yellow hover:text-black font-mono text-xs font-bold px-4 py-2 brutalist-border border-2 brutalist-press"
              >
                VIEW LIVE DEMO
              </a>
              <a
                href={projects[0].repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black hover:bg-electric-cyan hover:text-black font-mono text-xs font-bold px-4 py-2 brutalist-border border-2 brutalist-press"
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
          <div className="bg-black text-cyber-yellow p-3 text-center font-mono font-bold uppercase text-xs brutalist-border">
            CORE PIPELINE ACTIVE
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
