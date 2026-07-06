"use client";

import BentoCard from "@/components/ui/BentoCard";
import GitOpsPipeline from "@/components/ui/GitOpsPipeline";

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen px-6 py-32">
      <main className="max-w-7xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Page Header */}
        <div className="col-span-1 md:col-span-3 bg-white/70 border border-black/5 rounded-3xl shadow-xl p-8 md:p-12 mb-4 backdrop-blur-md">
          <span className="text-[10px] font-mono font-bold tracking-widest bg-accent-blue/5 text-accent-blue px-3 py-1 rounded-full border border-black/5">
            BIOGRAPHY // OVERVIEW
          </span>
          <h1 className="mt-6 font-sans font-punchy text-6xl md:text-8xl uppercase leading-none tracking-tight">
            ABOUT ME
          </h1>
        </div>

        {/* Bio Section */}
        <BentoCard className="col-span-1 md:col-span-2 min-h-[300px] flex flex-col justify-center">
          <h2 className="text-3xl font-punchy uppercase text-foreground">
            CRAFTING SCALABLE INFRASTRUCTURE & APPS
          </h2>
          <p className="mt-6 text-base font-semibold leading-relaxed text-neutral-600">
            I am a developer operating at the intersection of DevOps, mobile ecosystems, and interactive interfaces. I engineer automated deployment pipelines and cross-platform desktop/mobile apps designed to be highly secure, reliable, and smooth to use.
          </p>
        </BentoCard>

        {/* GitOps Pipeline */}
        <div className="col-span-1">
          <GitOpsPipeline />
        </div>

        {/* Timeline / Experience */}
        <BentoCard className="col-span-1 md:col-span-3 min-h-[300px]">
          <h3 className="text-2xl font-punchy uppercase mb-4 border-b border-black/5 pb-2">
            TIMELINE // WORK RECORD
          </h3>
          <div className="flex flex-col divide-y divide-black/5 w-full max-w-full">
            <div className="py-5 flex flex-col md:flex-row md:items-start justify-between gap-4 w-full max-w-full">
              <div className="min-w-[150px]">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-white text-neutral-700 border border-black/5 px-2.5 py-1.5 rounded-full select-none shadow-xs">
                  [ 2025 — PRES ]
                </span>
              </div>
              <div className="flex-1 min-w-0 w-full max-w-full">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2 w-full max-w-full">
                  <h4 className="font-punchy text-sm uppercase text-foreground break-words">Mobile Application Developer</h4>
                  <span className="hidden md:inline text-black/20 font-mono text-xs select-none">&mdash;&gt;</span>
                  <span className="font-mono text-xs font-semibold text-accent-blue uppercase tracking-wider">AS Watson Group</span>
                </div>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-neutral-500">
                  Lead Flutter developer responsible for the 1M+ active user CRM application in Hong Kong. Engineered high-availability client architectures and optimized core module load times.
                </p>
              </div>
            </div>

            <div className="py-5 flex flex-col md:flex-row md:items-start justify-between gap-4 w-full max-w-full">
              <div className="min-w-[150px]">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-white text-neutral-700 border border-black/5 px-2.5 py-1.5 rounded-full select-none shadow-xs">
                  [ 2023 — 2025 ]
                </span>
              </div>
              <div className="flex-1 min-w-0 w-full max-w-full">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2 w-full max-w-full">
                  <h4 className="font-punchy text-sm uppercase text-foreground break-words">Programmer</h4>
                  <span className="hidden md:inline text-black/20 font-mono text-xs select-none">&mdash;&gt;</span>
                  <span className="font-mono text-xs font-semibold text-accent-blue uppercase tracking-wider">Asia Allied Infrastructure Group</span>
                </div>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-neutral-500">
                  Architected secure procurement portals, internal staff platforms, and managed enterprise-grade app store deployments. Set up GitLab/ArgoCD pipelines and EKS container administration.
                </p>
              </div>
            </div>

            <div className="py-5 flex flex-col md:flex-row md:items-start justify-between gap-4 w-full max-w-full">
              <div className="min-w-[150px]">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-white text-neutral-700 border border-black/5 px-2.5 py-1.5 rounded-full select-none shadow-xs">
                  [ 2021 ]
                </span>
              </div>
              <div className="flex-1 min-w-0 w-full max-w-full">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2 w-full max-w-full">
                  <h4 className="font-punchy text-sm uppercase text-foreground break-words">Summer Intern</h4>
                  <span className="hidden md:inline text-black/20 font-mono text-xs select-none">&mdash;&gt;</span>
                  <span className="font-mono text-xs font-semibold text-accent-blue uppercase tracking-wider">EMSD HKSAR</span>
                </div>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-neutral-500">
                  Collaborated with senior System Analysts to patch, debug, and develop new public-facing features on government municipal websites.
                </p>
              </div>
            </div>
          </div>
        </BentoCard>
      </main>
    </div>
  );
}
