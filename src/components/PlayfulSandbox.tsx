'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Cpu, Code, Layers, Zap } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

export default function PlayfulSandbox() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTab, setActiveTab] = useState<string>('Frontend & WebGL');
  const [particleCount, setParticleCount] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const colors = ['#10b981', '#00f0ff', '#34d399', '#38bdf8', '#a7f3d0'];

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 320;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Initial burst
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5,
        radius: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.8 + 0.2,
      });
    }
    setParticleCount(particles.length);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (mouseX >= 0 && mouseX <= canvas.width && mouseY >= 0 && mouseY <= canvas.height) {
        if (particles.length < 80) {
          particles.push({
            x: mouseX,
            y: mouseY,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            radius: Math.random() * 5 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
          });
          setParticleCount(particles.length);
        }
      }
    };

    canvas.addEventListener('mousemove', handlePointerMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw faint connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.25 * (1 - dist / 90)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & render particles
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const skillGroups = [
    {
      category: 'Frontend & WebGL',
      icon: Code,
      skills: ['React 19 / RSC', 'Three.js / R3F', 'TypeScript', 'Tailwind v4', 'Framer Motion', 'WebAssembly'],
    },
    {
      category: 'Backend & Systems',
      icon: Cpu,
      skills: ['Next.js 16', 'Node.js', 'WebSockets', 'GraphQL', 'Edge Runtime', 'Docker / K8s'],
    },
    {
      category: 'Graphics & Shaders',
      icon: Layers,
      skills: ['GLSL Shaders', 'Post-Processing', 'Canvas 2D API', 'PBR Lighting', 'Blender Low-Poly', 'Three Physics'],
    },
  ];

  return (
    <section id="playground" className="py-24 px-6 relative z-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider mb-2">
          <Zap className="w-3.5 h-3.5" />
          <span>Interactive Playground</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
          Micro-Lab &amp; Capabilities
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Physics Sandbox Canvas Card */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 z-10">
            <div>
              <span className="font-mono text-xs font-bold text-emerald-400">PHYSICS SANDBOX</span>
              <p className="text-xs text-zinc-400">Move your cursor inside to spawn glowing particles</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-zinc-300">
              {particleCount} Active Particles
            </span>
          </div>

          <div className="relative w-full h-[280px] rounded-2xl bg-zinc-950/80 border border-white/10 overflow-hidden cursor-crosshair">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-zinc-500 pointer-events-none">
              Canvas 2D Particle Engine
            </div>
          </div>
        </div>

        {/* Skill Matrix Card */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-4">
              Core Tech Matrix
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 mb-6 font-mono text-xs">
              {skillGroups.map((group) => {
                const Icon = group.icon;
                const isActive = activeTab === group.category;
                return (
                  <button
                    key={group.category}
                    type="button"
                    onClick={() => setActiveTab(group.category)}
                    className={`flex-1 p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold'
                        : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] text-center">{group.category.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Skills List */}
            <div className="space-y-2.5">
              {skillGroups
                .find((g) => g.category === activeTab)
                ?.skills.map((skill) => (
                  <div
                    key={skill}
                    className="p-3 rounded-xl bg-zinc-950/60 border border-white/10 flex items-center justify-between font-mono text-xs"
                  >
                    <span className="text-zinc-200 font-medium">{skill}</span>
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-right font-mono text-[11px] text-zinc-500">
            Updated for 2026 Production Standards
          </div>
        </div>
      </div>
    </section>
  );
}
