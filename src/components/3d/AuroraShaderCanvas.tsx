'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AuroraShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(1, 1) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;

    // Simplex 2D noise helpers
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      float time = uTime * 0.25;

      // Mouse influence
      vec2 mouseDist = uv - uMouse;
      float dist = length(mouseDist);
      float mouseGlow = smoothstep(0.4, 0.0, dist) * 0.35;

      // Layered noise plasma waves
      float n1 = snoise(uv * 2.5 + vec2(time * 0.4, time * 0.2));
      float n2 = snoise(uv * 5.0 - vec2(time * 0.3, -time * 0.5)) * 0.5;
      float n3 = snoise(uv * 10.0 + vec2(time * 0.6, time * 0.3)) * 0.25;
      float combinedNoise = n1 + n2 + n3;

      // Cyber ethereal colors
      vec3 colorDeep = vec3(0.012, 0.012, 0.024);     // Deep Vantablack space
      vec3 colorCyan = vec3(0.0, 0.94, 1.0) * 0.4;       // Electric cyan
      vec3 colorPurple = vec3(0.66, 0.33, 0.97) * 0.35;  // Quantum purple

      vec3 finalColor = mix(colorDeep, colorCyan, smoothstep(-0.5, 0.8, combinedNoise));
      finalColor = mix(finalColor, colorPurple, smoothstep(-0.2, 1.0, n2));
      finalColor += vec3(0.0, 0.94, 1.0) * mouseGlow;

      gl_FragColor = vec4(finalColor, 0.85);
    }
  `,
};

function PlaneMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uMouse.value.set(
        state.pointer.x * 0.5 + 0.5,
        state.pointer.y * 0.5 + 0.5
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={AuroraShader.vertexShader}
        fragmentShader={AuroraShader.fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function AuroraShaderCanvas() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none w-full h-full">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: true }}
      >
        <PlaneMesh />
      </Canvas>
    </div>
  );
}
