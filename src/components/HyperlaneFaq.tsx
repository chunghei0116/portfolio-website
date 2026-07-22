import React from 'react';

export default function HyperlaneFaq() {
  const faqs = [
    {
      q: 'What is the Golden Starfield of Olympus?',
      a: 'It is a custom 3D WebGL particle scene built with Three.js and @react-three/fiber. It renders 3,500+ glowing sunlit particles with smooth camera parallax physics while maintaining a solid 60fps performance across desktop and mobile devices.',
    },
    {
      q: 'What technologies are used in this portfolio?',
      a: 'Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Three.js, @react-three/fiber, @react-three/drei, and Framer Motion.',
    },
    {
      q: 'Are you available for freelance or full-time commissions?',
      a: 'Yes. I take on select high-impact projects involving 3D WebGL experiences, creative technology, and frontend systems architecture.',
    },
    {
      q: 'How do you optimize 3D Canvas scenes for performance?',
      a: 'We use single draw-call buffer geometries with useMemo, limit particle density dynamically on mobile screens, and cap Device Pixel Ratio (dpr) at 2 to preserve frame rate.',
    },
  ];

  return (
    <section id="faq" className="py-24 px-6 bg-[#F1ECE4] border-t border-[#B8860B]/20">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <p className="font-mono text-xs text-[#B8860B] uppercase tracking-widest mb-2 font-bold">
            <span>06</span> · Questions
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-[#0F172A]">
            A few honest answers.
          </h2>
        </header>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-[#FFFFFF] border border-[#B8860B]/20 rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer hover:border-[#B8860B]/50 transition-colors shadow-[0_2px_10px_rgba(15,23,42,0.02)]"
            >
              <summary className="flex items-center justify-between font-bold text-sm sm:text-base text-[#0F172A] group-open:text-[#B8860B]">
                <span>{faq.q}</span>
                <span className="font-mono text-lg text-[#B8860B] group-open:rotate-45 transition-transform ml-4">
                  +
                </span>
              </summary>
              <div className="mt-3 text-xs sm:text-sm text-[#475569] font-normal leading-relaxed pt-3 border-t border-slate-100">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
