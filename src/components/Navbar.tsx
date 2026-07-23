'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Feather, Sparkles, Scroll, Send, Menu, X } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '#hero', icon: Compass },
  { name: 'About', href: '#about', icon: Feather },
  { name: 'Projects', href: '#projects', icon: Sparkles },
  { name: 'Skills', href: '#skills', icon: Scroll },
  { name: 'Contact', href: '#contact', icon: Send },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('#hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(`#${sectionIds[i]}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveSection(href);
    setMobileMenuOpen(false);

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-5 pb-2 px-4 pointer-events-none flex justify-center">
      <div className="relative w-full max-w-4xl pointer-events-auto">
        {/* Subtle Brass Chain Suspensions */}
        <div className="absolute -top-5 left-10 hidden sm:flex flex-col items-center pointer-events-none z-10">
          <div className="w-1.5 h-3 rounded-full border border-[#D4AF37]/80 bg-[#B8860B]/40 shadow-[0_0_4px_rgba(212,175,55,0.4)]" />
          <div className="w-1.5 h-3 rounded-full border border-[#D4AF37]/80 bg-[#B8860B]/40 -mt-1.5 shadow-[0_0_4px_rgba(212,175,55,0.4)]" />
          <div className="w-2.5 h-1.5 rounded-sm bg-[#D4AF37] shadow-[0_0_6px_#D4AF37] -mt-0.5" />
        </div>
        <div className="absolute -top-5 right-10 hidden sm:flex flex-col items-center pointer-events-none z-10">
          <div className="w-1.5 h-3 rounded-full border border-[#D4AF37]/80 bg-[#B8860B]/40 shadow-[0_0_4px_rgba(212,175,55,0.4)]" />
          <div className="w-1.5 h-3 rounded-full border border-[#D4AF37]/80 bg-[#B8860B]/40 -mt-1.5 shadow-[0_0_4px_rgba(212,175,55,0.4)]" />
          <div className="w-2.5 h-1.5 rounded-sm bg-[#D4AF37] shadow-[0_0_6px_#D4AF37] -mt-0.5" />
        </div>

        {/* Wooden Signpost Navbar Card */}
        <div
          className={`relative px-4 sm:px-6 py-3 bg-[#4A3525]/90 backdrop-blur-md border border-[#D4AF37]/40 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.6),0_0_15px_rgba(212,175,55,0.15)] transition-all duration-300 flex items-center justify-between text-[#FDE1A9] ${
            scrolled ? 'shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.25)] border-[#D4AF37]/60' : ''
          }`}
        >
          {/* Corner Brass Rivets */}
          <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-[#FFE5B4] via-[#D4AF37] to-[#8B6508] shadow-[0_0_4px_rgba(212,175,55,0.6)]" />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-[#FFE5B4] via-[#D4AF37] to-[#8B6508] shadow-[0_0_4px_rgba(212,175,55,0.6)]" />
          <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-[#FFE5B4] via-[#D4AF37] to-[#8B6508] shadow-[0_0_4px_rgba(212,175,55,0.6)]" />
          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-[#FFE5B4] via-[#D4AF37] to-[#8B6508] shadow-[0_0_4px_rgba(212,175,55,0.6)]" />

          {/* Wooden Texture Grain Overlay */}
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#634832]/30 via-transparent to-[#2E1F15]/40 pointer-events-none" />

          {/* Logo / Brand Signpost */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group relative z-10 flex items-center gap-2.5 font-serif font-bold text-sm sm:text-base text-[#FDE1A9] hover:text-[#FFF5D6] transition-colors duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-[#362518] border border-[#D4AF37]/50 flex items-center justify-center shadow-inner group-hover:border-[#D4AF37] group-hover:shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all">
              <Compass className="w-4 h-4 text-[#D4AF37] transition-transform duration-500 group-hover:rotate-45" />
            </div>
            <span className="tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              Ghibli<span className="text-[#D4AF37]">.</span>Nav
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 relative z-10 font-medium text-xs sm:text-sm">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`group relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-[0_0_12px_rgba(212,175,55,0.35)] hover:text-[#FFF5D6] ${
                    isActive
                      ? 'bg-[#362518] border border-[#D4AF37]/60 text-[#FFE5B4] shadow-[0_0_10px_rgba(212,175,55,0.3)] font-semibold'
                      : 'text-[#FDE1A9]/80 hover:bg-[#5A402D]/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-[#D4AF37]/70 group-hover:text-[#D4AF37]'}`} />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative z-10 p-2 rounded-xl bg-[#362518] border border-[#D4AF37]/40 text-[#FDE1A9] hover:text-[#FFF5D6] hover:border-[#D4AF37] transition-all shadow-[0_0_8px_rgba(0,0,0,0.3)]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#D4AF37]" /> : <Menu className="w-5 h-5 text-[#D4AF37]" />}
          </button>
        </div>

        {/* Mobile Menu Wooden Signpost Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden mt-2 p-3 bg-[#4A3525]/95 backdrop-blur-xl border border-[#D4AF37]/50 rounded-2xl shadow-[0_16px_32px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.2)] flex flex-col gap-1.5"
            >
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                      isActive
                        ? 'bg-[#362518] border border-[#D4AF37]/60 text-[#FFE5B4] shadow-[0_0_10px_rgba(212,175,55,0.3)] font-semibold'
                        : 'text-[#FDE1A9] hover:bg-[#5A402D]/60 hover:text-[#FFF5D6]'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#D4AF37]" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
