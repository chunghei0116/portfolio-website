"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface ParticleData {
  targetX: number;
  targetY: number;
  origR: number;
  origG: number;
  origB: number;
  vx: number;
  vy: number;
  noiseSpeed: number;
  noiseForce: number;
  phase: number;
}

export default function FlutterParticles() {
  const pointsRef = useRef<THREE.Points>(null!);

  // Generate grid points and initial positions
  const [positions, colors, metadata] = useMemo(() => {
    // Official Flutter brand colors
    const colorLightCyan = new THREE.Color("#39cefd");  // Top piece
    const colorMediumBlue = new THREE.Color("#16b9fd"); // Middle piece
    const colorDarkBlue = new THREE.Color("#03569b");   // Bottom piece

    // Official geometry vertices normalized and centered around (0, 0)
    // 1. Top piece: Quadrilateral ABCD (slanted up-right)
    const topA = { x: 0.104, y: 0.540 };
    const topB = { x: 0.436, y: 0.540 };
    const topC = { x: -0.270, y: -0.167 };
    const topD = { x: -0.437, y: 0.0 };

    // 2. Middle piece: Parallelogram ABCD (slanted up-right, parallel to top piece)
    const midA = { x: 0.105, y: 0.042 };
    const midB = { x: 0.437, y: 0.042 };
    const midC = { x: 0.146, y: -0.249 };
    const midD = { x: -0.186, y: -0.249 };

    // 3. Bottom piece: Quadrilateral ABCD (slanted down-right)
    const botA = { x: -0.186, y: -0.249 };
    const botB = { x: 0.146, y: -0.249 };
    const botC = { x: 0.437, y: -0.540 };
    const botD = { x: 0.105, y: -0.540 };

    // Helper to check if a point lies inside a convex quadrilateral
    const isInsideQuad = (
      px: number, py: number,
      A: { x: number, y: number },
      B: { x: number, y: number },
      C: { x: number, y: number },
      D: { x: number, y: number }
    ) => {
      const cross = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => {
        return (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);
      };

      const c1 = cross(A.x, A.y, B.x, B.y, px, py);
      const c2 = cross(B.x, B.y, C.x, C.y, px, py);
      const c3 = cross(C.x, C.y, D.x, D.y, px, py);
      const c4 = cross(D.x, D.y, A.x, A.y, px, py);

      // Check if they are all on the same side of the edges
      const allPositive = c1 >= 0 && c2 >= 0 && c3 >= 0 && c4 >= 0;
      const allNegative = c1 <= 0 && c2 <= 0 && c3 <= 0 && c4 <= 0;

      return allPositive || allNegative;
    };

    // Scan the bounding area on a row/column grid
    const gridPoints: { x: number; y: number; color: THREE.Color }[] = [];
    const step = 0.038; // Resolution adjusted to hit approx 200 particles
    const padding = 0.6;

    for (let gy = -padding; gy <= padding; gy += step) {
      for (let gx = -padding; gx <= padding; gx += step) {
        if (isInsideQuad(gx, gy, topA, topB, topC, topD)) {
          gridPoints.push({ x: gx, y: gy, color: colorLightCyan });
        } else if (isInsideQuad(gx, gy, midA, midB, midC, midD)) {
          gridPoints.push({ x: gx, y: gy, color: colorMediumBlue });
        } else if (isInsideQuad(gx, gy, botA, botB, botC, botD)) {
          gridPoints.push({ x: gx, y: gy, color: colorDarkBlue });
        }
      }
    }

    const count = gridPoints.length;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const meta: ParticleData[] = [];

    for (let i = 0; i < count; i++) {
      const pt = gridPoints[i];
      // Initial positions set randomly scattered
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = 0;

      cols[i * 3] = pt.color.r;
      cols[i * 3 + 1] = pt.color.g;
      cols[i * 3 + 2] = pt.color.b;

      meta.push({
        targetX: pt.x,
        targetY: pt.y,
        origR: pt.color.r,
        origG: pt.color.g,
        origB: pt.color.b,
        vx: 0,
        vy: 0,
        noiseSpeed: 0.8 + Math.random() * 1.5,
        noiseForce: 0.006 + Math.random() * 0.008, // Very subtle breathing motion
        phase: Math.random() * Math.PI * 2,
      });
    }

    return [pos, cols, meta] as const;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const colorsAttr = pointsRef.current.geometry.attributes.color;
    const colorsArr = colorsAttr ? (colorsAttr.array as Float32Array) : null;
    const count = metadata.length;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const m = metadata[i];

      // 1. Base floating background noise
      const floatX = Math.sin(time * m.noiseSpeed + m.phase) * m.noiseForce;
      const floatY = Math.cos(time * m.noiseSpeed + m.phase) * m.noiseForce;

      const targetX = m.targetX + floatX;
      const targetY = m.targetY + floatY;

      const currentX = pos[i3];
      const currentY = pos[i3 + 1];

      // Spring force dragging particles back to target position
      const restoreForceX = (targetX - currentX) * 0.08;
      const restoreForceY = (targetY - currentY) * 0.08;

      // Update positions with custom damping
      m.vx = (m.vx + restoreForceX) * 0.82;
      m.vy = (m.vy + restoreForceY) * 0.82;

      pos[i3] += m.vx;
      pos[i3 + 1] += m.vy;

      // 2. Dynamic top spotlight illumination model (3D lighting)
      if (colorsArr) {
        // Spotlight source location: x=0.0, y=2.2 (near ceiling), z=0.5
        const lx = 0.0;
        const ly = 2.2;
        const lz = 0.5;
        const ldx = lx - currentX;
        const ldy = ly - currentY;
        const ldist = Math.sqrt(ldx * ldx + ldy * ldy + lz * lz);
        
        // Spotlight cone pointing down (0, -1, -0.2)
        const dot = ((currentY - ly) / ldist) * -1.0 + ((0.0 - lz) / ldist) * -0.2;
        const spotFactor = Math.pow(Math.max(0, dot), 2.2);
        
        // Distance falloff calculation
        const falloff = 1.0 / (1.0 + ldist * 1.5);
        // Ambient background color level (0.2) + spotlight highlight contribution
        const finalLighting = 0.2 + 1.1 * (falloff * spotFactor);

        colorsArr[i3] = m.origR * finalLighting;
        colorsArr[i3 + 1] = m.origG * finalLighting;
        colorsArr[i3 + 2] = m.origB * finalLighting;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    if (colorsAttr) {
      colorsAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09} // Clean pixelated look
        vertexColors
        sizeAttenuation={true}
        transparent
        opacity={0.9}
      />
    </points>
  );
}

interface BubbleData {
  baseX: number;
  y: number;
  z: number;
  speed: number;
  wobbleSpeed: number;
  wobbleRange: number;
  phase: number;
}

export function SodaBubbles() {
  const smallPointsRef = useRef<THREE.Points>(null!);
  const largePointsRef = useRef<THREE.Points>(null!);
  
  const smallCount = 50;
  const largeCount = 30;

  // 1. Generate Small Bubbles data
  const [smallPositions, smallMetadata] = useMemo(() => {
    const pos = new Float32Array(smallCount * 3);
    const meta: BubbleData[] = [];
    for (let i = 0; i < smallCount; i++) {
      const baseX = (Math.random() - 0.5) * 2.6;
      const y = (Math.random() - 0.5) * 2.6;
      const z = -0.5 - Math.random() * 0.3; // Deeper in background
      pos[i * 3] = baseX;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      meta.push({
        baseX,
        y,
        z,
        speed: 0.12 + Math.random() * 0.18,
        wobbleSpeed: 0.8 + Math.random() * 1.5,
        wobbleRange: 0.04 + Math.random() * 0.06,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return [pos, meta] as const;
  }, []);

  // 2. Generate Large Bubbles data
  const [largePositions, largeMetadata] = useMemo(() => {
    const pos = new Float32Array(largeCount * 3);
    const meta: BubbleData[] = [];
    for (let i = 0; i < largeCount; i++) {
      const baseX = (Math.random() - 0.5) * 2.4;
      const y = (Math.random() - 0.5) * 2.6;
      const z = -0.2 - Math.random() * 0.2; // Closer to logo
      pos[i * 3] = baseX;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      meta.push({
        baseX,
        y,
        z,
        speed: 0.20 + Math.random() * 0.25,
        wobbleSpeed: 1.5 + Math.random() * 2.0,
        wobbleRange: 0.08 + Math.random() * 0.12,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return [pos, meta] as const;
  }, []);

  // Ultra-realistic shiny stroked soda bubble texture
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Clear
      ctx.clearRect(0, 0, 64, 64);

      // 1. Semi-translucent body fill
      ctx.beginPath();
      ctx.arc(32, 32, 27, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(186, 230, 253, 0.18)";
      ctx.fill();
      
      // 2. Shiny reflection highlight (top left)
      const highlightGrad = ctx.createRadialGradient(22, 22, 1, 22, 22, 11);
      highlightGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      highlightGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.beginPath();
      ctx.arc(22, 22, 11, 0, Math.PI * 2);
      ctx.fillStyle = highlightGrad;
      ctx.fill();

      // 3. Crisp white bubble border
      ctx.beginPath();
      ctx.arc(32, 32, 27, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
      ctx.lineWidth = 3.0;
      ctx.stroke();

      // 4. Subtle outer blue glow
      ctx.beginPath();
      ctx.arc(32, 32, 29, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(57, 206, 253, 0.55)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Update small bubbles
    if (smallPointsRef.current) {
      const pos = smallPointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < smallCount; i++) {
        const i3 = i * 3;
        const m = smallMetadata[i];
        m.y += m.speed * delta;
        if (m.y > 1.3) {
          m.y = -1.3;
          m.baseX = (Math.random() - 0.5) * 2.6;
        }
        const wobble = Math.sin(time * m.wobbleSpeed + m.phase) * m.wobbleRange;
        pos[i3] = m.baseX + wobble;
        pos[i3 + 1] = m.y;
      }
      smallPointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Update large bubbles
    if (largePointsRef.current) {
      const pos = largePointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < largeCount; i++) {
        const i3 = i * 3;
        const m = largeMetadata[i];
        m.y += m.speed * delta;
        if (m.y > 1.3) {
          m.y = -1.3;
          m.baseX = (Math.random() - 0.5) * 2.4;
        }
        const wobble = Math.sin(time * m.wobbleSpeed + m.phase) * m.wobbleRange;
        pos[i3] = m.baseX + wobble;
        pos[i3 + 1] = m.y;
      }
      largePointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Small distant background bubbles */}
      <points ref={smallPointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[smallPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          map={texture || undefined}
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Large foreground background bubbles */}
      <points ref={largePointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[largePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.25} // Substantially larger and highly visible
          map={texture || undefined}
          transparent
          opacity={0.88}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
