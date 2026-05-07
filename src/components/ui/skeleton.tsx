"use client";

/**
 * Animated shimmer skeleton — pure CSS, no JS.
 * Use as a loading placeholder while heavy components stream in.
 */
export function Skeleton({
  className = "",
  rounded = "rounded-2xl",
}: { className?: string; rounded?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] ${rounded} ${className}`}
      aria-hidden
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5"
      />
      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}

export function SkeletonGlobe({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full grid place-items-center ${className}`} aria-hidden>
      <div className="relative w-3/4 aspect-square rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_70%)] animate-pulse">
        <div className="absolute inset-[10%] rounded-full border border-[var(--border-strong)] opacity-30" />
        <div className="absolute inset-[25%] rounded-full border border-[var(--border-strong)] opacity-20" />
      </div>
    </div>
  );
}

export function SkeletonMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-[1/1] rounded-2xl overflow-hidden ${className}`} aria-hidden>
      <Skeleton className="absolute inset-0" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="w-1/2 h-1/2 rounded-2xl bg-[var(--bg-card-2)] opacity-60 animate-pulse" />
      </div>
    </div>
  );
}
