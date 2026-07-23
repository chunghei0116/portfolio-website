'use client';

import React from 'react';

export interface WorkItem {
  id: string;
  code: string;
  title: string;
  subLabel: string;
  year: string;
  category: string;
  image: string;
  medium: string;
  location: string;
}

interface ArtworkModalProps {
  work: WorkItem | null;
  onClose: () => void;
}

export default function ArtworkModal({ work, onClose }: ArtworkModalProps) {
  if (!work) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-5xl rounded-2xl liquid-glass-gold overflow-hidden border border-[#D4AF37]/40 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-white/70 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Artwork Image View */}
        <div className="relative w-full md:w-2/3 h-64 sm:h-80 md:h-auto min-h-[300px] overflow-hidden bg-black">
          <img
            src={work.image}
            alt={work.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          <div className="absolute bottom-4 left-4 font-cinzel text-xs text-[#D4AF37] tracking-[0.25em]">
            EXHIBIT NO. {work.code}
          </div>
        </div>

        {/* Artwork Museum Plaque Content */}
        <div className="w-full md:w-1/3 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#0A0B0D]/80">
          <div>
            <span className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] block mb-2 font-medium">
              {work.category} • {work.year}
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl text-white font-light mb-3">
              {work.title}
            </h2>
            <p className="font-montserrat text-xs tracking-[0.2em] text-white/60 uppercase mb-6 border-b border-white/10 pb-4">
              {work.subLabel}
            </p>

            {/* Museum Technical Specs Plaque */}
            <div className="space-y-4 font-montserrat text-xs tracking-[0.15em] text-white/70">
              <div>
                <span className="text-[#D4AF37] block text-[9px] uppercase tracking-[0.25em]">MEDIUM</span>
                <span className="text-white/90 font-light">{work.medium}</span>
              </div>
              <div>
                <span className="text-[#D4AF37] block text-[9px] uppercase tracking-[0.25em]">ORIGIN</span>
                <span className="text-white/90 font-light">{work.location}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="font-cinzel text-xs text-[#D4AF37] tracking-[0.2em]">
              MMXXVI COLLECTION
            </span>
            <button
              onClick={onClose}
              className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-white/80 hover:text-[#D4AF37] border-b border-transparent hover:border-[#D4AF37] transition-all"
            >
              RETURN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
