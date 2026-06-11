import Hero from "@/components/ui/Hero";
import BentoGrid from "@/components/ui/BentoGrid";
import TechSection from "@/components/ui/TechSection";
import Contact from "@/components/ui/Contact";

export default function Home() {
  return (
    <div className="relative w-full">
      <Hero />
      <BentoGrid />
      <TechSection />
      <Contact />
    </div>
  );
}
