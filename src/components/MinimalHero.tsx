'use client';

import React from 'react';
import HeroCanvas from './HeroCanvas';
import { ArrowUpRight, Code2 } from 'lucide-react';

export default function MinimalHero() {
  return (
    <section id="top" className="relative min-h-[100dvh] w-full flex flex-col justify-center px-6 overflow-hidden">
      {/* 3D Canvas Background Layer */}
      <HeroCanvas />

      <div className="max-w-5xl mx-auto w-full relative z-10 pt-20 md:pt-24 pb-12 flex flex-col justify-center">
        {/* 1. Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md text-emerald-400 text-xs font-mono tracking-wide uppercase mb-6 w-fit">
          <Code2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Creative Technologist &amp; Full-Stack Architect</span>
        </div>

        {/* 2. Headline (Max 2 lines desktop) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.98] uppercase text-white max-w-4xl mb-6">
          Architecting <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 leading-[1.1] inline-block pb-1">
            Digital Experiences.
          </span>
        </h1>

        {/* 3. Subtext (Max 20 words, max 3 lines) */}
        <p className="text-base sm:text-lg text-zinc-300 font-normal max-w-xl leading-relaxed mb-8">
          Crafting high-performance WebGL experiences, clean React 19 architectures, and interactive digital interfaces at scale.
        </p>

        {/* 4. CTAs */}
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
          <a
            href="#works"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Inspect Selected Work</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-zinc-200 bg-white/5 border border-white/15 hover:border-emerald-400/50 hover:bg-white/10 transition-all transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Get in Touch</span>
          </a>
        </div>
      </div>
    </section>
  );
}
