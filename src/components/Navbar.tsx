'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '01 · Virtues', href: '#virtues' },
    { name: '02 · Routine', href: '#routine' },
    { name: '03 · Labors', href: '#labors' },
    { name: '04 · Armory', href: '#armory' },
    { name: '05 · Oracle', href: '#oracle' },
    { name: '06 · FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-300 ${
        scrolled
          ? 'bg-[#09090D]/90 backdrop-blur-xl border border-[#C59B27]/30 py-2.5 px-4 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.8)]'
          : 'bg-[#121218]/70 backdrop-blur-md border border-white/10 py-3 px-5 rounded-full'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Brand Emblem */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-mono text-xs tracking-wider uppercase text-white hover:text-[#C59B27] transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#C59B27] animate-pulse" />
          <span className="font-bold text-white group-hover:text-[#F3E5AB]">
            OLYMPUS<span className="text-[#C59B27] font-normal">/26</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono text-[#94A3B8] hover:text-[#F3E5AB] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#oracle"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-xs font-semibold text-[#09090D] bg-[#C59B27] hover:bg-[#F3E5AB] transition-all duration-200 shadow-[0_0_12px_rgba(197,155,39,0.3)] hover:scale-105"
          >
            <span>Summon</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-1.5 rounded-full hover:bg-white/10 border border-white/10"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-4 border-t border-white/10 flex flex-col gap-2.5 bg-[#09090D]/95 p-4 rounded-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-xs font-mono text-[#F8FAFC] hover:bg-[#1A2B4C]/50 hover:text-[#C59B27]"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#oracle"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center py-2.5 rounded-full font-mono text-xs font-bold text-[#09090D] bg-[#C59B27]"
          >
            Summon Architect →
          </a>
        </div>
      )}
    </header>
  );
}
