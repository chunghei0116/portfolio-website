'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
          ? 'bg-[#FAF8F5]/90 backdrop-blur-xl border border-[#B8860B]/30 py-2.5 px-4 rounded-full shadow-[0_10px_30px_rgba(15,23,42,0.08)]'
          : 'bg-[#FFFFFF]/80 backdrop-blur-md border border-[#B8860B]/20 py-3 px-5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Brand Emblem */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-mono text-xs tracking-wider uppercase text-[#0F172A] hover:text-[#B8860B] transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#B8860B] animate-pulse" />
          <span className="font-bold text-[#0F172A] group-hover:text-[#B8860B]">
            OLYMPUS<span className="text-[#B8860B] font-normal">/26</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono text-[#475569] hover:text-[#B8860B] font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#oracle"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-xs font-semibold text-[#FAF8F5] bg-[#B8860B] hover:bg-[#D4AF37] transition-all duration-200 shadow-[0_4px_15px_rgba(184,134,11,0.25)] hover:scale-105"
          >
            <span>Summon</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-[#0F172A] p-1.5 rounded-full hover:bg-black/5 border border-slate-200"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-4 border-t border-[#B8860B]/20 flex flex-col gap-2.5 bg-[#FAF8F5]/98 p-4 rounded-2xl border border-[#B8860B]/30 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-xs font-mono text-[#0F172A] hover:bg-[#F1ECE4] hover:text-[#B8860B]"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#oracle"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center py-2.5 rounded-full font-mono text-xs font-bold text-[#FAF8F5] bg-[#B8860B]"
          >
            Summon Architect →
          </a>
        </div>
      )}
    </header>
  );
}
