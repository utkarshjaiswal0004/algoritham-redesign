"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Server } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { SkeletonGlobe } from "@/components/ui/skeleton";
import { iconFor } from "@/lib/icon-map";
import type { Home as HomeContent } from "@/sanity/types";

const WireframeGlobe = dynamic(
  () => import("@/components/ui/wireframe-globe").then((m) => m.WireframeGlobe),
  { ssr: false, loading: () => <SkeletonGlobe /> },
);

type Props = { home: HomeContent; uptimeSLA: string };

const COLOR_MAP: Record<string, string> = {
  purple: "var(--accent-violet)",
  rose:   "var(--accent-rose)",
  cyan:   "var(--accent-cyan)",
};

/**
 * Minimal mega-wordmark hero. The big text IS the headline; the wireframe
 * globe + spotlight are the only background elements. Trust badges have
 * moved to the TrustBar — keeping this section quiet by design.
 */
export function Hero({ home, uptimeSLA }: Props) {
  const badges = (home.heroBadges ?? []).map((b) => ({
    ...b,
    label: b.label.replace("{uptime}", uptimeSLA),
    Icon:  iconFor(b.icon, Server),
  }));

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[var(--bg-base)]">

      {/* Globe — softer, behind everything */}
      <div className="absolute inset-0 z-0" style={{ opacity: "var(--globe-opacity)" }}>
        <WireframeGlobe className="w-full h-full" />
      </div>

      {/* Soft brand spotlight from top */}
      <Spotlight
        className="-top-32 left-1/2 -translate-x-1/2 h-[85vh] w-[80vw]"
        fill="#7c3aed"
      />

      {/* Centre clear, edges fade — focuses attention on the wordmark */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 35%, var(--hero-edge) 100%)",
        }}
      />

      {/* Centered content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 pt-32 sm:pt-36 pb-24 sm:pb-28 flex flex-col items-center text-center">

        {/* Eyebrow */}
        {home.heroEyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-10"
            style={{
              borderColor: "var(--accent-violet-border)",
              background:  "var(--accent-violet-bg)",
              color:       "var(--accent-violet)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--brand-purple)" }}
            />
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
              {home.heroEyebrow}
            </span>
          </motion.div>
        )}

        {/* Mega wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="font-black text-[var(--text-1)] tracking-tight leading-[0.92] mb-7 w-full"
        >
          {home.heroHeadlinePre && (
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--text-2)] mb-3">
              {home.heroHeadlinePre}
            </span>
          )}
          <span className="block text-[18vw] sm:text-[14vw] lg:text-[11vw] xl:text-[160px] brand-gradient animate-gradient">
            {home.heroHeadlineGradient}
          </span>
          <span className="block text-[10vw] sm:text-[7vw] lg:text-[6vw] xl:text-[88px] text-[var(--text-1)] font-light tracking-[-0.02em] mt-1">
            {home.heroHeadlinePost}
          </span>
        </motion.h1>

        {/* Single tagline (optional) */}
        {home.heroBrandLine && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="text-[var(--text-2)] text-base sm:text-lg max-w-2xl leading-relaxed mb-10"
          >
            {home.heroBrandLine}
          </motion.p>
        )}

        {/* Long subhead — only rendered if editor explicitly sets it */}
        {home.heroSubhead && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[var(--text-3)] text-sm sm:text-base max-w-xl leading-relaxed mb-10"
          >
            {home.heroSubhead}
          </motion.p>
        )}

        {/* One CTA + inline call link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-7"
        >
          {home.heroPrimaryCta && (
            <a
              href={home.heroPrimaryCta.href}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5 transition-all duration-200"
            >
              {home.heroPrimaryCta.label}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          )}
          {home.heroSecondaryCta && (
            <a
              href={home.heroSecondaryCta.href}
              className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--text-2)] hover:text-[var(--accent-violet)] transition-colors"
            >
              <Phone size={14} />
              <span>or call <span className="font-semibold text-[var(--text-1)] group-hover:text-[var(--accent-violet)] transition-colors">{home.heroSecondaryCta.label}</span></span>
            </a>
          )}
        </motion.div>

        {/* Optional small trust strip — only rendered if editor adds badges */}
        {badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-12 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-[var(--text-3)]"
          >
            {badges.map(({ Icon, label, color }, i) => (
              <span key={label} className="inline-flex items-center gap-1.5">
                <Icon size={11} style={{ color: COLOR_MAP[color ?? "purple"] }} />
                {label}
                {i < badges.length - 1 && (
                  <span className="ml-6 hidden sm:inline opacity-30">·</span>
                )}
              </span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Bottom fade into the next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to top, var(--bg-base), transparent)" }}
      />
    </section>
  );
}
