'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Terminal, Sparkles, Send } from 'lucide-react';
import { audioEngine } from '@/utils/audio';

export default function Navbar() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) audioEngine.playClick(800, 0.05);
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-4 px-5 py-2.5 rounded-full bg-[#0d0d14]/85 backdrop-blur-2xl border border-white/10 shadow-2xl max-w-5xl w-full transition-all hover:border-white/20">
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={() => audioEngine.playClick(500, 0.03)}
          className="flex items-center gap-2 text-white font-display font-bold text-lg tracking-tight hover:text-[#00f0ff] transition-colors glitch-text"
          data-text="ANTIGRAVITY // 3D"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00f0ff] to-[#a855f7] flex items-center justify-center text-black font-mono font-extrabold text-xs shadow-lg shadow-[#00f0ff]/20">
            3D
          </div>
          <span className="hidden sm:inline font-display text-sm tracking-wider">ANTIGRAVITY</span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300">
          <a
            href="#projects"
            onClick={() => audioEngine.playClick(600, 0.03)}
            className="hover:text-[#00f0ff] transition-colors"
          >
            // PROJECTS
          </a>
          <a
            href="#shaders"
            onClick={() => audioEngine.playClick(700, 0.03)}
            className="hover:text-[#a855f7] transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-[#a855f7]" />
            GLSL LAB
          </a>
          <a
            href="#skills"
            onClick={() => audioEngine.playClick(800, 0.03)}
            className="hover:text-[#2dd4bf] transition-colors"
          >
            // TECH STACK
          </a>
          <a
            href="#experience"
            onClick={() => audioEngine.playClick(900, 0.03)}
            className="hover:text-[#f43f5e] transition-colors"
          >
            // EXPERIENCE
          </a>
        </div>

        {/* Right Actions: Sound FX Toggle & Contact */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-[#00f0ff] hover:border-[#00f0ff]/40 transition-all text-xs flex items-center gap-1.5"
            title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#00f0ff]" />
            )}
            <span className="hidden lg:inline text-[10px] font-mono">
              {isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}
            </span>
          </button>

          <a
            href="#contact"
            onClick={() => audioEngine.playGlitch()}
            className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#00f0ff] text-black hover:bg-white hover:shadow-lg hover:shadow-[#00f0ff]/30 transition-all flex items-center gap-1.5"
          >
            <Send className="w-3 h-3" />
            <span>CONTACT</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
