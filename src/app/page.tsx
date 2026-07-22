import React from 'react';
import Navbar from '@/components/Navbar';
import MinimalHero from '@/components/MinimalHero';
import MinimalLabors from '@/components/MinimalLabors';
import MinimalContact from '@/components/MinimalContact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#FAF8F5] text-[#0F172A] selection:bg-[#B8860B] selection:text-[#FAF8F5]">
      {/* Minimal Floating Nav */}
      <Navbar />

      {/* Hero Section with 3D Canvas */}
      <MinimalHero />

      {/* Selected Labors / Works */}
      <MinimalLabors />

      {/* Contact Portal */}
      <MinimalContact />

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
