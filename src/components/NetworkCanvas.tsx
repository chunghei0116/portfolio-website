"use client";

import React, { useRef, useEffect, useState } from "react";

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeNodes, setActiveNodes] = useState<number>(18);
  const [ping, setPing] = useState<number>(14);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Seed nodes
    const nodeCount = 22;
    const nodes: NodePoint[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 1.8 + 1.2,
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw nodes
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Mouse attraction
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        if (distToMouse < 120) {
          n.x += (dx / distToMouse) * 0.6;
          n.y += (dy / distToMouse) * 0.6;
        }

        // Draw node
        ctx.fillStyle = "var(--color-accent)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect edges
        for (let j = i + 1; j < nodeCount; j++) {
          const n2 = nodes[j];
          const ex = n.x - n2.x;
          const ey = n.y - n2.y;
          const edist = Math.sqrt(ex * ex + ey * ey);

          if (edist < 100) {
            const alpha = (1 - edist / 100) * 0.35;
            ctx.strokeStyle = `rgba(235, 65, 45, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Interval for dynamic telemetry readout
    const timer = setInterval(() => {
      setPing(Math.floor(11 + Math.random() * 7));
      setActiveNodes(18 + Math.floor(Math.random() * 5));
    }, 2500);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[180px] border border-[var(--color-line)] bg-[var(--color-paper-2)] rounded-md relative overflow-hidden select-none"
    >
      <div className="absolute top-3 left-3 flex items-center gap-3 font-mono text-[10px] text-[var(--color-muted)] z-10 uppercase tracking-wider">
        <span className="flex items-center gap-1.5 text-[var(--color-ink)] font-semibold">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
          TELEMETRY_CLUSTER
        </span>
        <span className="hidden sm:inline">| NODES: {activeNodes}/22</span>
        <span className="hidden sm:inline">| LATENCY: {ping}ms</span>
        <span>| STATUS: ONLINE</span>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
