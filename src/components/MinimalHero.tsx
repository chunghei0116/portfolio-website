'use client';

import React from 'react';
import HeroCanvas from './HeroCanvas';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function MinimalHero() {
  return (
    <section id="top" className="relative min-h-[100dvh] w-full flex flex-col justify-center px-6 overflow-hidden">
      {/* 3D Canvas Background Layer */}
      <HeroCanvas />

      <div className="max-w-4xl mx-auto w-full relative z-10 pt-20 md:pt-24 pb-12 flex flex-col justify-center">
        {/* Eyebrow Micro-Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-400 mb-8 w-fit">
          <Sparkles className="w-3 h-3 text-emerald-400" strokeWidth={1.5} />
          <span>Creative Technologist &amp; Architect</span>
        </div>

        {/* Headline (Max 2 lines desktop) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.96] uppercase text-white max-w-4xl mb-8">
          Purposeful Code. <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-emerald-300 to-cyan-400 leading-[1.1] inline-block pb-1">
            Fluid Interfaces.
          </span>
        </h1>

        {/* Subtext (Max 20 words) */}
        <p className="text-base sm:text-lg text-zinc-300 font-normal max-w-xl leading-relaxed mb-10">
          Crafting high-performance WebGL experiences, clean React architectures, and interactive digital products with obsession for detail.
        </p>

        {/* Button-in-Button CTAs */}
        <div className="flex flex-wrap items-center gap-4 font-sans text-xs">
          <a
            href="#works"
            className="group inline-flex items-center gap-3 pl-6 pr-2 py-3 rounded-full font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.3)] transform active:scale-[0.98]"
          >
            <span>Explore Selected Work</span>
            <div className="w-7 h-7 rounded-full bg-zinc-950/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-950" strokeWidth={2} />
            </div>
          </a>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 pl-6 pr-2 py-3 rounded-full font-semibold text-zinc-200 bg-white/[0.04] border border-white/15 hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300 transform active:scale-[0.98]"
          >
            <span>Get in Touch</span>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-200" strokeWidth={1.5} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
