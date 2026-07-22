'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Mail } from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export default function OracleSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="oracle" className="relative py-24 px-6 bg-[#0B0C12] border-t border-[#C59B27]/15">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C59B27]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C59B27]/30 bg-[#1A2B4C]/30 text-[#C59B27] text-xs font-mono tracking-widest uppercase mb-4">
            The Oracle of Delphi
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-white">
            SUMMON THE ARCHITECT
          </h2>
          <p className="mt-4 text-[#94A3B8] text-sm sm:text-base font-light">
            Seek counsel, propose a collaboration, or discuss your next epic digital creation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 bg-[#121218] border border-white/10 rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="md:col-span-2 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
            <div>
              <h3 className="text-lg font-bold uppercase text-white mb-2">Direct Decrees</h3>
              <p className="text-xs text-[#94A3B8] font-light leading-relaxed mb-6">
                Prefer direct communication? Reach out via email or connect across the digital ether.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:jones.tse@example.com"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#1A2B4C]/40 border border-white/5 hover:border-[#C59B27]/40 text-xs font-mono text-[#F8FAFC] transition-all group"
                >
                  <div className="w-8 h-8 rounded bg-[#1A2B4C] border border-[#C59B27]/30 flex items-center justify-center text-[#C59B27] group-hover:border-[#C59B27]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>jones.tse@example.com</span>
                </a>

                <a
                  href="https://github.com/chunghei0116"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#1A2B4C]/40 border border-white/5 hover:border-[#C59B27]/40 text-xs font-mono text-[#F8FAFC] transition-all group"
                >
                  <div className="w-8 h-8 rounded bg-[#1A2B4C] border border-[#C59B27]/30 flex items-center justify-center text-[#C59B27] group-hover:border-[#C59B27]">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <span>github.com/chunghei0116</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#1A2B4C]/40 border border-white/5 hover:border-[#C59B27]/40 text-xs font-mono text-[#F8FAFC] transition-all group"
                >
                  <div className="w-8 h-8 rounded bg-[#1A2B4C] border border-[#C59B27]/30 flex items-center justify-center text-[#C59B27] group-hover:border-[#C59B27]">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-[11px] font-mono text-[#64748B]">
              STATUS: ORACLE ONLINE · 24H RESPONSE TIME
            </div>
          </div>

          <div className="md:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#1A2B4C]/20 border border-[#C59B27]/40 rounded-xl">
                <CheckCircle2 className="w-12 h-12 text-[#C59B27] mb-4 animate-bounce" />
                <h3 className="text-xl font-bold uppercase text-white mb-2">Decree Received</h3>
                <p className="text-xs text-[#94A3B8] font-light max-w-sm">
                  Thy proposition has been logged in the temple scroll. Expect a dispatch shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-4 py-2 rounded bg-white/5 border border-white/10 text-xs font-mono text-[#C59B27] hover:bg-white/10 transition-all"
                >
                  Send Another Decree
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2">
                    THY NAME OR HOUSE
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Odysseus of Ithaca"
                    className="w-full px-4 py-3 rounded-lg bg-[#09090D] border border-white/10 text-sm text-white focus:outline-none focus:border-[#C59B27] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2">
                    COURIER ADDRESS (EMAIL)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. odysseus@ithaca.gr"
                    className="w-full px-4 py-3 rounded-lg bg-[#09090D] border border-white/10 text-sm text-white focus:outline-none focus:border-[#C59B27] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2">
                    THY DECREE OR PROPOSITION
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your vision or inquiry..."
                    className="w-full px-4 py-3 rounded-lg bg-[#09090D] border border-white/10 text-sm text-white focus:outline-none focus:border-[#C59B27] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-lg font-mono text-xs font-bold tracking-widest uppercase bg-[#C59B27] text-[#09090D] hover:bg-[#F3E5AB] transition-all duration-300 shadow-[0_0_20px_rgba(197,155,39,0.3)] flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {loading ? (
                    'DISPATCHING...'
                  ) : (
                    <>
                      DISPATCH DECREE <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
