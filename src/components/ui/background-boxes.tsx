"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

const HOVER_COLORS = [
  "#e63946", "#d63070", "#c0417a", "#a040a0",
  "#8b35cc", "#7c3aed", "#5b3fd0", "#3b5cc4",
  "#2563eb", "#1a88d4", "#06b6d4",
];

/**
 * Aceternity-inspired BackgroundBoxes.
 * A perspective-skewed grid of cells that highlight in random brand colors on hover,
 * then slowly fade back. Pointer-events are kept on the canvas via the rows.
 */
export function BackgroundBoxes({
  className = "",
  rows = 80,
  cols = 50,
}: { className?: string; rows?: number; cols?: number }) {
  // Pre-pick a stable color sequence per cell to avoid re-rendering randomness
  const cells = useMemo(
    () =>
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => HOVER_COLORS[Math.floor(Math.random() * HOVER_COLORS.length)]),
      ),
    [rows, cols],
  );

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none ${className}`}
      aria-hidden
    >
      <div
        style={{
          transform:
            "translate(-44%, -52%) skewX(-48deg) skewY(14deg) scale(0.72) rotate(0deg) translateZ(0)",
        }}
        className="absolute left-1/2 top-1/2 flex w-[180%] h-[170%] p-4"
      >
        {cells.map((row, i) => (
          <div key={`row-${i}`} className="relative h-8 w-16 border-l border-[var(--border)]">
            {row.map((color, j) => (
              <motion.div
                key={`cell-${i}-${j}`}
                whileHover={{
                  backgroundColor: color,
                  transition: { duration: 0 },
                }}
                animate={{
                  backgroundColor: "rgba(0,0,0,0)",
                  transition: { duration: 2.2 },
                }}
                className="relative h-8 w-16 border-r border-t border-[var(--border)] pointer-events-auto"
              >
                {j % 2 === 0 && i % 2 === 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="absolute h-5 w-5 -top-[10px] -left-[12px] text-[var(--border-strong)] stroke-[1px] pointer-events-none"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                ) : null}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
