"use client";
import { motion } from "framer-motion";
import { CheckCircle, Award, Users, Clock, Target } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Timeline } from "@/components/ui/timeline";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { ParallaxLogo } from "@/components/ui/parallax-logo";

const values = [
  { icon: Target,  title: "Client-First",    desc: "Every solution is designed around your specific business needs — not a generic template." },
  { icon: Award,   title: "Certified Experts", desc: "Our engineers are certified on the platforms they manage. No generalists on critical systems." },
  { icon: Clock,   title: "24/7 Commitment", desc: "We monitor and manage your infrastructure round the clock. Issues resolved before you notice them." },
  { icon: Users,   title: "True Partnership", desc: "We function as your complete IT department or as an extension of your in-house team." },
];

const milestones: {
  year:    string;
  title:   string;
  body:    string;
  tags:    string[];
  stat?:   { v: string; l: string };
}[] = [
  {
    year:  "2009",
    title: "Founded in Mumbai",
    body:  "Started as a small technology integrator with a single mission: be the most reliable IT partner for Indian enterprises. First office in Andheri East, three engineers, one customer.",
    tags:  ["Mumbai HQ", "First customer", "Andheri East"],
    stat:  { v: "1", l: "Office" },
  },
  {
    year:  "2011",
    title: "ISO 9001 Certified",
    body:  "Achieved ISO 9001 certification for quality management — every service delivery process audited, documented, and aligned with international standards. The foundation that still defines how we operate today.",
    tags:  ["ISO 9001", "Quality Management", "Audited Processes"],
  },
  {
    year:  "2013",
    title: "National Footprint",
    body:  "Expanded managed services to five major Indian cities. Built our first national NOC framework and started running 24/7 monitoring for clients across multiple time zones.",
    tags:  ["5 Cities", "24/7 NOC", "Multi-region"],
    stat:  { v: "5", l: "Cities live" },
  },
  {
    year:  "2015",
    title: "Fortinet Authorized Partner",
    body:  "Became authorized to deploy and manage Fortinet's full security stack — FortiGate firewalls, IPS, web filtering, application control, FortiGuard subscription services. Cybersecurity became a first-class practice.",
    tags:  ["FortiGate", "UTM", "FortiGuard", "Zero-Trust"],
  },
  {
    year:  "2018",
    title: "Cloud Practice Launched",
    body:  "Stood up dedicated cloud architects and engineers. Started delivering IaaS, PaaS, and SaaS workloads end-to-end across AWS and Azure — design, migration, and 24/7 operations.",
    tags:  ["IaaS", "PaaS", "SaaS", "AWS", "Azure"],
  },
  {
    year:  "2020",
    title: "40+ Telecom Carriers",
    body:  "Built India's most diverse single-vendor circuit catalogue. MPLS, ILL, broadband, voice, hosted PBX, SD-WAN — negotiated 30–70% cost savings for clients across 40+ providers.",
    tags:  ["MPLS", "ILL", "SD-WAN", "Hosted PBX"],
    stat:  { v: "40+", l: "Carriers" },
  },
  {
    year:  "2023",
    title: "500+ Enterprise Projects",
    body:  "Crossed 500 enterprise project deliveries — from Fortune-listed financial services migrations to greenfield manufacturing rollouts. 99.99% uptime maintained across the managed estate.",
    tags:  ["Enterprise", "99.99% Uptime", "Managed Services"],
    stat:  { v: "500+", l: "Projects" },
  },
  {
    year:  "2026",
    title: "Still Building",
    body:  "Same values, bigger team. Today we serve enterprises across India with end-to-end IT — and we're investing in next-generation observability, security automation, and AI-assisted operations.",
    tags:  ["AI Ops", "Security Automation", "Next-Gen Observability"],
    stat:  { v: "Today", l: "And growing" },
  },
];

const certifications = ["ISO 9001", "ITIL Framework", "Fortinet Authorized", "Microsoft Partner", "HP Enterprise Partner", "Dell Technologies Partner"];

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(124,58,237,0.08),transparent)]" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4">About Us</p>
              <h1 className="text-5xl md:text-6xl font-black text-[var(--text-1)] tracking-tight mb-6">
                We love what<br />
                <span className="brand-gradient animate-gradient">we do.</span>
              </h1>
              <p className="text-[var(--text-2)] text-lg leading-relaxed mb-6">
                Algoritham Infrastructure Pvt. Ltd. was established in 2009 with a single mission: be the most reliable IT partner for Indian enterprises. Fifteen years later, that mission hasn&apos;t changed.
              </p>
              <p className="text-[var(--text-2)] text-lg leading-relaxed">
                We operate as a national technology integrator — your complete IT department, or an extension of your own team. Either way, we take full ownership of your technology estate.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              <ParallaxLogo size={460} src="/logo.png" alt="Algoritham Infrastructure" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-[var(--bg-card)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { v: "2009", l: "Year Founded" }, { v: "15+", l: "Years of Operations" },
            { v: "500+", l: "Projects Delivered" }, { v: "40+", l: "Telecom Carriers" },
          ].map(({ v, l }, i) => (
            <motion.div key={l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center">
              <div className="text-3xl md:text-4xl font-black brand-gradient mb-1">{v}</div>
              <div className="text-xs font-semibold text-[var(--text-3)] uppercase tracking-wider">{l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4">Our Values</p>
            <h2 className="text-4xl font-black text-[var(--text-1)] tracking-tight">What drives us.</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <CardSpotlight className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-violet-500/25 hover:shadow-md transition-all duration-300 h-full">
                  <div className="p-6 h-full">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed]/15 to-[#06b6d4]/15 flex items-center justify-center mb-4">
                      <Icon size={18} className="text-violet-500" />
                    </div>
                    <h3 className="text-[var(--text-1)] font-bold mb-2">{title}</h3>
                    <p className="text-[var(--text-2)] text-sm leading-relaxed">{desc}</p>
                  </div>
                </CardSpotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 bg-[var(--bg-card)] border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
            <p className="text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-widest mb-4">Our Journey</p>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-1)] tracking-tight">15 years. Still building.</h2>
          </motion.div>
          <Timeline
            data={milestones.map(({ year, title, body, tags, stat }) => ({
              title: year,
              content: (
                <div className="max-w-2xl">
                  <h4 className="text-[var(--text-1)] font-bold text-lg sm:text-xl mb-2 leading-tight">{title}</h4>
                  <p className="text-[var(--text-2)] text-sm sm:text-base leading-relaxed mb-4">{body}</p>

                  {/* Tag chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-card-2)] text-[var(--text-2)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Optional stat strip */}
                  {stat && (
                    <div className="inline-flex items-baseline gap-2 px-3 py-1.5 rounded-lg border border-[var(--accent-violet-border)] bg-[var(--accent-violet-bg)]">
                      <span className="text-base sm:text-lg font-black brand-gradient leading-none">{stat.v}</span>
                      <span className="text-[10px] font-bold text-[var(--accent-violet)] uppercase tracking-widest">{stat.l}</span>
                    </div>
                  )}
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4">Certifications & Partnerships</p>
            <h2 className="text-4xl font-black text-[var(--text-1)] tracking-tight">The credentials behind the commitment.</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert, i) => (
              <motion.div key={cert} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-violet-500/30 transition-all">
                <CheckCircle size={15} className="text-violet-500 shrink-0" />
                <span className="text-sm font-semibold text-[var(--text-1)]">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
