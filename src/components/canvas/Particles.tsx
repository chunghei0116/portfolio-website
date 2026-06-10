"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

const count = 3000;

// Pre-calculate positions and colors outside render to remain pure and high-performance
const [positions, colors, originalPositions] = (() => {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  
  // Golden Yellow (#FFE600), Cyber Cyan (#00F0FF), Soft Silver-Grey (#CCCCCC)
  const color1 = new THREE.Color("#FFE600");
  const color2 = new THREE.Color("#00F0FF");
  const color3 = new THREE.Color("#CCCCCC");

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * 8 + 1.5; // Spread between 1.5 and 9.5 units

    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6; // Slightly flattened ellipsoidal nebula
    pos[i * 3 + 2] = r * Math.cos(phi);

    // Randomly mix particle colors
    const mix = Math.random();
    let finalColor;
    if (mix < 0.3) {
      finalColor = color1;
    } else if (mix < 0.6) {
      finalColor = color2;
    } else {
      finalColor = color3;
    }

    col[i * 3] = finalColor.r;
    col[i * 3 + 1] = finalColor.g;
    col[i * 3 + 2] = finalColor.b;
  }
  return [pos, col, pos.slice()];
})();

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);

  // Monitor mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Programmatically paint a soft circular alpha glow texture
  const particleTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Constant slow drift rotation
    pointsRef.current.rotation.y = time * 0.03;
    pointsRef.current.rotation.z = time * 0.01;

    // Smooth lerped mouse parallax
    pointsRef.current.rotation.y += (mouseRef.current.x * 0.12 - pointsRef.current.rotation.y) * 0.05;
    pointsRef.current.rotation.x += (-mouseRef.current.y * 0.12 - pointsRef.current.rotation.x) * 0.05;

    // Scroll-Tracking Parallax (Camera expansion feel)
    const scrollFraction = scrollYRef.current / (typeof document !== "undefined" ? Math.max(1, document.documentElement.scrollHeight - window.innerHeight) : 1000);
    pointsRef.current.scale.setScalar(1 + scrollFraction * 0.2);
    pointsRef.current.position.z = scrollFraction * 1.5;

    // Dynamic wave displacement (undulation) inside render loop
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const x = posArray[i * 3];
      const originalY = originalPositions[i * 3 + 1];
      // Dynamic undulation using a sine wave based on time and point's x position
      posArray[i * 3 + 1] = originalY + Math.sin(time * 0.4 + x * 0.3) * 0.15;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Request next frame
    state.invalidate();
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.8}
        map={particleTexture || undefined}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
