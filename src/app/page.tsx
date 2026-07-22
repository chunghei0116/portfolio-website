import AuroraShaderCanvas from '@/components/3d/AuroraShaderCanvas';
import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/ui/HeroSection';
import ProjectsSection from '@/components/ui/ProjectsSection';
import SkillsSection from '@/components/ui/SkillsSection';
import ExperienceSection from '@/components/ui/ExperienceSection';
import ContactSection from '@/components/ui/ContactSection';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030305] text-white">
      {/* Background WebGL Aurora Canvas */}
      <AuroraShaderCanvas />

      {/* Floating Island Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}

