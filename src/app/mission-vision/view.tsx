"use client";
import { motion } from "framer-motion";
import { Target, Eye, Compass, Sparkles, Quote, ArrowRight, Check, X } from "lucide-react";
import Link from "next/link";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Meteors } from "@/components/ui/meteors";
import { Spotlight } from "@/components/ui/spotlight";
import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { MovingBorder } from "@/components/ui/moving-border";
import { iconFor } from "@/lib/icon-map";
import type { MissionVisionPage, SiteSettings } from "@/sanity/types";

type Props = { page: MissionVisionPage; site: SiteSettings };

const WE_DO = [
  "Pick up the phone within minutes — not hours",
  "Document every change in audit-grade tickets",
  "Renew engineer certifications every quarter",
  "Run incident replays after every Sev-1",
  "Publish RPO/RTO before a system ever goes live",
  "Tell you when something isn't worth doing",
];

const WE_DONT = [
  "Push hardware you don't need",
  "Hide behind L1 / L2 triage queues",
  "Promise SLAs we can't measure",
  "Lock you into vendors with the best margin",
  "Bill hours that didn't produce outcomes",
  "Ghost you after the project goes live",
];

export function MissionVisionView({ page, site }: Props) {
  const stats = [
    { v: site.uptimeSLA       ?? "99.99%", l: "Uptime SLA" },
    { v: site.projectsDelivered?? "1200+", l: "Projects delivered" },
    { v: site.yearsInBusiness ?? "15+",    l: "Years building" },
    { v: site.carriers        ?? "40+",    l: "Telecom carriers" },
  ];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-28 px-6 overflow-hidden min-h-[70vh] flex items-center">
        <Spotlight className="-top-20 left-1/2 -translate-x-1/2 h-[70vh] w-[80vw]" fill="#7c3aed" />
        <Meteors number={14} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(124,58,237,0.10),transparent)]" />
        <div className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent_85%)]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--border-strong) 0.8px, transparent 0.8px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <HoverBorderGradient
              containerClassName="text-xs mb-8 mx-auto"
              className="flex items-center gap-2 px-4 py-2 text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-[var(--text-1)]"
            >
              <Sparkles size={12} className="text-[var(--accent-violet)]" />
              <span>{page.eyebrow ?? "Mission · Vision · Principles"}</span>
            </HoverBorderGradient>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-1)] tracking-tight mb-6 leading-[1.02]">
              {page.headlinePre}{" "}
              <span className="brand-gradient animate-gradient">{page.headlineGradient}</span>
            </h1>
            {page.intro && (
              <p className="text-[var(--text-2)] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">{page.intro}</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-[var(--bg-card)] border-y border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_100%_50%,rgba(230,57,70,0.05),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — headline + body */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <p className="text-xs font-semibold text-[var(--accent-rose)] uppercase tracking-widest mb-4 inline-flex items-center gap-2">
              <Target size={12} /> {page.missionEyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-1)] tracking-tight mb-6 leading-[1.1]">
              {page.missionHeadline}
            </h2>
            <p className="text-[var(--text-2)] text-lg leading-relaxed mb-4">
              We don't sell hardware. We don't sell hours. We sell the certainty that your IT estate will be there when your business needs it — measured, monitored, and accountable.
            </p>
            <p className="text-[var(--text-2)] text-base leading-relaxed">
              That certainty is built deliberately: certified engineers on every platform, ITIL-aligned process behind every change, observability before every promise.
            </p>
          </motion.div>

          {/* Right — moving-border quote card + stats stack (replaces the
              previous EvervaultCard, which felt off in this section) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-4"
          >
            <MovingBorder
              duration={4000}
              containerClassName="h-auto p-px rounded-3xl"
              className="bg-[var(--bg-base)] rounded-3xl text-left"
            >
              <div className="relative p-7 sm:p-8 w-full">
                <Quote size={28} className="text-[var(--accent-violet)] opacity-40 mb-3" />
                <p className="text-[var(--text-1)] text-lg sm:text-xl font-semibold leading-snug mb-4">
                  &ldquo;The business doesn&apos;t notice IT — because we did.&rdquo;
                </p>
                <p className="text-xs uppercase tracking-widest font-semibold text-[var(--text-3)]">
                  — How we know it&apos;s working
                </p>
              </div>
            </MovingBorder>

            <div className="grid grid-cols-2 gap-3">
              {stats.map(({ v, l }, i) => (
                <motion.div
                  key={l}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="relative rounded-2xl p-4 bg-[var(--bg-base)] border border-[var(--border)] hover:border-[var(--accent-violet-border)] transition-colors"
                >
                  <div className="text-2xl font-black brand-gradient leading-none">{v}</div>
                  <div className="text-[10px] mt-1.5 font-semibold uppercase tracking-widest text-[var(--text-3)]">{l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mission pillars below */}
        <div className="max-w-7xl mx-auto mt-20">
          <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-6 text-center">
            What that mission looks like, in practice
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(page.missionPillars ?? []).map((p, i) => {
              const Icon = iconFor(p.icon, Target);
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
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
        </div>
      </section>

      {/* ── MANIFESTO — what we do / don't ──────────────────── */}
      <section className="py-24 px-6 bg-[var(--bg-base)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-widest mb-4">The Algoritham manifesto</p>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-1)] tracking-tight">
              What we <span className="brand-gradient">do</span>. What we <span className="brand-gradient">don&apos;t</span>.
            </h2>
            <p className="mt-4 text-[var(--text-3)] max-w-xl mx-auto text-sm sm:text-base">
              The clearest way to know what someone stands for is to ask what they refuse.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-7 sm:p-9 overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.16),transparent_70%)] blur-2xl pointer-events-none" />
              <p className="text-[10px] font-bold text-[var(--accent-cyan)] uppercase tracking-widest mb-3">We do</p>
              <ul className="space-y-3.5">
                {WE_DO.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[var(--text-1)] text-sm sm:text-base leading-snug">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-cyan-500/15 text-cyan-600 flex items-center justify-center">
                      <Check size={12} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-7 sm:p-9 overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(230,57,70,0.14),transparent_70%)] blur-2xl pointer-events-none" />
              <p className="text-[10px] font-bold text-[var(--accent-rose)] uppercase tracking-widest mb-3">We don&apos;t</p>
              <ul className="space-y-3.5">
                {WE_DONT.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[var(--text-1)] text-sm sm:text-base leading-snug">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-rose-500/15 text-rose-600 flex items-center justify-center">
                      <X size={12} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VISION ───────────────────────────────────────────── */}
      <section className="relative py-32 px-6 overflow-hidden bg-[var(--bg-base)] border-t border-[var(--border)]">
        <BackgroundBeams className="opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.10),transparent)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <HoverBorderGradient
            containerClassName="text-xs mb-6 mx-auto"
            className="flex items-center gap-2 px-4 py-2 text-[11px] font-semibold tracking-widest uppercase text-[var(--text-1)]"
          >
            <Eye size={12} className="text-[var(--accent-cyan)]" />
            <span>{page.visionEyebrow ?? "Our Vision"}</span>
          </HoverBorderGradient>

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
            Invisible when it works. Predictable when it stretches. Explainable when it doesn&apos;t. That&apos;s the standard we hold every system on our managed estate to.
          </motion.p>
        </div>
      </section>

      {/* ── PRINCIPLES (BentoGrid) ──────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--bg-card)] border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
              <Compass size={12} /> {page.principlesEyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-1)] tracking-tight">{page.principlesHeadline}</h2>
          </motion.div>

          <BentoGrid>
            {(page.principles ?? []).map((p, i) => {
              const Icon = iconFor(p.icon, Compass);
              // First card is double-wide for hierarchy; pad with regular cells.
              const span = (i === 0 ? "2x1" : "1x1") as "2x1" | "1x1";
              return (
                <BentoItem key={p.title} span={span} className="bg-[var(--bg-base)]">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="p-6 h-full flex flex-col"
                  >
                    <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-[var(--brand-purple)] to-transparent" />
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7c3aed]/15 to-[#06b6d4]/15 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-[-4deg] transition-transform duration-300">
                      <Icon size={20} className="text-violet-500" />
                    </div>
                    <h3 className="text-[var(--text-1)] font-bold text-lg mb-2">{p.title}</h3>
                    <p className="text-[var(--text-2)] text-sm leading-relaxed flex-1">{p.desc}</p>
                  </motion.div>
                </BentoItem>
              );
            })}
          </BentoGrid>
        </div>
      </section>

      {/* ── ALIGNMENT CTA ───────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-[var(--bg-base)] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(124,58,237,0.08),transparent)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4">If this resonates</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-1)] tracking-tight mb-5 leading-[1.1]">
            If you think about IT this way, we should probably talk.
          </h2>
          <p className="text-[var(--text-2)] text-base sm:text-lg leading-relaxed mb-9 max-w-2xl mx-auto">
            The best client engagements start with shared values, not a shared spec. Tell us what you&apos;re building — we&apos;ll tell you whether we&apos;re the right partner for it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] shadow-xl shadow-violet-500/25 hover:shadow-violet-500/45 hover:-translate-y-0.5 transition-all"
            >
              Start the conversation
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-1)] hover:border-[var(--accent-violet-border)] hover:bg-[var(--bg-card-2)] hover:-translate-y-0.5 transition-all"
            >
              See our journey
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
