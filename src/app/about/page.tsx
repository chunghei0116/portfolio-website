"use client";

import BentoCard from "@/components/ui/BentoCard";
import GitOpsPipeline from "@/components/ui/GitOpsPipeline";

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen px-6 py-32">
      <main className="max-w-7xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Page Header */}
        <div className="col-span-1 md:col-span-3 bg-white border-[4px] border-black rounded-none shadow-[8px_8px_0px_#000000] p-8 md:p-12 mb-4">
          <span className="text-[10px] font-mono font-bold tracking-widest bg-accent-blue text-white px-3 py-1 rounded-none border border-black">
            BIOGRAPHY // OVERVIEW
          </span>
          <h1 className="mt-6 font-sans font-[950] text-6xl md:text-8xl uppercase leading-none tracking-tight">
            ABOUT ME
          </h1>
        </div>

        {/* Bio Section */}
        <BentoCard className="col-span-1 md:col-span-2 min-h-[300px] flex flex-col justify-center">
          <h2 className="text-3xl font-[950] uppercase text-black">
            CRAFTING SCALABLE INFRASTRUCTURE & APPS
          </h2>
          <p className="mt-6 text-base font-bold leading-relaxed text-moss-shadow">
            I am a developer operating at the intersection of DevOps, mobile ecosystems, and interactive interfaces. I engineer automated deployment pipelines and cross-platform desktop/mobile apps designed to be highly secure, reliable, and smooth to use.
          </p>
        </BentoCard>

        {/* GitOps Pipeline */}
        <div className="col-span-1">
          <GitOpsPipeline />
        </div>

        {/* Timeline / Experience */}
        <BentoCard className="col-span-1 md:col-span-3 min-h-[300px]">
          <h3 className="text-2xl font-[950] uppercase mb-6 border-b-2 border-black pb-2">
            TIMELINE // WORK RECORD
          </h3>
          <div className="space-y-6 font-mono text-xs text-black">
            <div className="flex flex-col md:flex-row gap-4 border-b border-black/10 pb-4">
              <span className="font-bold text-white bg-black px-2.5 py-1 rounded-none border border-black text-[10px] tracking-widest self-start uppercase">2025 — PRES</span>
              <div>
                <h4 className="font-black text-sm uppercase">Mobile Application Developer @ AS Watson Group</h4>
                <p className="mt-1 font-bold text-moss-shadow">Primary developer on 1M Active user CRM in Hong Kong. Flutter Expertised.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 border-b border-black/10 pb-4">
              <span className="font-bold text-white bg-accent-blue px-2.5 py-1 rounded-none border border-black text-[10px] tracking-widest self-start uppercase">2023 — 2025</span>
              <div>
                <h4 className="font-black text-sm uppercase">Programmer @ Asia Allied Infrastructure Group</h4>
                <p className="mt-1 font-bold text-moss-shadow">Procurement website, internal Staff app, enterprise / unlisted app release, DevOps / CICD, K8s admin.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <span className="font-bold text-black bg-white px-2.5 py-1 rounded-none border border-black text-[10px] tracking-widest self-start uppercase">2021</span>
              <div>
                <h4 className="font-black text-sm uppercase">Summer Intern @ EMSD HKSAR</h4>
                <p className="mt-1 font-bold text-moss-shadow">Mainly assisting System Analyst to bugfix and develop features on government websites.</p>
              </div>
            </div>
          </div>
        </BentoCard>
      </main>
    </div>
  );
}
