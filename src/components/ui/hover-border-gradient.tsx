"use client";
import { useState, useEffect, ReactNode, ElementType } from "react";
import { motion } from "framer-motion";

type Direction = "TOP" | "RIGHT" | "BOTTOM" | "LEFT";

const movingMap: Record<Direction, string> = {
  TOP:    "radial-gradient(20.7% 50% at 50% 0%,   hsl(0 0% 100% / 1) 0%, hsl(0 0% 100% / 0) 100%)",
  RIGHT:  "radial-gradient(16.6% 43.1% at 100% 50%,hsl(0 0% 100% / 1) 0%, hsl(0 0% 100% / 0) 100%)",
  BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, hsl(0 0% 100% / 1) 0%, hsl(0 0% 100% / 0) 100%)",
  LEFT:   "radial-gradient(16.2% 41.2% at 0% 50%, hsl(0 0% 100% / 1) 0%, hsl(0 0% 100% / 0) 100%)",
};

const highlight =
  "radial-gradient(75% 181.16% at 50% 50%, #7c3aed 0%, #06b6d4 50%, transparent 100%)";

export function HoverBorderGradient<T extends ElementType = "button">({
  children,
  containerClassName = "",
  className = "",
  as,
  duration = 1.4,
  ...props
}: {
  children: ReactNode;
  containerClassName?: string;
  className?: string;
  as?: T;
  duration?: number;
} & Omit<React.ComponentPropsWithoutRef<T>, "children">) {
  const Tag = (as || "button") as ElementType;
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  useEffect(() => {
    if (hovered) return;
    const order: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const id = setInterval(() => {
      setDirection(prev => order[(order.indexOf(prev) + 1) % order.length]);
    }, duration * 1000);
    return () => clearInterval(id);
  }, [hovered, duration]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full p-px ${containerClassName}`}
      {...props}
    >
      <div className={`relative z-10 rounded-[inherit] ${className}`}>{children}</div>
      <motion.div
        className="absolute inset-0 z-0 rounded-[inherit]"
        style={{ filter: "blur(2px)", position: "absolute", width: "100%", height: "100%" }}
        initial={{ background: movingMap[direction] }}
        animate={{ background: hovered ? [movingMap[direction], highlight] : movingMap[direction] }}
        transition={{ ease: "linear", duration }}
      />
      <div className="absolute inset-[2px] z-[1] rounded-[100px] bg-[var(--bg-card)]" />
    </Tag>
  );
}
