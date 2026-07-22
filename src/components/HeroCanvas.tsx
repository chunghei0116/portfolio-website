'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';

// Dynamically import the R3F 3D Hero Scene with SSR disabled
const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
});

/**
 * Graceful CSS Gradient Fallback during 3D scene loading / SSR hydration.
 */
export function HeroGradientFallback() {
  return (
    <div
      className="absolute inset-0 -z-10 bg-gradient-to-b from-[#09090D] via-[#10192A] to-[#09090D] opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(197,155,39,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(26,43,76,0.3),transparent_50%)]" />
    </div>
  );
}

/**
 * Interactive 3D Canvas Wrapper for "The Golden Starfield of Olympus".
 * Optimized for full-screen cover, pointer-events safety, and 60fps performance.
 */
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
      {/* Fallback stays active beneath canvas for seamless background depth */}
      <HeroGradientFallback />

      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0.5, 6], fov: 50 }}
          dpr={[1, 2]} // Performance optimization: Cap max DPR at 2
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
