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
        <div className="flex items-center justify-between border-b border-black/5 pb-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-foreground/50 uppercase">
            History Log // Milestones
          </span>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 bg-black/5 border border-black/10 rounded-full" />
            <span className="w-2 h-2 bg-black/5 border border-black/10 rounded-full" />
          </div>
        </div>
        <h3 className="mt-4 text-2xl font-punchy tracking-tight text-foreground uppercase">
          ROUTE LOG
        </h3>
      </div>

      {/* Vertical Timeline Layout */}
      <div className="mt-4 flex-1 space-y-4 border-l border-black/5 pl-4 ml-1.5 py-1 relative">
        {timelineData.map((m, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 bg-white border border-black/10 rounded-full group-hover:bg-accent-blue transition-colors duration-200" />
            
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[9px] font-extrabold text-accent-blue uppercase">
                  {m.quarter}
                </span>
                <span className="bg-white text-neutral-600 border border-black/5 text-[7px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide shadow-xs">
                  {m.badge}
                </span>
              </div>
              <h4 className="font-sans font-bold text-xs text-foreground uppercase mt-0.5 leading-tight group-hover:text-accent-blue transition-colors duration-200">
                {m.title}
              </h4>
              <p className="font-sans text-[10px] leading-snug text-neutral-500 mt-1 font-semibold">
                {m.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-black/5 pt-3">
        <p className="text-xs font-mono text-black/40">
          * Recorded production checkpoints.
        </p>
      </div>
    </BentoCard>
  );
}
