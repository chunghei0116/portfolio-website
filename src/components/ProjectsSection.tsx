'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code2, Compass, Sparkles, Wand2, ShieldAlert } from 'lucide-react';

const GithubIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// Color categories definition matching Howl's Magic Doorway Dial
export type PortalColor = 'green' | 'blue' | 'yellow' | 'black';

interface Project {
  id: string;
  title: string;
  category: string;
  color: PortalColor;
  description: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  portalTint: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}

const PROJECTS: Project[] = [
  // Green Portal: Web Applications
  {
    id: 'calcifers-forge',
    title: "Calcifer's Forge",
    category: 'Web Applications',
    color: 'green',
    description: 'High-speed real-time WebSocket dashboard & flame-powered state engine for monitoring magical energy consumption.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'WebSockets'],
    demoUrl: 'https://example.com/calcifers-forge',
    githubUrl: 'https://github.com/example/calcifers-forge',
    portalTint: 'rgba(136, 176, 75, 0.25)',
    badgeBg: 'bg-[#88B04B]/15',
    badgeText: 'text-[#5B7B2E]',
    badgeBorder: 'border-[#88B04B]/40',
  },
  {
    id: 'valley-of-wind-ui',
    title: 'Valley of Wind UI',
    category: 'Web Applications',
    color: 'green',
    description: 'Eco-monitored aerodynamics dashboard engineered to analyze gust velocity and glider telemetry in real time.',
    tags: ['TypeScript', 'Three.js', 'Tailwind', 'Recharts'],
    demoUrl: 'https://example.com/valley-of-wind',
    githubUrl: 'https://github.com/example/valley-of-wind-ui',
    portalTint: 'rgba(136, 176, 75, 0.25)',
    badgeBg: 'bg-[#88B04B]/15',
    badgeText: 'text-[#5B7B2E]',
    badgeBorder: 'border-[#88B04B]/40',
  },
  {
    id: 'apothecary-api',
    title: 'Apothecary Graph API',
    category: 'Web Applications',
    color: 'green',
    description: 'Herbal potion graph database with automated ingredient matching, dosage calculation, and REST endpoint generation.',
    tags: ['Node.js', 'GraphQL', 'PostgreSQL', 'Prisma'],
    demoUrl: 'https://example.com/apothecary-api',
    githubUrl: 'https://github.com/example/apothecary-api',
    portalTint: 'rgba(136, 176, 75, 0.25)',
    badgeBg: 'bg-[#88B04B]/15',
    badgeText: 'text-[#5B7B2E]',
    badgeBorder: 'border-[#88B04B]/40',
  },

  // Blue Portal: Mobile & Creative Tools
  {
    id: 'star-ocean-navigator',
    title: 'Star Ocean Navigator',
    category: 'Mobile & Creative Tools',
    color: 'blue',
    description: 'Cross-platform celestial navigation app featuring AR constellation projections and tide predictions.',
    tags: ['React Native', 'Expo', 'Three.js', 'ARKit'],
    demoUrl: 'https://example.com/star-ocean',
    githubUrl: 'https://github.com/example/star-ocean-navigator',
    portalTint: 'rgba(126, 200, 227, 0.25)',
    badgeBg: 'bg-[#7EC8E3]/15',
    badgeText: 'text-[#2B6CB0]',
    badgeBorder: 'border-[#7EC8E3]/40',
  },
  {
    id: 'cloudscape-canvas',
    title: 'Cloudscape Canvas',
    category: 'Mobile & Creative Tools',
    color: 'blue',
    description: 'Vector brush artwork generator specialized in rendering procedural Ghibli-inspired cloudscapes & sky palettes.',
    tags: ['Canvas API', 'React', 'Framer Motion', 'Zustand'],
    demoUrl: 'https://example.com/cloudscape',
    githubUrl: 'https://github.com/example/cloudscape-canvas',
    portalTint: 'rgba(126, 200, 227, 0.25)',
    badgeBg: 'bg-[#7EC8E3]/15',
    badgeText: 'text-[#2B6CB0]',
    badgeBorder: 'border-[#7EC8E3]/40',
  },

  // Yellow Portal: UI/UX Experiments
  {
    id: 'spellbook-design-system',
    title: 'Spellbook Design System',
    category: 'UI/UX Experiments',
    color: 'yellow',
    description: 'Accessible, enchanted component library featuring brass borders, ink-bleed states, and tactile micro-interactions.',
    tags: ['React', 'Tailwind CSS', 'Storybook', 'Radix UI'],
    demoUrl: 'https://example.com/spellbook',
    githubUrl: 'https://github.com/example/spellbook-ds',
    portalTint: 'rgba(253, 225, 169, 0.3)',
    badgeBg: 'bg-[#FDE1A9]/20',
    badgeText: 'text-[#975A16]',
    badgeBorder: 'border-[#FDE1A9]/50',
  },
  {
    id: 'clockwork-motion',
    title: 'Clockwork Motion Lab',
    category: 'UI/UX Experiments',
    color: 'yellow',
    description: 'Physics-based kinetic animation framework designed for gear rotation, pendulum swings, and spring dynamics.',
    tags: ['GSAP', 'Framer Motion', 'TypeScript', 'Web Audio API'],
    demoUrl: 'https://example.com/clockwork-motion',
    githubUrl: 'https://github.com/example/clockwork-motion',
    portalTint: 'rgba(253, 225, 169, 0.3)',
    badgeBg: 'bg-[#FDE1A9]/20',
    badgeText: 'text-[#975A16]',
    badgeBorder: 'border-[#FDE1A9]/50',
  },

  // Black Portal: Mysterious Open Source Void
  {
    id: 'howls-castle-engine',
    title: "Howl's Castle Engine",
    category: 'Open Source Void',
    color: 'black',
    description: 'Procedural inverse-kinematics leg physics simulator for multi-limbed walking structures built in WebGL & Rust.',
    tags: ['WebGL', 'Rust', 'Wasm', 'Three.js'],
    demoUrl: 'https://example.com/castle-engine',
    githubUrl: 'https://github.com/example/howls-castle-engine',
    portalTint: 'rgba(28, 40, 51, 0.65)',
    badgeBg: 'bg-slate-800/60',
    badgeText: 'text-slate-300',
    badgeBorder: 'border-slate-600/50',
  },
  {
    id: 'spirit-protocol',
    title: 'Spirit Protocol',
    category: 'Open Source Void',
    color: 'black',
    description: 'Decentralized peer-to-peer state synchronization protocol designed for zero-latency multiplayer whimsical apps.',
    tags: ['TypeScript', 'WebRTC', 'Cryptography', 'P2P'],
    demoUrl: 'https://example.com/spirit-protocol',
    githubUrl: 'https://github.com/example/spirit-protocol',
    portalTint: 'rgba(28, 40, 51, 0.65)',
    badgeBg: 'bg-slate-800/60',
    badgeText: 'text-slate-300',
    badgeBorder: 'border-slate-600/50',
  },
];

