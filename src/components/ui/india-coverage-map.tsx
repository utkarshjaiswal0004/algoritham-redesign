"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { INDIA_PATHS, INDIA_VIEWBOX } from "./india-paths";

export interface CoverageNode {
  city: string;
  /** Position in the SVG viewBox (0–1000 for the simplemaps SVG) */
  x: number;
  y: number;
  primary?: boolean;
  carriers?: number;
  pop?: string;
}

const HQ_INDEX = 0;

function pathCentroid(d: string): { cx: number; cy: number } {
  const numbers = d.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  let sx = 0, sy = 0, n = 0;
  for (let i = 0; i + 1 < numbers.length; i += 2) {
    sx += numbers[i];
    sy += numbers[i + 1];
    n++;
  }
  return n ? { cx: sx / n, cy: sy / n } : { cx: 500, cy: 500 };
}

const PATH_CENTROIDS = INDIA_PATHS.map(pathCentroid);

function nearestPathIndex(x: number, y: number) {
  let best = 0, bestD = Infinity;
  for (let i = 0; i < PATH_CENTROIDS.length; i++) {
    const dx = PATH_CENTROIDS[i].cx - x;
    const dy = PATH_CENTROIDS[i].cy - y;
    const d  = dx * dx + dy * dy;
    if (d < bestD) { bestD = d; best = i; }
  }
  return best;
}

