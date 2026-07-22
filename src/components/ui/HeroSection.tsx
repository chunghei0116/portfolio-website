'use client';

import React from 'react';
import QuantumRefractionOrb from '@/components/3d/QuantumRefractionOrb';
import { ArrowDownRight, Sparkles, Terminal, Code2, Zap } from 'lucide-react';
import { audioEngine } from '@/utils/audio';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-grid-pattern">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f0ff]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#a855f7]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Big Typography & Dual CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span className="text-[#00f0ff] font-bold">[ONLINE]</span>
            <span className="text-slate-500">|</span>
            <span>GRAPHICS & FULL-STACK ARCHITECT</span>
          </div>

          {/* Big Typography Headline */}
          <div className="space-y-2">
            <h1 
              onMouseEnter={() => audioEngine.playGlitch()}
              className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter uppercase leading-[0.95] text-white glitch-text cursor-default"
              data-text="CREATIVE 3D GRAPHICS"
            >
              CREATIVE 3D GRAPHICS
            </h1>
            <h2 
              onMouseEnter={() => audioEngine.playGlitch()}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter uppercase leading-[0.95] text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#f43f5e] glitch-text cursor-default"
              data-text="SHADER ARCHITECT"
            >
              SHADER ARCHITECT
            </h2>
          </div>

          {/* Subtitle Paragraph */}
          <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed font-sans font-light">
            Engineered with high-performance <span className="text-[#00f0ff] font-mono font-medium">WebGL / GLSL Shaders</span>, 
            interactive 3D physics, and ultra-scalable full-stack Web applications. 
            Designed to deliver next-level breathtaking visual experiences.
          </p>

          {/* Dual Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              onClick={() => audioEngine.playGlitch()}
              className="px-8 py-4 rounded-2xl bg-[#00f0ff] text-black font-mono font-extrabold text-sm tracking-wider uppercase hover:bg-white hover:scale-105 shadow-xl shadow-[#00f0ff]/25 transition-all flex items-center gap-2 group"
            >
              <span>VIEW PROJECTS</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="#contact"
              onClick={() => audioEngine.playClick(900, 0.04)}
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/15 text-white font-mono font-bold text-sm tracking-wider uppercase hover:border-[#a855f7] hover:text-[#a855f7] hover:bg-[#a855f7]/10 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-[#a855f7]" />
              <span>CONTACT ME</span>
            </a>
          </div>

          {/* Micro Tech Metrics */}
          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-md">
            <div>
              <div className="font-display text-2xl font-bold text-white">60 FPS</div>
              <div className="font-mono text-[10px] text-slate-400">4K GLSL SHADER RUNTIME</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-[#00f0ff]">100%</div>
              <div className="font-mono text-[10px] text-slate-400">GRAPHIC INTENSIVE</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-[#a855f7]">v3.6</div>
              <div className="font-mono text-[10px] text-slate-400">NEXT.JS 16 & R3F</div>
            </div>
          </div>

        </div>

        {/* Right Column: 3D Refraction Orb Viewport */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="w-full relative">
            <QuantumRefractionOrb />
            
            {/* Soft Utilitarian Overlay Label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-[#09090d]/80 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2 shadow-2xl">
              <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>INTERACTIVE QUANTUM REFRACTION ORB</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
