"use client";
import { useEffect, useRef } from "react";

const COLORS = [
  "#e63946", "#d63070", "#c0417a",
  "#a040a0", "#8b35cc", "#7c3aed",
  "#5b3fd0", "#3b5cc4", "#2563eb",
  "#1a88d4", "#06b6d4", "#0891b2",
];

function colorAt(t: number) {
  const i = Math.max(0, Math.min(COLORS.length - 1, Math.floor(t * COLORS.length)));
  return COLORS[i];
}

function rotate3D(ox: number, oy: number, oz: number, angleY: number, angleX: number) {
  const cy = Math.cos(angleY), sy = Math.sin(angleY);
  const x1 =  ox * cy + oz * sy;
  const z1 = -ox * sy + oz * cy;
  const cx = Math.cos(angleX), sx = Math.sin(angleX);
  return {
    x: x1,
    y: oy * cx - z1 * sx,
    z: oy * sx + z1 * cx,
  };
}

export function WireframeGlobe({ className = "" }: { className?: string }) {
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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Lower particle count is fine — the wires fill the space visually
    const TOTAL = 720;
    const RADIUS = Math.min(W, H) * 0.46;

    type P = { ox: number; oy: number; oz: number; size: number; color: string; phase: number };
    const pts: P[] = [];
    for (let i = 0; i < TOTAL; i++) {
      const phi   = Math.acos(1 - (2 * (i + 0.5)) / TOTAL);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      pts.push({
        ox: RADIUS * Math.sin(phi) * Math.cos(theta),
        oy: RADIUS * Math.sin(phi) * Math.sin(theta),
        oz: RADIUS * Math.cos(phi),
        size: Math.random() * 1.4 + 0.6,
        color: colorAt(i / TOTAL),
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Pre-compute neighbour links so we draw a finite, fast wireframe
    // (each particle connects to k closest siblings on the rest sphere)
    const K = 3;
    const links: [number, number][] = [];
    {
      const seen = new Set<string>();
      for (let i = 0; i < TOTAL; i++) {
        const dists: { j: number; d: number }[] = [];
        for (let j = 0; j < TOTAL; j++) {
          if (i === j) continue;
          const dx = pts[i].ox - pts[j].ox;
          const dy = pts[i].oy - pts[j].oy;
          const dz = pts[i].oz - pts[j].oz;
          dists.push({ j, d: dx * dx + dy * dy + dz * dz });
        }
        dists.sort((a, b) => a.d - b.d);
        for (let k = 0; k < K; k++) {
          const j = dists[k].j;
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (!seen.has(key)) {
            seen.add(key);
            links.push([i, j]);
          }
        }
      }
    }

    const FOV = 700;
    const tiltX = 0.32;
    let angleY = 0;
    let t = 0;
    let animId: number;

    const project = (
      ox: number, oy: number, oz: number, scale: number,
    ) => {
      const r = rotate3D(ox * scale, oy * scale, oz * scale, angleY, tiltX);
      const fov = FOV / (FOV + r.z + RADIUS * 0.4);
      return { sx: r.x * fov + W / 2, sy: r.y * fov + H / 2, z: r.z, fov };
    };

    const draw = () => {
      t += 0.012;
      angleY += 0.0028;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hover = mouseRef.current.active;

      // Compute current screen positions + per-point depth
      const screen: { sx: number; sy: number; z: number; fov: number; alpha: number }[] = [];

      for (let i = 0; i < TOTAL; i++) {
        const p = pts[i];
        const wave = Math.sin(t * 2 + p.ox * 0.018 + p.oy * 0.014) * 12
                   + Math.cos(t * 1.3 + p.oz * 0.018) * 7;
        const scale = 1 + wave / RADIUS;
        const proj = project(p.ox, p.oy, p.oz, scale);

        let { sx, sy } = proj;

        // Anti-gravity hover repulsion
        if (hover) {
          const dx = sx - mx;
          const dy = sy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const inf = Math.min(W, H) * 0.42;
          if (dist < inf && dist > 0.5) {
            const force = Math.pow(1 - dist / inf, 2.2) * 60;
            sx += (dx / dist) * force;
            sy += (dy / dist) * force;
          }
        }

        const depth = (proj.z + RADIUS) / (RADIUS * 2);
        screen.push({ sx, sy, z: proj.z, fov: proj.fov, alpha: 0.22 + depth * 0.78 });
      }

      // Wire links — drawn first so dots sit on top
      ctx.lineWidth = 0.6;
      for (const [i, j] of links) {
        const a = screen[i];
        const b = screen[j];
        const avgDepth = (a.z + b.z) / 2;
        // Cull obvious back-side edges to reduce clutter
        if (avgDepth < -RADIUS * 0.55) continue;

        const linkAlpha = (((avgDepth + RADIUS) / (RADIUS * 2)) ** 1.4) * 0.45;
        const grad = ctx.createLinearGradient(a.sx, a.sy, b.sx, b.sy);
        grad.addColorStop(0, pts[i].color);
        grad.addColorStop(1, pts[j].color);
        ctx.strokeStyle = grad;
        ctx.globalAlpha = linkAlpha;

        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      // Sort points back-to-front for clean overlap
      const order = screen
        .map((s, i) => i)
        .sort((i, j) => screen[i].z - screen[j].z);

      // Glowy dots
      for (const i of order) {
        const s = screen[i];
        const p = pts[i];
        const r = p.size * (0.5 + ((s.z + RADIUS) / (RADIUS * 2)) * 0.9);

        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(s.sx, s.sy, r, 0, Math.PI * 2);
        ctx.fill();

        // Light glow halo
        if ((s.z + RADIUS) / (RADIUS * 2) > 0.55) {
          ctx.globalAlpha = s.alpha * 0.18;
          ctx.beginPath();
          ctx.arc(s.sx, s.sy, r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      mouseRef.current = { x, y, active: x >= 0 && y >= 0 && x <= r.width && y <= r.height };
    };
    const onLeave = () => { mouseRef.current.active = false; };
    const onResize = () => { cancelAnimationFrame(animId); resize(); draw(); };

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

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />;
}
