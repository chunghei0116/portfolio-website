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
      note: 'Deploying edge updates to global nodes under Mount Olympus night sky',
    },
  ];

  return (
    <section id="routine" className="py-24 px-6 bg-[#09090D] border-t border-[#C59B27]/15">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <header className="mb-12">
          <p className="font-mono text-xs text-[#C59B27] uppercase tracking-widest mb-2">
            <span className="font-bold">01</span> · Craft Routine
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-white">
            A single day, end to end.
          </h2>
        </header>

        {/* Spec Sheet Table */}
        <ol className="divide-y divide-white/10 border-t border-b border-white/10 mb-12">
          {scheduleRows.map((row, idx) => (
            <li
              key={idx}
              className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline hover:bg-white/[0.02] px-3 transition-colors rounded-lg"
            >
              <span className="sm:col-span-3 font-mono text-xs font-bold text-[#C59B27] tracking-wider">
                {row.time}
              </span>
              <span className="sm:col-span-4 text-sm font-bold uppercase text-white tracking-wide">
                {row.label}
              </span>
              <span className="sm:col-span-5 text-xs text-[#94A3B8] font-light leading-relaxed">
                {row.note}
              </span>
            </li>
          ))}
        </ol>

        {/* CTA Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-[#121218] border border-white/10 rounded-xl">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              Seeking an Architect for your next release?
            </h3>
            <p className="text-xs text-[#94A3B8] font-mono mt-1">
              Currently accepting select creative technology commissions for 2026.
            </p>
          </div>
          <a
            href="#oracle"
            className="px-5 py-2.5 rounded font-mono text-xs font-bold text-[#09090D] bg-[#C59B27] hover:bg-[#F3E5AB] transition-all"
          >
            Dispatch Proposal →
          </a>
        </div>
      </div>
    </section>
  );
}
