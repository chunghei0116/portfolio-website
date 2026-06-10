"use client";

import BentoCard from "./BentoCard";
import Playbox from "./Playbox";
import SkillTerminal from "./SkillTerminal";

const projects = [
  {
    title: "PROJECT ALPHA // 3D CANVAS",
    category: "SUMMIT // ROUTE-01",
    description: "A high-performance 3D spatial visualization platform built with React Three Fiber and Next.js 16. Implements custom orbit controllers, high-precision vertex terrain shaders, and dynamic lighting simulation for mountain path explorations.",
    tags: ["Three.js", "R3F", "Next.js 16", "GLSL / Shaders"],
    liveUrl: "#",
    repoUrl: "https://github.com/chunghei0116",
  },
  {
    title: "Project Beta",
    category: "SUMMIT // ROUTE-02",
    description: "Generative art collections using customized WebGL shaders and real-time noise displacement vectors.",
    tags: ["WebGL", "Shaders", "GLSL"],
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

        {/* Featured Telemetry stats card (col-span-1) - High impact Swiss red back */}
        <div className="col-span-1 brutalist-border bg-accent-red text-white p-8 brutalist-shadow brutalist-hover-lift flex flex-col justify-between min-h-[350px]">
          <div>
            <span className="font-mono text-[0.75rem] font-bold tracking-[0.12em] uppercase text-white border-b-2 border-white pb-1 inline-block">
              ASCENT TELEMETRY
            </span>
            <h3 className="mt-6 text-6xl font-sans font-[950] tracking-[-0.05em] leading-[0.8] uppercase text-white">
              4,810M
            </h3>
            <p className="mt-4 text-sm font-bold leading-relaxed text-white">
              TOTAL ACCUMULATED VERTICAL PRODUCTION DEPLOYMENTS SHIPPED AT SCALE.
            </p>
          </div>
          <div className="border-t border-white/20 pt-4 text-left font-mono text-[0.75rem] font-bold uppercase tracking-wider text-white">
            SYS_STATUS: 100% OPERATIONAL
          </div>
        </div>

        {/* Project card 1 (col-span-2) */}
        <BentoCard className="col-span-1 md:col-span-2 min-h-[350px] flex flex-col justify-between">
          <div>
            <span className="text-alpine-mono">
              {projects[0].category}
            </span>
            <h3 className="text-4xl font-sans font-[950] tracking-[-0.03em] leading-[0.9] uppercase mt-2">
              {projects[0].title}
            </h3>
            <p className="font-bold mt-4 text-moss-shadow max-w-2xl">
              {projects[0].description}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {projects[0].tags.map((tag) => (
                <span key={tag} className="bg-black text-white font-mono text-[0.7rem] font-bold px-2 py-1 uppercase">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-8">
            <a href={projects[0].liveUrl} className="bg-accent-red text-white border-[3px] border-black px-5 py-2 font-mono text-[0.75rem] font-bold uppercase transition-all duration-100 shadow-[4px_4px_0px_#000000] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_#000000]">
              EXPLORE LIVE SUMMIT
            </a>
            <a
              href={projects[0].repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black border-[3px] border-black px-5 py-2 font-mono text-[0.75rem] font-bold uppercase transition-all duration-100 shadow-[4px_4px_0px_#000000] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_#000000]"
            >
              GITHUB REPO
            </a>
          </div>
        </BentoCard>

        {/* Project card 2 (col-span-1) */}
        <BentoCard className="col-span-1 min-h-[350px] flex flex-col justify-between">
          <div>
            <span className="text-alpine-mono">
              {projects[1].category}
            </span>
            <h3 className="text-3xl font-sans font-[950] tracking-[-0.03em] leading-[0.9] uppercase mt-2">
              {projects[1].title}
            </h3>
            <p className="font-bold mt-4 text-moss-shadow">
              {projects[1].description}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {projects[1].tags.map((tag) => (
                <span key={tag} className="bg-black text-white font-mono text-[0.7rem] font-bold px-2 py-1 uppercase">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-8">
            <a
              href={projects[1].liveUrl}
              className="bg-white text-black border-[3px] border-black px-5 py-2 font-mono text-[0.75rem] font-bold uppercase transition-all duration-100 shadow-[4px_4px_0px_#000000] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_#000000]"
            >
              RECONNOITER
            </a>
          </div>
        </BentoCard>

      </div>
    </section>
  );
}
