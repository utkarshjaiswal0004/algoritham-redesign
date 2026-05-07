"use client";
import { useRef, MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Logo image that reacts to cursor proximity.
 * - Tilts in 3D following the cursor (perspective rotateX/rotateY).
 * - Translates slightly toward the cursor (magnetic pull).
 * - Animated colour-shift glow underneath.
 * Pure CSS transforms — no canvas or particle system.
 */
export function MagneticLogo({
  src = "/logo.png",
  alt = "Logo",
  size = 460,
  strength = 22,        // max degrees of tilt
  pull = 12,            // max px of translate
}: {
  src?: string;
  alt?: string;
  size?: number;
  strength?: number;
  pull?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);   // -1..1 normalised cursor X
  const my = useMotionValue(0);   // -1..1 normalised cursor Y

  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  // 3D tilt (note the inversion on Y so it tilts naturally toward cursor)
  const rotateY = useTransform(sx, [-1, 1], [-strength,  strength]);
  const rotateX = useTransform(sy, [-1, 1], [ strength, -strength]);
  const tx      = useTransform(sx, [-1, 1], [-pull, pull]);
  const ty      = useTransform(sy, [-1, 1], [-pull, pull]);

  // Glow position follows cursor (pixels relative to centre)
  const glowX = useTransform(sx, [-1, 1], ["30%", "70%"]);
  const glowY = useTransform(sy, [-1, 1], ["30%", "70%"]);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    // Normalise to -1..1 from element centre
    mx.set(((e.clientX - r.left) / r.width)  * 2 - 1);
    my.set(((e.clientY - r.top)  / r.height) * 2 - 1);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative"
      style={{ width: size, height: size, perspective: 1100 }}
    >
      {/* Trailing colour glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x} ${y}, rgba(124,58,237,0.55), rgba(6,182,212,0.30) 35%, transparent 70%)`,
          ),
        }}
      />

      {/* Tilting logo */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          rotateX, rotateY,
          x: tx, y: ty,
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          priority
          className="object-contain drop-shadow-[0_25px_45px_rgba(124,58,237,0.35)]"
        />
        {/* Specular sheen — reflects "light" from cursor */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.45), transparent 45%)`,
            ),
          }}
        />
      </motion.div>
    </div>
  );
}
