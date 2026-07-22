'use client';

import React from 'react';
import { Code2, Cpu, Layers } from 'lucide-react';

export default function MinimalAbout() {
  const capabilities = [
    {
      title: 'Frontend & WebGL',
      icon: Code2,
      desc: 'React 19 Server Components, Three.js, React Three Fiber, GLSL Shaders, Framer Motion, TypeScript, Tailwind v4.',
    },
    {
      title: 'Backend & Edge Systems',
      icon: Cpu,
      desc: 'Next.js 16 App Router, WebSockets telemetry, Edge Runtime, Node.js, GraphQL, Redis, Docker containerization.',
    },
    {
      title: 'Architecture & Physics',
      icon: Layers,
      desc: 'Physics engines, WebAssembly, Canvas 2D API optimization, GPU shader performance tuning, zero-jank 60fps renders.',
    },
  ];

  return (
    <section id="about" className="py-28 md:py-36 px-6 relative z-10 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        <div className="lg:col-span-5">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-400 font-semibold block mb-3">
            Engineering Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
            Built for Precision.
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
            I specialize at the intersection of modern graphics engineering and web architecture — crafting digital experiences where mathematical precision, fluid motion, and zero-latency performance seamlessly converge.
          </p>
        </div>
      </div>

      {/* Capabilities Double-Bezel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {capabilities.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="double-bezel">
              <div className="double-bezel-core p-7 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-emerald-400 mb-6">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-extrabold uppercase tracking-tight text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
