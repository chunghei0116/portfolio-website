import Scene from "@/components/canvas/Scene";
import Hero from "@/components/ui/Hero";
import BentoGrid from "@/components/ui/BentoGrid";

export default function Home() {
  return (
    <div className="relative w-full">
      <Scene />
      <Hero />
      <BentoGrid />
    </div>
  );
}
