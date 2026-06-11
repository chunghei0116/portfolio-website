"use client";

import React from "react";
import BentoCard from "./BentoCard";

export default function BentoGrid() {
  return (
    <section id="projects" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 scroll-mt-24 select-none">
      {/* 4-column desktop layout mirroring the design exactly */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-min">
        
        {/* Card 1: Top-Left Yellow Block (col-span-1) */}
        <BentoCard className="col-span-1 bg-[#FFC53D] text-[#3D0C11] flex items-center justify-center min-h-[170px] p-6 hover:shadow-[0_15px_30px_rgba(255,197,61,0.25)]">
          <svg viewBox="0 0 24 24" className="w-24 h-24 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C10.9 2 10 2.9 10 4V8.5L8.5 7C7.7 6.2 6.3 6.2 5.5 7C4.7 7.8 4.7 9.2 5.5 10L10.5 15C11.3 15.8 11.9 16.8 12.2 18H18.5C19.9 18 21 16.9 21 15.5V11C21 9.9 20.1 9 19 9H17.5C16.4 9 15.5 8.1 15.5 7V4C15.5 2.9 14.6 2 13.5 2H12Z" />
            <path d="M4 12C2.9 12 2 12.9 2 14V17C2 18.1 2.9 19 4 19C5.1 19 6 18.1 6 17V14C6 12.9 5.1 12 4 12Z" />
          </svg>
        </BentoCard>

        {/* Card 2: Top Middle-Left Blue Block (col-span-1) */}
        <BentoCard className="col-span-1 bg-[#1982FC] text-white flex flex-col justify-between min-h-[170px] p-6 hover:shadow-[0_15px_30px_rgba(25,130,252,0.25)]">
          <a
            href="mailto:example@domain.com"
            className="w-full bg-[#FFF9E6] text-black px-5 py-3 rounded-full font-sans font-[900] text-[12px] uppercase tracking-wide flex items-center justify-between hover:bg-white transition-colors"
          >
            <span>POST YOUR TASK</span>
            <span className="text-lg">→</span>
          </a>
          <p className="font-mono text-[9px] font-bold text-white/80 uppercase tracking-widest leading-none mt-4">
            * PIPELINE TELEMETRY READY
          </p>
        </BentoCard>

        {/* Card 3: Top-Right Giant Dark Maroon Block (col-span-2, row-span-2) */}
        <BentoCard className="col-span-1 md:col-span-2 md:row-span-2 bg-[#3D0C11] text-[#FFF9E6] p-8 flex flex-col justify-between min-h-[364px] hover:shadow-[0_20px_40px_rgba(61,12,17,0.2)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
            
            {/* Project 1: Daniel (Handyman) */}
            <div className="bg-[#FFF9E6] text-black rounded-[1.8rem] p-4 flex flex-col justify-between h-full shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              <div>
                <div className="rounded-t-[2rem] rounded-b-[0.5rem] bg-[#FFC53D] w-full aspect-[4/4.5] overflow-hidden relative flex items-center justify-center border border-black/5">
                  <svg className="w-12 h-12 text-[#3D0C11] opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                </div>
                <h4 className="font-sans font-[900] text-[15px] mt-3 uppercase tracking-tight leading-none text-[#3D0C11]">
                  ALPHA
                </h4>
                <p className="text-[9px] font-mono text-black/50 font-bold mt-1 uppercase">
                  ★ 4.9 | 3D CANVAS
                </p>
              </div>
              <button className="w-full bg-[#FFC53D] text-[#3D0C11] py-2 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider mt-4 hover:bg-[#e0ab30] transition-colors">
                EXPLORE NOW
              </button>
            </div>

            {/* Project 2: Elisa (Cook) */}
            <div className="bg-[#FFF9E6] text-black rounded-[1.8rem] p-4 flex flex-col justify-between h-full shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              <div>
                <div className="rounded-t-[2rem] rounded-b-[0.5rem] bg-[#FFAEC9] w-full aspect-[4/4.5] overflow-hidden relative flex items-center justify-center border border-black/5">
                  <svg className="w-12 h-12 text-[#3D0C11] opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-sans font-[900] text-[15px] mt-3 uppercase tracking-tight leading-none text-[#3D0C11]">
                  BETA
                </h4>
                <p className="text-[9px] font-mono text-black/50 font-bold mt-1 uppercase">
                  ★ 4.8 | WEBGL SHADER
                </p>
              </div>
              <button className="w-full bg-[#FFC53D] text-[#3D0C11] py-2 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider mt-4 hover:bg-[#e0ab30] transition-colors">
                EXPLORE NOW
              </button>
            </div>

            {/* Project 3: James (Mechanic) */}
            <div className="bg-[#FFF9E6] text-black rounded-[1.8rem] p-4 flex flex-col justify-between h-full shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              <div>
                <div className="rounded-t-[2rem] rounded-b-[0.5rem] bg-[#99CC33] w-full aspect-[4/4.5] overflow-hidden relative flex items-center justify-center border border-black/5">
                  <svg className="w-12 h-12 text-[#3D0C11] opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h4 className="font-sans font-[900] text-[15px] mt-3 uppercase tracking-tight leading-none text-[#3D0C11]">
                  GAMMA
                </h4>
                <p className="text-[9px] font-mono text-black/50 font-bold mt-1 uppercase">
                  ★ 4.6 | CD GITOPS
                </p>
              </div>
              <button className="w-full bg-[#FFC53D] text-[#3D0C11] py-2 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider mt-4 hover:bg-[#e0ab30] transition-colors">
                EXPLORE NOW
              </button>
            </div>

          </div>
        </BentoCard>

        {/* Card 4: Row 2 Left Orange-Red Block (col-span-1) */}
        <BentoCard className="col-span-1 bg-[#FF6333] text-[#3D0C11] flex items-center justify-center min-h-[170px] p-6 hover:shadow-[0_15px_30px_rgba(255,99,51,0.25)]">
          <div className="grid grid-cols-3 gap-4 text-center">
            {/* 6 Icons representing tech stack */}
            {[
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            ].map((icon, i) => (
              <div key={i} className="flex justify-center items-center opacity-85 hover:scale-110 transition-transform cursor-pointer">
                {icon}
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Card 5: Row 2 Middle Pink Block (col-span-1) */}
        <BentoCard className="col-span-1 bg-[#FFAEC9] text-[#3D0C11] flex items-center justify-center min-h-[170px] p-6 hover:shadow-[0_15px_30px_rgba(255,174,201,0.25)] relative overflow-hidden">
          {/* Simple flat illustration of a calendar and a pencil */}
          <div className="relative w-28 h-24 flex items-center justify-center">
            {/* Calendar backing */}
            <div className="absolute w-20 h-16 bg-[#FFF9E6] border-2 border-[#3D0C11] rounded-[0.5rem] shadow-[4px_4px_0px_#3D0C11] flex flex-col overflow-hidden">
              <div className="h-4 bg-[#FF6333] border-b-2 border-[#3D0C11] flex gap-1 items-center px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3D0C11]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#3D0C11]" />
              </div>
              <div className="flex-1 grid grid-cols-4 gap-1 p-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-[#3D0C11]/10 rounded-[1px] w-full h-full" />
                ))}
              </div>
            </div>
            {/* Red pencil illustration */}
            <div className="absolute w-2 h-14 bg-[#FF6333] border-2 border-[#3D0C11] rounded-full rotate-[35deg] translate-x-7 -translate-y-2 flex flex-col justify-between items-center shadow-[2px_2px_0px_#3D0C11]">
              <div className="w-full h-2 bg-[#FFC53D]" />
            </div>
          </div>
        </BentoCard>

        {/* Card 6: Row 3 Left Dark Maroon Block (col-span-1, row-span-2) */}
        <BentoCard className="col-span-1 md:row-span-2 bg-[#3D0C11] text-[#FFF9E6] flex flex-col justify-between min-h-[364px] p-8 hover:shadow-[0_20px_40px_rgba(61,12,17,0.2)]">
          <h3 className="font-sans font-[950] text-7xl uppercase leading-none tracking-tight">
            4.8K
          </h3>
          <div>
            <div className="w-fit bg-[#FFF9E6]/10 text-[#FFF9E6] border border-[#FFF9E6]/20 px-3 py-1.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Next.js / DevOps
            </div>
            <p className="font-sans text-[11px] font-bold leading-relaxed text-[#FFF9E6]/70">
              Uptime deployment logs and core Git commits monitored continuously.
            </p>
          </div>
        </BentoCard>

        {/* Card 7: Row 3 Middle Lime Green Block (col-span-1, row-span-2) */}
        <BentoCard className="col-span-1 md:row-span-2 bg-[#99CC33] text-[#3D0C11] flex flex-col justify-between min-h-[364px] p-8 hover:shadow-[0_20px_40px_rgba(153,204,51,0.2)]">
          <div className="space-y-3 w-full">
            {[
              { name: "Kubernetes", count: 13 },
              { name: "Docker", count: 8 },
              { name: "Flutter", count: 21 },
              { name: "AWS Cloud", count: 16 }
            ].map((tool, index) => (
              <div
                key={index}
                className="w-full bg-[#3D0C11] text-[#FFF9E6] px-4 py-3 rounded-full flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-wider shadow-[3px_3px_0px_#3D0C11]/30 hover:translate-x-1 transition-transform cursor-default"
              >
                <span>{tool.name}</span>
                <span className="w-5 h-5 bg-[#FF6333] text-white rounded-full flex items-center justify-center text-[9px] font-black">
                  {tool.count}
                </span>
              </div>
            ))}
          </div>
          <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-[#3D0C11]/50 block mt-6">
            * PIPELINE CLUSTER CORE
          </span>
        </BentoCard>

        {/* Card 8: Row 3 Right Pink Block (col-span-2, row-span-2) */}
        <BentoCard className="col-span-1 md:col-span-2 md:row-span-2 bg-[#FFAEC9] text-[#3D0C11] flex flex-col justify-between min-h-[364px] p-8 hover:shadow-[0_20px_40px_rgba(255,174,201,0.25)]">
          <span className="font-mono text-[9px] font-black uppercase tracking-wider">
            Brand Idea
          </span>
          <h3 className="swiss-massive-heading text-4xl sm:text-5xl md:text-6xl text-[#3D0C11] leading-[0.9] tracking-tight uppercase max-w-md my-6">
            CRAFTED ANSWERS FOR YOUR APPS
          </h3>
          <span className="font-mono text-[9px] font-black uppercase tracking-wider">
            Helper
          </span>
        </BentoCard>

      </div>
    </section>
  );
}
