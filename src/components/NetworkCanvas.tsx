"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Point {
  pos: THREE.Vector3;
  velocity: THREE.Vector3;
  originalPos: THREE.Vector3;
}

function NodeNetwork() {
  const count = 40;
  const maxDistance = 2.5;
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { pointer, viewport } = useThree();

  // Create random points with velocities
  const data = useMemo<Point[]>(() => {
    const list: Point[] = [];
    for (let i = 0; i < count; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 3
      );
      list.push({
        pos,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.01
        ),
        originalPos: pos.clone(),
      });
    }
    return list;
  }, []);

  // Geometry attributes
  const [positions, linePositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const linePos = new Float32Array(count * count * 6); // Max possible connections
    return [pos, linePos];
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const pointerVec = new THREE.Vector3(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );

    let lineIndex = 0;

    // Update positions
    data.forEach((p, idx) => {
      // Idle drift
      p.pos.add(p.velocity);

      // Bounce limits
      if (Math.abs(p.pos.x) > 4) p.velocity.x *= -1;
      if (Math.abs(p.pos.y) > 4) p.velocity.y *= -1;
      if (Math.abs(p.pos.z) > 2) p.velocity.z *= -1;

      // Attract to pointer if close
      const distToPointer = p.pos.distanceTo(pointerVec);
      if (distToPointer < 2.0) {
        const dir = new THREE.Vector3().subVectors(pointerVec, p.pos).normalize();
        p.pos.addScaledVector(dir, 0.03); // pull to mouse
      } else {
        // Return slowly to original plane
        const homeDir = new THREE.Vector3().subVectors(p.originalPos, p.pos);
        p.pos.addScaledVector(homeDir, 0.002);
      }

      // Write to points attribute
      positions[idx * 3] = p.pos.x;
      positions[idx * 3 + 1] = p.pos.y;
      positions[idx * 3 + 2] = p.pos.z;
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Connect close neighbors
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = data[i].pos.distanceTo(data[j].pos);
        if (dist < maxDistance) {
          linePositions[lineIndex++] = data[i].pos.x;
          linePositions[lineIndex++] = data[i].pos.y;
          linePositions[lineIndex++] = data[i].pos.z;

          linePositions[lineIndex++] = data[j].pos.x;
          linePositions[lineIndex++] = data[j].pos.y;
          linePositions[lineIndex++] = data[j].pos.z;
        }
      }
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIndex / 3);
  });

  return (
    <group>
      {/* Node Vertices */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ef4444" // Bleed Red Accent
          size={0.16}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
        />
      </points>

      {/* Network Edges */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#ef4444"
          transparent={true}
          opacity={0.25}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

export default function NetworkCanvas() {
  return (
    <div className="w-full h-[200px] border border-rule bg-paper-2 rounded-lg relative overflow-hidden">
      <div className="absolute top-3 left-3 font-mono text-[9px] text-muted z-10 select-none pointer-events-none uppercase">
        Live node telemetry cluster [Interactive]
      </div>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <NodeNetwork />
      </Canvas>
    </div>
  );
}
