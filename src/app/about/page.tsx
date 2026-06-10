"use client";

import BentoCard from "@/components/ui/BentoCard";
import SkillTerminal from "@/components/ui/SkillTerminal";

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen px-6 py-32">
      <main className="max-w-7xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Page Header */}
        <div className="col-span-1 md:col-span-3 bg-white/80 backdrop-blur-md border border-black/[0.08] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] p-8 md:p-12 mb-4">
          <span className="text-[10px] font-mono font-bold tracking-widest bg-selection-bg text-black px-3 py-1 rounded-full border border-black/5">
            BIOGRAPHY // OVERVIEW
          </span>
          <h1 className="mt-6 font-sans font-black text-6xl md:text-8xl uppercase leading-none">
            ABOUT ME
          </h1>
        </div>

        {/* Bio Section */}
        <BentoCard className="col-span-1 md:col-span-2 min-h-[300px] flex flex-col justify-center">
          <h2 className="text-3xl font-black uppercase text-black">
            CRAFTING DIGITAL OBJECTS
          </h2>
          <p className="mt-6 text-base leading-relaxed text-black/70">
            I am a creative developer operating at the boundary of design systems and functional code. I build interactive websites designed to excite visitors and feel alive under the mouse.
          </p>
        </BentoCard>

        {/* Skills Terminal */}
        <div className="col-span-1">
          <SkillTerminal />
        </div>

        {/* Timeline / Experience */}
        <BentoCard className="col-span-1 md:col-span-3 min-h-[300px]">
          <h3 className="text-2xl font-black uppercase mb-6 border-b border-black/5 pb-2">
            TIMELINE // WORK RECORD
          </h3>
          <div className="space-y-6 font-mono text-xs text-black/80">
            <div className="flex flex-col md:flex-row gap-4 border-b border-black/5 pb-4">
              <span className="font-bold text-white bg-neutral-900 px-2.5 py-1 rounded-md text-[10px] tracking-widest self-start uppercase">2022 — PRES</span>
              <div>
                <h4 className="font-black text-sm uppercase">Lead Engineer @ Aesthetic Lab</h4>
                <p className="mt-1">Building high-performance interactive modules and custom canvases.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 border-b border-black/5 pb-4">
              <span className="font-bold text-black bg-selection-bg px-2.5 py-1 rounded-md text-[10px] tracking-widest self-start uppercase">2020 — 2022</span>
              <div>
                <h4 className="font-black text-sm uppercase">Interactive Designer @ Studio X</h4>
                <p className="mt-1">Crafting flat vector components, typography assets, and UI motion prototypes.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <span className="font-bold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md text-[10px] tracking-widest self-start uppercase">2018 — 2020</span>
              <div>
                <h4 className="font-black text-sm uppercase">Full Stack Dev @ Tech Corp</h4>
                <p className="mt-1">Building scalable web applications and component libraries with Next.js.</p>
              </div>
            </div>
          </div>
        </BentoCard>
      </main>
    </div>
  );
}
