'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Works', href: '#works' },
    { name: 'Playground', href: '#playground' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <div
        className={`px-5 py-3 rounded-full transition-all duration-300 flex items-center justify-between border ${
          scrolled
            ? 'bg-[#09090b]/80 backdrop-blur-xl border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-[#09090b]/50 backdrop-blur-md border-white/10'
        }`}
      >
        {/* Brand */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-mono text-xs font-semibold tracking-wider text-white hover:text-emerald-400 transition-colors"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-bold tracking-tight text-sm">JONES TSE</span>
          <span className="hidden sm:inline-block text-zinc-500 font-mono text-[11px]">/ ARCHITECT</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-emerald-400 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-all transform hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
            <span>Get in Touch</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-2xl bg-[#09090b]/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-3 font-medium text-sm text-zinc-200 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-white/10 hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-1 w-full text-center px-4 py-2.5 rounded-xl font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-all"
          >
            Get in Touch
          </a>
        </div>
      )}
    </header>
  );
}
