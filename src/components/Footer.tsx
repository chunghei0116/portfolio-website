import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#B8860B]/20 py-16 px-6 text-[#475569]">
      <div className="max-w-5xl mx-auto">
        {/* Ft5 Statement Line */}
        <p className="text-xl sm:text-3xl font-serif italic text-[#0F172A] mb-8 max-w-3xl leading-snug">
          <em>Built under golden sun. Shipped live.</em> One realm for the engineers who'd be coding today anyway.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-slate-200 gap-4 font-mono text-xs">
          <p className="text-[#B8860B] font-semibold">
            OLYMPUS / 26 · MOUNT OLYMPUS · 39.85° N, 22.35° E
          </p>

          <ul className="flex flex-wrap items-center gap-6 text-[#475569]">
            <li>
              <a href="#top" className="hover:text-[#B8860B] transition-colors font-medium">
                Top ↑
              </a>
            </li>
            <li>
              <a href="#labors" className="hover:text-[#B8860B] transition-colors font-medium">
                Labors
              </a>
            </li>
            <li>
              <a href="#oracle" className="hover:text-[#B8860B] transition-colors font-medium">
                Oracle
              </a>
            </li>
            <li>
              <a href="mailto:jones.tse@example.com" className="hover:text-[#B8860B] transition-colors font-medium">
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
