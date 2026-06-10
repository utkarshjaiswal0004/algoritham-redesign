"use client";
import { motion } from "framer-motion";
import { Target, Eye, Compass, Sparkles } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { iconFor } from "@/lib/icon-map";
import type { MissionVisionPage } from "@/sanity/types";

export function MissionVisionView({ page }: { page: MissionVisionPage }) {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(124,58,237,0.10),transparent)]" />
        <div className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent_85%)]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--border-strong) 0.8px, transparent 0.8px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
              <Sparkles size={12} /> {page.eyebrow}
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-1)] tracking-tight mb-6 leading-[1.05]">
              {page.headlinePre}{" "}
              <span className="brand-gradient animate-gradient">{page.headlineGradient}</span>
            </h1>
            {page.intro && (
              <p className="text-[var(--text-2)] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">{page.intro}</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative py-24 px-6 bg-[var(--bg-card)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-semibold text-[var(--accent-rose)] uppercase tracking-widest mb-4 inline-flex items-center gap-2">
              <Target size={12} /> {page.missionEyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-1)] tracking-tight mb-6 leading-tight">
              {page.missionHeadline}
            </h2>
            <p className="text-[var(--text-2)] text-lg leading-relaxed mb-8">
              We don't sell hardware. We don't sell hours. We sell the certainty that your IT estate will be there when your business needs it — measured, monitored, and accountable.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative h-[420px] rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--bg-base)]">
            <EvervaultCard className="absolute inset-0">
              <div className="flex items-center justify-center h-full pointer-events-none">
                <span className="text-6xl md:text-7xl font-black tracking-tight brand-gradient">MISSION</span>
              </div>
            </EvervaultCard>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {(page.missionPillars ?? []).map((p, i) => {
            const Icon = iconFor(p.icon, Target);
            return (
              <motion.div key={p.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <CardSpotlight className="rounded-2xl bg-[var(--bg-base)] border border-[var(--border)] hover:border-violet-500/25 transition-all duration-300 h-full">
                  <div className="p-6 h-full">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed]/15 to-[#06b6d4]/15 flex items-center justify-center mb-4">
                      <Icon size={18} className="text-violet-500" />
                    </div>
                    <h3 className="text-[var(--text-1)] font-bold mb-2">{p.title}</h3>
                    <p className="text-[var(--text-2)] text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </CardSpotlight>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Vision */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.10),transparent)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
            <Eye size={12} /> {page.visionEyebrow}
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-1)] tracking-tight mb-6 leading-tight"
          >
            {page.visionHeadline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--text-2)] text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Infrastructure that is invisible when it works, predictable when it stretches, and explainable when it doesn't. That's the standard we hold every system on our managed estate to.
          </motion.p>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 px-6 bg-[var(--bg-card)] border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
              <Compass size={12} /> {page.principlesEyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-1)] tracking-tight">{page.principlesHeadline}</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(page.principles ?? []).map((p, i) => {
              const Icon = iconFor(p.icon, Compass);
              return (
                <motion.div key={p.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <CardSpotlight className="rounded-2xl bg-[var(--bg-base)] border border-[var(--border)] hover:border-violet-500/25 transition-all duration-300 h-full" radius={320}>
                    <div className="p-6 h-full">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed]/15 to-[#06b6d4]/15 flex items-center justify-center mb-4">
                        <Icon size={18} className="text-violet-500" />
                      </div>
                      <h3 className="text-[var(--text-1)] font-bold mb-2">{p.title}</h3>
                      <p className="text-[var(--text-2)] text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </CardSpotlight>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
