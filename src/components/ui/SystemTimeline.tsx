"use client";

import React from "react";
import BentoCard from "./BentoCard";

interface Milestone {
  quarter: string;
  title: string;
  detail: string;
  badge: string;
}

const timelineData: Milestone[] = [
  {
    quarter: "Q1 2026",
    title: "Turbopack Core Sync",
    detail: "Migrated full portfolio & client services to Next.js 16, decreasing page overhead and boosting build speed.",
    badge: "Next.js 16"
  },
  {
    quarter: "Q4 2025",
    title: "Cluster Re-Architecture",
    detail: "Optimized AWS EKS node scaling and resource budgets, shrinking monthly infrastructure spend by 25%.",
    badge: "AWS / K8s"
  },
  {
    quarter: "Q2 2025",
    title: "Flutter Native Bridging",
    detail: "Integrated multi-target Flutter frameworks into production native iOS and Android retail applications.",
    badge: "Flutter"
  },
  {
    quarter: "Q1 2025",
    title: "GitOps Declarative Loop",
    detail: "Established ArgoCD workflows and automated deployment reconciles to eliminate sync-drift issues.",
    badge: "ArgoCD"
  }
];

export default function SystemTimeline() {
  return (
    <BentoCard className="flex h-full min-h-[400px] flex-col justify-between overflow-hidden">
      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
            History Log // Milestones
          </span>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 bg-neutral-200 border border-black" />
            <span className="w-2.5 h-2.5 bg-neutral-200 border border-black" />
          </div>
        </div>
        <h3 className="mt-4 text-2xl font-black tracking-tight text-black uppercase">
          ROUTE LOG
        </h3>
      </div>

      {/* Vertical Timeline Layout */}
      <div className="mt-4 flex-1 space-y-4 border-l-2 border-black pl-4 ml-1.5 py-1 relative">
        {timelineData.map((m, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[23px] top-1.5 w-3 h-3 bg-white border-[3px] border-black rounded-full group-hover:bg-accent-blue transition-colors duration-100" />
            
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[9px] font-extrabold text-accent-blue uppercase">
                  {m.quarter}
                </span>
                <span className="bg-black text-white text-[7px] font-mono font-bold px-1 py-0.5 uppercase tracking-wide">
                  {m.badge}
                </span>
              </div>
              <h4 className="font-sans font-black text-xs text-black uppercase mt-0.5 leading-tight group-hover:text-accent-blue transition-colors duration-100">
                {m.title}
              </h4>
              <p className="font-sans text-[10px] leading-snug text-neutral-600 mt-1 font-semibold">
                {m.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-black/10 pt-3">
        <p className="text-xs font-mono text-black/50">
          * Recorded production checkpoints.
        </p>
      </div>
    </BentoCard>
  );
}
