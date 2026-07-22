'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { PROJECTS, Project } from '../../data/projects';

export default function ProjectsSection() {
  const [filter, setFilter] = useState<string>('ALL');

  const categories = ['ALL', 'WebGL & 3D', 'Full-Stack Apps', 'DevOps & Cloud'];

  const filteredProjects = filter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-28 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#00f0ff] uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <FolderGit2 className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>[ SELECTED ARCHITECTURE &amp; BUILDS ]</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            FEATURED PROJECTS
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-[#00f0ff] text-black font-semibold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetrical Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`${project.colSpan} group relative`}
            >
              <div className="double-bezel-outer transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-[#00f0ff]/30 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_20px_rgba(0,240,255,0.15)]">
                <div className="double-bezel-inner p-7 flex flex-col justify-between h-full min-h-[320px]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                        {project.category}
                      </span>
                      <span
                        className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20"
                        style={{ color: project.accent || '#00f0ff' }}
                      >
                        {project.metrics}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00f0ff] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-mono leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/5">
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:text-[#00f0ff] transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                        >
                          <FolderGit2 className="w-3.5 h-3.5" /> Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
