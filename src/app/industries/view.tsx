"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Heart } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { DottedBackground } from "@/components/ui/dotted-background";
import { iconFor } from "@/lib/icon-map";
import type { Industry, IndustriesPage } from "@/sanity/types";

const ACCENT: Record<NonNullable<Industry["accent"]>, string> = {
  rose:   "var(--accent-rose)",
  cyan:   "var(--accent-cyan)",
  blue:   "var(--accent-violet)",
  pink:   "var(--accent-rose)",
  orange: "var(--accent-rose)",
  violet: "var(--accent-violet)",
};

type Props = { page: IndustriesPage; industries: Industry[] };

export function IndustriesView({ page, industries }: Props) {
  return (
    <>
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <DottedBackground />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(6,182,212,0.07),transparent)]" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-widest mb-4 inline-flex items-center gap-2">
              <Sparkles size={12} /> {page.eyebrow}
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-1)] tracking-tight mb-5 leading-[1.05]">
              {page.headlinePre}<br />
              <span className="brand-gradient animate-gradient">{page.headlineGradient}</span>
            </h1>
            <p className="text-[var(--text-2)] text-lg md:text-xl max-w-2xl leading-relaxed">{page.subhead}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {(page.heroStats ?? []).map((s) => (
              <div key={s.label} className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] text-center">
                <div className="text-2xl md:text-3xl font-black brand-gradient mb-0.5">{s.value}</div>
                <div className="text-[10px] sm:text-xs text-[var(--text-3)] uppercase tracking-widest font-semibold">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind, i) => {
            const Icon   = iconFor(ind.icon, Heart);
            const accent = ACCENT[ind.accent ?? "violet"];
            const slug   = ind.slug?.current ?? "";
            return (
              <motion.div
                key={slug || ind.title} id={slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <CardSpotlight
                  className="group rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent-violet-border)] hover:-translate-y-0.5 transition-all duration-300 h-full"
                  color={accent}
                  radius={360}
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-5">
                      <motion.div
                        whileHover={{ scale: 1.08, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 280 }}
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${accent}1f`, color: accent, boxShadow: `inset 0 0 0 1px ${accent}25` }}
                      >
                        <Icon size={22} />
                      </motion.div>
                      {ind.stat && (
                        <div className="text-right">
                          <div className="text-base font-black leading-none" style={{ color: accent }}>{ind.stat.value}</div>
                          <div className="text-[9px] font-semibold uppercase tracking-widest text-[var(--text-3)] mt-1">{ind.stat.label}</div>
                        </div>
                      )}
                    </div>

                    <h3 className="text-[var(--text-1)] font-bold text-lg mb-2 tracking-tight">{ind.title}</h3>
                    <p className="text-[var(--text-2)] text-sm leading-relaxed mb-5 flex-1">{ind.desc}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(ind.services ?? []).map((sv) => (
                        <span
                          key={sv}
                          className="text-[10.5px] px-2.5 py-1 rounded-full border font-semibold"
                          style={{ background: `${accent}10`, color: accent, borderColor: `${accent}33` }}
                        >
                          {sv}
                        </span>
                      ))}
                    </div>

                    <a
                      href="/contact"
                      className="group/cta inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-3)] group-hover:text-[var(--text-2)] transition-colors mt-auto pt-3 border-t border-[var(--border)]"
                    >
                      <span className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: accent }} />
                        Talk to a {ind.title.toLowerCase()} specialist
                      </span>
                      <ArrowUpRight size={11} className="ml-auto group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </CardSpotlight>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
