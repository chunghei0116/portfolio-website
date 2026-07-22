import React from 'react';

export default function HyperlaneFormat() {
  const scheduleRows = [
    {
      time: '07:00 AM',
      label: 'Dawn Shader Study',
      note: 'GLSL vertex manipulation, raymarching experiments & mathematical curves',
    },
    {
      time: '10:00 AM',
      label: 'Systems Architecture',
      note: 'TypeScript domain boundaries, Next.js server actions & state management',
    },
    {
      time: '02:00 PM',
      label: 'WebGL Performance Lab',
      note: 'Draw call reduction, instance geometry optimization & 60fps mobile profiling',
    },
    {
      time: '08:00 PM',
      label: 'Late-Night Shipping',
      note: 'Crafting interactive portfolio experiences & releasing open-source modules',
    },
    {
      time: '01:00 AM',
      label: 'Starlight Oracle',
      note: 'Deploying edge updates to global nodes under Mount Olympus sunlit sky',
    },
  ];

  return (
    <section id="routine" className="py-24 px-6 bg-[#FAF8F5] border-t border-[#B8860B]/20">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <header className="mb-12">
          <p className="font-mono text-xs text-[#B8860B] uppercase tracking-widest mb-2 font-bold">
            <span>01</span> · Craft Routine
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-[#0F172A]">
            A single day, end to end.
          </h2>
        </header>

        {/* Spec Sheet Table */}
        <ol className="divide-y divide-slate-200 border-t border-b border-slate-200 mb-12">
          {scheduleRows.map((row, idx) => (
            <li
              key={idx}
              className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline hover:bg-[#F1ECE4]/50 px-3 transition-colors rounded-lg"
            >
              <span className="sm:col-span-3 font-mono text-xs font-bold text-[#B8860B] tracking-wider">
                {row.time}
              </span>
              <span className="sm:col-span-4 text-sm font-bold uppercase text-[#0F172A] tracking-wide">
                {row.label}
              </span>
              <span className="sm:col-span-5 text-xs text-[#475569] font-normal leading-relaxed">
                {row.note}
              </span>
            </li>
          ))}
        </ol>

        {/* CTA Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-[#FFFFFF] border border-[#B8860B]/20 rounded-xl shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wide">
              Seeking an Architect for your next release?
            </h3>
            <p className="text-xs text-[#475569] font-mono mt-1">
              Currently accepting select creative technology commissions for 2026.
            </p>
          </div>
          <a
            href="#oracle"
            className="px-5 py-2.5 rounded font-mono text-xs font-bold text-[#FAF8F5] bg-[#B8860B] hover:bg-[#D4AF37] transition-all shadow-[0_4px_15px_rgba(184,134,11,0.2)]"
          >
            Dispatch Proposal →
          </a>
        </div>
      </div>
    </section>
  );
}
