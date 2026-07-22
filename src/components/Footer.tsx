import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F5] border-t border-slate-200 py-8 px-6 text-[#64748B] font-mono text-xs text-center">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} OLYMPUS.DEV · ALL RIGHTS RESERVED</span>
        <span className="text-[#B8860B]">MOUNT OLYMPUS · 39.85° N, 22.35° E</span>
      </div>
    </footer>
  );
}
