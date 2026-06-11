"use client";

import React from "react";
import BentoCard from "./BentoCard";

export default function BentoGrid() {
  return (
    <section id="projects" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 scroll-mt-24 select-none">
      {/* 12-column grid layout matching the reference layout structure */}
      <div className="grid grid-cols-12 gap-5 auto-rows-min">
        
        {/* ROW 1 & 2 Left Section: Welcome to Bento Portfolio (col-span-6, row-span-2) */}
        <div className="col-span-12 md:col-span-6 md:row-span-2 bg-[#F5F2EB] text-[#0F0F0F] rounded-[1.8rem] p-8 flex flex-col justify-between min-h-[340px] hover:shadow-[0_15px_35px_rgba(245,242,235,0.08)]">
          <div className="flex flex-col sm:flex-row gap-6 justify-between items-start">
            <div className="max-w-md">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1982FC]">
                Welcome to
              </span>
              <h3 className="text-4xl sm:text-5xl font-sans font-[950] tracking-[-0.03em] leading-none uppercase mt-2">
                BENTO PORTFOLIO
              </h3>
              <p className="mt-4 text-xs font-semibold text-[#555555] leading-relaxed">
                Where code meets clean design. Engineering highly automated deployment pipelines and modular cross-platform interfaces.
              </p>
            </div>
            <img 
              src="/avatar.png" 
              alt="Profile Avatar" 
              className="w-24 h-24 rounded-full border-2 border-[#1982FC]/20 shadow-[0_8px_25px_rgba(25,130,252,0.1)] flex-shrink-0"
            />
          </div>
          <div className="flex items-center justify-between mt-8">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#555555]">
              CHUNG HEI // DEVOPS & MOBILE
            </span>
            <div className="w-8 h-8 rounded-full bg-white border border-[#0F0F0F]/10 flex items-center justify-center shadow-sm cursor-pointer hover:scale-110 transition-transform">
              <svg className="w-4 h-4 text-[#0F0F0F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* ROW 1 Right Section: Program Stories Banner (col-span-6) */}
        <div className="col-span-12 md:col-span-6 bg-[#F39C12] text-white rounded-[1.8rem] px-6 py-4 flex items-center justify-between min-h-[56px] hover:shadow-[0_10px_20px_rgba(243,156,18,0.15)]">
          <span className="font-mono text-[11px] font-black uppercase tracking-wider">
            Program Stories
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        </div>

        {/* ROW 2 Right Section: 3-column subgrid (col-span-6) */}
        <div className="col-span-12 md:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Sub-Col 1: Two small stacked boxes */}
          <div className="flex flex-col gap-5 h-full">
            {/* Box 1 (White): DEVOPS info */}
            <div className="bg-[#FFFFFF] text-[#0F0F0F] p-4 rounded-[1.5rem] flex-1 flex flex-col justify-between min-h-[120px] shadow-sm">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[8px] font-black uppercase tracking-wider text-neutral-400">CD GitOps</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#1982FC]" />
              </div>
              <p className="font-mono text-[11px] font-black uppercase tracking-tight text-[#0f0f0f] leading-none">
                VERIFIED ACTIONS
              </p>
            </div>
            {/* Box 2 (Orange): WINNERS text */}
            <div className="bg-[#F39C12] text-white p-4 rounded-[1.5rem] flex-1 flex flex-col justify-center min-h-[120px] shadow-sm">
              <span className="font-mono text-[7px] font-bold uppercase tracking-widest text-white/60 mb-1">TELEMETRY</span>
              <p className="font-mono text-[10px] font-black uppercase tracking-tight leading-tight">
                4.8K+ Commits Shipped Live
              </p>
            </div>
          </div>

          {/* Sub-Col 2: Tall Red Card (MOBILE DEV) */}
          <div className="bg-[#C0392B] text-white p-4 rounded-[1.5rem] flex flex-col justify-between min-h-[260px] shadow-sm">
            <div>
              <span className="font-mono text-[8px] font-black uppercase tracking-widest text-white/60">MOBILE DEV</span>
              <h4 className="font-sans font-[900] text-sm uppercase mt-1 leading-tight">
                FLUTTER ENGINE
              </h4>
            </div>
            {/* Simulated Mobile Mock UI */}
            <div className="bg-[#A93226] border border-white/10 rounded-lg p-3 my-2 flex flex-col gap-1.5">
              <div className="w-full h-1.5 bg-white/20 rounded-full" />
              <div className="w-2/3 h-1.5 bg-white/20 rounded-full" />
              <div className="w-full h-5 bg-[#F39C12] rounded flex items-center justify-center font-mono text-[8px] font-bold mt-1">
                RUN SIM
              </div>
            </div>
            <p className="font-mono text-[8px] text-white/75 leading-tight">
              * Activity Based Cross-Platform Mobile Handshake.
            </p>
          </div>

          {/* Sub-Col 3: Tall White Card (LIVE RUN) */}
          <div className="bg-[#FFFFFF] text-[#0F0F0F] p-4 rounded-[1.5rem] flex flex-col justify-between min-h-[260px] shadow-sm">
            <div>
              <span className="font-mono text-[8px] font-black uppercase tracking-widest text-neutral-400">STATUS</span>
              <h4 className="font-sans font-[950] text-sm uppercase mt-1 leading-tight text-[#0F0F0F]">
                DEPLOYMENT STATUS
              </h4>
            </div>
            <div className="flex flex-col gap-2 my-2">
              {["AWS EKS", "ArgoCD", "Kubernetes"].map((item, idx) => (
                <div key={item} className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-neutral-500 uppercase">
                  <span className={`w-2 h-2 rounded-full ${idx === 1 ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
                  {item}
                </div>
              ))}
            </div>
            <p className="font-mono text-[8px] text-neutral-400 leading-tight">
              * Live synchronizations running globally.
            </p>
          </div>

        </div>

        {/* ROW 3 Left Section: Video walkthrough (col-span-5) */}
        <div className="col-span-12 md:col-span-5 bg-white text-black rounded-[1.8rem] p-6 flex flex-col justify-between min-h-[260px] shadow-sm relative overflow-hidden group hover:shadow-[0_15px_30px_rgba(255,255,255,0.05)] border border-neutral-100">
          <div className="relative w-full aspect-video rounded-xl bg-neutral-100 border border-neutral-200/50 flex items-center justify-center overflow-hidden">
            {/* Red play button */}
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center cursor-pointer shadow-md transform group-hover:scale-110 transition-transform z-10">
              <svg className="w-5 h-5 text-white fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="absolute inset-0 bg-neutral-900/5 backdrop-blur-[1px]" />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-tight text-[#0F0F0F]">
              Watch Pipeline Video Walkthrough
            </h4>
            <span className="text-[9px] font-mono text-neutral-400 font-bold">01:42</span>
          </div>
        </div>

        {/* ROW 3 Middle Section: 2 stacked boxes (col-span-2) */}
        <div className="col-span-12 md:col-span-2 flex flex-col gap-5 h-full">
          {/* Box 1 (Pink): Tech logo */}
          <div className="bg-[#FFAEC9] text-[#3D0C11] p-4 rounded-[1.5rem] flex-1 flex items-center justify-center min-h-[120px] shadow-sm relative overflow-hidden">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
          </div>
          {/* Box 2 (Dark Grey): Node Grid Map */}
          <div className="bg-[#2A2A2A] text-white p-4 rounded-[1.5rem] flex-1 flex flex-col justify-between min-h-[120px] shadow-sm">
            <span className="font-mono text-[7px] font-bold uppercase tracking-widest text-neutral-400">Node Matrix Grid</span>
            <div className="grid grid-cols-5 gap-1 my-2">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className={`h-2 rounded-[1px] ${i % 4 === 0 ? "bg-red-500 animate-pulse" : "bg-emerald-400"}`} />
              ))}
            </div>
            <span className="font-mono text-[7px] font-bold text-neutral-500">SYS: EKS CLUSTER ACTIVE</span>
          </div>
        </div>

        {/* ROW 3 Right Section: Bento Design (col-span-5) */}
        <div className="col-span-12 md:col-span-5 bg-[#0F3D64] text-[#FFF9E6] rounded-[1.8rem] p-8 flex flex-col justify-between min-h-[260px] hover:shadow-[0_15px_30px_rgba(15,61,100,0.25)]">
          <div>
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-300">
              Bento Design
            </span>
            <h3 className="text-3xl font-sans font-[950] tracking-[-0.03em] leading-none uppercase mt-3">
              SYSTEM ARCHITECTURE
            </h3>
            <p className="mt-4 text-[11px] font-semibold text-[#FFF9E6]/70 leading-relaxed">
              This approach borrows concepts from GitOps, deploying containerized pods and configurations in dynamic code branches for cleaner structure.
            </p>
          </div>
          <div className="flex items-center justify-between mt-6">
            {/* Mini avatar overlap circle indicators */}
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-neutral-200 border border-[#0F3D64] flex items-center justify-center font-mono text-[8px] font-bold text-black">
                  U{i}
                </div>
              ))}
            </div>
            <div className="w-8 h-8 rounded-full bg-white border border-[#FFF9E6]/10 flex items-center justify-center shadow-sm cursor-pointer hover:scale-110 transition-transform">
              <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* ROW 4 Section: Authorized Partners Banner (col-span-12) */}
        <div className="col-span-12 bg-[#F39C12] text-white rounded-[1.8rem] px-6 py-4 flex items-center justify-between min-h-[56px] mt-2 shadow-sm">
          <span className="font-mono text-[11px] font-black uppercase tracking-wider">
            Verified Technologies & Toolsets
          </span>
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center cursor-pointer">
            <span className="text-[10px] text-black">➔</span>
          </div>
        </div>

        {/* ROW 5 Section: Partner Logos row (6 items, col-span-2 each) */}
        {["React/Next", "TypeScript", "Kubernetes", "Docker", "Flutter", "AWS"].map((tool, index) => (
          <div
            key={index}
            className="col-span-6 md:col-span-2 bg-[#FFFFFF] text-[#0F0F0F] p-4 rounded-[1.5rem] flex items-center justify-center min-h-[90px] font-mono text-[10px] font-black uppercase tracking-wider shadow-sm hover:scale-105 transition-transform duration-200 cursor-default"
          >
            {tool}
          </div>
        ))}

      </div>
    </section>
  );
}
