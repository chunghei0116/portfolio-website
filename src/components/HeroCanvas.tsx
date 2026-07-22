'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export function HeroGradientFallback() {
  return (
    <div
      className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FAF8F5] via-[#F1ECE4] to-[#FAF8F5] opacity-95 transition-opacity duration-1000"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(29,78,216,0.1),transparent_50%)]" />
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
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
      <HeroGradientFallback />
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0.5, 6], fov: 50 }}
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
