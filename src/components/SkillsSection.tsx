'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wind,
  Hammer,
  FlaskConical,
  Flame,
  Sparkles,
  Wand2,
  Zap,
  Shield,
  Star,
  Scroll,
  Feather,
  CheckCircle2,
  Gauge,
  Sliders,
  ChevronRight,
  Info
} from 'lucide-react';

interface Skill {
  name: string;
  level: number; // 0 - 100
  tier: string;
  spirit: 'soot' | 'ember' | 'wind' | 'star';
  description: string;
}

interface MagicCategory {
  id: string;
  name: string;
  subhead: string;
  emoji: string;
  icon: React.ComponentType<{ className?: string }>;
  bgGradient: string;
  borderColor: string;
  accentColor: string;
  badgeBg: string;
  textColor: string;
  glowColor: string;
  parchmentStyle: string;
  skills: Skill[];
}

const MAGIC_CATEGORIES: MagicCategory[] = [
  {
    id: 'wind-magic',
    name: 'Wind Magic',
    subhead: 'Performance & Optimization',
    emoji: '🌬️',
    icon: Wind,
    bgGradient: 'from-sky-950/40 via-cyan-950/20 to-slate-950/60',
    borderColor: 'border-sky-500/30 hover:border-sky-400/60',
    accentColor: '#7EC8E3',
    badgeBg: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
    textColor: 'text-sky-400',
    glowColor: 'rgba(126, 200, 227, 0.4)',
    parchmentStyle: 'border-[#7EC8E3]/30 bg-[radial-gradient(ellipse_at_top_left,rgba(126,200,227,0.08),transparent_70%)]',
    skills: [
      { name: 'Web Vitals', level: 98, tier: 'Grand Archmage', spirit: 'wind', description: 'Sub-second LCP, zero CLS, and minimal INP performance tuning.' },
      { name: 'Bundle Shrinking', level: 92, tier: 'Master Weaver', spirit: 'wind', description: 'Aggressive tree-shaking and dynamic code splitting.' },
      { name: '60fps Animations', level: 95, tier: 'Wind Dancer', spirit: 'wind', description: 'GPU-accelerated composite layers and smooth frame pipelines.' },
      { name: 'Edge Caching', level: 88, tier: 'Gale Whisperer', spirit: 'wind', description: 'Distributed CDN stale-while-revalidate cache headers.' },
      { name: 'SEO', level: 90, tier: 'Beacon Keeper', spirit: 'wind', description: 'Semantic structured data schemas and automated OG meta generators.' }
    ]
  },
  {
    id: 'master-crafting',
    name: 'Master Crafting',
    subhead: 'Frontend Ecosystem',
    emoji: '🔨',
    icon: Hammer,
    bgGradient: 'from-amber-950/40 via-yellow-950/20 to-stone-950/60',
    borderColor: 'border-amber-500/30 hover:border-amber-400/60',
    accentColor: '#D4AF37',
    badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    textColor: 'text-amber-400',
    glowColor: 'rgba(212, 175, 55, 0.4)',
    parchmentStyle: 'border-[#D4AF37]/30 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.08),transparent_70%)]',
    skills: [
      { name: 'React 19', level: 96, tier: 'Supreme Artisan', spirit: 'star', description: 'Concurrent mode, Server Actions, and compiler hooks.' },
      { name: 'Next.js 16', level: 95, tier: 'Realm Architect', spirit: 'star', description: 'App Router architecture, Partial Prerendering, and Turbopack.' },
      { name: 'TypeScript', level: 94, tier: 'Rune Sculptor', spirit: 'star', description: 'Strict type safety, generic constraints, and custom utilities.' },
      { name: 'Tailwind CSS', level: 98, tier: 'Visual Forge', spirit: 'star', description: 'Fluid design token systems, container queries, and utility styling.' },
      { name: 'Framer Motion', level: 92, tier: 'Kinetic Mage', spirit: 'star', description: 'Physics spring dynamics, layout morphing, and scroll triggers.' },
      { name: 'HTML5/CSS3', level: 99, tier: 'Foundational Master', spirit: 'star', description: 'Accessible ARIA standards, modern grid layouts, and CSS variables.' }
    ]
  },
  {
    id: 'digital-alchemy',
    name: 'Digital Alchemy',
    subhead: 'Backend & Data Systems',
    emoji: '🧪',
    icon: FlaskConical,
    bgGradient: 'from-purple-950/40 via-indigo-950/20 to-slate-950/60',
    borderColor: 'border-purple-500/30 hover:border-purple-400/60',
    accentColor: '#9B72AA',
    badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    textColor: 'text-purple-400',
    glowColor: 'rgba(155, 114, 170, 0.4)',
    parchmentStyle: 'border-[#9B72AA]/30 bg-[radial-gradient(ellipse_at_top_left,rgba(155,114,170,0.08),transparent_70%)]',
    skills: [
      { name: 'Node.js', level: 90, tier: 'Potion Master', spirit: 'soot', description: 'Event-loop optimization and asynchronous stream processing.' },
      { name: 'GraphQL', level: 88, tier: 'Query Transmuter', spirit: 'soot', description: 'Schema federation, custom resolvers, and batch dataloaders.' },
      { name: 'REST APIs', level: 95, tier: 'Contract Weaver', spirit: 'soot', description: 'Idempotent endpoint design and OpenAPI spec validation.' },
      { name: 'PostgreSQL', level: 86, tier: 'Data Alchemist', spirit: 'soot', description: 'Relational indexing, JSONB queries, and transaction isolation.' },
      { name: 'Redis', level: 85, tier: 'Flash Memory Keeper', spirit: 'soot', description: 'Pub/sub streaming, in-memory caching, and atomic locks.' },
      { name: 'Microservices', level: 84, tier: 'Domain Sovereign', spirit: 'soot', description: 'Event-driven message queues and decoupled service bounds.' }
    ]
  },
  {
    id: 'calcifers-ember',
    name: "Calcifer's Ember",
    subhead: 'DevOps & Cloud Infrastructure',
    emoji: '🔥',
    icon: Flame,
    bgGradient: 'from-orange-950/40 via-red-950/20 to-stone-950/60',
    borderColor: 'border-orange-500/30 hover:border-orange-400/60',
    accentColor: '#F59E0B',
    badgeBg: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    textColor: 'text-orange-400',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    parchmentStyle: 'border-[#F59E0B]/30 bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.08),transparent_70%)]',
    skills: [
      { name: 'Docker', level: 88, tier: 'Container Igniter', spirit: 'ember', description: 'Multi-stage lightweight images and isolated dev environments.' },
      { name: 'CI/CD Pipelines', level: 92, tier: 'Automated Hearth', spirit: 'ember', description: 'GitHub Actions automation, matrix testing, and zero-downtime releases.' },
      { name: 'Vercel', level: 96, tier: 'Cloud Flame', spirit: 'ember', description: 'Edge function routing, preview environments, and instant rollbacks.' },
      { name: 'AWS', level: 85, tier: 'Sky Citadel Keeper', spirit: 'ember', description: 'S3 static storage, Lambda serverless, and CloudFront CDN.' },
      { name: 'Git', level: 95, tier: 'Timeline Weaver', spirit: 'ember', description: 'Rebase workflows, interactive cherry-picking, and bisect debugging.' },
      { name: 'Automated Testing', level: 90, tier: 'Shield Guardian', spirit: 'ember', description: 'Comprehensive unit, integration, and E2E Playwright coverage.' }
    ]
  }
];

