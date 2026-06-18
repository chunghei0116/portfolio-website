"use client";

import React from "react";

const history = [
  {
    year: "2025 — PRESENT",
    role: "MOBILE APPLICATION DEVELOPER",
    company: "AS Watson Group",
    desc: "Lead Flutter developer responsible for the 1M+ active user CRM application in Hong Kong. Engineered high-availability client architectures and optimized core module load times."
  },
  {
    year: "2023 — 2025",
    role: "PROGRAMMER",
    company: "Asia Allied Infrastructure Group",
    desc: "Architected secure procurement portals, internal staff platforms, and managed enterprise-grade app store deployments. Set up GitLab/ArgoCD pipelines and EKS container administration."
  },
  {
    year: "2021",
    role: "SUMMER INTERN",
    company: "EMSD HKSAR",
    desc: "Collaborated with senior System Analysts to patch, debug, and develop new public-facing features on government municipal websites."
  }
];

export default function TechSection() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-16 select-none">
      <div className="parchment-card shield-border p-6 sm:p-8">
        
        {/* Timeline header */}
        <div className="border-b border-accent-gold/20 pb-4 mb-6">
          <span className="text-alpine-mono bg-dark-wood border border-accent-gold/20 px-2 py-0.5">
            📜 CHRONICLE // QUESTS COMPLETED
          </span>
          <h2 className="text-3xl font-serif font-bold tracking-tight uppercase mt-4 text-parchment medieval-heading">
            The Journey
          </h2>
        </div>

        {/* Medieval scroll timeline */}
        <div className="flex flex-col divide-y divide-accent-gold/15 w-full max-w-full">
          {history.map((node, i) => (
            <div key={node.year} className="py-6 flex flex-col md:flex-row md:items-start justify-between gap-6 w-full max-w-full">
              {/* Year badge */}
              <div className="min-w-[150px]">
                <span className="font-serif text-[10px] font-bold uppercase tracking-wider bg-fire/20 border border-fire/30 px-3 py-1 select-none text-fire">
                  {i === 0 ? "⚔" : i === 1 ? "🛡" : "✦"} {node.year}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 w-full max-w-full">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2 w-full max-w-full">
                  <span className="font-serif font-semibold text-base text-accent-gold tracking-tight uppercase break-words">
                    {node.role}
                  </span>
                  <span className="hidden md:inline text-accent-gold/40 font-mono text-xs select-none">→</span>
                  <span className="font-mono text-xs font-bold text-muted-foreground uppercase">
                    {node.company}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground font-medium mt-2 max-w-2xl">
                  {node.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
