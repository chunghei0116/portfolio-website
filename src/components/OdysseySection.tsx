'use client';

import React, { useState } from 'react';
import { ExternalLink, Layers, Flame, Box } from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function OdysseySection() {
  const [activeCategory, setActiveCategory] = useState<'ALL' | '3D_WEBGL' | 'SYSTEMS'>('ALL');

  const projects = [
    {
      title: 'Golden Starfield of Olympus',
      category: '3D_WEBGL',
      status: 'Live Odyssey',
      description:
        'Interactive 3D WebGL hero canvas built with R3F and GLSL particles. Features smooth camera parallax physics, low-poly Greek Column geometry, and 60fps responsive scaling.',
      tech: ['React 19', 'Three.js / R3F', 'TypeScript', 'Tailwind v4'],
      github: 'https://github.com/chunghei0116/portfolio-website',
      demo: '#',
      icon: Flame,
    },
    {
      title: 'Retro Flip Clock Engine',
      category: 'SYSTEMS',
      status: 'Engineered',
      description:
        'A precision tactile retro flip clock interface featuring physics-based flip animations, customizable dark themes, and ultra-accurate time synchronization.',
      tech: ['Next.js App Router', 'Framer Motion', 'Tailwind CSS'],
      github: 'https://github.com/chunghei0116/portfolio-website',
      demo: '#',
      icon: Layers,
    },
    {
      title: 'Aegis Security & Telemetry Mesh',
      category: 'SYSTEMS',
      status: 'Architecture',
      description:
        'Real-time telemetry dashboard monitoring distributed edge services. High-throughput data visualization with custom Canvas shaders and WebSocket feeds.',
      tech: ['TypeScript', 'WebSocket API', 'Three.js', 'Next.js'],
      github: 'https://github.com/chunghei0116/portfolio-website',
      demo: '#',
      icon: Box,
    },
  ];

  const filteredProjects =
    activeCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="odyssey" className="relative py-24 px-6 bg-[#0B0C12] border-t border-[#C59B27]/15">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C59B27]/30 bg-[#1A2B4C]/30 text-[#C59B27] text-xs font-mono tracking-widest uppercase mb-4">
              The Odysseys
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-white">
              FEATURED LABORS & WORKS
            </h2>
            <p className="mt-3 text-[#94A3B8] text-sm sm:text-base font-light max-w-xl">
              Selected chronicles of interactive 3D web applications, creative technology experiments, and robust software systems.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 bg-[#121218] p-1.5 rounded-lg border border-white/10 self-start md:self-auto">
            {(['ALL', '3D_WEBGL', 'SYSTEMS'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded font-mono text-xs font-semibold tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-[#C59B27] text-[#09090D] shadow-[0_0_10px_rgba(197,155,39,0.4)]'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.title}
                className="group relative bg-[#121218] border border-white/10 rounded-xl p-6 hover:border-[#C59B27]/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header & Status */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#1A2B4C]/80 border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#1A2B4C]/40 border border-[#C59B27]/30 text-[10px] font-mono text-[#C59B27] uppercase tracking-wider">
                      {project.status}
                    </span>
                  </div>

                  {/* Project Title & Description */}
                  <h3 className="text-xl font-bold uppercase text-white group-hover:text-[#F3E5AB] transition-colors mb-3">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] font-light leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-[#94A3B8]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] hover:text-[#C59B27] transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Repository
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center gap-1.5 text-xs font-mono text-[#C59B27] hover:text-[#F3E5AB] transition-colors ml-auto"
                    >
                      Inspect <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
