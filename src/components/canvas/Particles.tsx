"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useDeviceOrientation } from "@/hooks/useDeviceOrientation";

interface ParticleMetadata {
  x: number;
  z: number;
  speed: number;
  wobbleSpeed: number;
  wobbleForce: number;
  colorType: number; // 0 = black, 1 = Gundam Blue, 2 = Slate/Moss
}

const Particles = () => {
  const points = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();
  const { beta, gamma, requestPermission } = useDeviceOrientation();

  // Handle iOS permission request on first user interaction
  useEffect(() => {
    const handleInteraction = () => {
      requestPermission();
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [requestPermission]);

  const count = 1000; // Optimal count for background visibility and performance

  // Generate initial flowing particles data
  const [positions, colors, metadata] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const meta: ParticleMetadata[] = [];

    // Colors matching theme
    const colorBlack = new THREE.Color("#000000");
    const colorBlue = new THREE.Color("#0A5CFF");
    const colorMoss = new THREE.Color("#1C2E24");

    for (let i = 0; i < count; i++) {
      // Random X, Y (-8 to 8), Z (-4 to 4)
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 8;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const colorType = Math.random() < 0.45 ? 0 : (Math.random() < 0.85 ? 1 : 2);
      const activeColor = colorType === 0 ? colorBlack : (colorType === 1 ? colorBlue : colorMoss);

      cols[i * 3] = activeColor.r;
      cols[i * 3 + 1] = activeColor.g;
      cols[i * 3 + 2] = activeColor.b;

      meta.push({
        x,
        z,
        speed: 0.012 + Math.random() * 0.024,
        wobbleSpeed: 0.3 + Math.random() * 0.7,
        wobbleForce: 0.05 + Math.random() * 0.12,
        colorType
      });
    }

    return [pos, cols, meta];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pos = points.current.geometry.attributes.position.array as Float32Array;

    // Convert mouse coordinates to 3D space relative to camera
    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const meta = metadata[i];

      // Update Y (Flow upwards)
      pos[i3 + 1] += meta.speed;

      // Add horizontal sine-wave sway
      pos[i3] = meta.x + Math.sin(time * meta.wobbleSpeed + i) * meta.wobbleForce;

      // Mouse repulsion (push away from pointer)
      const dx = pos[i3] - mx;
      const dy = pos[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 2.5) {
        const force = (2.5 - dist) / 2.5;
        pos[i3] += (dx / (dist || 0.1)) * force * 0.18;
        pos[i3 + 1] += (dy / (dist || 0.1)) * force * 0.18;
      }

      // Recycle particles when they exit the top boundary
      if (pos[i3 + 1] > 8) {
        pos[i3 + 1] = -8;
        pos[i3] = (Math.random() - 0.5) * 22;
        meta.x = pos[i3];
        meta.z = (Math.random() - 0.5) * 8;
        pos[i3 + 2] = meta.z;
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;

    // Parallax rotation effect using mouse / gyro
    const combinedX = mouse.x * 0.4 + (gamma || 0) * 0.4;
    const combinedY = mouse.y * 0.4 - (beta || 0) * 0.4;

    points.current.rotation.x = THREE.MathUtils.lerp(
      points.current.rotation.x,
      -combinedY * 0.08,
      0.08
    );
    points.current.rotation.y = THREE.MathUtils.lerp(
      points.current.rotation.y,
      combinedX * 0.08,
      0.08
    );
  });

  return (
    <points ref={points}>
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
        size={0.12} // Increased size so they appear clearly as glowing mechanical circles/dust
        vertexColors
        sizeAttenuation={true}
        transparent
        opacity={0.75}
      />
    </points>
  );
};

export default Particles;
