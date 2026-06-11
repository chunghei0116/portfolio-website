"use client";

import { Canvas } from "@react-three/fiber";
import BentoCard from "./BentoCard";
import { CityEnvironment, CameraController } from "../canvas/CityEnvironment";
import PipelineScene from "../canvas/PipelineScene";
import FlutterParticles from "../canvas/FlutterParticles";

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
    description: "Generative art collections using WebGL shaders and real-time noise displacement vectors.",
    tags: ["WebGL", "Shaders", "GLSL"],
    liveUrl: "#",
    repoUrl: "https://github.com/chunghei0116",
  },
];

export default function BentoGrid() {
  return (
    <section id="projects" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 scroll-mt-24 select-none">
      <div className="grid grid-cols-12 gap-6 auto-rows-min">
        
        {/* Card A: ASCENT TELEMETRY - Giant Stat (col-span-4) */}
        <div className="col-span-12 md:col-span-4 brutalist-border bg-[#F0A828] text-[#373C42] p-8 brutalist-shadow brutalist-hover-lift flex flex-col justify-between min-h-[200px]">
          <div>
            <span className="font-mono text-[0.75rem] font-bold tracking-[0.15em] uppercase text-[#373C42]/70 border-b-2 border-[#373C42]/20 pb-1.5 inline-block">
              ASCENT TELEMETRY
            </span>
            <h3 className="text-6xl md:text-7xl font-sans font-[950] tracking-[-0.05em] leading-none uppercase text-[#373C42] mt-6">
              4.8K+
            </h3>
          </div>
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#373C42]/80">
            * LIVE PROD DEPLOYMENTS
          </span>
        </div>

        {/* Card B: PROJECT ALPHA - Massive Heading (col-span-8) */}
        <BentoCard className="col-span-12 md:col-span-8 flex flex-col justify-between min-h-[200px]">
          <div>
            <span className="font-mono text-[0.75rem] font-bold tracking-[0.15em] text-foreground/50 uppercase">
              SUMMIT // ROUTE-01
            </span>
            <h3 className="text-4xl md:text-5xl font-sans font-[950] tracking-[-0.04em] leading-[0.85] uppercase mt-4 text-foreground">
              PROJECT ALPHA
            </h3>
          </div>
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-foreground/50">
            3D CANVAS VISUALIZATION // R3F & SHADERS
          </span>
        </BentoCard>

        {/* Card C: ROUTE LOG / TIMELINE (col-span-3, row-span-2) */}
        <BentoCard className="col-span-12 md:col-span-3 md:row-span-2 flex flex-col justify-between min-h-[380px]">
          <div>
            <span className="font-mono text-[0.75rem] font-bold tracking-[0.15em] text-foreground/50 uppercase border-b border-foreground/10 pb-1.5 inline-block w-full">
              ROUTE LOG
            </span>
            <h3 className="text-3xl font-sans font-[950] tracking-[-0.04em] leading-none uppercase mt-6 text-foreground">
              2026
            </h3>
            <div className="flex flex-col gap-5 mt-6 font-sans font-[900] text-sm md:text-base leading-none text-foreground uppercase tracking-tight">
              <div>Q1 SYNC //</div>
              <div className="text-accent-blue">Q2 BRIDGE //</div>
              <div className="text-foreground/40">Q3 STABLE //</div>
            </div>
          </div>
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-foreground/40">
            * PROGRESS ARCHIVE
          </span>
        </BentoCard>

        {/* Card D: WELCOME PROFILE - Center Focal Card (col-span-6, row-span-2) with static 3D City background and giant Swiss typography */}
        <BentoCard 
          className="col-span-12 md:col-span-6 md:row-span-2 flex flex-col justify-between min-h-[380px] bg-card-bg border-black border-[5px] shadow-[12px_12px_0px_#000000] hover:shadow-[16px_16px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 relative overflow-hidden p-0"
        >
          {/* Static Background 3D City Canvas */}
          <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
            <Canvas camera={{ position: [0, 0.5, 2.8], fov: 50 }}>
              <ambientLight intensity={1.5} />
              <pointLight position={[5, 5, 5]} intensity={2} />
              <CityEnvironment isExpanded={false} />
              <CameraController isExpanded={false} />
            </Canvas>
          </div>

          {/* Foreground overlay static UI details */}
          <div className="flex justify-between items-start p-8 relative z-10 pointer-events-none w-full">
            <span className="text-accent-blue font-mono text-[9px] font-bold uppercase tracking-wider bg-accent-blue/10 border border-black px-2.5 py-0.5">
              3D CANVAS CITY
            </span>
          </div>

          <div className="p-8 relative z-10 pointer-events-none w-full flex-1 flex flex-col justify-end">
            <h3 className="text-5xl md:text-6xl font-sans font-[950] tracking-[-0.05em] leading-[0.8] uppercase text-foreground">
              CHUNG HEI
            </h3>
            <div className="border-t border-black/10 pt-4 mt-6">
              <h4 className="text-2xl font-sans font-[950] tracking-tight uppercase leading-none text-foreground">
                DEVOPS & MOBILE
              </h4>
              <span className="text-foreground/50 block font-mono text-[9px] font-bold uppercase tracking-widest mt-2">
                3D PROCEDURAL CITY ARCHITECTURE SYSTEM ACTIVE
              </span>
            </div>
          </div>
        </BentoCard>

        {/* Card E: PROJECT BETA - Small square project card (col-span-3, row-span-2) */}
        <BentoCard className="col-span-12 md:col-span-3 md:row-span-2 flex flex-col justify-between min-h-[380px]">
          <div>
            <span className="font-mono text-[0.75rem] font-bold tracking-[0.15em] text-foreground/50 uppercase border-b border-foreground/10 pb-1.5 inline-block w-full">
              SUMMIT // ROUTE-02
            </span>
            <h3 className="text-3xl font-sans font-[950] tracking-[-0.04em] leading-none uppercase mt-6 text-foreground">
              PROJECT BETA
            </h3>
          </div>
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-foreground/50 leading-snug">
            WEBGL SHADERS & DISPLACEMENTS
          </span>
        </BentoCard>

        {/* Card F: GITOPS PIPELINE (col-span-8) */}
        <div className="col-span-12 md:col-span-8 brutalist-border bg-accent-blue text-white p-8 brutalist-shadow brutalist-hover-lift flex flex-col justify-between min-h-[300px] md:min-h-[240px] relative overflow-hidden">
          
          {/* Absolute Background 3D Flowing Pipeline Canvas */}
          <div className="absolute inset-0 z-0 opacity-80 pointer-events-none select-none">
            <Canvas camera={{ position: [0, 0, 1.8], fov: 50 }}>
              <ambientLight intensity={1.5} />
              <PipelineScene />
            </Canvas>
          </div>

          {/* Frosted Glass Overlay for Readability */}
          <div className="absolute inset-0 z-[5] bg-accent-blue/60 backdrop-blur-[3px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 w-full relative z-10 pointer-events-none">
            <div>
              <span className="font-mono text-[0.75rem] font-bold tracking-[0.15em] text-white/60 uppercase border-b border-white/20 pb-1.5 inline-block">
                SYSTEM DEPLOYMENTS
              </span>
              <h3 className="text-3xl md:text-4xl font-sans font-[950] tracking-[-0.04em] leading-none uppercase text-white mt-4">
                GITOPS // DEVOPS CORE
              </h3>
            </div>
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-emerald-300 bg-white/10 border border-white/20 px-3 py-1 select-none flex-shrink-0 w-fit">
              100% OK // ACTIVE
            </span>
          </div>

          {/* 3-Column Typographic DevOps Stack Grid with Custom SVG Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/10 pt-6 mt-6 relative z-10 pointer-events-none">
            <div className="flex flex-col items-start">
              {/* Kubernetes heptagon-wheel icon (Purple to match upper branch) */}
              <svg className="w-6 h-6 text-[#c084fc] mb-3 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L20.5 7v10L12 22L3.5 17V7L12 2z" />
                <path d="M12 2v20M3.5 7l17 10M3.5 17l17-10" />
                <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
              </svg>
              <span className="font-sans font-black text-sm uppercase text-white tracking-tight block mb-1">01 / KUBERNETES</span>
              <span className="font-mono text-[9px] uppercase tracking-wide text-white/60">ArgoCD, GitOps loops, Helm, EKS cluster deploys</span>
            </div>
            <div className="flex flex-col items-start">
              {/* Docker/Hypervisor isometric container stack icon (Emerald to match middle branch) */}
              <svg className="w-6 h-6 text-[#34d399] mb-3 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
                <path d="M2 7v10M12 12v10M22 7v10" />
              </svg>
              <span className="font-sans font-black text-sm uppercase text-white tracking-tight block mb-1">02 / HYPERVISOR</span>
              <span className="font-mono text-[9px] uppercase tracking-wide text-white/60">Docker containers, multi-stage hermetic builds</span>
            </div>
            <div className="flex flex-col items-start">
              {/* Bare-Metal Server Rack icon (Amber/Orange to match lower branch) */}
              <svg className="w-6 h-6 text-[#fb923c] mb-3 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="5" rx="1" />
                <rect x="2" y="11" width="20" height="5" rx="1" />
                <rect x="2" y="19" width="20" height="5" rx="1" />
                <path d="M6 5.5h.01M6 13.5h.01M6 21.5h.01" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M17 5.5h2M17 13.5h2M17 21.5h2" strokeWidth="1.2" />
              </svg>
              <span className="font-sans font-black text-sm uppercase text-white tracking-tight block mb-1">03 / BARE-METAL</span>
              <span className="font-mono text-[9px] uppercase tracking-wide text-white/60">Linux systems, self-hosted homelabs, AWS cloud</span>
            </div>
          </div>
        </div>

        {/* Card G: Interactive Flutter Particle Canvas (col-span-4) */}
        <BentoCard className="col-span-12 md:col-span-4 min-h-[240px] relative overflow-hidden">
          {/* Background Interactive Flutter Particle Canvas */}
          <div className="absolute inset-0 z-0 opacity-100 select-none">
            <Canvas camera={{ position: [0, 0, 1.8], fov: 50 }}>
              <ambientLight intensity={1.5} />
              <FlutterParticles />
            </Canvas>
          </div>
        </BentoCard>

      </div>
    </section>
  );
}
