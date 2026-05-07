"use client";
import { useRef } from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function MovingBorder({
  children, className, containerClassName, borderClassName, duration = 2000, rx = "30%", ry = "30%", ...props
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: unknown;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMs = length / duration;
      progress.set((time * pxPerMs) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.x ?? 0);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.y ?? 0);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <div className={cn("relative h-12 overflow-hidden p-[1px] rounded-xl", containerClassName)} {...props}>
      <div className="absolute inset-0 rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute h-full w-full" width="100%" height="100%">
          <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
        </svg>
        <motion.div
          style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}
          className={cn("h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--blue-500)_40%,transparent_60%)]", borderClassName)}
        />
      </div>
      <div className={cn("relative z-10 h-full w-full rounded-xl flex items-center justify-center text-sm font-medium", className)}>
        {children}
      </div>
    </div>
  );
}
