"use client";
import { useMemo, useRef, MouseEvent, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const CHARS = "0123456789ABCDEFabcdef!?{}<>+-*/&%#@";

function generate(rows: number, cols: number) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join(""),
  ).join("\n");
}

/**
 * Aceternity Evervault-style card.
 * Children are rendered on top of the base card.
 * On hover, an encrypted-text + brand-gradient reveal follows the cursor
 * inside a large radial mask — visible across the entire card surface.
 */
export function EvervaultCard({
  children,
  className = "",
}: { children?: ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  // Stable per-render noise — only ever rendered on the client (`"use client"`).
  const text = useMemo(() => generate(40, 60), []);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  }

  // Big mask so the reveal feels generous on small + large cards alike.
  const maskImage = useMotionTemplate`radial-gradient(360px at ${mouseX}px ${mouseY}px, white, transparent 75%)`;

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`group relative isolate overflow-hidden ${className}`}
    >
      {/* Solid base layer (matches surrounding card surface) */}
      <div className="absolute inset-0 -z-10 bg-[var(--bg-card)]" />

      {/* Brand-gradient reveal (revealed by mask under cursor) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          background:
            "linear-gradient(135deg, #e63946 0%, #c0417a 25%, #7c3aed 50%, #2563eb 75%, #06b6d4 100%)",
        }}
      />

      {/* Encrypted character noise (overlaid on the gradient) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 select-none break-all whitespace-pre font-mono text-[10px] leading-[1.05] text-white/95 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          mixBlendMode: "multiply",
        }}
      >
        {text}
      </motion.div>

      {/* Content sits on top */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
