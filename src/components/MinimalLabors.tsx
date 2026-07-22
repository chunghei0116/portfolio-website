'use client';

import React, { useState } from 'react';
import { ArrowUpRight, FolderGit2, X, ExternalLink, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  desc: string;
  longDesc: string;
  metrics: string[];
  techStack: string[];
  demoUrl: string;
  githubUrl: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'Golden Starfield & WebGL Core',
    subtitle: '3D Particle Engine & Physics Mesh',
    category: '3D & WebGL',
    desc: 'Real-time 3D starfield canvas rendering 3,500+ glowing particles, custom wireframe shaders, and mouse parallax at 60fps.',
    longDesc: 'Engineered a lightweight Three.js & React Three Fiber canvas system featuring procedurally generated particle fields, custom normal blending GLSL shaders, and responsive pointer physics with zero main-thread jank.',
    metrics: ['60 FPS Constant', '3.5k Particle Mesh', '< 12kB Gzip Bundle'],
    techStack: ['React Three Fiber', 'Three.js', 'WebGL', 'GLSL', 'TypeScript'],
    demoUrl: '#top',
    githubUrl: 'https://github.com/chunghei0116/portfolio-website',
    featured: true,
  },
  {
    id: '02',
    title: 'Retro Tactile Flip Clock Engine',
    subtitle: 'Physics-Driven Flip Interface',
    category: 'Interactive UI',
    desc: 'Interactive mechanical flip clock interface built with fluid spring physics, custom audio feedback, and dark theme customization.',
    longDesc: 'Designed a ultra-tactile timekeeping component utilizing Framer Motion spring physics, Web Audio API sound triggers, and millisecond time synchronization.',
    metrics: ['Sub-1ms Sync', 'Web Audio API', '100% Accessible'],
    techStack: ['React 19', 'Framer Motion', 'Web Audio API', 'Tailwind v4'],
    demoUrl: 'https://github.com/chunghei0116/portfolio-website',
    githubUrl: 'https://github.com/chunghei0116/portfolio-website',
  },
  {
    id: '03',
    title: 'Aegis Infrastructure Telemetry Mesh',
    subtitle: 'Real-Time Edge Observability',
    category: 'Systems & WebGL',
    desc: 'Distributed observability dashboard monitoring multi-region edge servers with low-latency Canvas shader metrics.',
    longDesc: 'Architected an edge-native telemetry visualization panel streaming WebSockets data into high-performance Canvas 2D charts and automated alert triggers.',
    metrics: ['< 5ms Latency', '10k Events/sec', 'Zero Layout Shift'],
    techStack: ['Next.js 16', 'WebSockets', 'Canvas 2D', 'TypeScript'],
    demoUrl: 'https://github.com/chunghei0116/portfolio-website',
    githubUrl: 'https://github.com/chunghei0116/portfolio-website',
  },
];

export default function MinimalLabors() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="works" className="py-28 md:py-36 px-6 relative z-10 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-16">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-400 font-semibold block mb-3">
          Selected Engineering Works
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
          Featured Labors
        </h2>
      </div>

      {/* Projects Stack (Double Bezel Doppelrand Architecture) */}
      <div className="space-y-8">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="double-bezel cursor-pointer group"
          >
            <div className="double-bezel-core p-7 sm:p-9 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                {/* Meta & Category */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {project.id}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-zinc-400">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-300 mb-2">
                  {project.title}
                </h3>

                {/* Desc */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {project.desc}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-white/10 font-mono text-[10px] text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trailing Button-in-Button Action */}
              <div className="shrink-0 self-start md:self-center">
                <div className="group-hover:bg-emerald-400 group-hover:text-zinc-950 transition-all duration-300 inline-flex items-center gap-3 pl-5 pr-1.5 py-2 rounded-full font-sans text-xs font-semibold text-zinc-200 bg-white/[0.05] border border-white/15">
                  <span>Inspect Details</span>
                  <div className="w-6 h-6 rounded-full bg-zinc-950/20 dark:bg-white/10 group-hover:bg-zinc-950/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Inspection Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-full max-w-2xl p-7 sm:p-9 rounded-[2rem] bg-[#0c0c0e] border border-white/15 shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {selectedProject.id}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-400">
                    {selectedProject.category}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-xs font-mono text-emerald-400 mb-6">
                {selectedProject.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                {selectedProject.longDesc}
              </p>

              {/* Metrics */}
              <div className="mb-6">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                  Performance Metrics
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {selectedProject.metrics.map((m) => (
                    <div
                      key={m}
                      className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center font-mono text-xs font-bold text-emerald-400"
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-white/15 font-mono text-xs text-zinc-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 font-sans text-xs">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-zinc-200 hover:bg-white/10 hover:text-white transition-all font-semibold"
                >
                  <FolderGit2 className="w-4 h-4" strokeWidth={1.5} />
                  <span>Source Code</span>
                </a>
                <a
                  href={selectedProject.demoUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-400 text-zinc-950 font-bold hover:bg-emerald-300 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <span>Launch Project</span>
                  <ExternalLink className="w-4 h-4" strokeWidth={2} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
