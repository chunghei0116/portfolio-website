'use client';

import React, { useState } from 'react';

export default function OdysseyRegistrySection() {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-28 px-6 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <span className="font-cinzel text-xs text-[#D4AF37] tracking-[0.35em] uppercase mb-2">
          IV. CONTACT
        </span>
        <h2 className="font-cinzel text-4xl sm:text-5xl text-white font-light tracking-wide mb-4">
          THE REGISTRY
        </h2>
        <div className="w-16 h-[1px] bg-[#D4AF37]/50" />
      </div>

      {/* Subtle Glass Panel */}
      <div className="relative rounded-3xl liquid-glass-gold p-8 sm:p-14 border border-[#D4AF37]/30 shadow-2xl overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-3xl rounded-full pointer-events-none" />

        <div className="text-center mb-10">
          <p className="font-cinzel text-lg sm:text-xl text-white/90 font-light mb-2">
            ENTER YOUR DISPATCH IN THE CHRONICLE
          </p>
          <p className="font-montserrat text-[10px] sm:text-xs text-[#D4AF37] tracking-[0.25em] uppercase font-light">
            DIRECT LINE TO CREATIVE DIRECTORY • MMXXVI
          </p>
        </div>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 rounded-full liquid-glass border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center text-2xl mb-4 shadow-[0_0_25px_rgba(212,175,55,0.4)]">
              ✓
            </div>
            <h3 className="font-cinzel text-xl text-white font-light mb-2">
              DISPATCH RECORDED
            </h3>
            <p className="font-montserrat text-xs text-white/60 tracking-[0.2em] uppercase">
              YOUR PRESENCE HAS BEEN INSCRIBED IN THE ODYSSEY ARCHIVE.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-4">
            {/* Single Minimalist Input Line */}
            <div className="relative w-full">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a message..."
                className="w-full bg-transparent border-b border-white/20 focus:border-[#D4AF37] py-4 px-2 font-montserrat text-sm text-white placeholder:text-white/30 tracking-[0.15em] outline-none transition-colors duration-300"
                required
              />
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-500 peer-focus:w-full" />
            </div>

            {/* Glowing Gold Icon Button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-full liquid-glass-gold text-[#D4AF37] hover:text-white font-montserrat text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] shrink-0"
            >
              <span>SEND</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </form>
        )}

        {/* Minimal Footer Info */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[10px] font-montserrat tracking-[0.25em] text-white/40 uppercase gap-4">
          <span>COORDINATES: 37.9715° N, 23.7267° E</span>
          <span className="text-[#D4AF37]/70">ODYSSEY ARCHIVE MMXXVI</span>
        </div>
      </div>
    </section>
  );
}
