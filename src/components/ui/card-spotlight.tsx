"use client";
import { useRef, useState, MouseEvent, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export function CardSpotlight({
  children,
  className = "",
  radius = 350,
  color = "#7c3aed",
}: { children: ReactNode; className?: string; radius?: number; color?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const { left, top } = divRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const background  = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${color}1a, transparent 72%)`;
  const borderGlow  = useMotionTemplate`radial-gradient(${radius * 1.4}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 70%)`;

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`group relative ${className}`}
    >
      {/* Subtle border halo */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300"
        style={{ background: borderGlow, opacity: hovering ? 0.20 : 0 }}
      />
      {/* Light inner spotlight overlay — content stays readable */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
        style={{ background, opacity: hovering ? 1 : 0 }}
      />
      <div className="relative rounded-[inherit] h-full">{children}</div>
    </div>
  );
}
