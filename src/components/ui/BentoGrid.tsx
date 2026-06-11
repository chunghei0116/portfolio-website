"use client";

import BentoCard from "./BentoCard";
import SystemTimeline from "./SystemTimeline";
import GitOpsPipeline from "./GitOpsPipeline";

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
      {/* 4-column responsive Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 auto-rows-min">
        
        {/* Card 1: BASECAMP // TRAILHEAD (col-span-2) */}
        <BentoCard className="col-span-1 md:col-span-2 flex flex-col justify-between min-h-[340px]">
          <div>
            <span className="text-alpine-mono">
              ABOUT THE ROUTE // INFRASTRUCTURE & APPS
            </span>
            <h3 className="text-4xl font-sans font-[950] tracking-[-0.03em] leading-[0.9] uppercase mt-2">
              BASECAMP // TRAILHEAD
            </h3>
            <p className="font-bold mt-6 text-moss-shadow leading-relaxed">
              I am a developer operating at the intersection of DevOps, mobile ecosystems, and interactive interfaces. I engineer automated deployment pipelines and cross-platform desktop/mobile apps designed to be highly secure, reliable, and smooth to use.
            </p>
          </div>
          <div className="mt-6">
            <span className="text-alpine-mono block mb-3 font-semibold text-[10px]">SKILLSETS & TOOLING:</span>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js 16", "TypeScript", "Flutter", "TailwindCSS", "Kubernetes", "Docker", "GitOps", "ArgoCD", "AWS"].map((tag) => (
                <span key={tag} className="bg-black text-white font-mono text-[0.65rem] font-bold px-2 py-0.5 border border-black uppercase">{tag}</span>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Card 2: ASCENT TELEMETRY // STATS (col-span-1) - Accent box */}
        <div className="col-span-1 brutalist-border bg-accent-blue text-white p-8 brutalist-shadow brutalist-hover-lift flex flex-col justify-between min-h-[340px]">
          <div>
            <span className="font-mono text-[0.7rem] font-bold tracking-[0.12em] uppercase text-white border-b-2 border-white pb-1 inline-block">
              ASCENT TELEMETRY
            </span>
            <h3 className="mt-6 text-5xl font-sans font-[950] tracking-[-0.05em] leading-[0.8] uppercase text-white">
              4,810M
            </h3>
            <p className="mt-4 text-xs font-bold leading-relaxed text-white">
              TOTAL ACCUMULATED VERTICAL PRODUCTION DEPLOYMENTS SHIPPED AT SCALE.
            </p>
          </div>
          <div className="border-t border-white/20 pt-4 text-left font-mono text-[0.7rem] font-bold uppercase tracking-wider text-white">
            SYS_STATUS: 100% OPERATIONAL
          </div>
        </div>

        {/* Card 3: ROUTE LOG // TIMELINE (col-span-1, row-span-2) - Tall block bridging rows 1 and 2 */}
        <div className="col-span-1 md:row-span-2 h-full">
          <SystemTimeline />
        </div>

        {/* Card 4: SUMMIT // ROUTE-01 (col-span-2) */}
        <BentoCard className="col-span-1 md:col-span-2 flex flex-col justify-between min-h-[340px]">
          <div>
            <span className="text-alpine-mono">
              {projects[0].category}
            </span>
            <h3 className="text-4xl font-sans font-[950] tracking-[-0.03em] leading-[0.9] uppercase mt-2">
              {projects[0].title}
            </h3>
            <p className="font-bold mt-4 text-moss-shadow">
              {projects[0].description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {projects[0].tags.map((tag) => (
                <span key={tag} className="bg-black text-white font-mono text-[0.65rem] font-bold px-2 py-0.5 border border-black uppercase">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <a href={projects[0].liveUrl} className="bg-accent-blue text-white border-[3px] border-black px-4 py-1.5 font-mono text-[0.7rem] font-bold uppercase transition-all duration-100 shadow-[3px_3px_0px_#000000] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[4px_4px_0px_#000000] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[1px_1px_0px_#000000]">
              EXPLORE
            </a>
            <a
              href={projects[0].repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black border-[3px] border-black px-4 py-1.5 font-mono text-[0.7rem] font-bold uppercase transition-all duration-100 shadow-[3px_3px_0px_#000000] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[4px_4px_0px_#000000] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[1px_1px_0px_#000000]"
            >
              GITHUB
            </a>
          </div>
        </BentoCard>

        {/* Card 5: SUMMIT // ROUTE-02 (col-span-1) - Small square card */}
        <BentoCard className="col-span-1 flex flex-col justify-between min-h-[340px]">
          <div>
            <span className="text-alpine-mono">
              {projects[1].category}
            </span>
            <h3 className="text-2xl font-sans font-[950] tracking-[-0.03em] leading-[0.9] uppercase mt-2">
              {projects[1].title}
            </h3>
            <p className="font-bold mt-4 text-moss-shadow text-[11px] leading-relaxed">
              {projects[1].description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {projects[1].tags.map((tag) => (
                <span key={tag} className="bg-black text-white font-mono text-[0.6rem] font-bold px-1.5 py-0.5 border border-black uppercase">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <a
              href={projects[1].liveUrl}
              className="bg-white text-black border-[3px] border-black px-3 py-1 font-mono text-[0.65rem] font-bold uppercase transition-all duration-100 shadow-[3px_3px_0px_#000000] hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[4px_4px_0px_#000000] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[1px_1px_0px_#000000]"
            >
              RECONNOITER
            </a>
          </div>
        </BentoCard>

        {/* Card 6: INFRASTRUCTURE DIAGRAM // GITOPS PIPELINE (col-span-4) - Full-width anchor card */}
        <div className="col-span-1 md:col-span-4 w-full">
          <GitOpsPipeline />
        </div>

      </div>
    </section>
  );
}
