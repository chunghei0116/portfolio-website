'use client';

import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, FolderGit2, Globe, Mail, MessageSquare, Share2 } from 'lucide-react';

export default function MinimalContact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const socials = [
    { name: 'GitHub', href: 'https://github.com/chunghei0116', icon: FolderGit2 },
    { name: 'Twitter / X', href: 'https://twitter.com', icon: Share2 },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Globe },
    { name: 'Email', href: 'mailto:jones.tse@example.com', icon: Mail },
  ];

  return (
    <section id="contact" className="py-28 md:py-36 px-6 relative z-10 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-400 font-semibold block mb-3">
              Direct Transmission
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mb-4">
              Let&apos;s Build Together
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed mb-8">
              Have an ambitious 3D WebGL experience, high-performance web product, or technical consultation in mind? Reach out directly.
            </p>
          </div>

          {/* Social Channels */}
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
              Direct Channels
            </div>
            <div className="flex flex-wrap gap-2.5 font-sans text-xs">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-emerald-400/50 hover:bg-white/[0.08] text-zinc-300 hover:text-emerald-400 transition-all font-semibold"
                  >
                    <Icon className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                    <span>{s.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Double Bezel Form Container */}
        <div className="lg:col-span-7 double-bezel">
          <div className="double-bezel-core p-8 sm:p-10">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-extrabold uppercase tracking-tight text-white mb-2">
                  Transmission Received
                </h3>
                <p className="text-xs text-zinc-400 max-w-sm leading-relaxed mb-6">
                  Thank you for reaching out. I will respond to your message within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-full font-sans text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-mono text-zinc-300 font-semibold">
                    Your Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/15 focus:border-emerald-400 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-mono text-zinc-300 font-semibold">
                    Email Address <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/15 focus:border-emerald-400 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-mono text-zinc-300 font-semibold">
                    Message / Project Goals <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, and goals..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/15 focus:border-emerald-400 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors resize-none"
                  />
                </div>

                {/* Button-in-Button CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full inline-flex items-center justify-between pl-6 pr-2 py-3 rounded-full font-semibold text-xs text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.25)] disabled:opacity-50 cursor-pointer"
                >
                  <span>{loading ? 'Transmitting...' : 'Send Message'}</span>
                  <div className="w-7 h-7 rounded-full bg-zinc-950/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-950" strokeWidth={2} />
                  </div>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
