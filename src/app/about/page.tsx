"use client";

import BentoCard from "@/components/ui/BentoCard";
import GitOpsPipeline from "@/components/ui/GitOpsPipeline";

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen px-6 py-32">
      <main className="max-w-7xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Page Header */}
        <div className="col-span-1 md:col-span-3 bg-slate-900/40 border border-white/10 rounded-2xl shadow-2xl p-8 md:p-12 mb-4 backdrop-blur-md">
          <span className="text-[10px] font-mono font-bold tracking-widest bg-accent-blue/5 text-accent-blue px-3 py-1 rounded-full border border-white/10">
            BIOGRAPHY // OVERVIEW
          </span>
          <h1 className="mt-6 font-sans font-punchy text-6xl md:text-8xl uppercase leading-none tracking-tight">
            ABOUT ME
          </h1>
        </div>

        {/* Bio Section */}
        <BentoCard className="col-span-1 md:col-span-2 min-h-[300px] flex flex-col justify-center">
          <h2 className="text-3xl font-punchy uppercase text-white">
            CRAFTING SCALABLE INFRASTRUCTURE & APPS
          </h2>
          <p className="mt-6 text-base font-semibold leading-relaxed text-neutral-400">
            I am a developer operating at the intersection of DevOps, mobile ecosystems, and interactive interfaces. I engineer automated deployment pipelines and cross-platform desktop/mobile apps designed to be highly secure, reliable, and smooth to use.
          </p>
        </BentoCard>

        {/* GitOps Pipeline */}
        <div className="col-span-1">
          <GitOpsPipeline />
        </div>

        {/* Timeline / Experience */}
        <BentoCard className="col-span-1 md:col-span-3 min-h-[300px]">
          <h3 className="text-2xl font-punchy uppercase mb-4 border-b border-white/10 pb-2">
            TIMELINE // WORK RECORD
          </h3>
          <div className="flex flex-col divide-y divide-white/5 w-full max-w-full">
            <div className="py-5 flex flex-col md:flex-row md:items-start justify-between gap-4 w-full max-w-full">
              <div className="min-w-[150px]">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-slate-800 text-neutral-300 border border-white/10 px-2.5 py-1.5 rounded-full select-none shadow-sm">
                  [ 2025 — PRES ]
                </span>
              </div>
              <div className="flex-1 min-w-0 w-full max-w-full">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2 w-full max-w-full">
                  <h4 className="font-punchy text-sm uppercase text-white break-words">Mobile Application Developer</h4>
                  <span className="hidden md:inline text-white/20 font-mono text-xs select-none">&mdash;&gt;</span>
                  <span className="font-mono text-xs font-semibold text-accent-blue uppercase tracking-wider">AS Watson Group</span>
                </div>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-neutral-400">
                  Lead Flutter developer responsible for the 1M+ active user CRM application in Hong Kong. Engineered high-availability client architectures and optimized core module load times.
                </p>
              </div>
            </div>

            <div className="py-5 flex flex-col md:flex-row md:items-start justify-between gap-4 w-full max-w-full">
              <div className="min-w-[150px]">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-slate-800 text-neutral-300 border border-white/10 px-2.5 py-1.5 rounded-full select-none shadow-sm">
                  [ 2023 — 2025 ]
                </span>
              </div>
              <div className="flex-1 min-w-0 w-full max-w-full">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2 w-full max-w-full">
                  <h4 className="font-punchy text-sm uppercase text-white break-words">Programmer</h4>
                  <span className="hidden md:inline text-white/20 font-mono text-xs select-none">&mdash;&gt;</span>
                  <span className="font-mono text-xs font-semibold text-accent-blue uppercase tracking-wider">Asia Allied Infrastructure Group</span>
                </div>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-neutral-400">
                  Architected secure procurement portals, internal staff platforms, and managed enterprise-grade app store deployments. Set up GitLab/ArgoCD pipelines and EKS container administration.
                </p>
              </div>
            </div>

            <div className="py-5 flex flex-col md:flex-row md:items-start justify-between gap-4 w-full max-w-full">
              <div className="min-w-[150px]">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-slate-800 text-neutral-300 border border-white/10 px-2.5 py-1.5 rounded-full select-none shadow-sm">
                  [ 2021 ]
                </span>
              </div>
              <div className="flex-1 min-w-0 w-full max-w-full">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2 w-full max-w-full">
                  <h4 className="font-punchy text-sm uppercase text-white break-words">Summer Intern</h4>
                  <span className="hidden md:inline text-white/20 font-mono text-xs select-none">&mdash;&gt;</span>
                  <span className="font-mono text-xs font-semibold text-accent-blue uppercase tracking-wider">EMSD HKSAR</span>
                </div>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-neutral-400">
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
