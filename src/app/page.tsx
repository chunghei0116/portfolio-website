'use client';

import AuroraShaderCanvas from '@/components/3d/AuroraShaderCanvas';
import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/ui/HeroSection';
import InteractiveShaderLab from '@/components/3d/InteractiveShaderLab';
import ProjectsSection from '@/components/ui/ProjectsSection';
import SkillsSection from '@/components/ui/SkillsSection';
import ExperienceSection from '@/components/ui/ExperienceSection';
import ContactSection from '@/components/ui/ContactSection';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#09090d] text-white selection:bg-[#00f0ff]/30 selection:text-[#00f0ff] overflow-x-clip">
      {/* Background WebGL Aurora Plasma Canvas */}
      <AuroraShaderCanvas />

      {/* Floating Island Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <HeroSection />

      {/* Interactive GLSL Shader Lab Section */}
      <section id="shaders" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveShaderLab />
      </section>

      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
