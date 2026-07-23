'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a') || target.closest('.tilt-card') || target.getAttribute('role') === 'button')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const followMouse = () => {
      setRingPos((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(followMouse);
    };
    animationFrameId = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  return (
    <>
      <div
        className="cursor-dot hidden md:block"
        style={{
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
        }}
      />
      <div
        className="cursor-ring hidden md:block"
        style={{
          transform: `translate3d(${ringPos.x - (isHovered ? 24 : 16)}px, ${ringPos.y - (isHovered ? 24 : 16)}px, 0)`,
          width: isHovered ? '48px' : '32px',
          height: isHovered ? '48px' : '32px',
          borderColor: isHovered ? '#D4AF37' : 'rgba(212, 175, 55, 0.5)',
          backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
        }}
      />
    </>
  );
}
