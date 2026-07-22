'use client';

import React from 'react';
import { milestones } from '@/data/milestones';
import { Briefcase, Award, CheckCircle2, Terminal, Clock } from 'lucide-react';
import { audioEngine } from '@/utils/audio';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative bg-[#07070a] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[#f43f5e] bg-[#f43f5e]/10 border border-[#f43f5e]/20 mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>CAREER TRAJECTORY & MILESTONES</span>
          </div>
          <h2 
            onMouseEnter={() => audioEngine.playGlitch()}
            className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight uppercase text-white glitch-text cursor-default"
            data-text="ENGINEERING HISTORY"
          >
            ENGINEERING HISTORY
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
          {milestones.map((m) => (
            <div
              key={m.id}
              onMouseEnter={() => audioEngine.playClick(750, 0.02)}
              className="soft-card relative p-6 border border-white/10 bg-[#0e0e15]/80 hover:border-[#00f0ff]/40 transition-all"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-7 w-4 h-4 rounded-full bg-[#09090d] border-2 border-[#00f0ff] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
              </div>

              {/* Card Content Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[#00f0ff]">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#00f0ff]/10 border border-[#00f0ff]/20 font-bold">
                    {m.year}
                  </span>
                  <span>[{m.famLabel.toUpperCase()}]</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-400">{m.platform}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {m.status}
                  </span>
                </div>
              </div>

              {/* Title & Notes */}
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                {m.name}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light mb-4">
                {m.notes}
              </p>

              {/* Metric Footer */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span className="text-white font-bold">{m.metric}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{m.metricLabel}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
