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
    detail: "Integrated multi-target Flutter frameworks into production native iOS and retail applications.",
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
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
            History Log // Milestones
          </span>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 bg-neutral-100 rounded-full border border-neutral-200/50" />
            <span className="w-2.5 h-2.5 bg-neutral-100 rounded-full border border-neutral-200/50" />
          </div>
        </div>
        <h3 className="mt-4 text-2xl font-black tracking-tight text-black uppercase">
          ROUTE LOG
        </h3>
      </div>

      {/* Vertical Timeline Layout */}
      <div className="mt-6 flex-1 space-y-6 border-l-2 border-neutral-200/60 pl-5 ml-1.5 py-1 relative">
        {timelineData.map((m, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[27px] top-1.5 w-3 h-3 bg-white border-[3px] border-neutral-300 rounded-full group-hover:border-accent-blue group-hover:bg-accent-blue/20 transition-all duration-300 shadow-[0_0_10px_transparent] group-hover:shadow-[0_0_8px_rgba(10,92,255,0.4)]" />
            
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[9px] font-extrabold text-accent-blue uppercase tracking-wider">
                  {m.quarter}
                </span>
                <span className="bg-neutral-100 text-neutral-500 text-[8px] font-mono font-bold px-2 py-0.5 rounded-full border border-neutral-200/30">
                  {m.badge}
                </span>
              </div>
              <h4 className="font-sans font-black text-xs text-black uppercase mt-1.5 leading-tight group-hover:text-accent-blue transition-colors duration-200">
                {m.title}
              </h4>
              <p className="font-sans text-[11px] leading-relaxed text-neutral-500 mt-1.5 font-semibold">
                {m.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-neutral-100 pt-3">
        <p className="text-xs font-mono text-neutral-400">
          * Recorded production checkpoints.
        </p>
      </div>
    </BentoCard>
  );
}
