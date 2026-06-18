"use client";

import { useState, useEffect } from "react";
import BentoCard from "./BentoCard";

interface Day {
  color: string;
  contributionCount: number;
  date: string;
}

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
    <section id="projects" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 scroll-mt-24 select-none">
      <div className="grid grid-cols-12 gap-6 auto-rows-min">
        
        {/* Card A: GITHUB - Minimal Stat (col-span-4) */}
        <div className="col-span-12 md:col-span-4 min-w-0 brutalist-border bg-neutral-50/60 p-6 flex flex-col justify-between min-h-[220px]">
          <div className="w-full">
            <span className="font-mono text-[0.65rem] font-bold tracking-wider text-moss-shadow uppercase">
              GITHUB CONTRIBUTIONS
            </span>
            <div className="mt-6">
              <h3 className="text-5xl font-sans font-semibold tracking-tight text-neutral-900">
                {githubCount}
              </h3>
            </div>
          </div>

          <div className="w-full">
            <a
              href="https://github.com/chunghei0116"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-wider text-accent-blue border-t border-neutral-200/60 pt-3 group hover:opacity-80"
            >
              <span>VIEW PROFILE ↗</span>
            </a>
          </div>
        </div>

        {/* Card B: PROJECT ALPHA - Simple Header (col-span-8) */}
        <BentoCard className="col-span-12 md:col-span-8 flex flex-col justify-between min-h-[220px]">
          <div>
            <span className="font-mono text-[0.65rem] font-bold tracking-wider text-moss-shadow uppercase">
              PROJECTS // ROUTE-01
            </span>
            <h3 className="text-3xl font-sans font-semibold tracking-tight mt-4 text-neutral-900">
              PROJECT ALPHA // 3D CANVAS
            </h3>
            <p className="mt-2 text-xs font-medium text-moss-shadow max-w-2xl leading-relaxed">
              A high-performance 3D spatial visualization platform built with React Three Fiber. Implements custom orbit controllers, terrain shaders, and dynamic lighting simulation.
            </p>
          </div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-moss-shadow">
            THREE.JS &bull; R3F &bull; NEXT.JS
          </span>
        </BentoCard>

        {/* Card C: ROUTE LOG / TIMELINE (col-span-3, row-span-2) */}
        <BentoCard className="col-span-12 md:col-span-3 md:row-span-2 flex flex-col justify-between min-h-[340px]">
          <div>
            <span className="font-mono text-[0.65rem] font-bold tracking-wider text-moss-shadow uppercase border-b border-neutral-200/60 pb-1.5 inline-block w-full">
              DEVELOPMENT ARCHIVE
            </span>
            <h3 className="text-2xl font-sans font-semibold tracking-tight mt-6 text-neutral-900">
              2026 ROADMAP
            </h3>
            <div className="flex flex-col gap-4 mt-6 font-mono text-xs font-bold text-neutral-800 uppercase tracking-tight">
              <div className="flex items-center gap-2">🟢 <span>Q1 SYNC</span></div>
              <div className="flex items-center gap-2 text-moss-shadow">⚪ <span>Q2 BRIDGE</span></div>
              <div className="flex items-center gap-2 text-neutral-300">⚪ <span>Q3 STABLE</span></div>
            </div>
          </div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-moss-shadow">
            STAGES
          </span>
        </BentoCard>

        {/* Card D: PROFILE - Center Focal Card (col-span-6, row-span-2) */}
        <BentoCard 
          className="col-span-12 md:col-span-6 md:row-span-2 flex flex-col justify-end min-h-[340px] bg-neutral-50/60 p-6"
        >
          <div className="w-full flex flex-col justify-end">
            <span className="font-mono text-[0.65rem] font-bold tracking-wider text-moss-shadow uppercase mb-2">ABOUT</span>
            <h3 className="text-4xl font-sans font-semibold tracking-tight text-neutral-900 uppercase">
              CHUNG HEI
            </h3>
            <div className="border-t border-neutral-200/60 pt-4 mt-6">
              <h4 className="text-base font-sans font-semibold tracking-tight uppercase leading-none text-neutral-800">
                DEVOPS & MOBILE ENGINEER
              </h4>
              <p className="mt-2 text-xs font-medium text-moss-shadow leading-relaxed">
                Operating at the intersection of high-availability backend orchestration and smooth native cross-platform experiences.
              </p>
            </div>
          </div>
        </BentoCard>

        {/* Card E: PROJECT BETA (col-span-3, row-span-2) */}
        <BentoCard className="col-span-12 md:col-span-3 md:row-span-2 flex flex-col justify-between min-h-[340px]">
          <div>
            <span className="font-mono text-[0.65rem] font-bold tracking-wider text-moss-shadow uppercase border-b border-neutral-200/60 pb-1.5 inline-block w-full">
              PROJECTS // ROUTE-02
            </span>
            <h3 className="text-2xl font-sans font-semibold tracking-tight mt-6 text-neutral-900">
              PROJECT BETA
            </h3>
            <p className="mt-2 text-xs font-medium text-moss-shadow leading-relaxed">
              Generative art collections using WebGL shaders and real-time noise displacement vectors.
            </p>
          </div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-moss-shadow">
            WEBGL &bull; SHADERS &bull; GLSL
          </span>
        </BentoCard>

        {/* Card F: GITOPS PIPELINE (col-span-12) */}
        <div className="col-span-12 brutalist-border bg-[#171717] text-white p-6 flex flex-col justify-between min-h-[220px]">
          <div>
            <span className="font-mono text-[0.65rem] font-bold tracking-wider text-neutral-400 uppercase">
              SYSTEM DEPLOYMENTS
            </span>
            <h3 className="text-2xl font-sans font-semibold tracking-tight text-white mt-4">
              DEVOPS CORE STACK
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-neutral-800 pt-6 mt-6">
            <div className="flex flex-col items-start">
              <span className="font-sans font-bold text-xs uppercase text-white tracking-tight block mb-1">01 / KUBERNETES</span>
              <span className="font-mono text-[9px] uppercase tracking-wide text-neutral-400">ArgoCD, GitOps loops, Helm, EKS cluster deploys</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-sans font-bold text-xs uppercase text-white tracking-tight block mb-1">02 / HYPERVISOR</span>
              <span className="font-mono text-[9px] uppercase tracking-wide text-neutral-400">Docker containers, multi-stage hermetic builds</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-sans font-bold text-xs uppercase text-white tracking-tight block mb-1">03 / CLOUD SYSTEMS</span>
              <span className="font-mono text-[9px] uppercase tracking-wide text-neutral-400">Linux systems, self-hosted homelabs, AWS cloud</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
