'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Compass, Sparkles, ArrowRight, Mail } from 'lucide-react';

interface PetalConfig {
  id: number;
  color: string;
  size: string;
  top: string;
  left: string;
  delay: number;
  duration: number;
}

const PETALS: PetalConfig[] = [
  { id: 1, color: 'bg-[#9B72AA]', size: 'w-3 h-4 rounded-tl-full rounded-br-full', top: '15%', left: '10%', delay: 0, duration: 9 },
  { id: 2, color: 'bg-[#FDE1A9]', size: 'w-4 h-3 rounded-tr-full rounded-bl-full', top: '25%', left: '35%', delay: 1.5, duration: 11 },
  { id: 3, color: 'bg-[#9B72AA]', size: 'w-3 h-3 rounded-full', top: '40%', left: '70%', delay: 3, duration: 8.5 },
  { id: 4, color: 'bg-[#FDE1A9]', size: 'w-4 h-4 rounded-tl-full rounded-br-full', top: '60%', left: '20%', delay: 0.8, duration: 10 },
  { id: 5, color: 'bg-[#9B72AA]', size: 'w-3 h-4 rounded-tr-full rounded-bl-full', top: '75%', left: '80%', delay: 2.2, duration: 12 },
  { id: 6, color: 'bg-[#FDE1A9]', size: 'w-2.5 h-3 rounded-full', top: '30%', left: '85%', delay: 4, duration: 7.5 },
  { id: 7, color: 'bg-[#9B72AA]', size: 'w-4 h-3 rounded-tl-full rounded-br-full', top: '10%', left: '60%', delay: 1.2, duration: 10.5 },
  { id: 8, color: 'bg-[#FDE1A9]', size: 'w-3 h-3 rounded-tr-full rounded-bl-full', top: '80%', left: '45%', delay: 2.8, duration: 9.5 },
];

