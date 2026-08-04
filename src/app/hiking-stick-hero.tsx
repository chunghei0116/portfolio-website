'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ComponentType, type RefObject } from 'react';

interface ArtifactCanvasProps {
  readonly reducedMotion: boolean;
  readonly visible: boolean;
}

type ArtifactCanvasComponent = ComponentType<ArtifactCanvasProps>;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}

function useArtifactEnhancement() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 48rem)');
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;
    const constrained = Boolean(connection?.saveData) || navigator.hardwareConcurrency <= 4;

    if (!media.matches || constrained) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const frame = window.requestAnimationFrame(() => setEnabled(Boolean(context)));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return enabled;
}

function useVisibility(ref: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return visible;
}

export default function HikingStickHero() {
  const reducedMotion = useReducedMotion();
  const enhancementEnabled = useArtifactEnhancement();
  const [CanvasComponent, setCanvasComponent] = useState<ArtifactCanvasComponent | null>(null);
  const artifactRef = useRef<HTMLDivElement>(null);
  const visible = useVisibility(artifactRef);

  useEffect(() => {
    if (!enhancementEnabled) return;

    let active = true;
    void import('./hiking-stick-canvas')
      .then(({ default: Component }) => {
        if (active) setCanvasComponent(() => Component);
      })
      .catch(() => {
        // Keep the static image fallback when the enhancement chunk cannot load.
      });

    return () => {
      active = false;
    };
  }, [enhancementEnabled]);

  return (
    <div ref={artifactRef} className="hiking-stick-ambient">
      <Image
        className="artifact-reference"
        src="/hiking-stick-reference.png"
        alt=""
        fill
        preload
        sizes="(max-width: 767px) 90vw, 38vw"
      />

      {CanvasComponent ? <CanvasComponent reducedMotion={reducedMotion} visible={visible} /> : null}
    </div>
  );
}
