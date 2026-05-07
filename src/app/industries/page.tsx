"use client";
import { motion } from "framer-motion";
import { Heart, TrendingUp, Truck, Building2, ShoppingBag, Zap, Film, Cpu, Factory, Lightbulb, ArrowUpRight, Sparkles } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { DottedBackground } from "@/components/ui/dotted-background";

type AccentKey = "rose" | "violet" | "blue" | "cyan" | "pink" | "orange";

const accentVar = (k: AccentKey) =>
  k === "rose"   ? "var(--accent-rose)"  :
  k === "cyan"   ? "var(--accent-cyan)"  :
  k === "blue"   ? "var(--accent-violet)":
  k === "pink"   ? "var(--accent-rose)"  :
  k === "orange" ? "var(--accent-rose)"  :
                   "var(--accent-violet)";

const industries: {
  id: string; icon: typeof Heart; title: string; color: AccentKey;
  desc: string; services: string[]; stat: { v: string; l: string };
}[] = [
  { id: "healthcare",     icon: Heart,        title: "Healthcare",                  color: "rose",   desc: "Complete IT support for hospitals and healthcare facilities. EHR management, HIPAA-compliant infrastructure, and round-the-clock monitoring for critical care environments.",                       services: ["EHR management", "HIPAA compliance", "Remote Monitoring", "24×7 Help Desk"],         stat: { v: "12+", l: "Hospitals served" } },
  { id: "financial",      icon: TrendingUp,    title: "Financial Services",          color: "violet", desc: "Investment banking, brokerage, mortgage, banking. Data protection and disaster recovery expertise that keeps financial operations running without interruption.",                                  services: ["Data storage", "Disaster recovery", "IT audit support", "Regulatory compliance"],     stat: { v: "8+", l: "Banks & brokers" } },
  { id: "manufacturing",  icon: Factory,       title: "Manufacturing & Distribution", color: "blue",   desc: "Improved reliability and reduced IT operating costs through managed cloud storage, Exchange Hosting, ERP integration, and robust network infrastructure.",                                       services: ["Managed Cloud Storage", "Exchange Hosting", "ERP integration", "Network reliability"], stat: { v: "20+", l: "Plants connected" } },
  { id: "transportation", icon: Truck,         title: "Transportation",              color: "cyan",   desc: "Solutions addressing industry evolution and business challenges for carriers and logistics providers — fleet connectivity, IoT, and 24×7 support.",                                          services: ["Fleet connectivity", "Route optimization IT", "IoT infrastructure", "24×7 support"], stat: { v: "5+", l: "Logistics co's" } },
  { id: "government",     icon: Building2,     title: "Government & Municipal",      color: "violet", desc: "20+ years serving government bodies. Familiar with public-sector IT issues and budget cycles, with established references available for procurement teams.",                                services: ["Government IT support", "Budget cycle alignment", "Compliance", "Helpdesk"],         stat: { v: "20yr", l: "Public sector" } },
  { id: "consumer",       icon: ShoppingBag,   title: "Consumer Products",           color: "pink",   desc: "Managed IT infrastructure hosting and management so internal IT staff can stay focused on business objectives, not day-to-day infrastructure maintenance.",                                  services: ["Managed IT hosting", "Cloud infrastructure", "Helpdesk", "Scalable networking"],     stat: { v: "30+", l: "Brands hosted" } },
  { id: "startups",       icon: Lightbulb,     title: "Start-ups",                   color: "orange", desc: "Flexible, scalable IT management tailored to growth-stage companies. We reduce capital expenditure with award-winning solutions that scale with your headcount.",                            services: ["Flexible IT management", "Low CapEx solutions", "Scalable infrastructure", "Helpdesk"], stat: { v: "Low", l: "CapEx model" } },
  { id: "entertainment",  icon: Film,          title: "Entertainment",               color: "rose",   desc: "Technology platform management, security, application development, and disaster recovery — maximising system performance for business growth.",                                          services: ["Platform management", "Security", "App development", "Disaster recovery"],           stat: { v: "100%", l: "Show-time SLA" } },
  { id: "energy",         icon: Zap,           title: "Energy",                      color: "cyan",   desc: "Wind, solar, oil & gas. Managed cloud hosting, remote monitoring, and 24×7 helpdesk tailored to the unique demands of energy infrastructure.",                                       services: ["Managed Cloud Hosting", "Remote Monitoring", "24×7 Help Desk", "SCADA support"],     stat: { v: "24/7", l: "SCADA ops" } },
  { id: "technology",     icon: Cpu,           title: "Technology Companies",        color: "blue",   desc: "IT infrastructure management for technology companies so they can focus on their core product — not the hardware and connectivity that supports it.",                                services: ["IT infrastructure management", "Cost optimization", "Cloud", "Security"],             stat: { v: "Build", l: "Faster" } },
];

const heroStats = [
  { v: "10",   l: "Sectors served" },
  { v: "500+", l: "Enterprise projects" },
  { v: "15+",  l: "Years operating" },
  { v: "100%", l: "Uptime SLA" },
];

export default function IndustriesPage() {
  return (
    <PageLayout>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <DottedBackground />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(6,182,212,0.07),transparent)]" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-widest mb-4 inline-flex items-center gap-2">
              <Sparkles size={12} /> Industries
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-1)] tracking-tight mb-5 leading-[1.05]">
              We speak your<br />
              <span className="brand-gradient animate-gradient">industry&apos;s language.</span>
            </h1>
            <p className="text-[var(--text-2)] text-lg md:text-xl max-w-2xl leading-relaxed">
              Serving 10 sectors across India with deep domain expertise, sector-specific compliance knowledge, and IT solutions built around your operating model.
            </p>
          </motion.div>

          {/* Hero stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {heroStats.map((s) => (
              <div
                key={s.l}
                className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] text-center"
              >
                <div className="text-2xl md:text-3xl font-black brand-gradient mb-0.5">{s.v}</div>
                <div className="text-[10px] sm:text-xs text-[var(--text-3)] uppercase tracking-widest font-semibold">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Industries grid ────────────────────────────────── */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            const accent = accentVar(ind.color);
            return (
              <motion.div
                key={ind.id} id={ind.id}
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

                    {/* Top row: icon + stat */}
                    <div className="flex items-start justify-between mb-5">
                      <motion.div
                        whileHover={{ scale: 1.08, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 280 }}
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${accent}1f`,
                          color: accent,
                          boxShadow: `inset 0 0 0 1px ${accent}25`,
                        }}
                      >
                        <Icon size={22} />
                      </motion.div>
                      <div className="text-right">
                        <div className="text-base font-black leading-none" style={{ color: accent }}>{ind.stat.v}</div>
                        <div className="text-[9px] font-semibold uppercase tracking-widest text-[var(--text-3)] mt-1">{ind.stat.l}</div>
                      </div>
                    </div>

                    <h3 className="text-[var(--text-1)] font-bold text-lg mb-2 tracking-tight">{ind.title}</h3>
                    <p className="text-[var(--text-2)] text-sm leading-relaxed mb-5 flex-1">{ind.desc}</p>

                    {/* Service tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {ind.services.map((sv) => (
                        <span
                          key={sv}
                          className="text-[10.5px] px-2.5 py-1 rounded-full border font-semibold"
                          style={{ background: `${accent}10`, color: accent, borderColor: `${accent}33` }}
                        >
                          {sv}
                        </span>
                      ))}
                    </div>

                    {/* Footer link */}
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

    </PageLayout>
  );
}
