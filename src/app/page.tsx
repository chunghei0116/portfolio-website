import React from 'react';
import Navbar from '@/components/Navbar';
import HeroCanvas from '@/components/HeroCanvas';
import PantheonSection from '@/components/PantheonSection';
import OdysseySection from '@/components/OdysseySection';
import ArmorySection from '@/components/ArmorySection';
import OracleSection from '@/components/OracleSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#09090D] text-[#F8FAFC] overflow-x-clip selection:bg-[#C59B27] selection:text-[#09090D]">
      {/* Olympian Navigation Bar */}
      <Navbar />

      {/* --- 3D Hero Section --- */}
      <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* 3D Canvas Background Layer */}
        <HeroCanvas />

        {/* Hero Content Overlay */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto pt-24 pb-16">
          {/* Greek Mythology Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C59B27]/30 bg-[#1A2B4C]/40 backdrop-blur-md text-[#C59B27] text-xs font-mono tracking-widest uppercase mb-8 shadow-[0_0_15px_rgba(197,155,39,0.15)]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C59B27] animate-pulse" />
            The Golden Starfield of Olympus
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight uppercase leading-[1.05] max-w-4xl">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#E2E8F0] to-[#94A3B8]">
              CHRONICLES OF THE
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C59B27] via-[#F3E5AB] to-[#C59B27] drop-shadow-[0_4px_25px_rgba(197,155,39,0.3)]">
              DIGITAL OLYMPUS
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-[#94A3B8] max-w-2xl font-light leading-relaxed">
            Architecting epic web experiences with Creative Technology, 3D WebGL Shaders, and high-performance modern web stacks.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#odyssey"
              className="px-8 py-3.5 rounded-md font-semibold text-sm tracking-wide bg-[#C59B27] text-[#09090D] hover:bg-[#F3E5AB] transition-all duration-300 shadow-[0_0_20px_rgba(197,155,39,0.4)] hover:scale-105 active:scale-95 font-mono uppercase"
            >
              Explore The Archive
            </a>
            <a
              href="#oracle"
              className="px-8 py-3.5 rounded-md font-semibold text-sm tracking-wide border border-white/15 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-[#C59B27]/40 transition-all duration-300 hover:scale-105 active:scale-95 font-mono uppercase"
            >
              Summon Architect
            </a>
          </div>

          {/* Scroll Indicator */}
          <a
            href="#pantheon"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
          >
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#94A3B8]">Descend</span>
            <div className="w-5 h-8 rounded-full border border-[#94A3B8]/40 flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-[#C59B27] rounded-full animate-bounce" />
            </div>
          </a>
        </div>
      </section>

      {/* --- Section II: The Pantheon (Pillars of Craft) --- */}
      <PantheonSection />

      {/* --- Section III: The Odyssey (Projects Archive) --- */}
      <OdysseySection />

      {/* --- Section IV: The Armory (Tech Stack & Arsenal) --- */}
      <ArmorySection />

      {/* --- Section V: The Oracle of Delphi (Contact Portal) --- */}
      <OracleSection />

      {/* --- Footer --- */}
      <Footer />
    </div>
  );
}
