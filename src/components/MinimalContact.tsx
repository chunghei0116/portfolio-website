'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function MinimalContact() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="summon" className="py-20 px-6 bg-[#FAF8F5] border-t border-[#B8860B]/20">
      <div className="max-w-2xl mx-auto text-center">
        <span className="font-mono text-xs text-[#B8860B] font-bold tracking-widest uppercase">
          Initiate Contact
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#0F172A] mt-1 mb-3">
          Summon The Architect
        </h2>
        <p className="text-xs sm:text-sm text-[#475569] font-normal leading-relaxed mb-8">
          Available for select 3D WebGL commissions and creative technology inquiries.
        </p>

        {submitted ? (
          <div className="p-4 bg-[#F1ECE4] border border-[#B8860B]/40 rounded-xl flex items-center justify-center gap-3 text-[#0F172A] font-mono text-xs max-w-md mx-auto">
            <CheckCircle2 className="w-5 h-5 text-[#B8860B]" />
            <span>Decree logged! We will reach out to <strong className="text-[#B8860B]">{email}</strong>.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.work"
              className="flex-1 px-4 py-3 rounded-full bg-[#FFFFFF] border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#B8860B] font-mono shadow-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full font-mono text-xs font-bold uppercase bg-[#B8860B] text-[#FAF8F5] hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(184,134,11,0.2)] shrink-0"
            >
              <span>Dispatch</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="mt-8 font-mono text-[11px] text-[#64748B] flex items-center justify-center gap-6">
          <a href="mailto:jones.tse@example.com" className="hover:text-[#B8860B]">
            jones.tse@example.com
          </a>
          <span>·</span>
          <a href="https://github.com/chunghei0116" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8860B]">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
