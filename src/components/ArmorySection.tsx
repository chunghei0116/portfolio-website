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
    <section id="armory" className="relative py-24 px-6 bg-[#09090D] border-t border-[#C59B27]/15">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C59B27]/30 bg-[#1A2B4C]/30 text-[#C59B27] text-xs font-mono tracking-widest uppercase mb-4">
            The Armory
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-white">
            WEAPONS OF HEPHAESTUS
          </h2>
          <p className="mt-4 text-[#94A3B8] text-sm sm:text-base font-light">
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
                className="bg-[#121218] border border-white/10 rounded-xl p-6 hover:border-[#C59B27]/40 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                  <div className="w-9 h-9 rounded bg-[#1A2B4C] border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-mono font-bold tracking-wider text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                    >
                      <span className="text-xs font-mono text-[#F8FAFC]">{skill.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A2B4C]/50 text-[#C59B27] border border-[#C59B27]/20">
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
