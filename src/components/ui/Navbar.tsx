'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function Code2Icon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}

function Volume2Icon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function VolumeXIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="22" x2="16" y1="9" y2="15" />
      <line x1="16" x2="22" y1="9" y2="15" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function Navbar() {
  const [muted, setMuted] = useState(true);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 pointer-events-auto">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between rounded-full px-5 py-2.5 bg-[#0a0a10]/70 backdrop-blur-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        {/* Brand / Status Indicator */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00f0ff]"></span>
          </div>
          <div className="flex flex-col text-xs font-mono">
            <span className="font-semibold tracking-wider text-white group-hover:text-[#00f0ff] transition-colors">
              JONES.DEV
            </span>
            <span className="text-[10px] text-slate-400">AVAILABLE FOR ROLES</span>
          </div>
        </a>

        {/* Navigation Anchors */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider text-slate-300">
          <a href="#projects" className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
            <BriefcaseIcon className="w-3.5 h-3.5 text-[#00f0ff]" /> WORK
          </a>
          <a href="#skills" className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
            <Code2Icon className="w-3.5 h-3.5 text-[#a855f7]" /> STACK
          </a>
          <a href="#experience" className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
            <SparklesIcon className="w-3.5 h-3.5 text-[#10b981]" /> EXPERIENCE
          </a>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMuted(!muted)}
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#00f0ff]/50 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={muted ? 'Enable Ambient WebGL Audio' : 'Mute Sound'}
            aria-label={muted ? 'Enable Ambient WebGL Audio' : 'Mute Sound'}
          >
            {muted ? <VolumeXIcon className="w-3.5 h-3.5" /> : <Volume2Icon className="w-3.5 h-3.5 text-[#00f0ff]" />}
          </button>

          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono font-medium text-white bg-white/10 border border-white/15 hover:bg-[#00f0ff] hover:text-black transition-all duration-300"
          >
            <span>CONTACT</span>
            <MailIcon className="w-3.5 h-3.5 text-[#00f0ff] group-hover:text-black transition-colors" />
          </a>
        </div>
      </motion.nav>
    </header>
  );
}
