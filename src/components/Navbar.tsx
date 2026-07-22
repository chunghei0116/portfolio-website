'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

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
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none">
      <div
        className={`max-w-4xl mx-auto rounded-full px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-500 ease-fluid pointer-events-auto flex items-center justify-between border ${
          scrolled
            ? 'bg-[#050507]/80 backdrop-blur-2xl border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.6)]'
            : 'bg-white/[0.04] backdrop-blur-xl border-white/10'
        }`}
      >
        {/* Brand with Status Dot */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-xs font-mono font-bold tracking-wider text-white hover:text-emerald-400 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="tracking-tight text-sm font-sans font-extrabold text-white">JONES TSE</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-emerald-400 transition-colors duration-300 py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA: Button-in-Button Architecture */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="group hidden sm:inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-all duration-300 transform active:scale-[0.98] shadow-[0_0_20px_rgba(16,185,129,0.25)]"
          >
            <span>Get in Touch</span>
            <div className="w-6 h-6 rounded-full bg-zinc-950/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-950" strokeWidth={2} />
            </div>
          </a>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto max-w-4xl mx-auto mt-3 p-5 rounded-3xl bg-[#050507]/95 backdrop-blur-3xl border border-white/15 shadow-2xl flex flex-col gap-3 font-medium text-sm text-zinc-200 animate-in fade-in duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-2xl hover:bg-white/10 hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 w-full text-center px-4 py-3 rounded-2xl font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-all"
          >
            Get in Touch
          </a>
        </div>
      )}
    </header>
  );
}
