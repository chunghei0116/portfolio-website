import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function MinimalLabors() {
  const labors = [
    {
      id: '01',
      title: 'The Golden Starfield of Olympus',
      category: '3D WebGL / R3F Canvas',
      desc: 'Interactive 3D particle canvas rendering 3500+ glowing particles, custom marble materials, low-poly Greek geometry, and pointer parallax physics at 60fps.',
      link: '#top',
    },
    {
      id: '02',
      title: 'Retro Flip Clock Engine',
      category: 'Tactile Interface / Framer Motion',
      desc: 'Physics-driven flip clock interface with custom dark/marble themes and millisecond time synchronization.',
      link: 'https://github.com/chunghei0116/portfolio-website',
    },
    {
      id: '03',
      title: 'Aegis Security Telemetry Mesh',
      category: 'Systems / Edge Infrastructure',
      desc: 'Real-time telemetry dashboard monitoring distributed edge services with low-latency Canvas shader feeds.',
      link: 'https://github.com/chunghei0116/portfolio-website',
    },
  ];

  return (
    <section id="labors" className="py-20 px-6 bg-[#FAF8F5] border-t border-[#B8860B]/20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-xs text-[#B8860B] font-bold tracking-widest uppercase">
            Selected Works
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#0F172A] mt-1">
            Featured Labors
          </h2>
        </div>

        <div className="space-y-6">
          {labors.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-[#FFFFFF] border border-[#B8860B]/20 rounded-2xl hover:border-[#B8860B]/60 transition-all duration-300 shadow-[0_2px_15px_rgba(15,23,42,0.03)] group flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs font-bold text-[#B8860B]">{item.id}</span>
                  <span className="text-[11px] font-mono text-[#64748B]">{item.category}</span>
                </div>
                <h3 className="text-lg font-bold uppercase text-[#0F172A] group-hover:text-[#B8860B] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#475569] font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <a
                href={item.link}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-bold text-[#B8860B] bg-[#F1ECE4] hover:bg-[#B8860B] hover:text-[#FAF8F5] transition-all self-start sm:self-center shrink-0"
              >
                <span>Inspect</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
