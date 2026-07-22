'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, Code2, Globe, Share2, Clock } from 'lucide-react';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState<string>('');

  const email = 'jones.dev@example.com';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false }) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-28 px-4 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="double-bezel-outer"
      >
        <div className="double-bezel-inner p-8 md:p-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#00f0ff] uppercase tracking-widest mb-6">
            <Mail className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>[ INITIATE COLLABORATION ]</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            LET’S BUILD SOMETHING EXTRAORDINARY
          </h2>
          <p className="text-slate-400 font-mono text-sm max-w-xl mb-8">
            Open for senior/lead engineering roles, high-end WebGL graphics contracts, and architectural consulting.
          </p>

          {/* Email Copy Box */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-3 rounded-full px-6 py-3 bg-white/10 border border-white/20 hover:border-[#00f0ff] text-white font-mono text-xs md:text-sm transition-all"
            >
              <span>{email}</span>
              {copied ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4 text-[#00f0ff]" />}
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
              <Code2 className="w-4 h-4" /> GITHUB
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
              <Globe className="w-4 h-4" /> LINKEDIN
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
              <Share2 className="w-4 h-4" /> TWITTER
            </a>
          </div>
        </div>
      </motion.div>

      {/* Footer info */}
      <div className="mt-12 flex flex-wrap items-center justify-between text-xs font-mono text-slate-500 gap-4">
        <span>© {new Date().getFullYear()} JONES.DEV — ALL RIGHTS RESERVED</span>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span>SYS_TIME: {time || '00:00:00 UTC'}</span>
        </div>
      </div>
    </section>
  );
}
