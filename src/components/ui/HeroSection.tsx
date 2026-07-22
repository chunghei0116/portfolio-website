'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Terminal, ShieldCheck } from 'lucide-react';
import QuantumRefractionOrb from '../3d/QuantumRefractionOrb';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100dvh] pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden px-4">
      {/* Eyebrow Tag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#00f0ff] uppercase tracking-[0.2em] mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
      >
        <Terminal className="w-3.5 h-3.5 text-[#00f0ff]" />
        <span>[ 01 // SENIOR GRAPHICS &amp; FULL-STACK ARCHITECT ]</span>
      </motion.div>

      {/* Massive Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-center max-w-5xl bg-gradient-to-b from-white via-slate-100 to-slate-500 bg-clip-text text-transparent leading-[1.08] mb-6"
      >
        ENGINEERING DIGITAL REALITY &amp; SHADER ART
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-slate-400 text-sm sm:text-lg text-center max-w-2xl font-mono leading-relaxed mb-8"
      >
        Crafting high-performance WebGL 3D graphics, real-time GLSL fragment shaders, and resilient full-stack cloud architectures.
      </motion.p>

      {/* 3D Refraction Orb Centerpiece */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full max-w-3xl my-2"
      >
        <QuantumRefractionOrb />
      </motion.div>

      {/* Double-Bezel CTAs with Button-in-Button Trailing Icon Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-5 z-10"
      >
        {/* Primary CTA: EXPLORE WORK */}
        <a
          href="#projects"
          className="group relative inline-flex items-center rounded-full p-[3px] bg-gradient-to-r from-[#00f0ff]/50 via-[#00f0ff]/20 to-[#a855f7]/50 border border-[#00f0ff]/40 shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all duration-300 hover:scale-105"
        >
          <div className="inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-xs font-mono font-semibold tracking-wider text-black bg-[#00f0ff] group-hover:bg-white transition-all duration-300">
            <span>EXPLORE WORK</span>
            <div className="w-8 h-8 rounded-full bg-black/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowUpRight className="w-4 h-4 text-black" />
            </div>
          </div>
        </a>

        {/* Secondary CTA: CAREER TRACK RECORD */}
        <a
          href="#experience"
          className="group relative inline-flex items-center rounded-full p-[3px] bg-white/5 border border-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105"
        >
          <div className="inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-xs font-mono font-medium tracking-wider text-slate-300 group-hover:text-white bg-[#08080c] transition-all duration-300">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#a855f7]" />
              <span>CAREER TRACK RECORD</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-white" />
            </div>
          </div>
        </a>
      </motion.div>
    </section>
  );
}
