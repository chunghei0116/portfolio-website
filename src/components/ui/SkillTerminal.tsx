"use client";

import BentoCard from "./BentoCard";

const skills = [
  { name: "Next.js", rating: 90, bar: "█████████░" },
  { name: "React", rating: 95, bar: "██████████" },
  { name: "Three.js", rating: 80, bar: "████████░░" },
  { name: "WebGL / GLSL", rating: 70, bar: "███████░░░" },
  { name: "TypeScript", rating: 90, bar: "█████████░" },
  { name: "Tailwind CSS", rating: 95, bar: "██████████" },
];

export default function SkillTerminal() {
  return (
    <BentoCard className="flex h-full min-h-[400px] flex-col justify-between overflow-hidden">
      <div>
        <div className="flex items-center justify-between border-b-2 border-black pb-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
            System Console // Terminal
          </span>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-black" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 border border-black" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black" />
          </div>
        </div>
        <h3 className="mt-4 text-2xl font-black tracking-tight text-black uppercase">
          ACTIVE CODES
        </h3>
      </div>

      <div className="mt-4 font-mono text-xs bg-zinc-950 text-[#00F0FF] p-4 brutalist-border space-y-3">
        <p className="text-zinc-500">// Loading skill module metrics...</p>
        {skills.map((skill) => (
          <div key={skill.name} className="flex flex-col gap-1">
            <div className="flex justify-between font-bold">
              <span>&gt; {skill.name}</span>
              <span>{skill.rating}%</span>
            </div>
            <div className="text-cyber-yellow tracking-widest">{skill.bar}</div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-xs font-mono text-black/50">
          * Systems updated real-time.
        </p>
      </div>
    </BentoCard>
  );
}
