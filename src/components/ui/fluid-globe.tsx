"use client";
import { useEffect, useRef } from "react";

// Logo brand colors: red → magenta → purple → blue → cyan
const COLORS = [
  "#e63946", "#d63070", "#c0417a",
  "#a040a0", "#8b35cc", "#7c3aed",
  "#5b3fd0", "#3b5cc4", "#2563eb",
  "#1a88d4", "#06b6d4", "#0891b2",
];

function getColor(index: number, total: number) {
  return COLORS[Math.floor((index / total) * COLORS.length)];
}

function rotate3D(ox: number, oy: number, oz: number, angleY: number, angleX: number) {
  const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
  const x1 =  ox * cosY + oz * sinY;
  const y1 =  oy;
  const z1 = -ox * sinY + oz * cosY;

  const cosX = Math.cos(angleX), sinX = Math.sin(angleX);
  const x2 = x1;
  const y2 = y1 * cosX - z1 * sinX;
  const z2 = y1 * sinX + z1 * cosX;

  return { x: x2, y: y2, z: z2 };
}

export function FluidGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    // Use max dimension so globe fills the screen edge-to-edge in both orientations
    const TOTAL  = 1600;
    const RADIUS = Math.max(W, H) * 0.52;

    const ox = new Float32Array(TOTAL);
    const oy = new Float32Array(TOTAL);
    const oz = new Float32Array(TOTAL);
    const sizes  = new Float32Array(TOTAL);
    const colors: string[] = [];

    for (let i = 0; i < TOTAL; i++) {
      const phi   = Math.acos(1 - (2 * (i + 0.5)) / TOTAL);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      ox[i] = RADIUS * Math.sin(phi) * Math.cos(theta);
      oy[i] = RADIUS * Math.sin(phi) * Math.sin(theta);
      oz[i] = RADIUS * Math.cos(phi);
      sizes[i] = Math.random() * 2.0 + 0.8;
      colors[i] = getColor(i, TOTAL);
    }

    let angleY  = 0;
    const tiltX = 0.28;
    let animId: number;
    let t       = 0;
    const FOV   = 700;

    const draw = () => {
      t      += 0.01;
      angleY += 0.003;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hover = mouseRef.current.active;

      const pts: { sx: number; sy: number; sz: number; idx: number }[] = [];

      for (let i = 0; i < TOTAL; i++) {
        const wave = Math.sin(t * 2.2 + ox[i] * 0.018 + oy[i] * 0.015) * 11
                   + Math.cos(t * 1.5 + oz[i] * 0.016) * 6;
        const scale = 1 + wave / RADIUS;

        const px = ox[i] * scale;
        const py = oy[i] * scale;
        const pz = oz[i] * scale;

        const r = rotate3D(px, py, pz, angleY, tiltX);

        const fov = FOV / (FOV + r.z + RADIUS * 0.4);
        let sx = r.x * fov + cx;
        let sy = r.y * fov + cy;

        // Anti-gravity repulsion
        if (hover) {
          const dx = sx - mx;
          const dy = sy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.min(W, H) * 0.5;
          if (dist < influence && dist > 0.1) {
            const force = Math.pow(1 - dist / influence, 2) * 55;
            sx += (dx / dist) * force;
            sy += (dy / dist) * force;
          }
        }

        pts.push({ sx, sy, sz: r.z, idx: i });
      }

      pts.sort((a, b) => a.sz - b.sz);

      for (const { sx, sy, sz, idx } of pts) {
        const depth = (sz + RADIUS) / (RADIUS * 2);
        const alpha = 0.2 + depth * 0.8;
        const r     = sizes[idx] * (0.5 + depth * 0.8);
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = colors[idx];
        ctx.globalAlpha = alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y, active: x >= 0 && y >= 0 && x <= rect.width && y <= rect.height };
    };
    const onLeave = () => { mouseRef.current.active = false; };
    const onResize = () => {
      cancelAnimationFrame(animId);
      resize();
      draw();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
    />
  );
}
