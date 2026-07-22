import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#09090D] border-t border-[#C59B27]/20 py-16 px-6 text-[#94A3B8]">
      <div className="max-w-5xl mx-auto">
        {/* Ft5 Statement Line */}
        <p className="text-xl sm:text-3xl font-serif italic text-white mb-8 max-w-3xl leading-snug">
          <em>Built late. Shipped live.</em> One realm for the engineers who'd be coding tonight anyway.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-white/10 gap-4 font-mono text-xs">
          <p className="text-[#C59B27] font-semibold">
            OLYMPUS / 26 · MOUNT OLYMPUS · 39.85° N, 22.35° E
          </p>

          <ul className="flex flex-wrap items-center gap-6 text-[#94A3B8]">
            <li>
              <a href="#top" className="hover:text-white transition-colors">
                Top ↑
              </a>
            </li>
            <li>
              <a href="#labors" className="hover:text-white transition-colors">
                Labors
              </a>
            </li>
            <li>
              <a href="#oracle" className="hover:text-white transition-colors">
                Oracle
              </a>
            </li>
            <li>
              <a href="mailto:jones.tse@example.com" className="hover:text-white transition-colors">
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
