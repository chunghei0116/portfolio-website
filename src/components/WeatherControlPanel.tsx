'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  CloudRain,
  Snowflake,
  Zap,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Wind,
  Activity,
  LucideIcon,
} from 'lucide-react';
import { useWeather, WeatherMode } from '@/context/WeatherContext';

const WEATHER_MODES: { id: WeatherMode; label: string; icon: LucideIcon; color: string }[] = [
  { id: 'sunny', label: 'Sunny', icon: Sun, color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' },
  { id: 'rainy', label: 'Rainy', icon: CloudRain, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' },
  { id: 'snowy', label: 'Snowy', icon: Snowflake, color: 'text-sky-300 border-sky-400/40 bg-sky-400/10' },
  { id: 'stormy', label: 'Stormy', icon: Zap, color: 'text-blue-400 border-blue-500/40 bg-blue-500/10' },
  { id: 'cosmic', label: 'Cosmic', icon: Sparkles, color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' },
];

export default function WeatherControlPanel() {
  const { mode, intensity, setMode, setIntensity, triggerLightning } = useWeather();
  const [isExpanded, setIsExpanded] = useState(false);

  const activeModeConfig = WEATHER_MODES.find((m) => m.id === mode) || WEATHER_MODES[1];
  const ActiveIcon = activeModeConfig.icon;

  return (
    <div className="absolute top-20 right-4 sm:right-6 md:top-24 md:right-10 z-40 font-sans max-w-[calc(100vw-2rem)] pointer-events-auto touch-manipulation">
      <motion.div
        layout
        className="backdrop-blur-xl bg-zinc-950/80 border border-white/15 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden transition-colors"
      >
        {/* Collapsed Header / Pill Toggle */}
        <div
          className="flex items-center justify-between gap-3 px-4 py-2.5 cursor-pointer select-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg border ${activeModeConfig.color} animate-pulse`}>
              <ActiveIcon className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono tracking-wider uppercase text-zinc-300 font-semibold">
                {activeModeConfig.label} Mode
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                Wind {intensity.toFixed(1)}x • Tap Canvas
              </span>
            </div>
          </div>

          <button
            type="button"
            aria-label="Toggle Weather Controls"
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Controls Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="px-4 pb-4 pt-2 border-t border-white/10 flex flex-col gap-4"
            >
              {/* Weather Mode Tabs */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2 block">
                  Select Atmosphere
                </label>
                <div className="grid grid-cols-5 gap-1.5 bg-zinc-900/80 p-1 rounded-xl border border-white/5">
                  {WEATHER_MODES.map((item) => {
                    const Icon = item.icon;
                    const isActive = mode === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMode(item.id)}
                        className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs transition-all duration-200 ${
                          isActive
                            ? 'text-white font-medium shadow-md'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeTabBackground"
                            className="absolute inset-0 bg-white/15 border border-white/20 rounded-lg"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        <Icon className={`w-4 h-4 relative z-10 ${isActive ? activeModeConfig.color.split(' ')[0] : ''}`} />
                        <span className="text-[9px] font-mono mt-1 relative z-10">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Intensity / Wind Speed Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Wind className="w-3 h-3 text-emerald-400" /> Particle Turbulence
                  </span>
                  <span className="text-zinc-200">{intensity.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={intensity}
                  onChange={(e) => setIntensity(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => {
                  triggerLightning();
                }}
                className="w-full py-2 px-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-xs font-mono font-medium text-zinc-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>
                  {mode === 'stormy'
                    ? '⚡ Trigger Lightning Strike'
                    : mode === 'rainy'
                    ? '🌧️ Rain Downburst'
                    : mode === 'sunny'
                    ? '☀️ Solar Flare Wave'
                    : mode === 'snowy'
                    ? '❄️ Flurry Burst'
                    : '🌌 Energy Pulse'}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
