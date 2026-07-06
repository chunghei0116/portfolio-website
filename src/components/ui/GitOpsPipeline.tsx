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
    <BentoCard className="flex h-full min-h-[400px] flex-col justify-between overflow-hidden">
      <div>
        <div className="flex items-center justify-between border-b border-black/5 pb-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-foreground/50 uppercase">
            Cluster Map // GitOps Deployment
          </span>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 bg-black/5 border border-black/10 rounded-full" />
            <span className="w-2 h-2 bg-black/5 border border-black/10 rounded-full" />
            <span className="w-2 h-2 bg-black/5 border border-black/10 rounded-full" />
          </div>
        </div>
        <h3 className="mt-4 text-2xl font-punchy tracking-tight text-foreground uppercase">
          INFRASTRUCTURE DIAGRAM
        </h3>
      </div>

      {/* Interactive Diagram Pipeline Flow */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {pipelineStages.map((stage) => {
          const isActive = stage.id === activeStageId;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`text-left p-3 border rounded-xl transition-all duration-300 relative ${
                isActive
                  ? "bg-accent-blue text-white border-black/5 shadow-md shadow-accent-blue/15 scale-[1.02]"
                  : "bg-white/40 text-neutral-800 border-black/5 hover:bg-white/80 hover:border-black/10"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className={`w-2 h-2 rounded-full border ${
                  stage.status === "SUCCESS" ? "bg-emerald-400 border-black/5" :
                  stage.status === "SYNCING" ? "bg-amber-400 animate-pulse border-black/5" :
                  "bg-neutral-300 border-black/5"
                }`} />
                <span className={`font-mono text-[7px] font-bold ${isActive ? "text-white/70" : "text-neutral-400"}`}>
                  {stage.status}
                </span>
              </div>
              <p className={`font-mono text-[10px] font-bold uppercase tracking-tight leading-tight ${isActive ? "text-white" : "text-neutral-800"}`}>
                {stage.name.split(" // ")[1]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Display Panel */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4 border border-black/5 p-4 bg-white/78 rounded-xl font-mono text-xs backdrop-blur-md">
        {/* Left Description Column */}
        <div className="md:col-span-3 flex flex-col justify-between space-y-4">
          <div>
            <p className="text-[10px] font-bold text-accent-blue uppercase tracking-wider">
              {activeStage.name}
            </p>
            <p className="mt-2 text-[11px] font-sans font-medium leading-relaxed text-neutral-600">
              {activeStage.description}
            </p>
          </div>

          <div>
            <span className="block text-[8px] font-bold text-black/40 uppercase mb-1">Telemetry Monitor:</span>
            <div className="bg-black/60 text-emerald-400 p-2.5 rounded-lg text-[9px] border border-black/5 overflow-x-auto whitespace-nowrap">
              &gt; {activeStage.telemetry}
            </div>
          </div>

          <div>
            <span className="block text-[8px] font-bold text-black/40 uppercase mb-1">Tooling Assembly:</span>
            <div className="flex flex-wrap gap-1.5">
              {activeStage.tools.map((t) => (
                <span key={t} className="bg-white text-neutral-600 border border-black/5 text-[9px] px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Code Config Column */}
        <div className="md:col-span-2 flex flex-col">
          <span className="text-[8px] font-bold text-black/40 uppercase mb-1">Source Config Payload:</span>
          <pre className="flex-1 bg-slate-950 text-neutral-300 p-3 rounded-lg text-[9px] border border-black/5 overflow-auto select-all leading-tight max-h-[140px]">
            <code>{activeStage.yaml}</code>
          </pre>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-mono text-black/40">
          * Interactive GitOps architecture block. Click pipeline stages to inspect real-time telemetry specs.
        </p>
      </div>
    </BentoCard>
  );
}
