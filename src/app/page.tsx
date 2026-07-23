import React from 'react';
import CustomCursor from '@/components/CustomCursor';
import AtmosphericBackground from '@/components/AtmosphericBackground';
import OdysseyNavbar from '@/components/OdysseyNavbar';
import OdysseyHeroSection from '@/components/OdysseyHeroSection';
import OdysseyWorksSection from '@/components/OdysseyWorksSection';
import OdysseyArtifactsSection from '@/components/OdysseyArtifactsSection';
import OdysseyRegistrySection from '@/components/OdysseyRegistrySection';
import OdysseyFooter from '@/components/OdysseyFooter';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#0A0B0D] text-[#E5E7EB] selection:bg-[#D4AF37]/40 selection:text-[#FFF8E7] overflow-x-hidden">
      {/* Golden Cursor Follower Ring */}
      <CustomCursor />

      {/* Dynamic Atmospheric Mediterranean & Ancient Marble Background */}
      <AtmosphericBackground />

      {/* Floating Liquid-Glass Pill Navigation */}
      <OdysseyNavbar />

      {/* Hero Section: Entrance Exhibit */}
      <OdysseyHeroSection />

      {/* Section I: Selected Works (The Art Cards) */}
      <OdysseyWorksSection />

      {/* Section II: Artifacts / Skills */}
      <OdysseyArtifactsSection />

      {/* Section III: Contact (The Registry) */}
      <OdysseyRegistrySection />

      {/* Luxury Museum Footer */}
      <OdysseyFooter />
    </main>
  );
}
