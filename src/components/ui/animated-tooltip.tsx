"use client";
import { useState, ComponentType } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

type LogoComp = ComponentType<{ size?: number; className?: string }>;

export interface TooltipItem {
  id: number;
  name: string;
  designation?: string;
  /** Render a real SVG logo component (preferred). */
  Logo?: LogoComp;
  /** Fallback emoji if no logo is provided. */
  emoji?: string;
}

export function AnimatedTooltip({ items }: { items: TooltipItem[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const rotate     = useSpring(useTransform(x, [-100, 100], [-25, 25]), { stiffness: 100, damping: 5 });
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), { stiffness: 100, damping: 5 });

  return (
    <div className="flex flex-row items-center justify-center -space-x-2">
      {items.map(item => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => setHovered(item.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <AnimatePresence>
            {hovered === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 10 } }}
                exit={{ opacity: 0, y: 14, scale: 0.6 }}
                style={{ translateX, rotate, whiteSpace: "nowrap" }}
                className="absolute -top-14 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center rounded-md bg-[var(--bg-card)] z-50 shadow-xl px-3 py-1.5 border border-[var(--border)]"
              >
                <div className="absolute inset-x-2 -bottom-px h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-[var(--brand-purple)] to-transparent" />
                <p className="font-bold text-[var(--text-1)] text-xs leading-tight">{item.name}</p>
                {item.designation && <p className="text-[var(--text-3)] text-[10px]">{item.designation}</p>}
              </motion.div>
            )}
          </AnimatePresence>
          <div
            onMouseMove={(e) => {
              const r = (e.target as HTMLElement).getBoundingClientRect();
              x.set(e.clientX - r.left - r.width / 2);
            }}
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[var(--bg-card)] border-2 border-[var(--border)] hover:border-[var(--accent-violet-border)] flex items-center justify-center text-[var(--text-1)] group-hover:scale-110 group-hover:z-30 transition-all duration-300 select-none cursor-pointer shadow-sm"
          >
            {item.Logo ? <item.Logo size={22} /> : <span className="text-xl">{item.emoji ?? "🏢"}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