const DIAL_CONFIG: Record<PortalColor, { name: string; label: string; colorHex: string; angle: number; description: string }> = {
  green: {
    name: 'Green Portal',
    label: 'Web Applications',
    colorHex: '#88B04B',
    angle: 0,
    description: 'Kingsbury Capital - Scalable Web Apps & Digital Forges',
  },
  blue: {
    name: 'Blue Portal',
    label: 'Mobile & Creative',
    colorHex: '#7EC8E3',
    angle: 90,
    description: 'Porthaven Harbor - Mobile Native Apps & Sky Canvas Tools',
  },
  yellow: {
    name: 'Yellow Portal',
    label: 'UI/UX Experiments',
    colorHex: '#FDE1A9',
    angle: 180,
    description: 'Star Lake Cottage - Interactive UI Motion & Design Systems',
  },
  black: {
    name: 'Black Void',
    label: 'Open Source Void',
    colorHex: '#1C2833',
    angle: 270,
    description: 'Wasteland Void - Experimental Engine Core & Shaders',
  },
};

export default function ProjectsSection() {
  const [selectedColor, setSelectedColor] = useState<PortalColor>('green');

  const activeDial = DIAL_CONFIG[selectedColor];
  const filteredProjects = PROJECTS.filter((p) => p.color === selectedColor);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 bg-[#050507] overflow-hidden text-[#fafafa]">
      {/* Background Ambient Aura based on active portal color */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-colors duration-700 opacity-20"
        animate={{
          background: `radial-gradient(circle at 50% 30%, ${activeDial.colorHex} 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_12px_rgba(212,175,55,0.2)]">
            <Compass className="w-3.5 h-3.5" />
            <span>Dimensional Portals</span>
          </div>

          <h2 className="ghibli-heading text-4xl sm:text-5xl md:text-6xl font-serif text-[#FDE1A9] tracking-tight mb-4 drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
            Howl&apos;s Magic Doorways
          </h2>

          <p className="text-sm sm:text-base text-[#D4AF37]/90 max-w-xl mx-auto font-serif italic">
            Select a color on the magic dial to open a new destination portal and view featured project manifestations.
          </p>
        </div>

        {/* Howl's Magic Dial Selector Component */}
        <div className="flex flex-col items-center mb-16">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center p-3 rounded-full border-4 border-[#D4AF37] bg-gradient-to-b from-[#2A1E14] via-[#1A120B] to-[#0A0704] shadow-[0_0_35px_rgba(212,175,55,0.35)]">
            {/* Outer Brass Metallic Ring with Rivets */}
            <div className="absolute inset-0 rounded-full border-2 border-[#F3E5AB]/40 pointer-events-none" />
            
            {/* 4 Rivets around the rim */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#8B6508] border border-[#F3E5AB]/60 shadow-inner" />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#8B6508] border border-[#F3E5AB]/60 shadow-inner" />
            <div className="absolute left-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#8B6508] border border-[#F3E5AB]/60 shadow-inner" />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#8B6508] border border-[#F3E5AB]/60 shadow-inner" />

            {/* Dial Face Inner Circle */}
            <div className="relative w-full h-full rounded-full border border-[#D4AF37]/30 bg-[#120C07] flex items-center justify-center overflow-hidden">
              {/* Radial Dial Quadrants */}
              {/* Green Gem (Top: 0 deg) */}
              <button
                type="button"
                onClick={() => setSelectedColor('green')}
                aria-label="Green Portal - Web Applications"
                className="absolute top-3 left-1/2 -translate-x-1/2 z-20 group flex flex-col items-center"
              >
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center shadow-lg ${
                    selectedColor === 'green'
                      ? 'border-[#88B04B] bg-[#88B04B] scale-110 shadow-[0_0_15px_#88B04B]'
                      : 'border-[#88B04B]/60 bg-[#88B04B]/30 hover:scale-105 hover:bg-[#88B04B]/60'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-white/70 shadow-inner" />
                </div>
                <span className="text-[10px] font-mono tracking-wider text-[#88B04B] mt-0.5 opacity-80 group-hover:opacity-100 uppercase">
                  Green
                </span>
              </button>

              {/* Blue Gem (Right: 90 deg) */}
              <button
                type="button"
                onClick={() => setSelectedColor('blue')}
                aria-label="Blue Portal - Mobile & Creative Tools"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 group flex flex-col items-center"
              >
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center shadow-lg ${
                    selectedColor === 'blue'
                      ? 'border-[#7EC8E3] bg-[#7EC8E3] scale-110 shadow-[0_0_15px_#7EC8E3]'
                      : 'border-[#7EC8E3]/60 bg-[#7EC8E3]/30 hover:scale-105 hover:bg-[#7EC8E3]/60'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-white/70 shadow-inner" />
                </div>
                <span className="text-[10px] font-mono tracking-wider text-[#7EC8E3] mt-0.5 opacity-80 group-hover:opacity-100 uppercase">
                  Blue
                </span>
              </button>

              {/* Yellow Gem (Bottom: 180 deg) */}
              <button
                type="button"
                onClick={() => setSelectedColor('yellow')}
                aria-label="Yellow Portal - UI/UX Experiments"
                className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 group flex flex-col items-center"
              >
                <span className="text-[10px] font-mono tracking-wider text-[#FDE1A9] mb-0.5 opacity-80 group-hover:opacity-100 uppercase">
                  Yellow
                </span>
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center shadow-lg ${
                    selectedColor === 'yellow'
                      ? 'border-[#FDE1A9] bg-[#FDE1A9] scale-110 shadow-[0_0_15px_#FDE1A9]'
                      : 'border-[#FDE1A9]/60 bg-[#FDE1A9]/30 hover:scale-105 hover:bg-[#FDE1A9]/60'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-white/70 shadow-inner" />
                </div>
              </button>

              {/* Black Gem (Left: 270 deg) */}
              <button
                type="button"
                onClick={() => setSelectedColor('black')}
                aria-label="Black Portal - Open Source Void"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 group flex flex-col items-center"
              >
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center shadow-lg ${
                    selectedColor === 'black'
                      ? 'border-slate-300 bg-slate-800 scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                      : 'border-slate-500 bg-slate-900/80 hover:scale-105 hover:bg-slate-800'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-slate-400/80 shadow-inner" />
                </div>
                <span className="text-[10px] font-mono tracking-wider text-slate-300 mt-0.5 opacity-80 group-hover:opacity-100 uppercase">
                  Black
                </span>
              </button>

              {/* Center Rotating Brass Indicator Needle */}
              <motion.div
                className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none"
                animate={{ rotate: activeDial.angle }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              >
                {/* Pointer Needle pointing UP towards 0 degrees */}
                <div className="absolute top-8 w-3 h-14 bg-gradient-to-t from-[#D4AF37] via-[#F3E5AB] to-[#FFF] clip-path-pointer rounded-t-sm shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
              </motion.div>

              {/* Center Brass Hub */}
              <div className="absolute z-30 w-10 h-10 rounded-full border-2 border-[#F3E5AB] bg-gradient-to-br from-[#D4AF37] via-[#8B6508] to-[#3A2500] shadow-[0_0_12px_rgba(0,0,0,0.8)] flex items-center justify-center">
                <Wand2 className="w-4 h-4 text-[#FFF8DC]" />
              </div>
            </div>
          </div>

          {/* Current Active Dial Portal Description Badge */}
          <div className="mt-6 text-center">
            <motion.div
              key={selectedColor}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#1A120B]/80 border border-[#D4AF37]/30 shadow-md backdrop-blur-sm"
            >
              <span
                className="w-3 h-3 rounded-full inline-block shadow-sm"
                style={{ backgroundColor: activeDial.colorHex }}
              />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#FDE1A9]">
                {activeDial.name}: <span className="font-normal text-[#D4AF37]">{activeDial.label}</span>
              </span>
            </motion.div>
            <p className="text-xs text-slate-400 mt-1 font-serif italic">
              {activeDial.description}
            </p>
          </div>
        </div>

        {/* Project Cards Grid (Brass Polaroid Doorway Snapshots) */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                whileHover={{
                  y: -6,
                  rotateX: 2,
                  rotateY: -2,
                  boxShadow: '0 20px 35px -10px rgba(212, 175, 55, 0.25)',
                }}
                className="group relative rounded-2xl p-5 border-2 border-[#D4AF37]/40 bg-gradient-to-b from-[#1C140E] via-[#120C07] to-[#0A0704] shadow-xl overflow-hidden flex flex-col justify-between"
              >
                {/* Brass Metallic Border Accent Highlights */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] opacity-80" />
                
                {/* Corner Metallic Bolts */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70 border border-black" />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70 border border-black" />

                <div>
                  {/* Top Polaroid Magic Doorway Image Frame */}
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-black/60 mb-5 shadow-inner group">
                    {/* Background Portal Image */}
                    <motion.img
                      src="/images/magic-doorway.png"
                      alt={`${project.title} Magic Doorway`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Color Tint Overlay for Portal */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-80"
                      style={{ backgroundColor: project.portalTint }}
                    />

                    {/* Ambient Vignette & Sparkle Graphic */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                    
                    {/* Floating Magical Badge Overlay */}
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border backdrop-blur-md shadow-md ${project.badgeBg} ${project.badgeText} ${project.badgeBorder}`}
                      >
                        <Sparkles className="w-3 h-3" />
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Polaroid Chin Typography */}
                  <div className="px-1">
                    <h3 className="ghibli-heading text-xl sm:text-2xl font-serif text-[#FDE1A9] group-hover:text-[#FFF8DC] transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-serif">
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-[#2A1E14]/80 text-[#D4AF37] border border-[#D4AF37]/20 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between px-1">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:text-[#FFF8DC] transition-colors group/link"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors group/git"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Repository</span>
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
