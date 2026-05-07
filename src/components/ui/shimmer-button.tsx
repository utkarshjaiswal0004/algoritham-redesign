"use client";
import { ReactNode, ComponentPropsWithoutRef } from "react";

export function ShimmerButton({
  children,
  className = "",
  ...props
}: { children: ReactNode } & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`relative inline-flex h-12 overflow-hidden rounded-xl p-[1.5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-purple)] ${className}`}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[shimmer-spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e63946_0%,#7c3aed_50%,#06b6d4_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-[var(--bg-card)] px-6 py-1 text-sm font-semibold text-[var(--text-1)] backdrop-blur-3xl">
        {children}
      </span>
      <style jsx>{`
        @keyframes shimmer-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}
