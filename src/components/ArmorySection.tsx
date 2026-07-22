import React from 'react';
import { Cpu, Code2, Globe } from 'lucide-react';

export default function ArmorySection() {
  const arsenalCategories = [
    {
      title: 'CREATIVE 3D & GRAPHICS',
      icon: Cpu,
      skills: [
        { name: 'Three.js', level: 'Mastery' },
        { name: '@react-three/fiber', level: 'Mastery' },
        { name: '@react-three/drei', level: 'Proficient' },
        { name: 'GLSL Shaders', level: 'Advanced' },
        { name: 'Cannon.js / Physics', level: 'Proficient' },
        { name: 'WebGPU & Canvas API', level: 'Exploring' },
      ],
    },
    {
      title: 'SYSTEM ARCHITECTURE',
      icon: Code2,
      skills: [
        { name: 'Next.js (App Router)', level: 'Mastery' },
        { name: 'React 19', level: 'Mastery' },
        { name: 'TypeScript', level: 'Mastery' },
        { name: 'Tailwind CSS v4', level: 'Mastery' },
        { name: 'Framer Motion', level: 'Advanced' },
        { name: 'REST & GraphQL APIs', level: 'Advanced' },
      ],
    },
    {
      title: 'INFRA & TOOLING',
      icon: Globe,
      skills: [
        { name: 'Vercel / Cloudflare Edge', level: 'Mastery' },
        { name: 'Git & GitHub Workflows', level: 'Mastery' },
        { name: 'Node.js & Bun', level: 'Advanced' },
        { name: 'Performance Profiling', level: 'Advanced' },
        { name: 'ESLint / TypeScript Compiler', level: 'Mastery' },
        { name: 'Web Audio API', level: 'Proficient' },
      ],
    },
  ];

  return (
    <section id="armory" className="relative py-24 px-6 bg-[#F1ECE4] border-t border-[#B8860B]/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B8860B]/30 bg-[#FFFFFF]/80 text-[#B8860B] text-xs font-mono tracking-widest uppercase mb-4 font-bold shadow-sm">
            04 · The Armory
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-[#0F172A]">
            WEAPONS OF HEPHAESTUS
          </h2>
          <p className="mt-4 text-[#475569] text-sm sm:text-base font-normal">
            The modern technical stack and engineering instruments used to forge immersive 3D web experiences.
          </p>
        </div>

        {/* Arsenal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {arsenalCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="bg-[#FFFFFF] border border-[#B8860B]/20 rounded-xl p-6 hover:border-[#B8860B]/50 transition-all duration-300 shadow-[0_4px_20px_rgba(15,23,42,0.04)]"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="w-9 h-9 rounded bg-[#F1ECE4] border border-[#B8860B]/30 flex items-center justify-center text-[#B8860B]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-mono font-bold tracking-wider text-[#0F172A]">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-2.5 rounded bg-[#FAF8F5] border border-slate-100 hover:bg-[#F1ECE4]/40 transition-colors"
                    >
                      <span className="text-xs font-mono text-[#0F172A] font-medium">{skill.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFFFFF] text-[#B8860B] border border-[#B8860B]/30 font-bold">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
