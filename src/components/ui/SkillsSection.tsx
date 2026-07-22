'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import TechPhysicsSandbox from '../3d/TechPhysicsSandbox';

export default function SkillsSection() {
  const skillCategories = [
    { title: 'Frontend & WebGL', items: ['Next.js 16', 'React 19', 'Three.js / R3F', 'GLSL Shaders', 'TailwindCSS 4', 'TypeScript'] },
    { title: 'Backend & Cloud', items: ['Node.js', 'Python', 'FastAPI', 'Docker', 'Kubernetes', 'Redis'] },
    { title: 'Architecture & Tooling', items: ['WebSockets', 'CI/CD Pipelines', 'TDD & Jest', 'Performance Optimization', 'Git Worktrees'] },
  ];

  return (
    <section id="skills" className="py-28 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#a855f7] uppercase tracking-widest mb-3">
          <Cpu className="w-3.5 h-3.5 text-[#a855f7]" />
          <span>[ TECHNICAL CAPABILITIES ]</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          STACK &amp; 3D PHYSICS MATRIX
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Category List */}
        <div className="lg:col-span-6 space-y-6">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="double-bezel-outer"
            >
              <div className="double-bezel-inner p-6">
                <h3 className="text-lg font-bold text-white mb-4 font-mono text-[#00f0ff]">
                  // {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300 hover:border-[#00f0ff]/50 hover:text-white transition-all"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3D Physics Sandbox Viewport */}
        <div className="lg:col-span-6">
          <TechPhysicsSandbox />
        </div>
      </div>
    </section>
  );
}
