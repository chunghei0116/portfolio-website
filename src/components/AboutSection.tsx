'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Cpu, ShieldCheck, Feather, Scroll } from 'lucide-react';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<'journal' | 'field-notes'>('journal');

  const pillars = [
    {
      id: 'vitals',
      title: 'High-Performance Web Vitals',
      subtitle: 'Engineered Velocity',
      description: 'Optimized 60fps animations, sub-second LCP, and zero cumulative layout shift for buttery smooth user experiences.',
      icon: Cpu,
      sealColor: 'border-[#9B72AA] text-[#9B72AA]',
      badgeText: 'Pillar I',
      date: 'Est. 2024'
    },
    {
      id: 'architecture',
      title: 'Modern React Architecture',
      subtitle: 'Scalable Craftsmanship',
      description: 'Declarative Next.js App Router patterns, resilient state management, and clean modular component hierarchies.',
      icon: BookOpen,
      sealColor: 'border-[#7EC8E3] text-[#2B6CB0]',
      badgeText: 'Pillar II',
      date: 'Core Spec'
    },
    {
      id: 'motion',
      title: 'Creative UI Motion',
      subtitle: 'Whimsical Interactions',
      description: 'Physics-driven GSAP & Framer Motion dynamics, WebGL shaders, and tactile micro-interactions that spark delight.',
      icon: Sparkles,
      sealColor: 'border-[#D4AF37] text-[#B7791F]',
      badgeText: 'Pillar III',
      date: 'Magic Layer'
    }
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 bg-[#050507] overflow-hidden text-[#1C2833]">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-mono tracking-widest uppercase shadow-[0_0_12px_rgba(212,175,55,0.2)]">
            <Scroll className="w-3.5 h-3.5" />
            <span>Alchemist Field Archives</span>
          </div>
        </div>

        {/* Main Aged Parchment Card */}
        <div
          className="relative ghibli-parchment p-8 sm:p-12 md:p-14 shadow-2xl rounded-2xl border-2 border-[#4A3525]/20 overflow-hidden bg-contain"
          style={{
            backgroundImage: `linear-gradient(rgba(247, 249, 250, 0.92), rgba(253, 225, 169, 0.85)), url('/images/parchment-texture.png')`,
            backgroundBlendMode: 'overlay'
          }}
        >
          {/* Decorative Brass Corner Brackets */}
          <div className="absolute top-3 left-3 w-10 h-10 border-t-4 border-l-4 border-[#D4AF37] pointer-events-none rounded-tl-sm flex items-start justify-start">
            <div className="w-2 h-2 rounded-full bg-[#8B6508] m-0.5 shadow-inner" />
          </div>
          <div className="absolute top-3 right-3 w-10 h-10 border-t-4 border-r-4 border-[#D4AF37] pointer-events-none rounded-tr-sm flex items-start justify-end">
            <div className="w-2 h-2 rounded-full bg-[#8B6508] m-0.5 shadow-inner" />
          </div>
          <div className="absolute bottom-3 left-3 w-10 h-10 border-b-4 border-l-4 border-[#D4AF37] pointer-events-none rounded-bl-sm flex items-end justify-start">
            <div className="w-2 h-2 rounded-full bg-[#8B6508] m-0.5 shadow-inner" />
          </div>
          <div className="absolute bottom-3 right-3 w-10 h-10 border-b-4 border-r-4 border-[#D4AF37] pointer-events-none rounded-br-sm flex items-end justify-end">
            <div className="w-2 h-2 rounded-full bg-[#8B6508] m-0.5 shadow-inner" />
          </div>

          {/* Inner Vignette Line */}
          <div className="absolute inset-4 border border-[#4A3525]/15 rounded-xl pointer-events-none" />

          {/* Header Title Block */}
          <div className="text-center relative z-10 mb-8 sm:mb-10">
            <h2 className="ghibli-heading text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#4A3525] mb-2 font-serif">
              The Alchemist&apos;s Journal
            </h2>
            <p className="text-sm sm:text-base text-[#654321] font-serif italic tracking-wide">
              &ldquo;Crafting Software with Heart & Purpose&rdquo;
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8 relative z-10">
            <div className="inline-flex p-1.5 rounded-xl bg-[#4A3525]/10 border border-[#4A3525]/20 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab('journal')}
                className={`relative px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 ${
                  activeTab === 'journal'
                    ? 'text-[#4A3525] shadow-sm'
                    : 'text-[#654321]/70 hover:text-[#4A3525]'
                }`}
              >
                {activeTab === 'journal' && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-[#FDE1A9] border border-[#D4AF37] rounded-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Feather className="w-4 h-4 text-[#8B6508]" />
                  Journal Entry
                </span>
              </button>

              <button
                onClick={() => setActiveTab('field-notes')}
                className={`relative px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 ${
                  activeTab === 'field-notes'
                    ? 'text-[#4A3525] shadow-sm'
                    : 'text-[#654321]/70 hover:text-[#4A3525]'
                }`}
              >
                {activeTab === 'field-notes' && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-[#FDE1A9] border border-[#D4AF37] rounded-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8B6508]" />
                  Field Notes
                </span>
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="relative z-10 min-h-[220px]">
            <AnimatePresence mode="wait">
              {activeTab === 'journal' ? (
                <motion.div
                  key="journal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5 text-[#2C1D11] text-base sm:text-lg leading-relaxed font-serif max-w-2xl mx-auto text-center sm:text-left"
                >
                  <div className="relative bg-[#FFF9ED]/60 p-6 sm:p-8 rounded-xl border border-[#4A3525]/15 shadow-inner">
                    <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-[#4A3525] first-letter:mr-2 first-letter:float-left">
                      Like Howl&apos;s wandering castle, code is a living structure—built from intricate gears, spells of logic, and intentional design.
                    </p>
                    <p className="mt-4">
                      I specialize in building performant, delightful web applications that bring warmth and magic to digital interactions.
                    </p>

                    {/* Signature Stamp Footer */}
                    <div className="mt-6 pt-4 border-t border-[#4A3525]/10 flex items-center justify-between text-xs font-mono text-[#654321]/80">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                        Entry #042 &bull; Studio Archives
                      </span>
                      <span className="font-serif italic text-[#4A3525] font-semibold text-sm">
                        &mdash; Jones Tse
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="field-notes"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-5"
                >
                  {pillars.map((pillar) => {
                    const IconComp = pillar.icon;
                    return (
                      <div
                        key={pillar.id}
                        className="group relative bg-[#FFF9ED]/80 border-2 border-dashed border-[#4A3525]/30 rounded-xl p-5 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
                      >
                        {/* Stamp Corner Tag */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#4A3525]/10 text-[#4A3525] font-bold">
                            {pillar.badgeText}
                          </span>
                          <span className="text-[10px] font-mono text-[#654321]/60">
                            {pillar.date}
                          </span>
                        </div>

                        {/* Stamp Wax Seal Badge / Icon */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center bg-[#FDE1A9]/50 shadow-sm group-hover:scale-110 transition-transform ${pillar.sealColor}`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-serif font-bold text-sm text-[#4A3525] leading-tight">
                              {pillar.title}
                            </h3>
                            <p className="text-[11px] font-sans text-[#654321]/70">
                              {pillar.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-[#2C1D11] leading-relaxed font-sans mt-1">
                          {pillar.description}
                        </p>

                        {/* Decorative Wax Seal Mark */}
                        <div className="mt-4 pt-3 border-t border-[#4A3525]/10 flex justify-end">
                          <div className="w-4 h-4 rounded-full bg-[#8B0000]/15 border border-[#8B0000]/30 flex items-center justify-center text-[8px] text-[#8B0000] font-bold">
                            &#10003;
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
