"use client";
import { useMemo } from "react";

/**
 * SVG dotted globe — particles arranged on a sphere, projected to 2D
 * with simple perspective. Slow rotation animation is applied via CSS.
 * Pure decorative background — pointer-events disabled.
 */
export function DottedGlobe({
  className = "",
  rings = 22,
  perRing = 60,
}: { className?: string; rings?: number; perRing?: number }) {

  // Pre-compute dot positions (fixed seed so SSR and CSR match).
  const dots = useMemo(() => {
    const out: { cx: number; cy: number; r: number; alpha: number }[] = [];
    const cx0 = 50, cy0 = 50;
    const radius = 40;

    for (let i = 0; i < rings; i++) {
      // Latitude from -π/2 to π/2
      const lat = -Math.PI / 2 + (Math.PI * (i + 0.5)) / rings;
      const cosLat = Math.cos(lat);
      const sinLat = Math.sin(lat);
      const ringR = radius * cosLat;
      const ringY = cy0 + radius * sinLat;
      // Fewer dots near the poles for a nicer look
      const n = Math.max(6, Math.floor(perRing * cosLat));
      for (let j = 0; j < n; j++) {
        const lon = (Math.PI * 2 * j) / n;
        const x = cx0 + ringR * Math.cos(lon);
        // simple perspective fade — front dots are larger/more opaque
        const depth = (Math.sin(lon) + 1) / 2; // 0..1
        out.push({
          cx: x,
          cy: ringY,
          r: 0.32 + depth * 0.28,
          alpha: 0.22 + depth * 0.55,
        });
      }
    }
    return out;
  }, [rings, perRing]);

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id="dg-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#000" stopOpacity="1" />
            <stop offset="80%"  stopColor="#000" stopOpacity="1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <mask id="dg-mask">
            <rect width="100" height="100" fill="url(#dg-fade)" />
          </mask>
        </defs>
        <g mask="url(#dg-mask)" className="dg-rotate" style={{ transformOrigin: "50% 50%" }}>
          {dots.map((d, i) => (
            <circle
              key={i}
              cx={d.cx} cy={d.cy} r={d.r}
              fill="currentColor"
              opacity={d.alpha}
            />
          ))}
        </g>
      </svg>
      <style jsx>{`
        .dg-rotate {
          animation: dg-spin 90s linear infinite;
          transform-box: fill-box;
        }
        @keyframes dg-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .dg-rotate { animation: none; }
        }
      `}</style>
    </div>
  );
}
