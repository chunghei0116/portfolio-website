import React from 'react';

export default function MinimalStack() {
  const stack = [
    {
      domain: 'Creative 3D',
      items: ['Three.js', '@react-three/fiber', '@react-three/drei', 'GLSL Shaders', 'WebGPU'],
    },
    {
      domain: 'Systems Core',
      items: ['Next.js (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion'],
    },
    {
      domain: 'Infra & Tools',
      items: ['Vercel Edge', 'Git / GitHub', 'Node.js', 'ESLint', 'Performance Profiling'],
    },
  ];

  return (
    <section id="stack" className="py-20 px-6 bg-[#F1ECE4] border-t border-[#B8860B]/20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <span className="font-mono text-xs text-[#B8860B] font-bold tracking-widest uppercase">
            Technical Stack
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#0F172A] mt-1">
            The Armory
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stack.map((group) => (
            <div
              key={group.domain}
              className="p-6 bg-[#FFFFFF] border border-[#B8860B]/20 rounded-2xl shadow-sm"
            >
              <h3 className="font-mono text-xs font-bold text-[#B8860B] uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                {group.domain}
              </h3>
              <ul className="space-y-2 font-mono text-xs text-[#0F172A]">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#B8860B]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
