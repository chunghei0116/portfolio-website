"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';

interface DeviceOrientation {
  beta: number | null;
  gamma: number | null;
  isSupported: boolean;
  requestPermission: () => Promise<boolean>;
}

// Type for iOS DeviceOrientationEvent requestPermission
interface DeviceOrientationEventConstructor {
  requestPermission?: () => Promise<'granted' | 'denied'>;
  new (type: string, eventInitDict?: DeviceOrientationEventInit): DeviceOrientationEvent;
  prototype: DeviceOrientationEvent;
}

const subscribe = () => () => {};
const getSnapshot = () => typeof window !== 'undefined' && 'DeviceOrientationEvent' in window;
const getServerSnapshot = () => false;

export const useDeviceOrientation = (): DeviceOrientation => {
  const [orientation, setOrientation] = useState<{ beta: number | null; gamma: number | null }>({
    beta: null,
    gamma: null,
  });
  
  // Use useSyncExternalStore to avoid hydration mismatch and cascading render warnings
  const isSupported = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    const rawBeta = event.beta || 0;
    const rawGamma = event.gamma || 0;

    const beta = Math.min(Math.max(rawBeta - 45, -45), 45) / 45;
    const gamma = Math.min(Math.max(rawGamma, -45), 45) / 45;

    setOrientation({
      beta,
      gamma,
    });
  }, []);

  const requestPermission = useCallback(async () => {
    const constructor = DeviceOrientationEvent as unknown as DeviceOrientationEventConstructor;
    
    if (typeof constructor.requestPermission === 'function') {
      try {
        const permission = await constructor.requestPermission();
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
    const constructor = DeviceOrientationEvent as unknown as DeviceOrientationEventConstructor;
    
    if (
      typeof window !== 'undefined' &&
      typeof constructor.requestPermission !== 'function' &&
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
