'use client';

import React, { useEffect, useState } from 'react';

export default function OdysseyNavbar() {
  const [activeSection, setActiveSection] = useState('exhibit');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['exhibit', 'works', 'relic', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'exhibit', label: 'I. EXHIBIT' },
    { id: 'works', label: 'II. WORKS' },
    { id: 'relic', label: 'III. RELIC' },
    { id: 'contact', label: 'IV. CONTACT' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto liquid-glass-pill rounded-full px-6 py-3.5 transition-all duration-500 flex items-center gap-6 sm:gap-10 border border-[#ffffff1a] shadow-2xl ${
          scrolled ? 'scale-95 shadow-[#D4AF37]/10' : 'scale-100'
        }`}
      >
        <span className="font-cinzel text-xs tracking-widest text-[#D4AF37] font-semibold border-r border-[#ffffff1a] pr-4 hidden md:inline-block">
          🏛️ ODYSSEY
        </span>

        <div className="flex items-center gap-4 sm:gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`font-montserrat text-[11px] sm:text-xs tracking-[0.2em] uppercase transition-all duration-300 relative py-1 ${
                  isActive
                    ? 'text-[#D4AF37] font-medium scale-105'
                    : 'text-white/70 hover:text-white hover:tracking-[0.25em]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
