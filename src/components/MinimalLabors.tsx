'use client';

import React, { useState } from 'react';
import { ExternalLink, FolderGit2, Sparkles, X, ArrowRight, Layers, Cpu, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: '3D & WebGL' | 'Full-Stack' | 'Tools';
  desc: string;
  longDesc: string;
  metrics: string[];
  techStack: string[];
  demoUrl: string;
  githubUrl: string;
  featured?: boolean;
  accentColor: string;
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
    techStack: ['React Three Fiber', 'Three.js', 'WebGL', 'GLSL Shaders', 'TypeScript'],
    demoUrl: '#top',
    githubUrl: 'https://github.com/chunghei0116/portfolio-website',
    featured: true,
    accentColor: 'from-emerald-400 to-cyan-400',
  },
  {
    id: '02',
    title: 'Retro Tactile Flip Clock',
    subtitle: 'Physics-Driven Flip Engine',
    category: 'Tools',
    desc: 'Interactive mechanical flip clock interface built with fluid spring physics, custom audio feedback, and dark theme customization.',
    longDesc: 'Designed a ultra-tactile timekeeping component utilizing Framer Motion spring physics, Web Audio API sound triggers, and millisecond time synchronization.',
    metrics: ['Sub-1ms Sync', 'Web Audio API', '100% Accessible'],
    techStack: ['React 19', 'Framer Motion', 'Web Audio', 'Tailwind v4'],
    demoUrl: 'https://github.com/chunghei0116/portfolio-website',
    githubUrl: 'https://github.com/chunghei0116/portfolio-website',
    accentColor: 'from-cyan-400 to-blue-500',
  },
  {
    id: '03',
    title: 'Aegis Infrastructure Mesh',
    subtitle: 'Real-Time Edge Telemetry',
    category: 'Full-Stack',
    desc: 'Distributed observability dashboard monitoring multi-region edge servers with low-latency Canvas shader metrics.',
    longDesc: 'Architected an edge-native telemetry visualization panel streaming WebSockets data into high-performance Canvas 2D charts and automated alert triggers.',
    metrics: ['< 5ms Latency', '10k Events/sec', 'Zero Layout Shift'],
    techStack: ['Next.js 16', 'WebSockets', 'Canvas API', 'TypeScript'],
    demoUrl: 'https://github.com/chunghei0116/portfolio-website',
    githubUrl: 'https://github.com/chunghei0116/portfolio-website',
    accentColor: 'from-purple-400 to-emerald-400',
  },
  {
    id: '04',
    title: 'Quantum Shader Studio',
    subtitle: 'Node-Based GLSL Generator',
    category: '3D & WebGL',
    desc: 'Visual node-based shader graph authoring tool allowing developers to compose complex WebGL shaders visually.',
    longDesc: 'Built an interactive graph editor with real-time fragment shader compilation, instant code generation, and export to Three.js / WebGL targets.',
    metrics: ['Instant Live Preview', 'Export to GLSL', 'Custom Graph Engine'],
    techStack: ['Three.js', 'React Flow', 'GLSL', 'Vite'],
    demoUrl: 'https://github.com/chunghei0116/portfolio-website',
    githubUrl: 'https://github.com/chunghei0116/portfolio-website',
    accentColor: 'from-emerald-400 to-teal-300',
  },
];

export default function MinimalLabors() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', '3D & WebGL', 'Full-Stack', 'Tools'];

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="works" className="py-24 px-6 relative z-10 max-w-5xl mx-auto">
      {/* Header & Category Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Selected Projects</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            Featured Labors
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-emerald-400 text-zinc-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => {
          const isWide = project.featured && activeCategory === 'All';

          return (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`group relative p-7 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between cursor-pointer ${
                isWide ? 'md:col-span-2 min-h-[320px]' : 'min-h-[300px]'
              }`}
              onClick={() => setSelectedProject(project)}
            >
              {/* Card Accent Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-tr-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {project.id}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-400">
                    {project.category}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-400 font-medium mb-4">
                  {project.subtitle}
                </p>

                {/* Short Desc */}
                <p className="text-xs text-zinc-300 leading-relaxed max-w-xl mb-6">
                  {project.desc}
                </p>
              </div>

              {/* Footer Tech Pills & Inspect Action */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10 font-mono text-[10px] text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 rounded-lg bg-zinc-900 border border-white/10 font-mono text-[10px] text-zinc-500">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between font-mono text-xs text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                  <span className="inline-flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Details</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Project Inspection Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-[#09090b] border border-white/15 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
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
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-xs font-mono text-emerald-400 mb-6">
                {selectedProject.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                {selectedProject.longDesc}
              </p>

              {/* Key Metrics */}
              <div className="mb-6">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                  Performance Metrics
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {selectedProject.metrics.map((metric) => (
                    <div
                      key={metric}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center font-mono text-xs font-bold text-emerald-400"
                    >
                      {metric}
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Tech Stack */}
              <div className="mb-8">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                  Technologies Used
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/15 font-mono text-xs text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 font-mono text-xs">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-zinc-200 hover:bg-white/10 hover:text-white transition-all"
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
                <a
                  href={selectedProject.demoUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-400 text-zinc-950 font-bold hover:bg-emerald-300 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <span>Launch Project</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
