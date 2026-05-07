"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Server, Cloud, Shield, Network, Radio, GitMerge,
  CheckCircle, ArrowRight, Sparkles,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import Link from "next/link";

const services = [
  {
    id: "infrastructure", icon: Server, title: "Infrastructure",
    tagline: "The foundation your business runs on.",
    accent: "var(--accent-rose)",  grad: "from-[#e63946] to-[#c0417a]", num: "01",
    desc: "We design, deploy, and manage enterprise-grade IT infrastructure tailored to your workload. From single-CPU workstations to enterprise multi-CPU servers, our certified engineers ensure your systems are reliable, scalable, and secure 24/7.",
    points: [
      "x86, Power, Blade, and Hyper-Converged server solutions",
      "Dedicated data center suites with 100% uptime SLA",
      "Storage: SAN/NAS setup, clustering, failover, performance tuning",
      "Virtualization: server and desktop environments",
      "High-availability clustering — no single point of failure",
      "Enterprise OEMs: IBM, Lenovo, HP, Dell, Cisco",
    ],
    brands: ["IBM", "Lenovo", "HP", "Dell", "Cisco"],
    metric: { v: "99.99%", l: "Uptime SLA" },
  },
  {
    id: "cloud", icon: Cloud, title: "Cloud Solutions",
    tagline: "Move fast. Scale freely. Pay for what you use.",
    accent: "var(--accent-violet)", grad: "from-[#7c3aed] to-[#06b6d4]", num: "02",
    desc: "Avoid large capital outlays and let us architect, migrate, and manage your cloud workloads. Whether you need IaaS, PaaS, or SaaS — we handle the complexity so you focus on your business.",
    points: [
      "Infrastructure as a Service (IaaS) deployment",
      "Platform and Software as a Service delivery",
      "Cloud migration strategy and execution",
      "Cost optimization and right-sizing",
      "Multi-cloud and hybrid cloud architecture",
      "AWS, Azure, Google Cloud — vendor neutral",
    ],
    brands: ["AWS", "Azure", "Google Cloud", "VMware"],
    metric: { v: "30–70%", l: "Cost saved" },
  },
  {
    id: "security", icon: Shield, title: "Cybersecurity",
    tagline: "Comprehensive protection. Zero-trust by design.",
    accent: "var(--accent-cyan)", grad: "from-[#06b6d4] to-[#2563eb]", num: "03",
    desc: "We deploy and manage a comprehensive security framework that protects against internal and external threats across your entire IT estate — without adding unnecessary complexity.",
    points: [
      "FortiGate UTM Bundle — complete threat protection",
      "IPS & Antivirus with FortiGuard real-time intelligence",
      "Web Filtering and Application Control",
      "End-to-end encryption (AES-256 at rest, TLS 1.3 in transit)",
      "Zero-trust architecture — every request authenticated",
      "Security audits and compliance reporting",
    ],
    brands: ["Fortinet", "Symantec", "McAfee", "Trend Micro"],
    metric: { v: "0", l: "Trust default" },
  },
  {
    id: "networking", icon: Network, title: "Networking",
    tagline: "Reliable, secure, always-on connectivity.",
    accent: "var(--accent-violet)", grad: "from-[#2563eb] to-[#7c3aed]", num: "04",
    desc: "A well-managed IT network can help your business control costs, accelerate growth, ensure scalability, and mitigate risks. We provide proactive management across your full network estate.",
    points: [
      "Proactive management of firewalls, routers, and switches",
      "Device and resource utilization monitoring",
      "Error tracking and threshold alerts",
      "VLAN, LACP, trunking, and performance optimization",
      "MPLS for multi-site private networks",
      "24/7 NOC with passive and active monitoring",
    ],
    brands: ["Cisco", "HP", "Fortinet"],
    metric: { v: "<15m", l: "MTTR" },
  },
  {
    id: "telecom", icon: Radio, title: "Telecom",
    tagline: "30–70% savings. 40+ carriers. One partner.",
    accent: "var(--accent-rose)", grad: "from-[#c0417a] to-[#7c3aed]", num: "05",
    desc: "We negotiate on your behalf across a network of 40+ carriers to guarantee the lowest prices. From voice to high-speed data circuits — all your connectivity needs through a single point of contact.",
    points: [
      "Hosted PBX — cloud-based phone system, no hardware costs",
      "SIP trunks for PBX-compatible systems",
      "Voice T1 with up to 24 lines and PRI capabilities",
      "Internet T1, bonded T1 up to 12 Mbps",
      "Business Ethernet — symmetrical up to 135 Mbps",
      "MPLS, VOIP, DS3/OC3/OC12/OC48 enterprise circuits",
      "Colocation services",
    ],
    brands: ["40+ Carriers"],
    metric: { v: "40+", l: "Carriers" },
  },
  {
    id: "integration", icon: GitMerge, title: "System Integration",
    tagline: "One coherent IT environment. No silos.",
    accent: "var(--accent-violet)", grad: "from-[#e63946] to-[#7c3aed]", num: "06",
    desc: "We embed new IT systems into your existing environment — whether that's within your organisation or across multiple entities. ISO 9001 and ITIL processes ensure consistent, auditable delivery.",
    points: [
      "In-house and cross-organisational integration",
      "Facility Management Services (FMS)",
      "Data center migration and Active Directory implementation",
      "Consultation and project management",
      "Corporate governance and IT policy frameworks",
      "ISO 9001 · ITIL certified delivery teams",
    ],
    brands: ["Cisco", "Microsoft", "IBM", "HP"],
    metric: { v: "ITIL", l: "Aligned" },
  },
];

