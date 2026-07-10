"use client";

import React, { useState } from "react";
import BentoCard from "./BentoCard";

interface Stage {
  id: string;
  name: string;
  status: "SUCCESS" | "SYNCING" | "PENDING";
  tools: string[];
  description: string;
  telemetry: string;
  yaml: string;
}

const pipelineStages: Stage[] = [
  {
    id: "commit",
    name: "01 // Vcs Commit",
    status: "SUCCESS",
    tools: ["Git", "GitHub Webhooks"],
    description: "Developer pushes code modifications to remote trunk. Triggers webhook handshake with building cluster.",
    telemetry: "COMMIT_SHA: 0cb8372 // AUTHOR: JONES.TSE // STATUS: TRIGGERED",
    yaml: `metadata:
  trigger: git-push
  target: main
  webhook: active`
  },
  {
    id: "build",
    name: "02 // CI Build & Check",
    status: "SUCCESS",
    tools: ["GitHub Actions", "Docker", "ESLint"],
    description: "Multi-stage Docker builds compiled under Turbopack. Runs typechecks, unit tests, and security scanning.",
    telemetry: "LINTING: 100% OK // COMPILATION: 3.2s // SECURITY: 0 VULN",
    yaml: `jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build`
  },
  {
    id: "gitops",
    name: "03 // GitOps Reconcile",
    status: "SYNCING",
    tools: ["ArgoCD", "Kustomize"],
    description: "Continuous delivery loop detects sync-drift between target Git repo and live cluster definitions.",
    telemetry: "HEALTH: Healthy // SYNC_STATUS: OutOfSync -> Syncing...",
    yaml: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: portfolio-app
spec:
  syncPolicy:
    automated:
      prune: true`
  },
  {
    id: "deploy",
    name: "04 // Orchestrated Pods",
    status: "PENDING",
    tools: ["Kubernetes", "AWS EKS"],
    description: "Zero-downtime rolling update schedules deployment replicasets. Traffic redirected dynamically.",
    telemetry: "REPLICAS: 3/3 ACTIVE // LOAD_BALANCER: OK // ROUTE: 100%",
    yaml: `kind: Deployment
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1`
  }
];

export default function GitOpsPipeline() {
  const [activeStageId, setActiveStageId] = useState<string>("gitops");
  const activeStage = pipelineStages.find((s) => s.id === activeStageId) || pipelineStages[2];

  return (
    <BentoCard className="flex h-full min-h-[400px] flex-col justify-between overflow-hidden bg-card-bg" disableHover>
      <div>
        <div className="flex items-center justify-between border-b border-foreground/10 pb-2">
          <span className="text-sepia-mono">
            Codex Map // GitOps Orchestration
          </span>
        </div>
        <h3 className="mt-4 font-serif text-xl sm:text-2xl text-foreground/90 font-medium">
          Apprenticeship Schematic
        </h3>
      </div>

      {/* Interactive Diagram Pipeline Flow */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {pipelineStages.map((stage) => {
          const isActive = stage.id === activeStageId;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`text-left p-3 border transition-all duration-300 relative rounded-sm ${
                isActive
                  ? "bg-accent-terracotta text-background border-accent-terracotta/20 shadow-md scale-[1.02]"
                  : "bg-foreground/[0.02] text-foreground border-foreground/10 hover:bg-foreground/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className={`w-2 h-2 rounded-full ${
                  stage.status === "SUCCESS" ? "bg-accent-gold" :
                  stage.status === "SYNCING" ? "bg-accent-terracotta animate-pulse" :
                  "bg-foreground/20"
                }`} />
                <span className={`font-mono text-[7px] font-bold uppercase tracking-wider ${isActive ? "text-background/80" : "text-sepia-dim"}`}>
                  {stage.status}
                </span>
              </div>
              <p className={`font-mono text-[9px] font-bold uppercase tracking-widest leading-tight ${isActive ? "text-background" : "text-foreground/90"}`}>
                {stage.name.split(" // ")[1]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Display Panel */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4 border border-foreground/10 p-4 bg-background/50 rounded-sm font-mono text-[10px]">
        {/* Left Description Column */}
        <div className="md:col-span-3 flex flex-col justify-between space-y-4">
          <div>
            <p className="text-[9px] font-bold text-accent-terracotta uppercase tracking-widest">
              {activeStage.name}
            </p>
            <p className="mt-2 font-serif text-xs leading-relaxed text-sepia-dim">
              {activeStage.description}
            </p>
          </div>

          <div>
            <span className="block text-[8px] font-bold text-sepia-dim uppercase mb-1">Telemetry Monitor:</span>
            <div className="bg-foreground/[0.03] text-foreground p-2 rounded-sm text-[9px] border border-foreground/10 overflow-x-auto whitespace-nowrap">
              &gt; {activeStage.telemetry}
            </div>
          </div>

          <div>
            <span className="block text-[8px] font-bold text-sepia-dim uppercase mb-1">Tooling Assembly:</span>
            <div className="flex flex-wrap gap-1.5">
              {activeStage.tools.map((t) => (
                <span key={t} className="bg-card-bg text-foreground border border-foreground/10 text-[8px] px-2 py-0.5 font-bold rounded-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Code Config Column */}
        <div className="md:col-span-2 flex flex-col">
          <span className="block text-[8px] font-bold text-sepia-dim uppercase mb-1">Source Config Payload:</span>
          <pre className="flex-1 bg-foreground/[0.03] text-foreground p-3 rounded-sm text-[8px] border border-foreground/10 overflow-auto select-all leading-tight max-h-[140px]">
            <code>{activeStage.yaml}</code>
          </pre>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[9px] font-mono text-sepia-dim italic">
          * Interactive blueprint layout. Select stages to view telemetry payload.
        </p>
      </div>
    </BentoCard>
  );
}
