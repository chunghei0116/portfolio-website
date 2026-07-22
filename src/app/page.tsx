import React from 'react';
import Navbar from '@/components/Navbar';
import MinimalHero from '@/components/MinimalHero';
import MinimalLabors from '@/components/MinimalLabors';
import MinimalAbout from '@/components/MinimalAbout';
import MinimalContact from '@/components/MinimalContact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#050507] text-[#fafafa] selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Floating Island Nav */}
      <Navbar />

      {/* Viewport Hero with Interactive 3D Canvas */}
      <MinimalHero />

      {/* Selected Works (Double Bezel Bento) */}
      <MinimalLabors />

      {/* Engineering Philosophy & Capability Matrix */}
      <MinimalAbout />

      {/* Direct Contact Section */}
      <MinimalContact />

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