export default function ServicesPage() {
  const [activeId, setActiveId] = useState<string>(services[0].id);

  // Scroll-spy: pick the section closest to the top of the viewport
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY + 180;
      let bestId = services[0].id, bestDist = Infinity;
      for (const s of services) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const offset = Math.abs(el.offsetTop - top);
        if (offset < bestDist) { bestDist = offset; bestId = s.id; }
      }
      setActiveId(bestId);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <PageLayout>

      {/* Hero */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(124,58,237,0.10),transparent)]" />
        <div
          className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent_85%)]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--border-strong) 0.8px, transparent 0.8px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4 inline-flex items-center gap-2">
              <Sparkles size={12} /> Our Services
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-1)] tracking-tight mb-5 leading-[1.05]">
              End-to-end IT.<br />
              <span className="brand-gradient animate-gradient">One partner.</span>
            </h1>
            <p className="text-[var(--text-2)] text-lg md:text-xl max-w-2xl leading-relaxed">
              From the server room to the cloud edge — we manage every layer of your technology stack so nothing falls through the cracks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky service nav (scroll-spy) */}
      <div className="sticky top-16 z-20 bg-[var(--bg-base)]/85 backdrop-blur-xl border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
          <div className="flex items-center gap-1 py-3 min-w-max">
            {services.map((s) => {
              const Icon = s.icon;
              const active = activeId === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`group inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                    active
                      ? "text-white shadow-lg shadow-violet-500/20 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]"
                      : "text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--bg-card)]"
                  }`}
                >
                  <Icon size={13} />
                  {s.title}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Services list */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id} id={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="scroll-mt-32"
              >
                <CardSpotlight
                  className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent-violet-border)] transition-colors duration-300"
                  color={s.accent}
                  radius={520}
                >
                  <div className="p-7 sm:p-9 md:p-10 relative overflow-hidden">

                    {/* Big background number */}
                    <div className="absolute -top-6 right-4 sm:right-10 text-[160px] sm:text-[210px] font-black opacity-[0.05] dark:opacity-[0.06] select-none leading-none pointer-events-none"
                      style={{ color: s.accent }}>
                      {s.num}
                    </div>

                    <div className="relative grid md:grid-cols-2 gap-8 lg:gap-12 items-start">

                      {/* Left: icon + intro + brands + CTA */}
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <motion.div
                            whileHover={{ scale: 1.06, rotate: -5 }}
                            transition={{ type: "spring", stiffness: 280 }}
                            className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${s.grad} flex items-center justify-center shadow-xl shadow-violet-500/25`}
                          >
                            <Icon size={24} className="text-white relative z-10" />
                            <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.grad} animate-ping opacity-15`} />
                          </motion.div>
                          <div className="min-w-0">
                            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-1)] tracking-tight">{s.title}</h2>
                            <p className={`text-sm font-semibold bg-gradient-to-r ${s.grad} bg-clip-text text-transparent`}>{s.tagline}</p>
                          </div>
                        </div>

                        <p className="text-[var(--text-2)] leading-relaxed mb-6">{s.desc}</p>

                        {/* Metric badge */}
                        <div className="inline-flex items-baseline gap-2 px-3.5 py-2 rounded-xl border mb-6"
                          style={{ background: `${s.accent}10`, borderColor: `${s.accent}33` }}>
                          <span className="text-lg font-black leading-none" style={{ color: s.accent }}>{s.metric.v}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-3)]">{s.metric.l}</span>
                        </div>

                        {/* Brands */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {s.brands.map((b) => (
                            <span
                              key={b}
                              className="text-xs px-3 py-1 rounded-full bg-[var(--bg-card-2)] border border-[var(--border)] text-[var(--text-2)] font-semibold"
                            >
                              {b}
                            </span>
                          ))}
                        </div>

                        <Link
                          href="/contact"
                          className="group/cta inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:opacity-90 transition-all shadow-md shadow-violet-500/20 hover:-translate-y-0.5"
                        >
                          Get a quote
                          <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                      {/* Right: feature points */}
                      <div className="space-y-2.5">
                        {s.points.map((pt, idx) => (
                          <motion.div
                            key={pt}
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.04 }}
                            className="group/pt flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-card-2)] border border-[var(--border)] hover:border-[var(--accent-violet-border)] hover:-translate-y-0.5 transition-all duration-200"
                          >
                            <div
                              className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-transform group-hover/pt:scale-110"
                              style={{ background: `${s.accent}1f`, color: s.accent }}
                            >
                              <CheckCircle size={12} />
                            </div>
                            <span className="text-sm text-[var(--text-2)] leading-snug">{pt}</span>
                          </motion.div>
                        ))}
                      </div>

                    </div>
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
