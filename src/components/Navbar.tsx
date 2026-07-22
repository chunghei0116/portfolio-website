'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, Shield, Terminal, Mail, Menu, X } from 'lucide-react';

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
    { name: 'Pillars', href: '#pantheon', icon: Shield },
    { name: 'Odyssey', href: '#odyssey', icon: Compass },
    { name: 'Armory', href: '#armory', icon: Terminal },
    { name: 'Oracle', href: '#oracle', icon: Mail },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#09090D]/85 backdrop-blur-xl border-b border-[#C59B27]/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Emblem */}
        <a
          href="#"
          className="group flex items-center gap-3 text-lg font-bold tracking-widest uppercase text-white hover:text-[#C59B27] transition-colors"
        >
          <div className="w-8 h-8 rounded-sm bg-[#1A2B4C] border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27] group-hover:border-[#C59B27] group-hover:shadow-[0_0_15px_rgba(197,155,39,0.4)] transition-all">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-mono text-sm tracking-wider text-[#F8FAFC]">
            OLYMPUS<span className="text-[#C59B27]">.DEV</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#121218]/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-[#94A3B8] hover:text-white hover:bg-[#1A2B4C]/60 hover:border hover:border-[#C59B27]/30 transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5 text-[#C59B27]" />
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#oracle"
            className="px-4 py-2 rounded font-mono text-xs font-semibold tracking-wider text-[#09090D] bg-[#C59B27] hover:bg-[#F3E5AB] transition-all duration-300 shadow-[0_0_15px_rgba(197,155,39,0.3)] hover:scale-105"
          >
            SUMMON ARCHITECT
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 rounded-md hover:bg-white/5 border border-white/10"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09090D]/95 backdrop-blur-2xl border-b border-[#C59B27]/20 px-6 py-6 transition-all">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-mono text-[#F8FAFC] bg-[#121218] border border-white/5 hover:border-[#C59B27]/40"
                >
                  <Icon className="w-4 h-4 text-[#C59B27]" />
                  {link.name}
                </a>
              );
            })}
            <a
              href="#oracle"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-3 rounded font-mono text-xs font-bold text-[#09090D] bg-[#C59B27]"
            >
              SUMMON ARCHITECT
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
