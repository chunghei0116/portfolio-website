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
    <section className="relative w-full max-w-7xl mx-auto px-6 py-12 select-none">
      <div className="brutalist-border bg-card-bg p-6 sm:p-8">
        
        {/* Main timeline header */}
        <div className="border-b border-neutral-200/60 pb-4 mb-6">
          <span className="text-moss-shadow font-mono text-[9px] font-bold uppercase tracking-wider bg-neutral-100 border border-neutral-200 px-2 py-0.5">
            CAREER TIMELINE // PATHWAY
          </span>
          <h2 className="text-3xl font-sans font-semibold tracking-tight uppercase mt-4 text-foreground">
            FLIGHT PATHWAY
          </h2>
        </div>

        {/* Brutalist Coordinate Grid Timeline */}
        <div className="flex flex-col divide-y divide-neutral-200/60 w-full max-w-full">
          {history.map((node) => (
            <div key={node.year} className="py-6 flex flex-col md:flex-row md:items-start justify-between gap-6 w-full max-w-full">
              {/* Left Metadata Coordinate block */}
              <div className="min-w-[150px]">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-neutral-100 border border-neutral-200 px-2 py-1 select-none text-moss-shadow">
                  [ {node.year} ]
                </span>
              </div>

              {/* Right Content Block */}
              <div className="flex-1 min-w-0 w-full max-w-full">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2 w-full max-w-full">
                  <span className="font-sans font-semibold text-base text-foreground tracking-tight uppercase break-words">
                    {node.role}
                  </span>
                  <span className="hidden md:inline text-neutral-300 font-mono text-xs select-none">&mdash;&gt;</span>
                  <span className="font-mono text-xs font-bold text-accent-blue uppercase">
                    {node.company}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-moss-shadow font-medium mt-2 max-w-2xl">
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
