'use client';

import React from 'react';
import { Compass, Scroll, ArrowUp } from 'lucide-react';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { name: 'GitHub', icon: GithubIcon, href: 'https://github.com', label: 'GitHub Spirit Code' },
    { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn Connection' },
    { name: 'Twitter', icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter Whispers' },
    { name: 'Spell Scroll', icon: Scroll, href: '#', label: 'RSS Spell Scroll' },
  ];

  return (
    <footer className="relative bg-[#1C2833] text-amber-100/80 pt-12 pb-16 px-6 border-t border-[#D4AF37]/30 overflow-hidden font-serif">
      {/* Subtle warm glow background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #D4AF37 0%, transparent 70%)'
        }}
      />

      <div className="relative max-w-6xl mx-auto flex flex-col items-center gap-8 text-center">
        {/* Brass Compass Rose Motif & Title */}
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 rounded-full bg-[#162029] border border-[#D4AF37]/40 shadow-lg shadow-[#D4AF37]/10 group transition-transform hover:scale-105">
            <Compass className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-wide text-[#F3E5AB]">
            The Wandering Workshop | Built with Magic &amp; Code
          </h3>
        </div>

        {/* Social Spirit Links */}
        <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : '_self'}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={item.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#162029]/80 border border-[#D4AF37]/20 text-amber-100/75 hover:text-[#D4AF37] hover:border-[#D4AF37]/60 hover:-translate-y-1 transition-all duration-300 shadow-sm text-sm"
              >
                <Icon className="w-4 h-4 text-[#D4AF37]" />
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>

        {/* Copyright Notice */}
        <p className="text-xs text-amber-200/60 max-w-md leading-relaxed font-sans">
          © 2026 Wandering Workshop. Inspired by Hayao Miyazaki &amp; Studio Ghibli aesthetics.
        </p>

        {/* Interactive Back to Top Button */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#162029] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1C2833] hover:border-[#D4AF37] transition-all duration-300 shadow-md font-sans text-xs uppercase tracking-widest font-semibold"
        >
          <Compass className="w-4 h-4 transition-transform group-hover:rotate-45" strokeWidth={1.75} />
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>
    </footer>
  );
}


