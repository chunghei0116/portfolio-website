import React from 'react';
import Navbar from '@/components/Navbar';
import MinimalHero from '@/components/MinimalHero';
import LiveStatusBar from '@/components/LiveStatusBar';
import MinimalLabors from '@/components/MinimalLabors';
import PlayfulSandbox from '@/components/PlayfulSandbox';
import MinimalContact from '@/components/MinimalContact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#09090b] text-[#fafafa] selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Floating Pill Nav */}
      <Navbar />

      {/* Hero Section with 3D Canvas Background */}
      <MinimalHero />

      {/* Live Status Bar & World Clock Widget */}
      <LiveStatusBar />

      {/* Selected Labors / Works Bento Grid */}
      <MinimalLabors />

      {/* Interactive Micro-Lab Sandbox & Capabilities */}
      <PlayfulSandbox />

      {/* Contact Section */}
      <MinimalContact />

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
