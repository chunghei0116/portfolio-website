'use client';

import React from 'react';

export default function HyperlaneProgram() {
  const cards = [
    {
      time: 'LABOR 01',
      type: 'Live 3D WebGL Canvas',
      title: 'The Golden Starfield of Olympus',
      sub: '3500+ glowing particles, custom canvas gradient textures, low-poly Greek column, and smooth pointer parallax physics.',
      name: 'Status: Deployed & Active',
      link: '#top',
    },
    {
      time: 'LABOR 02',
      type: 'Tactile Interface',
      title: 'Retro Flip Clock Engine',
      sub: 'Precision physics-based flip clock animations, custom marble themes, and millisecond time synchronization.',
      name: 'Status: Open Source',
      link: 'https://github.com/chunghei0116/portfolio-website',
    },
    {
      time: 'LABOR 03',
      type: 'Telemetry Mesh',
      title: 'Aegis Security & Analytics',
      sub: 'High-throughput real-time telemetry visualizer for distributed edge runtimes with custom Canvas shader feeds.',
      name: 'Status: Production Infrastructure',
      link: 'https://github.com/chunghei0116/portfolio-website',
    },
    {
      time: 'LABOR 04',
      type: 'GLSL Experiment',
      title: 'Kinetic Noise & Raymarching Lab',
      sub: 'Procedural raymarched volumetric fog and SDF geometries running at 60fps on mobile GPUs.',
      name: 'Status: Research & Sandbox',
      link: 'https://github.com/chunghei0116/portfolio-website',
    },
  ];

  return (
    <section id="labors" className="py-24 px-6 bg-[#FAF8F5] border-t border-[#B8860B]/20">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <p className="font-mono text-xs text-[#B8860B] uppercase tracking-widest mb-2 font-bold">
            <span>03</span> · Labors · Wave 01
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-[#0F172A]">
            Four active chronicles in the archive.
          </h2>
          <p className="text-xs font-mono text-[#475569] mt-2">
            Wave 01 released · More labors added regularly
          </p>
        </header>

        {/* Hyperlane Program Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#B8860B]/20 rounded-xl p-6 hover:border-[#B8860B]/60 transition-all duration-300 flex flex-col justify-between group shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_10px_30px_rgba(184,134,11,0.1)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#B8860B] tracking-wider">
                    {card.time}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#F1ECE4] border border-[#B8860B]/20 text-[10px] font-mono text-[#B8860B] font-semibold uppercase">
                    {card.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold uppercase text-[#0F172A] group-hover:text-[#B8860B] transition-colors mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-[#475569] font-normal leading-relaxed mb-6">
                  {card.sub}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-mono text-[#64748B]">
                <span>{card.name}</span>
                <a
                  href={card.link}
                  className="text-[#B8860B] hover:text-[#D4AF37] transition-colors font-bold"
                >
                  Inspect →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
