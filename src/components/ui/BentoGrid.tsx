"use client";

import { useState, useEffect } from "react";
import BentoCard from "./BentoCard";

export default function BentoGrid() {
  const [githubCount, setGithubCount] = useState<string>("4.8K+");

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (data.count) {
          const num = Number(data.count);
          if (num >= 1000) {
            setGithubCount(`${(num / 1000).toFixed(1)}K+`);
          } else {
            setGithubCount(`${num}+`);
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching github count", err);
      });
  }, []);

  return (
    <section id="projects" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 scroll-mt-24 select-none">
      <div className="grid grid-cols-12 gap-4 auto-rows-min">
        
        {/* Card A: GITHUB CONTRIBUTIONS — Shield Stat */}
        <div className="col-span-12 md:col-span-4 min-w-0 parchment-card shield-border p-6 flex flex-col justify-between min-h-[220px]">
          <div className="w-full">
            <span className="text-alpine-mono">
              ⚔ BATTLE LOG
            </span>
            <div className="mt-6">
              <h3 className="text-5xl font-serif font-bold tracking-tight text-accent-gold fire-glow">
                {githubCount}
              </h3>
              <p className="text-xs text-muted-foreground mt-2 font-sans">Contributions forged</p>
            </div>
          </div>
          <div className="w-full">
            <a
              href="https://github.com/chunghei0116"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-wider text-accent-gold border-t border-accent-gold/20 pt-3 group hover:text-fire transition-colors"
            >
              <span>VIEW ARMORY ↗</span>
            </a>
          </div>
        </div>

        {/* Card B: PROJECT ALPHA — Main Quest */}
        <BentoCard className="col-span-12 md:col-span-8 flex flex-col justify-between min-h-[220px]">
          <div>
            <span className="text-alpine-mono">
              📜 QUEST LOG // ROUTE-01
            </span>
            <h3 className="text-3xl font-serif font-bold tracking-tight mt-4 text-parchment">
              THE WATCHTOWER
            </h3>
            <p className="mt-2 text-xs font-medium text-muted-foreground max-w-2xl leading-relaxed">
              A high-performance 3D spatial visualization platform built with React Three Fiber. Implements custom orbit controllers, terrain shaders, and dynamic lighting simulation.
            </p>
          </div>
          <span className="text-alpine-mono">
            THREE.JS • R3F • NEXT.JS
          </span>
        </BentoCard>

        {/* Card C: ROUTE LOG / TIMELINE — Scroll */}
        <BentoCard className="col-span-12 md:col-span-3 md:row-span-2 flex flex-col justify-between min-h-[340px]">
          <div>
            <span className="text-alpine-mono border-b border-accent-gold/20 pb-1.5 inline-block w-full">
              📅 CAMPAIGN LOG
            </span>
            <h3 className="text-2xl font-serif font-bold tracking-tight mt-6 text-parchment">
              2026 QUESTS
            </h3>
            <div className="flex flex-col gap-4 mt-6 font-mono text-xs font-bold text-parchment uppercase tracking-tight">
              <div className="flex items-center gap-2 text-accent-gold">🟢 <span>Q1 — AWAKENING</span></div>
              <div className="flex items-center gap-2 text-muted-foreground">⚪ <span>Q2 — EXPEDITION</span></div>
              <div className="flex items-center gap-2 text-stone">⚪ <span>Q3 — CONQUEST</span></div>
            </div>
          </div>
          <span className="text-alpine-mono">
            STAGES
          </span>
        </BentoCard>

        {/* Card D: PROFILE — Hero Card */}
        <BentoCard className="col-span-12 md:col-span-6 md:row-span-2 flex flex-col justify-end min-h-[340px] parchment-card p-6">
          <div className="w-full flex flex-col justify-end">
            <span className="text-alpine-mono mb-2">🛡️ THE KNIGHT</span>
            <h3 className="text-4xl font-serif font-bold tracking-tight text-accent-gold uppercase">
              CHUNG HEI
            </h3>
            <div className="border-t border-accent-gold/20 pt-4 mt-6">
              <h4 className="text-base font-serif font-semibold tracking-tight uppercase leading-none text-parchment">
                DevOps & Mobile Engineer
              </h4>
              <p className="mt-2 text-xs font-medium text-muted-foreground leading-relaxed">
                Operating at the intersection of high-availability backend orchestration and smooth native cross-platform experiences.
              </p>
            </div>
          </div>
        </BentoCard>

        {/* Card E: PROJECT BETA — Side Quest */}
        <BentoCard className="col-span-12 md:col-span-3 md:row-span-2 flex flex-col justify-between min-h-[340px]">
          <div>
            <span className="text-alpine-mono border-b border-accent-gold/20 pb-1.5 inline-block w-full">
              📜 QUEST LOG // ROUTE-02
            </span>
            <h3 className="text-2xl font-serif font-bold tracking-tight mt-6 text-parchment">
              ARCANE ARSENAL
            </h3>
            <p className="mt-2 text-xs font-medium text-muted-foreground leading-relaxed">
              Generative art collections using WebGL shaders and real-time noise displacement vectors.
            </p>
          </div>
          <span className="text-alpine-mono">
            WEBGL • SHADERS • GLSL
          </span>
        </BentoCard>

        {/* Card F: DEVOPS STACK — Forge */}
        <div className="col-span-12 parchment-card shield-border p-6 flex flex-col justify-between min-h-[220px]">
          <div>
            <span className="text-alpine-mono">
              🔥 THE FORGE
            </span>
            <h3 className="text-2xl font-serif font-bold tracking-tight text-parchment mt-4">
              DEVOPS ARSENAL
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-accent-gold/20 pt-6 mt-6">
            <div className="flex flex-col items-start">
              <span className="font-serif font-bold text-xs uppercase text-accent-gold tracking-tight block mb-1">01 / KUBERNETES</span>
              <span className="font-mono text-[9px] uppercase tracking-wide text-muted-foreground">ArgoCD, GitOps loops, Helm, EKS cluster deploys</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-serif font-bold text-xs uppercase text-accent-gold tracking-tight block mb-1">02 / HYPERVISOR</span>
              <span className="font-mono text-[9px] uppercase tracking-wide text-muted-foreground">Docker containers, multi-stage hermetic builds</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-serif font-bold text-xs uppercase text-accent-gold tracking-tight block mb-1">03 / CLOUD SYSTEMS</span>
              <span className="font-mono text-[9px] uppercase tracking-wide text-muted-foreground">Linux systems, self-hosted homelabs, AWS cloud</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