// Helper to render Ghibli spirit visual badge
const SpiritBadgeIcon = ({ type }: { type: Skill['spirit'] }) => {
  switch (type) {
    case 'soot':
      return (
        <span className="relative inline-flex items-center justify-center w-5 h-5 bg-neutral-900 text-neutral-100 rounded-full text-[10px] shadow-sm font-bold animate-pulse">
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-white rounded-full" />
          🌑
        </span>
      );
    case 'ember':
      return (
        <span className="relative inline-flex items-center justify-center w-5 h-5 bg-amber-950 text-amber-400 rounded-full text-xs shadow-[0_0_8px_rgba(245,158,11,0.5)]">
          🔥
        </span>
      );
    case 'wind':
      return (
        <span className="relative inline-flex items-center justify-center w-5 h-5 bg-sky-950 text-sky-300 rounded-full text-xs shadow-[0_0_8px_rgba(126,200,227,0.5)] animate-spin-slow">
          🌬️
        </span>
      );
    case 'star':
    default:
      return (
        <span className="relative inline-flex items-center justify-center w-5 h-5 bg-yellow-950 text-yellow-300 rounded-full text-xs shadow-[0_0_8px_rgba(212,175,55,0.5)]">
          ✨
        </span>
      );
  }
};

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<{ categoryId: string; skill: Skill } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');

  const filteredCategories = selectedCategory === 'all'
    ? MAGIC_CATEGORIES
    : MAGIC_CATEGORIES.filter((c) => c.id === selectedCategory);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 bg-[#050507] overflow-hidden text-[#fafafa]">
      {/* Ambient background ethereal glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.06)_0%,rgba(5,5,7,0)_70%)] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_12px_rgba(212,175,55,0.2)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spells & Abilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#FDE1A9] tracking-tight mb-3 drop-shadow-sm"
          >
            Skills &amp; Elemental Magic
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-sm sm:text-base font-sans"
          >
            Technical alchemy cultivated across realms.
          </motion.p>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mt-8"
          >
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border ${
                selectedCategory === 'all'
                  ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#FDE1A9] shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                  : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
              }`}
            >
              All Magic Elements
            </button>
            {MAGIC_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#FDE1A9] shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                    : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredCategories.map((category, catIdx) => {
            const IconComp = category.icon;
            const categoryAvgLevel = Math.round(
              category.skills.reduce((acc, s) => acc + s.level, 0) / category.skills.length
            );

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1 }}
                className={`group relative p-6 sm:p-8 rounded-2xl border-2 transition-all duration-500 backdrop-blur-md ${category.parchmentStyle} bg-neutral-950/80 shadow-xl overflow-hidden`}
              >
                {/* Background glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${category.glowColor} 0%, transparent 70%)`
                  }}
                />

                {/* Card Header */}
                <div className="flex items-start justify-between mb-6 pb-4 border-b border-neutral-800/80 relative z-10">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-3 rounded-xl border border-white/10 bg-neutral-900/90 shadow-inner"
                      style={{ color: category.accentColor }}
                    >
                      <IconComp className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{category.emoji}</span>
                        <h3 className="text-xl font-bold font-serif text-neutral-100 tracking-wide">
                          {category.name}
                        </h3>
                      </div>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5">
                        {category.subhead}
                      </p>
                    </div>
                  </div>

                  {/* Overall Spell Power badge */}
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                      Spell Power
                    </span>
                    <span
                      className="text-sm font-mono font-bold"
                      style={{ color: category.accentColor }}
                    >
                      {categoryAvgLevel}%
                    </span>
                  </div>
                </div>

                {/* Floating Ghibli Spirit Badges Grid */}
                <div className="space-y-3.5 relative z-10">
                  {category.skills.map((skill) => {
                    const isHovered =
                      hoveredSkill?.categoryId === category.id &&
                      hoveredSkill?.skill.name === skill.name;

                    return (
                      <div
                        key={skill.name}
                        onMouseEnter={() => setHoveredSkill({ categoryId: category.id, skill })}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="group/skill relative p-3 rounded-xl border border-neutral-800/90 bg-neutral-900/40 hover:bg-neutral-900/80 hover:border-neutral-700 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <SpiritBadgeIcon type={skill.spirit} />
                            <span className="text-sm font-medium text-neutral-200 group-hover/skill:text-white transition-colors">
                              {skill.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-neutral-400 group-hover/skill:text-neutral-300">
                              {skill.tier}
                            </span>
                            <span
                              className="text-xs font-mono font-bold"
                              style={{ color: category.accentColor }}
                            >
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        {/* Interactive Spell Strength Indicator Bar */}
                        <div className="mt-2.5 w-full bg-neutral-800/80 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: category.accentColor,
                              boxShadow: isHovered ? `0 0 10px ${category.accentColor}` : 'none'
                            }}
                          />
                        </div>

                        {/* Hover Spell Details Tooltip */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="p-2.5 rounded-lg bg-neutral-950/90 border border-neutral-800 text-xs text-neutral-300 font-sans leading-relaxed flex items-start gap-2">
                                <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-400" />
                                <div>
                                  <p>{skill.description}</p>
                                  <div className="flex items-center gap-3 mt-1.5 text-[10px] font-mono text-neutral-400">
                                    <span className="flex items-center gap-1">
                                      <Zap className="w-3 h-3 text-yellow-400" /> Proficiency: {skill.level}%
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Shield className="w-3 h-3 text-emerald-400" /> Mastery Level
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer / Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-6 rounded-2xl border border-[#D4AF37]/30 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,rgba(28,40,51,0.2)_100%)] text-center relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#FDE1A9] flex-shrink-0">
                <Wand2 className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <h4 className="text-base font-bold font-serif text-[#FDE1A9]">
                  Alchemical Mastery &amp; Continuous Learning
                </h4>
                <p className="text-xs text-neutral-400 font-sans">
                  Constantly transmuting new frameworks and modern web techniques into battle-tested spellcraft.
                </p>
              </div>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D4AF37] bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#FDE1A9] text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] whitespace-nowrap"
            >
              <span>Invoke Spellcaster</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
