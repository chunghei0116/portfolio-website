'use client';

import React, { useState } from 'react';
import ArtworkModal, { WorkItem } from './ArtworkModal';

const worksData: WorkItem[] = [
  {
    id: 'arch-01',
    code: 'ARCH 01',
    title: 'PARTHENON',
    subLabel: 'SANCTUARY ARCHITECTURE • MMXXIV',
    year: 'MMXXIV',
    category: 'DIGITAL MONUMENT',
    image: 'https://images.unsplash.com/photo-1548783469-d82f342be810?auto=format&fit=crop&w=1600&q=85',
    medium: 'Procedural Shader & Liquid Glass Mesh',
    location: 'Acropolis Vault, Athens',
  },
  {
    id: 'arch-02',
    code: 'ARCH 02',
    title: 'KRONOS',
    subLabel: 'TEMPORAL ENGINE • MMXXV',
    year: 'MMXXV',
    category: 'CHRONOS RELIC',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85',
    medium: 'High-Frequency Quantum Engine',
    location: 'Delphi Observatory',
  },
  {
    id: 'arch-03',
    code: 'ARCH 03',
    title: 'ATHENA',
    subLabel: 'TACTICAL MATRIX • MMXXV',
    year: 'MMXXV',
    category: 'STRATEGIC COGNITION',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=85',
    medium: 'Neural Vector Canvas',
    location: 'Parthenon Citadel',
  },
  {
    id: 'arch-04',
    code: 'ARCH 04',
    title: 'DELPHI',
    subLabel: 'PROPHETIC SYSTEM • MMXXVI',
    year: 'MMXXVI',
    category: 'ORACLE ARCHITECTURE',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85',
    medium: 'Liquid Mercury Visualization',
    location: 'Mount Parnassus',
  },
  {
    id: 'arch-05',
    code: 'ARCH 05',
    title: 'OLYMPUS',
    subLabel: 'CELESTIAL VAULT • MMXXVI',
    year: 'MMXXVI',
    category: 'DIVINE INFRASTRUCTURE',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    medium: 'Real-time WebGL Shading',
    location: 'High Peak Reliquary',
  },
  {
    id: 'arch-06',
    code: 'ARCH 06',
    title: 'ATLANTIS',
    subLabel: 'SUBMERGED REALM • MMXXVI',
    year: 'MMXXVI',
    category: 'HYDROGRAPHIC ENGINE',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    medium: 'Fluid Dynamic Simulation',
    location: 'Aegean Abyss',
  },
];

export default function OdysseyWorksSection() {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [tiltStyles, setTiltStyles] = useState<{ [key: string]: { transform: string; shadow: string } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTiltStyles((prev) => ({
      ...prev,
      [id]: {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        shadow: `${-rotateY * 1.5}px ${rotateX * 1.5}px 30px rgba(212, 175, 55, 0.25)`,
      },
    }));
  };

  const handleMouseLeave = (id: string) => {
    setTiltStyles((prev) => ({
      ...prev,
      [id]: {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        shadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
      },
    }));
  };

  return (
    <section id="works" className="relative py-28 px-6 max-w-7xl mx-auto z-10">
      {/* Section Header with Roman Numerals */}
      <div className="flex flex-col items-center text-center mb-20">
        <span className="font-cinzel text-xs text-[#D4AF37] tracking-[0.35em] uppercase mb-2">
          II. WORKS
        </span>
        <h2 className="font-cinzel text-4xl sm:text-5xl text-white font-light tracking-wide mb-4">
          SELECTED EXHIBITS
        </h2>
        <div className="w-16 h-[1px] bg-[#D4AF37]/50" />
      </div>

      {/* Grid of Floating Frosted Liquid Glass Slabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 perspective-container">
        {worksData.map((work) => {
          const style = tiltStyles[work.id] || {
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            shadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
          };

          return (
            <div
              key={work.id}
              onClick={() => setSelectedWork(work)}
              onMouseMove={(e) => handleMouseMove(e, work.id)}
              onMouseLeave={() => handleMouseLeave(work.id)}
              style={{
                transform: style.transform,
                boxShadow: style.shadow,
              }}
              className="tilt-card group relative h-[420px] rounded-2xl overflow-hidden liquid-glass-gold cursor-pointer flex flex-col justify-end p-6 border border-[#D4AF37]/30 transition-all duration-300"
            >
              {/* Background Art Image with Liquid Blur Pass-through */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-75 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0D] via-[#0A0B0D]/50 to-transparent" />
              </div>

              {/* Top Card Badge: Only Code */}
              <div className="absolute top-5 left-5 z-10 px-3 py-1 rounded-full liquid-glass border border-[#ffffff1a]">
                <span className="font-cinzel text-[10px] text-[#D4AF37] tracking-[0.25em]">
                  {work.code}
                </span>
              </div>

              {/* Bottom Card Copy (Ultra Minimal) */}
              <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-300">
                <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-light tracking-wide mb-1 group-hover:text-[#FFF8E7] transition-colors">
                  {work.title}
                </h3>
                <p className="font-montserrat text-[10px] text-[#D4AF37] tracking-[0.25em] uppercase font-light">
                  {work.subLabel}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-white/70">
                    INSPECT RELIC
                  </span>
                  <span className="text-[#D4AF37] text-xs">→</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <ArtworkModal
        work={selectedWork}
        onClose={() => setSelectedWork(null)}
      />
    </section>
  );
}
