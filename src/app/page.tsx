import React from 'react';
import Navbar from '@/components/Navbar';
import HyperlaneHero from '@/components/HyperlaneHero';
import HyperlaneFormat from '@/components/HyperlaneFormat';
import HyperlaneWhy from '@/components/HyperlaneWhy';
import HyperlaneProgram from '@/components/HyperlaneProgram';
import ArmorySection from '@/components/ArmorySection';
import HyperlaneRsvp from '@/components/HyperlaneRsvp';
import HyperlaneFaq from '@/components/HyperlaneFaq';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#09090D] text-[#F8FAFC] overflow-x-clip selection:bg-[#C59B27] selection:text-[#09090D]">
      {/* Floating Pill Nav (Hyperlane N5 archetype) */}
      <Navbar />

      {/* Hero Section (Hyperlane Spec-sheet Hero + 3D Golden Starfield of Olympus) */}
      <HyperlaneHero />

      {/* 01 · Craft Routine (Hyperlane Spec Sheet Schedule archetype) */}
      <HyperlaneFormat />

      {/* 02 · Codex & Why (Hyperlane Editorial Lead Block archetype) */}
      <HyperlaneWhy />

      {/* 03 · Labors (Hyperlane Program Grid archetype) */}
      <HyperlaneProgram />

      {/* 04 · Armory / Technical Arsenal */}
      <ArmorySection />

      {/* 05 · Oracle / Contact Form (Hyperlane RSVP archetype) */}
      <HyperlaneRsvp />

      {/* 06 · Delphic Questions / FAQ (Hyperlane Conversational Accordion archetype) */}
      <HyperlaneFaq />

      {/* Footer (Hyperlane Ft5 Statement archetype) */}
      <Footer />
    </div>
  );
}
