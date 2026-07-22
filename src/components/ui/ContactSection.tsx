'use client';

import React, { useState } from 'react';
import { Send, Mail, CheckCircle, Sparkles, MapPin, Globe, Share2 } from 'lucide-react';
import { audioEngine } from '@/utils/audio';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playGlitch();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 relative bg-[#09090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Big Typography & Contact Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/20">
              <Send className="w-3.5 h-3.5" />
              <span>INITIATE CONTACT</span>
            </div>

            <h2 
              onMouseEnter={() => audioEngine.playGlitch()}
              className="font-display text-5xl sm:text-7xl font-extrabold tracking-tighter uppercase text-white glitch-text cursor-default"
              data-text="LET'S BUILD TOGETHER"
            >
              LET'S BUILD TOGETHER
            </h2>

            <p className="text-slate-300 text-base leading-relaxed font-light">
              Available for full-time senior architecture roles, high-end 3D WebGL contracts, 
              and technical consultations. Let's create something extraordinary.
            </p>

            {/* Coordinates & Status */}
            <div className="space-y-3 pt-4 border-t border-white/10 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-4 h-4 text-[#00f0ff]" />
                <span>LOCATION: Hong Kong (22°N 114°E) // Global Remote</span>
              </div>
              <div className="flex items-center gap-2 text-[#00f0ff]">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                <span>RESPONSE TIME: &lt; 24 Hours</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioEngine.playClick(600, 0.03)}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all"
                title="GitHub"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioEngine.playClick(700, 0.03)}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:border-[#a855f7] hover:text-[#a855f7] transition-all"
                title="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="mailto:contact@example.com"
                onClick={() => audioEngine.playClick(800, 0.03)}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:border-[#2dd4bf] hover:text-[#2dd4bf] transition-all flex items-center gap-2 font-mono text-xs"
              >
                <Mail className="w-5 h-5" />
                <span>DIRECT EMAIL</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6">
            <form 
              onSubmit={handleSubmit}
              className="soft-card p-8 border border-white/10 bg-[#0e0e15]/90 space-y-6"
            >
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase">// YOUR NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Satoshi Nakamoto"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#060609] border border-white/10 text-white placeholder-slate-600 text-sm font-sans focus:outline-none focus:border-[#00f0ff] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase">// EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#060609] border border-white/10 text-white placeholder-slate-600 text-sm font-sans focus:outline-none focus:border-[#00f0ff] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase">// PROJECT DETAILS / INQUIRY</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your vision, tech stack, or roadmap..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#060609] border border-white/10 text-white placeholder-slate-600 text-sm font-sans focus:outline-none focus:border-[#00f0ff] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#00f0ff] text-black font-mono font-extrabold text-sm uppercase tracking-wider hover:bg-white hover:shadow-xl hover:shadow-[#00f0ff]/30 transition-all flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>MESSAGE TRANSMITTED!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Marquee Footer */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <div>© 2026 ANTIGRAVITY 3D SHADER ENGINE. ALL RIGHTS RESERVED.</div>
          <div>POWERED BY NEXT.JS 16 & THREE.JS R3F</div>
        </div>

      </div>
    </section>
  );
}