export function IndiaCoverageMap({ nodes }: { nodes: CoverageNode[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [hoverPath, setHoverPath] = useState<number | null>(null);
  const hq = nodes[HQ_INDEX];

  const activePathIdx = active === null ? null : nearestPathIndex(nodes[active].x, nodes[active].y);
  const litPath = hoverPath ?? activePathIdx;

  return (
    <div className="relative w-full aspect-[1/1] rounded-2xl overflow-hidden">

      {/* Dotted backdrop */}
      <div
        className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent_85%)]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--border-strong) 0.8px, transparent 0.8px)",
          backgroundSize: "12px 12px",
        }}
      />

      <svg
        viewBox={INDIA_VIEWBOX}
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="cm-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#7c3aed" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
          </linearGradient>
          {/* Default fill is fully transparent — only borders show */}
          <linearGradient id="cm-fill-active" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.16" />
          </linearGradient>
          <radialGradient id="cm-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#7c3aed" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Country — borders always, fill only on hover, hovered state scales up */}
        <g>
          {INDIA_PATHS.map((d, i) => {
            const isActive = litPath === i;
            const c = PATH_CENTROIDS[i];
            return (
              <motion.path
                key={i}
                d={d}
                fill={isActive ? "url(#cm-fill-active)" : "transparent"}
                stroke="url(#cm-grad)"
                strokeOpacity={isActive ? 1 : 0.65}
                strokeWidth={isActive ? 2.6 : 1.1}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                onMouseEnter={() => setHoverPath(i)}
                onMouseLeave={() => setHoverPath(null)}
                style={{
                  cursor: "pointer",
                  transformOrigin: `${c.cx}px ${c.cy}px`,
                  transformBox: "view-box",
                  filter: isActive ? "drop-shadow(0 4px 10px rgba(124,58,237,0.30))" : undefined,
                  transition: "fill 0.25s, stroke-opacity 0.25s, stroke-width 0.25s, filter 0.25s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: isActive ? "scale(1.04) translateY(-1.5px)" : "scale(1)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 + i * 0.012, duration: 0.5 }}
              />
            );
          })}
        </g>

        {/* Connection lines — flying packets along the route */}
        <g>
          {nodes.map((n, i) => {
            if (i === HQ_INDEX) return null;
            const lit = active === i;
            return (
              <g key={`line-${n.city}`}>
                {/* Static dim base line */}
                <line
                  x1={hq.x} y1={hq.y} x2={n.x} y2={n.y}
                  stroke="url(#cm-grad)" strokeOpacity="0.22"
                  strokeWidth="2" strokeLinecap="round"
                />
                {/* Marching dashes — animated stroke-dashoffset */}
                <line
                  x1={hq.x} y1={hq.y} x2={n.x} y2={n.y}
                  stroke="url(#cm-grad)"
                  strokeOpacity={lit ? 1 : 0.55}
                  strokeWidth={lit ? 3.2 : 2}
                  strokeLinecap="round"
                  strokeDasharray="10 14"
                  style={{ transition: "stroke-width 0.2s, stroke-opacity 0.2s" }}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0" to="-72"
                    dur={`${1.6 + (i % 3) * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </line>
                {/* Travelling glowing packet */}
                <circle r={lit ? 4.5 : 3.5} fill="#7c3aed">
                  <animateMotion
                    dur={`${2.4 + (i % 4) * 0.3}s`}
                    repeatCount="indefinite"
                    path={`M ${hq.x} ${hq.y} L ${n.x} ${n.y}`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.05;0.95;1"
                    dur={`${2.4 + (i % 4) * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </g>

        {/* City pins */}
        <g>
          {nodes.map((n, i) => {
            const isHover = active === i;
            const r1 = n.primary ? 38 : 28;
            const r2 = isHover ? (n.primary ? 16 : 12) : (n.primary ? 12 : 9);
            const r3 = n.primary ? 7 : 5.5;
            return (
              <g
                key={n.city}
                transform={`translate(${n.x} ${n.y})`}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <circle r={r1} fill="url(#cm-glow)">
                  <animate attributeName="r"       values={`${r1 - 6};${r1 + 8};${r1 - 6}`} dur="2.4s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.65;0.2;0.65" dur="2.4s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
                </circle>
                <circle r="40" fill="transparent" />
                <circle r={r2} fill="none" stroke="url(#cm-grad)" strokeWidth="3.2" />
                <circle r={r3 + 2.5} fill="none" stroke={n.primary ? "#7c3aed" : "#06b6d4"} strokeOpacity="0.4" strokeWidth="1.4" />
                <circle r={r3} fill={n.primary ? "#7c3aed" : "#06b6d4"} />
                <circle r={r3 * 0.55} cx={-r3 * 0.25} cy={-r3 * 0.25} fill="white" fillOpacity="0.55" />
              </g>
            );
          })}
        </g>
      </svg>

      {/* HTML labels */}
      <div className="absolute inset-0 pointer-events-none">
        {nodes.map((n, i) => (
          <motion.div
            key={`label-${n.city}`}
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className={`absolute text-[9.5px] sm:text-[10.5px] font-bold whitespace-nowrap transition-colors ${
              active === i || n.primary ? "text-[var(--accent-violet)]" : "text-[var(--text-2)]"
            }`}
            style={{
              left: `${(n.x / 1000) * 100}%`,
              top:  `${(n.y / 1000) * 100}%`,
              transform: "translate(11px, -50%)",
            }}
          >
            {n.city}
            {n.primary && (
              <span className="ml-1 px-1 py-0.5 rounded text-[7px] font-bold uppercase tracking-wider bg-[var(--accent-violet-bg)] text-[var(--accent-violet)] border border-[var(--accent-violet-border)]">
                HQ
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Active city tooltip */}
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-10 pointer-events-none px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--accent-violet-border)] shadow-xl"
          style={{
            left:  `${(nodes[active].x / 1000) * 100}%`,
            top:   `${(nodes[active].y / 1000) * 100}%`,
            transform: "translate(-50%, calc(-100% - 16px))",
          }}
        >
          <p className="text-[12px] font-bold text-[var(--text-1)] leading-tight">{nodes[active].city}</p>
          {nodes[active].pop && <p className="text-[10px] text-[var(--text-3)] leading-tight mt-0.5">{nodes[active].pop}</p>}
          {typeof nodes[active].carriers === "number" && (
            <p className="text-[10px] text-[var(--accent-cyan)] font-semibold leading-tight mt-0.5">{nodes[active].carriers}+ carriers</p>
          )}
        </motion.div>
      )}

      {/* Bottom legend */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-[var(--text-3)] pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-purple)]" />
          <span>HQ</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-cyan)] ml-3" />
          <span>POP</span>
        </div>
        <span>{nodes.length} metros · {nodes.reduce((s, n) => s + (n.carriers ?? 0), 0)}+ carriers</span>
      </div>
    </div>
  );
}
