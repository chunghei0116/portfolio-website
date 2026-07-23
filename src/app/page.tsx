import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full ghibli-bg-gradient text-[#1C2833] selection:bg-[#9B72AA]/30 selection:text-[#4A3525] overflow-x-hidden">
      {/* Floating Wooden Signpost Navigation */}
      <Navbar />

      {/* Hero Section with Cloudscape & Swirling Petals */}
      <HeroSection />

      {/* Aged Parchment Journal About Me Section */}
      <AboutSection />

      {/* Howl's Magic Doorways Project Showcase */}
      <ProjectsSection />

      {/* Skills & Elemental Magic Section */}
      <SkillsSection />

      {/* Wax-Sealed Flying Message Contact Section */}
      <ContactSection />

      {/* Brass Compass Footer */}
      <Footer />
    </div>
  );
}
