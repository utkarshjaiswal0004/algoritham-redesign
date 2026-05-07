"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Server, Cloud } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { SkeletonGlobe } from "@/components/ui/skeleton";

// Heavy canvas/DOM components are lazy-loaded with skeleton fallbacks
const WireframeGlobe   = dynamic(() => import("@/components/ui/wireframe-globe").then(m => m.WireframeGlobe),    { ssr: false, loading: () => <SkeletonGlobe /> });
const BackgroundBoxes  = dynamic(() => import("@/components/ui/background-boxes").then(m => m.BackgroundBoxes), { ssr: false, loading: () => null });

const badges = [
  { icon: Server, label: "99.99% Uptime SLA",         color: "purple" },
  { icon: Shield, label: "ISO 9001 · ITIL Certified",  color: "rose"   },
  { icon: Cloud,  label: "IaaS · PaaS · SaaS",         color: "cyan"   },
];

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[var(--bg-base)]">

      {/* ── Skewed grid of boxes — subtle backdrop ─────────── */}
      <div className="absolute inset-0 z-0 opacity-40">
        <BackgroundBoxes />
      </div>

      {/* ── Wireframe globe — flowing wires + waves + hover ── */}
      <div className="absolute inset-0 z-[1]" style={{ opacity: "var(--globe-opacity)" }}>
        <WireframeGlobe className="w-full h-full" />
      </div>

      {/* ── Spotlight — soft purple beam from top-left ────── */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60 h-[80vh] w-[60vw]" fill="#7c3aed" />

      {/* ── Edge vignette — corners fade, centre stays clear ─ */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, var(--hero-edge) 100%)`,
        }}
      />

      {/* ── Content — centered ────────────────────────────── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 pt-36 sm:pt-40 lg:pt-48 pb-28 sm:pb-32 lg:pb-40 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-7"
          style={{
            borderColor: "var(--accent-violet-border)",
            background:  "var(--accent-violet-bg)",
            color:       "var(--accent-violet)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--brand-purple)" }} />
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
            Established 2009 · National Technology Integrator
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-[var(--text-1)] tracking-tight leading-[1.05] mb-6 w-full"
        >
          End-to-End IT{" "}
          <span className="brand-gradient animate-gradient">Infrastructure</span>
          <br />
          Built to Last.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[var(--text-2)] text-base sm:text-lg leading-relaxed mb-10 max-w-2xl"
        >
          Your complete IT partner — from servers and networking to cloud,
          security, and telecom. We manage the infrastructure so you can focus
          on growing your business.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 w-full sm:w-auto"
        >
          <a
            href="/contact"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] shadow-lg shadow-violet-500/25 hover:shadow-violet-500/45 hover:-translate-y-0.5 transition-all duration-200"
          >
            Get Free IT Assessment
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="tel:+919930181363"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-medium text-[var(--text-1)] rounded-xl hover:-translate-y-0.5 transition-all duration-200"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <Phone size={14} />
            +91 99301 81363
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="flex flex-wrap justify-center gap-2.5"
        >
          {badges.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: color === "purple" ? "var(--accent-violet)"
                     : color === "rose"   ? "var(--accent-rose)"
                     :                      "var(--accent-cyan)",
              }}
            >
              <Icon size={12} />
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom fade ───────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to top, var(--bg-base), transparent)" }}
      />
    </section>
  );
}
