"use client";
import { motion } from "framer-motion";

export function Spotlight({
  className = "",
  fill = "#7c3aed",
}: { className?: string; fill?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className={`pointer-events-none absolute z-[1] ${className}`}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3787 2842"
        fill="none"
        preserveAspectRatio="none"
      >
        <g filter="url(#spot-blur)">
          <ellipse
            cx="1924.71"
            cy="273.501"
            rx="1924.71"
            ry="273.501"
            transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
            fill={fill}
            fillOpacity="0.18"
          />
        </g>
        <defs>
          <filter id="spot-blur" x="0" y="0" width="3787" height="2842" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
}
