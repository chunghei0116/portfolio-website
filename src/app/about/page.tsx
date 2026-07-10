"use client";

import BentoCard from "@/components/ui/BentoCard";
import GitOpsPipeline from "@/components/ui/GitOpsPipeline";

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen px-6 py-32 bg-transparent">
      {/* Renaissance background grid */}
      <div className="absolute inset-0 z-0 sketch-grid pointer-events-none select-none opacity-30" />

      <main className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Page Header */}
        <div className="col-span-1 md:col-span-3 renaissance-frame bg-card-bg parchment-shadow p-8 md:p-12 mb-4">
          <span className="text-sepia-mono border border-foreground/10 px-3 py-1 bg-foreground/[0.02]">
            BIOGRAPHY // ARCHIVE
          </span>
          <h1 className="mt-6 font-serif italic text-5xl md:text-7xl text-accent-terracotta leading-none font-medium">
            About the Architect
          </h1>
        </div>

        {/* Bio Section */}
        <BentoCard className="col-span-1 md:col-span-2 min-h-[300px] flex flex-col justify-center bg-card-bg">
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground/90 font-medium">
            Crafting Scalable Infrastructures &amp; Digital Instruments
          </h2>
          <p className="mt-6 font-serif text-base leading-relaxed text-sepia-dim">
            Operating at the intersection of automation architectures and interactive software craftsmanship. I design resilient container pipelines and performant user engines tailored with high precision, speed, and logical geometry.
          </p>
        </BentoCard>

        {/* GitOps Pipeline */}
        <div className="col-span-1">
          <GitOpsPipeline />
        </div>

        {/* Timeline / Experience */}
        <BentoCard className="col-span-1 md:col-span-3 min-h-[300px] bg-card-bg" disableHover>
          <h3 className="font-serif text-xl sm:text-2xl text-foreground/90 border-b border-foreground/10 pb-4 mb-6">
            Chronological Account &amp; Work Records
          </h3>
          <div className="flex flex-col divide-y divide-foreground/10 w-full max-w-full">
            
            <div className="py-6 flex flex-col md:flex-row md:items-start justify-between gap-4 w-full max-w-full">
              <div className="min-w-[150px]">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-accent-gold border border-accent-gold/20 bg-accent-gold/[0.03] px-3 py-1.5 rounded-sm">
                  1500 — Present
                </span>
              </div>
              <div className="flex-1 min-w-0 w-full max-w-full">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2 w-full max-w-full">
                  <h4 className="font-serif text-base font-medium text-foreground/90 break-words">Mobile Application Developer</h4>
                  <span className="hidden md:inline text-foreground/20 font-mono text-xs select-none">&rarr;</span>
                  <span className="font-mono text-[10px] font-bold text-accent-terracotta uppercase tracking-wider">AS Watson Group</span>
                </div>
                <p className="mt-3 font-serif text-sm leading-relaxed text-sepia-dim">
                  Architecting mobile application layers. Standardizing native layout orchestration, low-latency client data interfaces, and automation pipelines.
                </p>
              </div>
            </div>

            <div className="py-6 flex flex-col md:flex-row md:items-start justify-between gap-4 w-full max-w-full">
              <div className="min-w-[150px]">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-accent-gold border border-accent-gold/20 bg-accent-gold/[0.03] px-3 py-1.5 rounded-sm">
                  1497 — 1500
                </span>
              </div>
              <div className="flex-1 min-w-0 w-full max-w-full">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2 w-full max-w-full">
                  <h4 className="font-serif text-base font-medium text-foreground/90 break-words">Programmer</h4>
                  <span className="hidden md:inline text-foreground/20 font-mono text-xs select-none">&rarr;</span>
                  <span className="font-mono text-[10px] font-bold text-accent-terracotta uppercase tracking-wider">Asia Allied Infrastructure Group</span>
                </div>
                <p className="mt-3 font-serif text-sm leading-relaxed text-sepia-dim">
                  Developed web engines and server orchestrations. Constructed continuous deployment loops and automated cloud telemetry aggregates.
                </p>
              </div>
            </div>

            <div className="py-6 flex flex-col md:flex-row md:items-start justify-between gap-4 w-full max-w-full">
              <div className="min-w-[150px]">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-accent-gold border border-accent-gold/20 bg-accent-gold/[0.03] px-3 py-1.5 rounded-sm">
                  1495
                </span>
              </div>
              <div className="flex-1 min-w-0 w-full max-w-full">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2 w-full max-w-full">
                  <h4 className="font-serif text-base font-medium text-foreground/90 break-words">Summer Apprentice</h4>
                  <span className="hidden md:inline text-foreground/20 font-mono text-xs select-none">&rarr;</span>
                  <span className="font-mono text-[10px] font-bold text-accent-terracotta uppercase tracking-wider">EMSD HKSAR</span>
                </div>
                <p className="mt-3 font-serif text-sm leading-relaxed text-sepia-dim">
                  Aggregated telemetry data and automated signal analysis using math script structures.
                </p>
              </div>
            </div>

          </div>
        </BentoCard>
      </main>
    </div>
  );
}
