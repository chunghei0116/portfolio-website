"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const Particles = () => {
  const points = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();

  const count = 8000;

  const [positions, initialPositions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const initialPositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    return [positions, initialPositions, velocities];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pos = points.current.geometry.attributes.position.array as Float32Array;

    // Convert mouse coordinates to 3D space relative to camera
    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Subtle float movement
      pos[i3] = initialPositions[i3] + Math.sin(time * 0.5 + initialPositions[i3]) * 0.1;
      pos[i3 + 1] = initialPositions[i3 + 1] + Math.cos(time * 0.5 + initialPositions[i3 + 1]) * 0.1;

      // Mouse interaction (repulsion)
      const dx = pos[i3] - mx;
      const dy = pos[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 2) {
        const force = (2 - dist) / 2;
        pos[i3] += dx * force * 0.2;
        pos[i3 + 1] += dy * force * 0.2;
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#000000"
        sizeAttenuation={true}
        transparent
        opacity={0.6}
      />
    </points>
  );
};

export default Particles;
