import Hero from "@/components/ui/Hero";
import BentoGrid from "@/components/ui/BentoGrid";
import Contact from "@/components/ui/Contact";

export default function Home() {
  return (
    <div className="relative w-full">
      <Hero />
      <BentoGrid />
      <Contact />
    </div>
  );
}
