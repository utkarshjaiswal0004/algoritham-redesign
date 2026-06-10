"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import type { CaseStudy, CaseStudiesPage } from "@/sanity/types";

type Props = { page: CaseStudiesPage; cases: CaseStudy[] };

export function CaseStudiesView({ page, cases }: Props) {
  return (
    <>
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(230,57,70,0.07),transparent)]" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-semibold text-[var(--accent-rose)] uppercase tracking-widest mb-4">{page.eyebrow}</p>
            <h1 className="text-5xl md:text-6xl font-black text-[var(--text-1)] tracking-tight mb-5">
              {page.headlinePre}<br />
              <span className="brand-gradient animate-gradient">{page.headlineGradient}</span>
            </h1>
            <p className="text-[var(--text-2)] text-xl max-w-2xl leading-relaxed">{page.subhead}</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <TracingBeam className="px-2">
            <div className="space-y-6">
              {cases.map((c, i) => (
                <motion.div key={c.num}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-violet-500/20 transition-all duration-300">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <span className="text-xs font-semibold text-[var(--accent-rose)] uppercase tracking-widest">{c.industry}</span>
                      <h2 className="text-2xl font-black text-[var(--text-1)] mt-1">{c.client}</h2>
                    </div>
                    <span className="text-6xl font-black text-[var(--text-1)] opacity-[0.04] select-none">{c.num}</span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                      <p className="text-[11px] font-semibold text-[var(--text-3)] uppercase tracking-widest mb-2">The Challenge</p>
                      <p className="text-[var(--text-2)] text-sm leading-relaxed">{c.challenge}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[var(--text-3)] uppercase tracking-widest mb-2">Our Solution</p>
                      <p className="text-[var(--text-2)] text-sm leading-relaxed">{c.solution}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-2">Outcome</p>
                      <p className="text-[var(--text-1)] text-sm leading-relaxed font-medium">{c.outcome}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {(c.metrics ?? []).map((m) => (
                      <div key={m.label} className="p-4 rounded-xl bg-gradient-to-br from-violet-500/[0.06] to-cyan-500/[0.06] border border-violet-500/15 text-center">
                        <div className="text-2xl font-black brand-gradient mb-1">{m.value}</div>
                        <div className="text-[11px] text-[var(--text-3)] font-medium">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(c.tags ?? []).map((t) => (
                      <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--bg-card-2)] border border-[var(--border)] text-[var(--text-2)] font-semibold">{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </TracingBeam>

          <div className="mt-12 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#7c3aed]/10 to-[#06b6d4]/10 border border-violet-500/20 text-center">
            <h3 className="text-2xl md:text-3xl font-black text-[var(--text-1)] mb-3">{page.ctaHeadline}</h3>
            <p className="text-[var(--text-2)] mb-6">{page.ctaSubhead}</p>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20">
              Get Free Assessment <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
