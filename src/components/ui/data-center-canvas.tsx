"use client";
import { useEffect, useRef } from "react";

const COLORS = [
  "#e63946", "#d63070", "#c0417a",
  "#a040a0", "#8b35cc", "#7c3aed",
  "#5b3fd0", "#3b5cc4", "#2563eb",
  "#1a88d4", "#06b6d4",
];

function pickColor(t: number) {
  const i = Math.max(0, Math.min(COLORS.length - 1, Math.floor(t * COLORS.length)));
  return COLORS[i];
}

// 0 = server rack, 1 = network node, 2 = core hub
type NodeType = 0 | 1 | 2;

interface Node {
  x: number; y: number;
  ox: number; oy: number;
  size: number;
  kind: NodeType;
  color: string;
  phase: number;
  speed: number;
}

export function DataCenterCanvas({ className = "" }: { className?: string }) {
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

    const buildScene = () => {
      const CONN_DIST = Math.min(W, H) * 0.20;
      const COUNT = 110;
      const nodes: Node[] = [];

      // Scatter nodes with slight clustering (2 layers of density)
      for (let i = 0; i < COUNT; i++) {
        const col = (i / COUNT); // 0→1 across width for colour
        let x: number, y: number;

        if (i % 9 === 0) {
          // Core hubs — spread evenly across the canvas
          x = (0.08 + (i / COUNT) * 0.84) * W;
          y = (0.15 + Math.sin(i * 2.4) * 0.35 + 0.35) * H;
        } else {
          x = (0.04 + Math.random() * 0.92) * W;
          y = (0.04 + Math.random() * 0.92) * H;
        }

        const rand = Math.random();
        const kind: NodeType = rand < 0.12 ? 2 : rand < 0.55 ? 0 : 1;
        const size = kind === 2 ? 5.5 : kind === 0 ? 3.5 : 2.5;

        nodes.push({
          x, y, ox: x, oy: y,
          size,
          kind,
          color: pickColor(col + (Math.random() - 0.5) * 0.18),
          phase: Math.random() * Math.PI * 2,
          speed: 0.35 + Math.random() * 0.65,
        });
      }

      // Pre-compute connections from rest positions
      type Edge = [number, number, number]; // i, j, restDist
      const edges: Edge[] = [];
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = nodes[i].ox - nodes[j].ox;
          const dy = nodes[i].oy - nodes[j].oy;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONN_DIST) edges.push([i, j, CONN_DIST]);
        }
      }

      return { nodes, edges };
    };

    let { nodes, edges } = buildScene();
    let animId: number;
    let t = 0;

    const draw = () => {
      t += 0.007;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hover = mouseRef.current.active;
      const influence = Math.min(W, H) * 0.28;

      // Update positions
      for (const n of nodes) {
        const fx = Math.sin(t * n.speed        + n.phase)        * 14;
        const fy = Math.cos(t * n.speed * 0.73 + n.phase + 1.1)  * 11;
        n.x = n.ox + fx;
        n.y = n.oy + fy;

        if (hover) {
          const dx = n.x - mx;
          const dy = n.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < influence && dist > 0.5) {
            const force = Math.pow(1 - dist / influence, 2.2) * 68;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }
      }

      // Draw edges (connection lines)
      for (const [i, j, maxDist] of edges) {
        const ni = nodes[i];
        const nj = nodes[j];
        const dx = ni.x - nj.x;
        const dy = ni.y - nj.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        const rawAlpha = 1 - d / (maxDist * 1.5);
        if (rawAlpha <= 0) continue;

        const pulse = 0.55 + 0.45 * Math.sin(t * 1.2 + i * 0.31 + j * 0.19);
        const alpha = rawAlpha * 0.35 * pulse;

        const grad = ctx.createLinearGradient(ni.x, ni.y, nj.x, nj.y);
        grad.addColorStop(0, ni.color);
        grad.addColorStop(1, nj.color);

        ctx.beginPath();
        ctx.moveTo(ni.x, ni.y);
        ctx.lineTo(nj.x, nj.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = ni.kind === 2 || nj.kind === 2 ? 1.2 : 0.7;
        ctx.globalAlpha = alpha;
        ctx.stroke();
      }

      // Draw nodes
      for (const n of nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(t * n.speed * 1.8 + n.phase);

        if (n.kind === 2) {
          // Core hub — glowing ring + solid dot
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size * 3.5, 0, Math.PI * 2);
          const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 3.5);
          grd.addColorStop(0, n.color + "44");
          grd.addColorStop(1, n.color + "00");
          ctx.fillStyle = grd;
          ctx.globalAlpha = 0.25 + pulse * 0.2;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.globalAlpha = 0.85 + pulse * 0.15;
          ctx.fill();

        } else if (n.kind === 0) {
          // Server rack — small rectangle
          const rw = n.size * 4;
          const rh = n.size * 2.2;
          const rx = n.x - rw / 2;
          const ry = n.y - rh / 2;

          ctx.globalAlpha = 0.6 + pulse * 0.3;
          ctx.fillStyle = n.color;
          ctx.beginPath();
          ctx.roundRect(rx, ry, rw, rh, 1.5);
          ctx.fill();

          // Blinking LED
          ctx.beginPath();
          ctx.arc(rx + rw - 2.5, n.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = pulse > 0.65 ? "#4ade80" : "#166534";
          ctx.globalAlpha = pulse > 0.65 ? 1 : 0.5;
          ctx.fill();

        } else {
          // Network node — circle
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.globalAlpha = 0.65 + pulse * 0.35;
          ctx.fill();
        }
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
      ({ nodes, edges } = buildScene());
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

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />;
}
