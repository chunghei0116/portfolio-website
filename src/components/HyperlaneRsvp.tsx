'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function HyperlaneRsvp() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="oracle" className="py-24 px-6 bg-[#FAF8F5] border-t border-[#B8860B]/20">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#FFFFFF] border border-[#B8860B]/20 rounded-2xl p-8 sm:p-12 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
          <p className="font-mono text-xs text-[#B8860B] uppercase tracking-widest mb-2 font-bold">
            <span>05</span> · Oracle & Contact
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-[#0F172A] mb-4">
            Summon the Architect.
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] font-normal max-w-xl mb-8 leading-relaxed">
            Enter your courier email to request a consultation, propose an epic 3D web app commission, or receive technical updates.
          </p>

          {submitted ? (
            <div className="p-6 bg-[#F1ECE4] border border-[#B8860B]/40 rounded-xl flex items-center gap-4 text-[#0F172A] font-mono text-xs">
              <CheckCircle2 className="w-6 h-6 text-[#B8860B] flex-shrink-0" />
              <div>
                <span className="font-bold block text-sm mb-0.5 text-[#0F172A]">Decree Dispatched to Oracle!</span>
                <span className="text-[#475569]">Expect a response within 24 hours to <code className="text-[#B8860B] font-bold">{email}</code>.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@studio.work"
                  className="flex-1 px-5 py-3.5 rounded-lg bg-[#FAF8F5] border border-slate-200 text-sm text-[#0F172A] focus:outline-none focus:border-[#B8860B] transition-colors font-mono"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase bg-[#B8860B] text-[#FAF8F5] hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(184,134,11,0.25)] hover:scale-105"
                >
                  {loading ? 'Dispatching...' : 'Dispatch Decree →'}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#64748B] pt-2">
                <span>Oracle Response Time: ~24 Hours</span>
                <span>Direct Email: jones.tse@example.com</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
