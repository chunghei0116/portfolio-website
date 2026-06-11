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
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
            Cluster Map // GitOps Deployment
          </span>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 bg-neutral-100 rounded-full border border-neutral-200/50" />
            <span className="w-2.5 h-2.5 bg-neutral-100 rounded-full border border-neutral-200/50" />
            <span className="w-2.5 h-2.5 bg-neutral-100 rounded-full border border-neutral-200/50" />
          </div>
        </div>
        <h3 className="mt-4 text-2xl font-black tracking-tight text-black uppercase">
          INFRASTRUCTURE DIAGRAM
        </h3>
      </div>

      {/* Interactive Diagram Pipeline Flow */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {pipelineStages.map((stage) => {
          const isActive = stage.id === activeStageId;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`text-left p-4 border rounded-[1.3rem] transition-all duration-300 relative ${
                isActive
                  ? "bg-accent-blue border-accent-blue text-white shadow-[0_8px_25px_rgba(10,92,255,0.2)] -translate-y-0.5"
                  : "bg-white/60 border-neutral-200/50 text-black shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:border-neutral-300"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-3">
                <span className={`w-2 h-2 rounded-full ${
                  stage.status === "SUCCESS" ? "bg-emerald-400" :
                  stage.status === "SYNCING" ? "bg-amber-400 animate-pulse" :
                  "bg-neutral-300"
                }`} />
                <span className={`font-mono text-[8px] font-bold uppercase tracking-wider ${isActive ? "text-white/60" : "text-neutral-400"}`}>
                  {stage.status}
                </span>
              </div>
              <p className="font-mono text-[10px] font-black uppercase tracking-tight leading-tight">
                {stage.name.split(" // ")[1]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Display Panel */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6 border border-neutral-200/50 rounded-[1.8rem] p-6 bg-white/40 backdrop-blur-md font-mono text-xs shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
        {/* Left Description Column */}
        <div className="md:col-span-3 flex flex-col justify-between space-y-5">
          <div>
            <span className="bg-accent-blue/10 text-accent-blue px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
              {activeStage.name}
            </span>
            <p className="mt-3.5 text-[12px] font-sans font-bold leading-relaxed text-neutral-600">
              {activeStage.description}
            </p>
          </div>

          <div>
            <span className="block text-[8px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Telemetry Monitor:</span>
            <div className="bg-neutral-900 text-emerald-400 p-2.5 rounded-lg border border-neutral-800 text-[9px] overflow-x-auto whitespace-nowrap">
              &gt; {activeStage.telemetry}
            </div>
          </div>

          <div>
            <span className="block text-[8px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Tooling Assembly:</span>
            <div className="flex flex-wrap gap-1.5">
              {activeStage.tools.map((t) => (
                <span key={t} className="bg-neutral-100 text-neutral-600 border border-neutral-200/50 text-[9px] px-2.5 py-0.5 rounded-full font-bold">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Code Config Column */}
        <div className="md:col-span-2 flex flex-col">
          <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Source Config Payload:</span>
          <pre className="flex-1 bg-neutral-950 text-neutral-400 p-4 rounded-xl border border-neutral-900 text-[9px] overflow-auto select-all leading-tight max-h-[150px]">
            <code>{activeStage.yaml}</code>
          </pre>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-mono text-neutral-400">
          * Interactive GitOps architecture block. Click pipeline stages to inspect real-time telemetry specs.
        </p>
      </div>
    </BentoCard>
  );
}
