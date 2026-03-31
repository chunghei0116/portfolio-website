"use client";

import { useState, useEffect, useCallback } from 'react';

interface DeviceOrientation {
  beta: number | null;
  gamma: number | null;
  isSupported: boolean;
  requestPermission: () => Promise<boolean>;
}

export const useDeviceOrientation = (): DeviceOrientation => {
  const [orientation, setOrientation] = useState<{ beta: number | null; gamma: number | null }>({
    beta: null,
    gamma: null,
  });
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      setIsSupported(true);
    }
  }, []);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    // Normalizing beta (-180 to 180) and gamma (-90 to 90)
    // For parallax, we focus on common handheld angles
    // Beta: 45 degrees is roughly vertical holding, so we map 0-90 to -1 to 1
    // Gamma: mapping -45 to 45 to -1 to 1
    const rawBeta = event.beta || 0;
    const rawGamma = event.gamma || 0;

    // Subtle normalization for parallax
    const beta = Math.min(Math.max(rawBeta - 45, -45), 45) / 45;
    const gamma = Math.min(Math.max(rawGamma, -45), 45) / 45;

    setOrientation({
      beta,
      gamma,
    });
  }, []);

  const requestPermission = useCallback(async () => {
    if (
      typeof window !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error requesting device orientation permission:', error);
        return false;
      }
    } else if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation);
      return true;
    }
    return false;
  }, [handleOrientation]);

  useEffect(() => {
    // On non-iOS devices or devices where requestPermission is not needed, 
    // we can try to add the listener immediately.
    if (
      typeof window !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission !== 'function' &&
      'DeviceOrientationEvent' in window
    ) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [handleOrientation]);

  return { ...orientation, isSupported, requestPermission };
};
