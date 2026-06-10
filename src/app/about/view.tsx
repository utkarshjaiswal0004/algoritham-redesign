"use client";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Target } from "lucide-react";
import Link from "next/link";
import { Timeline } from "@/components/ui/timeline";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { ParallaxLogo } from "@/components/ui/parallax-logo";
import { iconFor } from "@/lib/icon-map";
import type { AboutPage, Certification, SiteSettings } from "@/sanity/types";

type Props = { page: AboutPage; site: SiteSettings; certifications: Certification[] };

export function AboutView({ page, site, certifications }: Props) {
  const founded = site.foundedYear ?? 2009;
  const intro1 = `${site.name ?? "Algoritham Infrastructure Pvt. Ltd."} was established in ${founded} with a single mission: be the most reliable IT partner for Indian enterprises. ${site.yearsInBusiness ?? "Fifteen"} years later, that mission hasn't changed.`;

  return (
    <>
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(124,58,237,0.08),transparent)]" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4">{page.eyebrow}</p>
              <h1 className="text-5xl md:text-6xl font-black text-[var(--text-1)] tracking-tight mb-6">
                {page.headlinePre}<br />
                <span className="brand-gradient animate-gradient">{page.headlineGradient}</span>
              </h1>
              <p className="text-[var(--text-2)] text-lg leading-relaxed mb-6">{intro1}</p>
              <p className="text-[var(--text-2)] text-lg leading-relaxed mb-6">
                We operate as a national technology integrator — your complete IT department, or an extension of your own team. Either way, we take full ownership of your technology estate.
              </p>
              {page.missionVisionTeaser && (
                <Link href="/mission-vision" className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-violet)] hover:text-[var(--brand-purple)] transition-colors">
                  <Target size={14} />
                  {page.missionVisionTeaser}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              <ParallaxLogo size={460} src="/logo.png" alt={site.shortName ?? "Algoritham"} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[var(--bg-card)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {(page.stats ?? []).map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center">
              <div className="text-3xl md:text-4xl font-black brand-gradient mb-1">{s.value}</div>
              <div className="text-xs font-semibold text-[var(--text-3)] uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4">Our Values</p>
            <h2 className="text-4xl font-black text-[var(--text-1)] tracking-tight">{page.valuesHeadline}</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(page.values ?? []).map((v, i) => {
              const Icon = iconFor(v.icon, Target);
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <CardSpotlight className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-violet-500/25 hover:shadow-md transition-all duration-300 h-full">
                    <div className="p-6 h-full">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed]/15 to-[#06b6d4]/15 flex items-center justify-center mb-4">
                        <Icon size={18} className="text-violet-500" />
                      </div>
                      <h3 className="text-[var(--text-1)] font-bold mb-2">{v.title}</h3>
                      <p className="text-[var(--text-2)] text-sm leading-relaxed">{v.desc}</p>
                    </div>
                  </CardSpotlight>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[var(--bg-card)] border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
            <p className="text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-widest mb-4">{page.journeyEyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-1)] tracking-tight">{page.journeyHeadline}</h2>
          </motion.div>
          <Timeline
            data={(page.milestones ?? []).map(({ year, title, body, tags, stat }) => ({
              title: year,
              content: (
                <div className="max-w-2xl">
                  <h4 className="text-[var(--text-1)] font-bold text-lg sm:text-xl mb-2 leading-tight">{title}</h4>
                  <p className="text-[var(--text-2)] text-sm sm:text-base leading-relaxed mb-4">{body}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(tags ?? []).map((t) => (
                      <span key={t} className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-card-2)] text-[var(--text-2)]">{t}</span>
                    ))}
                  </div>

                  {stat && (
                    <div className="inline-flex items-baseline gap-2 px-3 py-1.5 rounded-lg border border-[var(--accent-violet-border)] bg-[var(--accent-violet-bg)]">
                      <span className="text-base sm:text-lg font-black brand-gradient leading-none">{stat.value}</span>
                      <span className="text-[10px] font-bold text-[var(--accent-violet)] uppercase tracking-widest">{stat.label}</span>
                    </div>
                  )}
                </div>
              ),
            }))}
          />
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4">Certifications & Partnerships</p>
            <h2 className="text-4xl font-black text-[var(--text-1)] tracking-tight">The credentials behind the commitment.</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert, i) => (
              <motion.div key={cert.title} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-violet-500/30 transition-all">
                <CheckCircle size={15} className="text-violet-500 shrink-0" />
                <span className="text-sm font-semibold text-[var(--text-1)]">{cert.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
