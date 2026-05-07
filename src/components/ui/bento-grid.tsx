"use client";
import { ReactNode } from "react";

export function BentoGrid({
  children,
  className = "",
}: { children: ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[14rem] sm:auto-rows-[16rem] gap-4 ${className}`}>
      {children}
    </div>
  );
}

export function BentoItem({
  children,
  className = "",
  span = "1x1",
}: {
  children: ReactNode;
  className?: string;
  span?: "1x1" | "2x1" | "1x2" | "2x2";
}) {
  const spanMap: Record<string, string> = {
    "1x1": "",
    "2x1": "sm:col-span-2",
    "1x2": "sm:row-span-2",
    "2x2": "sm:col-span-2 sm:row-span-2",
  };

  return (
    <div
      className={`group relative rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden hover:border-[var(--accent-violet-border)] transition-all duration-300 ${spanMap[span]} ${className}`}
    >
      {children}
    </div>
  );
}