export default function HeroSection() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Wandering Workshop Hero Section"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-12 select-none"
    >
      {/* 1. Background Landscape Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-landscape.png"
          alt="Ghibli-inspired soft alpine meadow under vast blue sky"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Soft atmospheric gradient overlays for optimum text contrast and color harmony */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#7EC8E3]/35 via-[#FDE1A9]/20 to-[#4A3525]/40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4A3525]/60 via-transparent to-black/20" />
      </div>

      {/* 2. Cloudscape Drifting Animation Overlay Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Cloud Layer 1 - Slow Large Clouds */}
        <div className="absolute top-8 left-0 w-[200vw] opacity-70 animate-cloud-drift">
          <svg className="w-full h-32 fill-white/80 filter drop-shadow-md" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0 60 Q 30 30, 70 45 Q 110 20, 160 50 Q 220 15, 290 55 Q 350 30, 420 60 Q 480 20, 560 50 Q 640 10, 720 55 Q 800 25, 880 60 Q 950 20, 1040 50 Q 1120 30, 1200 60 L 1200 120 L 0 120 Z" />
          </svg>
        </div>

        {/* Cloud Layer 2 - Fast Distant Clouds */}
        <div
          className="absolute top-24 left-0 w-[200vw] opacity-50 animate-cloud-drift"
          style={{ animationDuration: '65s', animationDelay: '-20s' }}
        >
          <svg className="w-full h-24 fill-[#F7F9FA]/70 filter drop-shadow-sm" viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path d="M0 40 Q 40 15, 90 35 Q 150 10, 220 40 Q 290 20, 360 45 Q 440 15, 520 40 Q 600 25, 680 45 Q 760 15, 840 40 Q 920 20, 1000 45 Q 1100 10, 1200 40 L 1200 100 L 0 100 Z" />
          </svg>
        </div>
      </div>

      {/* 3. Wildflower Swirling Petals Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-15">
        {PETALS.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.9, 0.9, 0],
              y: [0, 140, 280],
              x: [0, 60, -40, 80],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: 'easeInOut',
            }}
            style={{ top: petal.top, left: petal.left }}
            className={`absolute ${petal.size} ${petal.color} shadow-[0_2px_6px_rgba(0,0,0,0.15)] filter backdrop-blur-[0.5px]`}
          />
        ))}
      </div>

      {/* 4. Main Hero Content Container */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 my-auto">
        {/* Left Column: Text & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="flex-1 max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          {/* Brass Compass Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#4A3525]/85 backdrop-blur-md border-2 border-[#D4AF37] text-[#FDE1A9] text-xs sm:text-sm font-medium shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-6 hover:border-[#FFE5B4] transition-all cursor-default">
            <Compass className="w-4 h-4 text-[#D4AF37] animate-spin" style={{ animationDuration: '12s' }} />
            <span className="tracking-wide">Howl&apos;s Moving Castle Aesthetic</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[#D4AF37] font-semibold">Est. 2026</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#4A3525] leading-[1.15] tracking-tight drop-shadow-[0_2px_4px_rgba(253,225,169,0.9)] mb-5">
            Welcome to My{' '}
            <span className="relative inline-block text-[#362518]">
              Wandering Workshop
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#D4AF37]/80" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q 50 20, 100 10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#2E1F15] font-medium leading-relaxed max-w-xl mb-8 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
            Software Alchemist &amp; Digital Artisan crafting whimsical web experiences.
          </p>

          {/* Call-to-Actions (CTAs) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            {/* Primary CTA */}
            <button
              type="button"
              onClick={() => handleScrollTo('projects')}
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#88B04B] text-[#FFF5D6] font-semibold text-base border-2 border-[#D4AF37] shadow-[0_8px_20px_rgba(136,176,75,0.4),0_0_12px_rgba(212,175,55,0.3)] hover:bg-[#7aa23f] hover:scale-[1.03] hover:shadow-[0_12px_25px_rgba(136,176,75,0.6),0_0_20px_rgba(212,175,55,0.6)] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#FDE1A9] transition-transform group-hover:rotate-12" />
              <span>Explore Doorways</span>
              <ArrowRight className="w-4 h-4 text-[#FFF5D6] transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA */}
            <button
              type="button"
              onClick={() => handleScrollTo('contact')}
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#D4AF37]/20 backdrop-blur-md text-[#4A3525] font-semibold text-base border-2 border-[#4A3525] shadow-[0_6px_15px_rgba(74,53,37,0.15)] hover:bg-[#D4AF37]/35 hover:scale-[1.03] hover:border-[#362518] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <Mail className="w-5 h-5 text-[#4A3525] transition-transform group-hover:scale-110" />
              <span>Send a Message</span>
            </button>
          </div>
        </motion.div>

        {/* Right Column: Character Artwork Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="flex-1 relative flex items-center justify-center max-w-md lg:max-w-lg w-full"
        >
          {/* Decorative Glowing Brass Halo Frame Behind Character */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D4AF37]/30 via-[#FDE1A9]/40 to-[#88B04B]/20 blur-2xl transform scale-110 animate-pulse pointer-events-none" />

          {/* Floating Character Card Wrapper */}
          <div className="relative w-full aspect-square max-w-[420px] rounded-3xl p-3 bg-[#4A3525]/30 backdrop-blur-md border-2 border-[#D4AF37]/60 shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(212,175,55,0.3)] group hover:border-[#D4AF37] transition-all duration-500 animate-float">
            {/* Corner Brass Accent Studs */}
            <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-gradient-to-br from-[#FFE5B4] to-[#8B6508] border border-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.8)] z-10" />
            <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br from-[#FFE5B4] to-[#8B6508] border border-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.8)] z-10" />
            <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-gradient-to-br from-[#FFE5B4] to-[#8B6508] border border-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.8)] z-10" />
            <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br from-[#FFE5B4] to-[#8B6508] border border-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.8)] z-10" />

            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#F7F9FA]/10">
              <Image
                src="/images/hero-character.png"
                alt="Hand-painted Ghibli developer sitting under a tree reading spellbook"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Magical Spellbook Particle Sparkle Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#4A3525]/85 backdrop-blur-md border border-[#D4AF37]/50 text-[#FDE1A9] flex items-center justify-between text-xs font-medium shadow-lg">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37] animate-bounce" />
                  Alchemical Spellbook Active
                </span>
                <span className="text-[#88B04B] font-bold bg-[#88B04B]/20 px-2 py-0.5 rounded-full border border-[#88B04B]/40">
                  Ready
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 5. Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative z-20 flex flex-col items-center justify-center mt-6 cursor-pointer"
        onClick={() => handleScrollTo('about')}
      >
        <span className="text-xs font-medium text-[#FDE1A9]/90 tracking-widest uppercase mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          Descend into the Workshop
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-[#D4AF37] flex items-start justify-center p-1 bg-[#4A3525]/40 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-2 rounded-full bg-[#D4AF37]"
          />
        </div>
      </motion.div>
    </section>
  );
}
