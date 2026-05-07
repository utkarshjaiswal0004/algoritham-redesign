"use client";
import { ReactNode } from "react";

/**
 * Wraps a card and adds a rotating gradient border that's visible on hover.
 * The card itself sits on top via the `inner` element.
 */
export function GlowingEffect({
  children,
  className = "",
  containerClassName = "",
  innerClassName = "",
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  innerClassName?: string;
}) {
  return (
    <div className={`group relative ${containerClassName}`}>
      <div
        className={`absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${className}`}
        style={{
          background: `conic-gradient(from var(--ge-angle, 0deg), #e63946, #c0417a, #7c3aed, #2563eb, #06b6d4, #e63946)`,
          animation: "ge-spin 6s linear infinite",
        }}
      />
      <div className={`relative rounded-[inherit] ${innerClassName}`}>{children}</div>
      <style jsx>{`
        @keyframes ge-spin {
          to { --ge-angle: 360deg; }
        }
      `}</style>
    </div>
  );
}
