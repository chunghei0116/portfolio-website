'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Award } from 'lucide-react';

const EXPERIENCES = [
  {
    role: 'Lead Graphics & Full-Stack Engineer',
    company: 'Vanguard Digital Lab',
    period: '2024 — PRESENT',
    description: 'Spearheaded WebGL shader engines and high-frequency React architecture for enterprise clients, cutting render bottlenecks by 45%.',
    achievements: [
      'Architected custom GLSL particle system handling 50k+ dynamic vertices',
      'Led team of 6 engineers on Next.js redesign with 98+ Lighthouse performance score',
      'Achieved 99.9% uptime SLA across distributed microservices',
    ],
  },
  {
    role: 'Senior Full-Stack Architect',
    company: 'Apex Cloud Systems',
    period: '2022 — 2024',
    description: 'Designed containerized microservices and web application frontends handling millions of daily events.',
    achievements: [
      'Deployed Kubernetes observability pipeline tracking 10k+ container clusters',
      'Integrated real-time WebSockets telemetry with < 15ms latency',
      'Reduced initial bundle sizes by 35% via dynamic code-splitting and asset optimization',
    ],
  },
  {
    role: 'Software Engineer (Frontend / 3D)',
    company: 'Nexus Interactive',
    period: '2020 — 2022',
    description: 'Built interactive 3D WebGL configurators and responsive web applications for global brands.',
    achievements: [
      'Created 3D product viewports using Three.js and custom PBR shaders',
      'Published reusable design tokens system adopted across 4 product teams',
      'Engineered accessible UI component library with Framer Motion micro-interactions',
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-28 px-4 max-w-5xl mx-auto">
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#10b981] uppercase tracking-widest mb-3">
          <Award className="w-3.5 h-3.5 text-[#10b981]" />
          <span>[ CAREER TIMELINE ]</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          PROFESSIONAL EXPERIENCE
        </h2>
      </div>

      <div className="relative border-l-2 border-[#00f0ff]/30 pl-6 md:pl-10 space-y-12 ml-4 md:ml-8">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative group"
          >
            {/* Electric Cable Node */}
            <div className="absolute -left-[31px] md:-left-[47px] top-6 w-4 h-4 rounded-full bg-[#030305] border-2 border-[#00f0ff] shadow-[0_0_10px_#00f0ff] group-hover:scale-125 transition-transform" />

            <div className="double-bezel-outer">
              <div className="double-bezel-inner p-7">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-[#00f0ff] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {exp.period}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{exp.company}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#a855f7] inline" />
                  {exp.role}
                </h3>
                <p className="text-slate-300 text-sm font-mono leading-relaxed mb-4">{exp.description}</p>

                <ul className="space-y-1.5">
                  {exp.achievements.map((ach) => (
                    <li key={ach} className="text-xs font-mono text-slate-400 flex items-start gap-2">
                      <span className="text-[#00f0ff] shrink-0">▹</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
