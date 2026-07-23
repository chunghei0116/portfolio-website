'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export function HeroGradientFallback() {
  return (
    <div
      className="absolute inset-0 -z-10 bg-[#09090b] transition-opacity duration-1000"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_60%,rgba(0,240,255,0.08),rgba(255,255,255,0))]" />
    </div>
  );
}

export default function HeroCanvas() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <HeroGradientFallback />;
  }

  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden pointer-events-auto cursor-pointer">
      <HeroGradientFallback />
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0.2, 5.5], fov: 48 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          eventSource={typeof document !== 'undefined' ? (document.body as HTMLElement) : undefined}
          eventPrefix="client"
          className="h-full w-full"
        >
          <HeroScene />
        </Canvas>
      </Suspense>
    </div>
  );
}
