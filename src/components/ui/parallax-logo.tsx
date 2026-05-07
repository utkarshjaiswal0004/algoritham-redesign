"use client";
import { useRef, MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Logo with subtle parallax + ambient idle animation.
 * - Cursor: small 3D tilt + tiny translate.
 * - Idle:   continuous gentle bob (y) and breathing scale, plus orbiting glow ring.
 */
export function ParallaxLogo({
  src   = "/logo.png",
  alt   = "Logo",
  size  = 460,
  tilt  = 6,    // max degrees
  pull  = 4,    // max px translate
}: {
  src?: string;
  alt?: string;
  size?: number;
  tilt?: number;
  pull?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);   // -1..1
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 180, damping: 22, mass: 0.6 });

  const rotateY = useTransform(sx, [-1, 1], [-tilt,  tilt]);
  const rotateX = useTransform(sy, [-1, 1], [ tilt, -tilt]);
  const tx      = useTransform(sx, [-1, 1], [-pull, pull]);
  const ty      = useTransform(sy, [-1, 1], [-pull, pull]);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width)  * 2 - 1);
    my.set(((e.clientY - r.top)  / r.height) * 2 - 1);
  }
  function onLeave() { mx.set(0); my.set(0); }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative"
      style={{ width: size, height: size, perspective: 1200, maxWidth: "100%" }}
    >
      {/* Static violet glow ring — breathes */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.22),transparent_70%)] blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cyan inner ring — counter-breathes */}
      <motion.div
        className="absolute inset-12 rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.16),transparent_70%)] blur-2xl pointer-events-none"
        animate={{ scale: [1.04, 1, 1.04], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbiting brand-gradient ring — slow revolution */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute inset-2 rounded-full opacity-25"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, #7c3aed 320deg, #06b6d4 350deg, transparent 360deg)",
            mask:        "radial-gradient(circle, transparent 60%, black 60.5%, black 64%, transparent 64.5%)",
            WebkitMask:  "radial-gradient(circle, transparent 60%, black 60.5%, black 64%, transparent 64.5%)",
          }}
        />
      </motion.div>

      {/* Idle bob layer — y oscillates gently while tilt + cursor pull stay live */}
      <motion.div
        className="absolute inset-0"
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ rotateX, rotateY, x: tx, y: ty, transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.025, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes={`${size}px`}
              priority
              className="object-contain drop-shadow-[0_15px_30px_rgba(124,58,237,0.30)]"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
