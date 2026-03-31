"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import BentoCard from "./BentoCard";

const skills = [
  { name: "Next.js", color: "bg-black/10" },
  { name: "React", color: "bg-blue-500/10" },
  { name: "Three.js", color: "bg-orange-500/10" },
  { name: "Tailwind", color: "bg-cyan-500/10" },
  { name: "Framer", color: "bg-purple-500/10" },
  { name: "TypeScript", color: "bg-blue-600/10" },
  { name: "Node.js", color: "bg-green-500/10" },
  { name: "WebGL", color: "bg-red-500/10" },
];

function FloatingSkill({ skill, index, containerRef }: { 
  skill: typeof skills[0]; 
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 20, stiffness: 80 });
  const springY = useSpring(y, { damping: 20, stiffness: 80 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Calculate distance from the cursor to this specific element's initial position
    // For simplicity, we just use a subtle reaction based on mouse position in the container
    const strength = 0.15;
    const offset = (index + 1) * 0.2; // Each skill reacts slightly differently
    
    x.set(distanceX * strength * offset);
    y.set(distanceY * strength * offset);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [index]);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: {
          delay: index * 0.1,
          type: "spring",
          stiffness: 100,
          damping: 12,
        }
      }}
      whileHover={{ 
        scale: 1.1,
        backgroundColor: "rgba(0,0,0,0.08)",
        transition: { duration: 0.2 }
      }}
      className={`cursor-pointer rounded-2xl ${skill.color} px-6 py-4 backdrop-blur-md border border-black/5 flex flex-col items-center justify-center gap-2 group transition-all`}
    >
      <span className="text-lg font-bold tracking-tight text-black/80">{skill.name}</span>
      <div className="h-1 w-0 bg-black/20 transition-all group-hover:w-full" />
    </motion.div>
  );
}

export default function SkillsCloud() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <BentoCard className="flex h-full min-h-[400px] flex-col justify-between overflow-hidden" delay={0.2}>
      <div className="relative z-10">
        <span className="text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase">
          Technology
        </span>
        <h3 className="mt-4 text-3xl font-medium tracking-tight text-black/90 md:text-4xl">
          Active Skills
        </h3>
      </div>
      
      <div 
        ref={containerRef}
        className="relative flex flex-wrap items-center justify-center gap-4 py-12"
      >
        {skills.map((skill, index) => (
          <FloatingSkill 
            key={skill.name} 
            skill={skill} 
            index={index} 
            containerRef={containerRef}
          />
        ))}
      </div>

      <div className="mt-auto">
        <p className="text-sm text-black/40">
          Interactive elements react to your cursor proximity.
        </p>
      </div>
    </BentoCard>
  );
}
