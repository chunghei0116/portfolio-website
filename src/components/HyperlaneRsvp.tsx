'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

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
    <section id="oracle" className="py-24 px-6 bg-[#0B0C12] border-t border-[#C59B27]/15">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#121218] border border-white/10 rounded-2xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <p className="font-mono text-xs text-[#C59B27] uppercase tracking-widest mb-2">
            <span className="font-bold">05</span> · Oracle & Contact
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-white mb-4">
            Summon the Architect.
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-light max-w-xl mb-8 leading-relaxed">
            Enter your courier email to request a consultation, propose an epic 3D web app commission, or receive technical updates.
          </p>

          {submitted ? (
            <div className="p-6 bg-[#1A2B4C]/40 border border-[#C59B27]/40 rounded-xl flex items-center gap-4 text-white font-mono text-xs">
              <CheckCircle2 className="w-6 h-6 text-[#C59B27] flex-shrink-0" />
              <div>
                <span className="font-bold block text-sm mb-0.5">Decree Dispatched to Oracle!</span>
                <span className="text-[#94A3B8]">Expect a response within 24 hours to <code className="text-[#C59B27]">{email}</code>.</span>
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
                  className="flex-1 px-5 py-3.5 rounded-lg bg-[#09090D] border border-white/10 text-sm text-white focus:outline-none focus:border-[#C59B27] transition-colors font-mono"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase bg-[#C59B27] text-[#09090D] hover:bg-[#F3E5AB] transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(197,155,39,0.3)] hover:scale-105"
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
