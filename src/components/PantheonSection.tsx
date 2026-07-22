import React from 'react';
import { ShieldCheck, Cpu, Zap } from 'lucide-react';

export default function PantheonSection() {
  const pillars = [
    {
      numeral: 'I',
      title: "ATHENA'S WISDOM",
      subtitle: 'Architectural Rigor & Systems',
      description:
        'Crafting resilient, type-safe architectures with clear boundaries. Every module is forged for high scalability, zero technical debt, and long-term maintainability.',
      icon: ShieldCheck,
      tags: ['TypeScript', 'System Architecture', 'Clean Code'],
    },
    {
      numeral: 'II',
      title: "HEPHAESTUS' FORGE",
      subtitle: 'WebGL & Creative 3D Engineering',
      description:
        'Breathing life into modern web applications using Three.js, R3F, and custom GLSL shaders. Blending tactile visual realism with silky 60fps performance.',
      icon: Cpu,
      tags: ['Three.js / R3F', 'GLSL Shaders', 'WebGPU'],
    },
    {
      numeral: 'III',
      title: "HERMES' DISPATCH",
      subtitle: 'Sub-Second Speed & Edge Infra',
      description:
        'Optimized for instant page hydration, low draw calls, and global edge distribution. Engineered to deliver frictionless user interaction without compromise.',
      icon: Zap,
      tags: ['Next.js App Router', 'Edge Runtimes', 'Micro-Animations'],
    },
  ];

  return (
    <section id="pantheon" className="relative py-24 px-6 bg-[#09090D] border-t border-[#C59B27]/15">
      {/* Background Decorative Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1A2B4C]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C59B27]/30 bg-[#1A2B4C]/30 text-[#C59B27] text-xs font-mono tracking-widest uppercase mb-4">
            The Pantheon
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-white">
            THE THREE PILLARS OF CRAFT
          </h2>
          <p className="mt-4 text-[#94A3B8] text-sm sm:text-base font-light">
            Core virtues guiding the creation of modern web applications that inspire awe and withstand the test of time.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.numeral}
                className="group relative bg-[#121218] border border-white/10 rounded-xl p-8 hover:border-[#C59B27]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(197,155,39,0.15)] flex flex-col justify-between"
              >
                <div>
                  {/* Card Header & Numeral */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-[#1A2B4C]/60 border border-[#C59B27]/30 flex items-center justify-center text-[#C59B27] group-hover:scale-110 group-hover:border-[#C59B27] transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-bold text-[#C59B27]/40 group-hover:text-[#C59B27] transition-colors">
                      {pillar.numeral}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold tracking-wide uppercase text-white group-hover:text-[#F3E5AB] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-mono text-[#C59B27] mt-1 mb-4">{pillar.subtitle}</p>
                  <p className="text-sm text-[#94A3B8] font-light leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded bg-[#1A2B4C]/40 border border-white/5 text-[11px] font-mono text-[#94A3B8]"
                    >
                      {tag}
                    </span>
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
