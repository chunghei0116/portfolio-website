'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { audioEngine } from '@/utils/audio';

const GlitchLabShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uGlitchIntensity: { value: 0.5 },
    uColorShift: { value: 0.5 },
    uWireframe: { value: 0 },
  },
  vertexShader: `
    uniform float uTime;
    uniform float uGlitchIntensity;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    // Simplex Noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vUv = uv;
      vNormal = normal;
      vec3 pos = position;
      float noise = snoise(pos * 2.0 + vec3(uTime * 0.8)) * uGlitchIntensity * 0.6;
      pos += normal * noise;
      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uColorShift;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      float fresnel = pow(1.0 - max(0.0, dot(normal, vec3(0.0, 0.0, 1.0))), 2.5);

      vec3 c1 = vec3(0.0, 0.94, 1.0); // Cyan
      vec3 c2 = vec3(0.66, 0.33, 0.97); // Violet
      vec3 c3 = vec3(0.95, 0.25, 0.37); // Coral

      vec3 baseColor = mix(c1, c2, sin(vPosition.y * 2.0 + uTime + uColorShift * 6.28) * 0.5 + 0.5);
      baseColor = mix(baseColor, c3, fresnel * uColorShift);

      gl_FragColor = vec4(baseColor * (fresnel + 0.3), 0.9);
    }
  `,
};

function ShaderMesh({ intensity, colorShift, isWireframe }: { intensity: number; colorShift: number; isWireframe: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uGlitchIntensity: { value: intensity },
      uColorShift: { value: colorShift },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uGlitchIntensity.value = intensity;
      materialRef.current.uniforms.uColorShift.value = colorShift;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={GlitchLabShader.vertexShader}
        fragmentShader={GlitchLabShader.fragmentShader}
        uniforms={uniforms}
        wireframe={isWireframe}
        transparent
      />
    </mesh>
  );
}

export default function InteractiveShaderLab() {
  const [intensity, setIntensity] = useState(0.6);
  const [colorShift, setColorShift] = useState(0.5);
  const [isWireframe, setIsWireframe] = useState(false);

  return (
    <div className="w-full relative soft-card p-6 border border-white/10 bg-[#0d0d13]/80 backdrop-blur-xl overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/20">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            INTERACTIVE GLSL LAB v3.6
          </div>
          <h3 className="font-display text-2xl font-bold mt-2 text-white glitch-text" data-text="Kinetic Shader Sandbox">
            Kinetic Shader Sandbox
          </h3>
        </div>
        <div className="text-xs font-mono text-slate-400">
          [GPU: WebGL2 / Three.js R3F Engine]
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* 3D Viewport */}
        <div className="lg:col-span-7 h-[360px] relative rounded-2xl bg-[#07070a] border border-white/10 overflow-hidden flex items-center justify-center">
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.5] }}>
            <ambientLight intensity={1.5} />
            <ShaderMesh intensity={intensity} colorShift={colorShift} isWireframe={isWireframe} />
          </Canvas>
          <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-500 bg-black/60 px-2 py-1 rounded border border-white/5">
            ROTATION: REAL-TIME // SHADER: DISPLACEMENT_NOISE
          </div>
        </div>

        {/* Real-time Parameter Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Intensity Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">DISPLACEMENT INTENSITY</span>
              <span className="text-[#00f0ff]">{Math.round(intensity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1.5"
              step="0.05"
              value={intensity}
              onChange={(e) => {
                setIntensity(parseFloat(e.target.value));
                audioEngine.playClick(800, 0.02);
              }}
              className="w-full accent-[#00f0ff] cursor-pointer bg-slate-800 rounded-lg h-2"
            />
          </div>

          {/* Color Shift Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">FRESNEL COLOR SPECTRUM</span>
              <span className="text-[#a855f7]">{Math.round(colorShift * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={colorShift}
              onChange={(e) => {
                setColorShift(parseFloat(e.target.value));
                audioEngine.playClick(1000, 0.02);
              }}
              className="w-full accent-[#a855f7] cursor-pointer bg-slate-800 rounded-lg h-2"
            />
          </div>

          {/* Wireframe Toggle & Glitch Burst */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => {
                setIsWireframe(!isWireframe);
                audioEngine.playGlitch();
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono font-bold transition-all border ${
                isWireframe
                  ? 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30'
              }`}
            >
              {isWireframe ? '[WIREFRAME: ON]' : '[WIREFRAME: OFF]'}
            </button>

            <button
              onClick={() => {
                setIntensity(1.5);
                audioEngine.playGlitch();
                setTimeout(() => setIntensity(0.5), 600);
              }}
              className="px-4 py-3 rounded-xl text-xs font-mono font-bold bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/40 hover:bg-[#f43f5e]/30 transition-all"
            >
              ⚡ OVERDRIVE BURST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
