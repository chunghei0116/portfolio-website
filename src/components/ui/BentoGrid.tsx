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
      {/* 4-column dynamic Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 auto-rows-min">
        
        {/* Card 1: BASECAMP // TRAILHEAD (col-span-2) */}
        <BentoCard className="col-span-1 md:col-span-2 flex flex-col justify-between min-h-[340px]">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img 
              src="/avatar.png" 
              alt="Avatar Profile" 
              className="w-20 h-20 rounded-full border-2 border-accent-blue/30 shadow-[0_4px_20px_rgba(10,92,255,0.15)] flex-shrink-0 select-none pointer-events-none"
            />
            <div>
              <span className="text-accent-blue font-mono text-[9px] font-bold uppercase tracking-wider bg-accent-blue/10 px-2.5 py-0.5 rounded-full">
                ACTIVE STATUS // OPERATIONAL
              </span>
              <h3 className="text-3xl font-sans font-[950] tracking-[-0.03em] leading-none uppercase mt-3">
                CHUNG HEI
              </h3>
              <p className="mt-4 text-xs font-semibold text-neutral-600 leading-relaxed max-w-md">
                I am a developer operating at the intersection of DevOps, mobile ecosystems, and interactive interfaces. I engineer automated deployment pipelines and cross-platform desktop/mobile apps designed to be highly secure, reliable, and smooth to use.
              </p>
            </div>
          </div>
          <div className="mt-6 border-t border-neutral-100 pt-4">
            <span className="text-neutral-400 block mb-2.5 font-mono text-[9px] font-bold uppercase tracking-wider">SKILLSETS & TOOLING:</span>
            <div className="flex flex-wrap gap-1.5">
              {["React", "Next.js 16", "TypeScript", "Flutter", "TailwindCSS", "Kubernetes", "Docker", "GitOps", "ArgoCD", "AWS"].map((tag) => (
                <span key={tag} className="bg-neutral-100/80 text-neutral-600 hover:bg-accent-blue/10 hover:text-accent-blue border border-neutral-200/50 hover:border-accent-blue/20 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase transition-all duration-200 cursor-default">{tag}</span>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Card 2: ASCENT TELEMETRY // STATS (col-span-1) - Accent box */}
        <div className="col-span-1 bg-gradient-to-br from-accent-blue via-[#004CD0] to-[#012670] text-white p-8 rounded-[2.2rem] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(10,92,255,0.25)] border border-white/10 flex flex-col justify-between min-h-[340px]">
          <div>
            <span className="font-mono text-[9px] font-bold tracking-[0.15em] uppercase text-white/80 border-b border-white/20 pb-1.5 inline-block">
              ASCENT TELEMETRY
            </span>
            <h3 className="mt-6 text-5xl font-sans font-[950] tracking-[-0.05em] leading-[0.8] uppercase text-white">
              4,810M
            </h3>
            <p className="mt-3 text-xs font-bold leading-relaxed text-white/90">
              TOTAL ACCUMULATED VERTICAL PRODUCTION DEPLOYMENTS SHIPPED AT SCALE.
            </p>
          </div>
          
          {/* Mini Activity Commit Grid (very fancy!) */}
          <div className="my-4">
            <span className="block text-[8px] font-mono font-bold text-white/50 uppercase tracking-widest mb-1.5">COMMIT FREQUENCY:</span>
            <div className="grid grid-cols-7 gap-1 w-fit">
              {Array.from({ length: 28 }).map((_, idx) => {
                const opacity = idx % 5 === 0 ? "bg-white/20" : idx % 3 === 0 ? "bg-white/60" : idx % 2 === 0 ? "bg-emerald-400" : "bg-white/90";
                return (
                  <div key={idx} className={`w-2.5 h-2.5 rounded-[2px] ${opacity} shadow-[0_0_4px_rgba(255,255,255,0.1)]`} />
                );
              })}
            </div>
          </div>

          <div className="border-t border-white/10 pt-3 text-left font-mono text-[9px] font-bold uppercase tracking-wider text-white/80 flex justify-between items-center">
            <span>SYS_STATUS: 100% OK</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Card 3: ROUTE LOG // TIMELINE (col-span-1, row-span-2) - Tall block bridging rows 1 and 2 */}
        <div className="col-span-1 md:row-span-2 h-full">
          <SystemTimeline />
        </div>

        {/* Card 4: SUMMIT // ROUTE-01 (col-span-2) */}
        <BentoCard className="col-span-1 md:col-span-2 flex flex-col justify-between min-h-[340px]">
          <div>
            <span className="text-accent-blue font-mono text-[10px] font-bold uppercase tracking-wider">
              {projects[0].category}
            </span>
            <h3 className="text-4xl font-sans font-[950] tracking-[-0.03em] leading-[0.9] uppercase mt-3">
              {projects[0].title}
            </h3>
            <p className="mt-4 text-sm font-semibold text-neutral-600 leading-relaxed">
              {projects[0].description}
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {projects[0].tags.map((tag) => (
                <span key={tag} className="bg-neutral-100/85 text-neutral-500 border border-neutral-200/50 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <a href={projects[0].liveUrl} className="bg-accent-blue text-white px-5 py-2.5 rounded-full font-mono text-[11px] font-bold uppercase transition-all hover:bg-accent-blue/90 hover:shadow-[0_8px_20px_rgba(10,92,255,0.25)] active:scale-[0.98]">
              EXPLORE
            </a>
            <a
              href={projects[0].repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-100 text-black border border-neutral-200/60 px-5 py-2.5 rounded-full font-mono text-[11px] font-bold uppercase transition-all hover:bg-neutral-200 active:scale-[0.98]"
            >
              GITHUB
            </a>
          </div>
        </BentoCard>

        {/* Card 5: SUMMIT // ROUTE-02 (col-span-1) - Small square card */}
        <BentoCard className="col-span-1 flex flex-col justify-between min-h-[340px]">
          <div>
            <span className="text-accent-blue font-mono text-[10px] font-bold uppercase tracking-wider">
              {projects[1].category}
            </span>
            <h3 className="text-2xl font-sans font-[950] tracking-[-0.03em] leading-[0.9] uppercase mt-3">
              {projects[1].title}
            </h3>
            <p className="mt-4 text-xs font-semibold text-neutral-600 leading-relaxed">
              {projects[1].description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {projects[1].tags.map((tag) => (
                <span key={tag} className="bg-neutral-100/85 text-neutral-500 border border-neutral-200/50 text-[8px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <a
              href={projects[1].liveUrl}
              className="bg-neutral-100 text-black border border-neutral-200/60 px-4 py-2 rounded-full font-mono text-[10px] font-bold uppercase transition-all hover:bg-neutral-200 active:scale-[0.98]"
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
