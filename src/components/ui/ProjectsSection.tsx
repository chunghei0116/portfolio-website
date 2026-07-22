'use client';

import React, { useState } from 'react';
import { PROJECTS, Project } from '@/data/projects';
import { ExternalLink, Layers, Sparkles, Terminal, ArrowUpRight, Code2 } from 'lucide-react';
import { audioEngine } from '@/utils/audio';

const CATEGORIES = ['ALL', 'WebGL & 3D', 'Full-Stack Apps', 'DevOps & Cloud'] as const;

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const filteredProjects = activeCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative bg-[#07070a] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/20 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>SELECTED WORK & SHADERS</span>
            </div>
            <h2 
              onMouseEnter={() => audioEngine.playGlitch()}
              className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight uppercase text-white glitch-text cursor-default"
              data-text="FEATURED PROJECTS"
            >
              FEATURED PROJECTS
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  audioEngine.playClick(700, 0.03);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                  activeCategory === cat
                    ? 'bg-[#00f0ff] text-black border-[#00f0ff] shadow-lg shadow-[#00f0ff]/20'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => audioEngine.playClick(900, 0.02)}
              className="soft-card group relative p-6 sm:p-8 flex flex-col justify-between h-full border border-white/10 bg-[#0e0e15]/80 hover:bg-[#12121c] transition-all duration-300"
            >
              {/* Card Header Tag & Category */}
              <div>
                <div className="flex justify-between items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/20">
                    {project.category}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    {project.metrics}
                  </span>
                </div>

                {/* Title */}
                <h3 
                  className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-[#00f0ff] transition-colors mb-3 glitch-text"
                  data-text={project.title}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Chips & Links */}
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-slate-300 border border-white/10"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => audioEngine.playGlitch()}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#00f0ff] hover:text-white transition-colors"
                    >
                      <span>LIVE DEMO</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => audioEngine.playClick(600, 0.03)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors ml-auto"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>SOURCE CODE</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
