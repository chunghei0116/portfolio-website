"use client";

import BentoCard from "./BentoCard";

const skills = [
  { name: "Flutter / Mobile", rating: 90 },
  { name: "Kubernetes / Docker", rating: 88 },
  { name: "GitOps / ArgoCD", rating: 80 },
  { name: "CI/CD Automation", rating: 82 },
  { name: "Next.js / React", rating: 85 },
  { name: "Cloud (AWS / Firebase)", rating: 75 },
];

export default function SkillTerminal() {
  return (
    <BentoCard className="flex h-full min-h-[400px] flex-col justify-between overflow-hidden">
      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
            System Console // Terminal
          </span>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 bg-neutral-200 border border-black" />
            <span className="w-2.5 h-2.5 bg-neutral-200 border border-black" />
            <span className="w-2.5 h-2.5 bg-neutral-200 border border-black" />
          </div>
        </div>
        <h3 className="mt-4 text-2xl font-black tracking-tight text-black uppercase">
          ACTIVE CODES
        </h3>
      </div>

      <div className="mt-4 font-mono text-xs bg-black text-white p-5 rounded-none border-[3px] border-black space-y-4 shadow-none">
        <p className="text-neutral-500 text-[10px]">{"// Loading skill module metrics..."}</p>
        {skills.map((skill) => (
          <div key={skill.name} className="flex flex-col gap-2">
            <div className="flex justify-between font-bold text-[11px]">
              <span className="text-neutral-300">&gt; {skill.name}</span>
              <span className="text-accent-blue font-bold font-mono">{skill.rating}%</span>
            </div>
            <div className="h-3.5 w-full bg-neutral-900 rounded-none border border-neutral-800 overflow-hidden">
              <div 
                className="h-full bg-accent-blue rounded-none"
                style={{ width: `${skill.rating}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-xs font-mono text-black/50">
          * Metrics updated real-time.
        </p>
      </div>
    </BentoCard>
  );
}
