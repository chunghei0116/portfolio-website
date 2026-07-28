'use client';

import dynamic from 'next/dynamic';

const OrbitalField = dynamic(() => import('./orbital-field'), { ssr: false });

export function HeroCanvas() {
  return <OrbitalField />;
}
