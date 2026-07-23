'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type WeatherMode = 'sunny' | 'rainy' | 'snowy' | 'stormy' | 'cosmic';

export interface ParticleBurst {
  id: string;
  x: number;
  y: number;
  time: number;
  type: WeatherMode;
}

export interface WeatherContextType {
  mode: WeatherMode;
  intensity: number;
  lightningFlashTime: number;
  bursts: ParticleBurst[];
  setMode: (mode: WeatherMode) => void;
  setIntensity: (intensity: number) => void;
  triggerLightning: () => void;
  addBurst: (x: number, y: number) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<WeatherMode>('sunny');
  const [intensity, setIntensityState] = useState<number>(1.0);
  const [lightningFlashTime, setLightningFlashTime] = useState<number>(0);
  const [bursts, setBursts] = useState<ParticleBurst[]>([]);

  const setMode = useCallback((newMode: WeatherMode) => {
    setModeState(newMode);
  }, []);

  const setIntensity = useCallback((newIntensity: number) => {
    const clamped = Math.max(0.5, Math.min(2.5, newIntensity));
    setIntensityState(clamped);
  }, []);

  const triggerLightning = useCallback(() => {
    setLightningFlashTime(Date.now());
  }, []);

  const addBurst = useCallback(
    (x: number, y: number) => {
      const newBurst: ParticleBurst = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        x,
        y,
        time: Date.now(),
        type: mode,
      };
      setBursts((prev) => [...prev.slice(-19), newBurst]);
    },
    [mode]
  );

  return (
    <WeatherContext.Provider
      value={{
        mode,
        intensity,
        lightningFlashTime,
        bursts,
        setMode,
        setIntensity,
        triggerLightning,
        addBurst,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
