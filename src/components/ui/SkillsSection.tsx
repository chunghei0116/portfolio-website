'use client';

import React from 'react';
import TechPhysicsSandbox from '@/components/3d/TechPhysicsSandbox';
import { Cpu, Code, ShieldCheck, Terminal, Layers } from 'lucide-react';
import { audioEngine } from '@/utils/audio';

const SKILL_CATEGORIES = [
  {
    title: 'Graphics & WebGL',
    icon: Layers,
    items: ['Three.js', 'GLSL Shaders', '@react-three/fiber', 'Web Audio API', 'Canvas 2D/3D', 'WebGL2 Shader Engine'],
    color: '#00f0ff',
  },
  {
    title: 'Frontend Architecture',
    icon: Code,
    items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'WebSockets'],
    color: '#a855f7',
  },
  {
    title: 'Cloud & Infrastructure',
    icon: Cpu,
    items: ['Docker', 'Kubernetes', 'Go', 'Prometheus', 'CI/CD Pipelines', 'AWS / Cloudflare'],
    color: '#2dd4bf',
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative bg-[#09090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[#a855f7] bg-[#a855f7]/10 border border-[#a855f7]/20 mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>CORE COMPETENCIES & MATRIX</span>
          </div>
          <h2 
            onMouseEnter={() => audioEngine.playGlitch()}
            className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight uppercase text-white glitch-text cursor-default"
            data-text="TECH STACK & 3D PHYSICS"
          >
            TECH STACK & 3D PHYSICS
          </h2>
        </div>

        {/* 3D R3F Interactive Floating Physics Box Container */}
        <div className="mb-12">
          <TechPhysicsSandbox />
        </div>

        {/* Utilitarian Skill Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                onMouseEnter={() => audioEngine.playClick(800, 0.02)}
                className="soft-card p-6 border border-white/10 bg-[#111118]/80 space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div 
                    className="p-2.5 rounded-xl border border-white/10"
                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{cat.title}</h3>
                </div>

                <ul className="space-y-3">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
