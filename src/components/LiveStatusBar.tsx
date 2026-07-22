'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Copy, Check, Terminal, Globe } from 'lucide-react';

export default function LiveStatusBar() {
  const [timeString, setTimeString] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Hong_Kong',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeString(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('jones.tse@example.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative z-20 -mt-6 max-w-5xl mx-auto px-6 mb-16">
      <div className="p-4 sm:p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
        {/* Left: Time & Location */}
        <div className="flex items-center gap-3 text-zinc-300">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Location &amp; Local Time</div>
            <div className="flex items-center gap-2 font-semibold text-white">
              <span>Hong Kong (UTC+8)</span>
              <span className="text-emerald-400 font-bold">{timeString || '17:21:04'}</span>
            </div>
          </div>
        </div>

        {/* Center: Tech Stack Ticker */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 text-[11px]">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>WebGL • React 19 • Next.js 16 • Three.js • Framer Motion</span>
        </div>

        {/* Right: Quick Copy Email */}
        <button
          type="button"
          onClick={handleCopyEmail}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 font-semibold transition-all transform active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Email Copied! 🚀</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>jones.tse@example.com</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
