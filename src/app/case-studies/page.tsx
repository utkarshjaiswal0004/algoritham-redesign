"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";

const cases = [
  {
    num: "01", industry: "Financial Services", client: "A Leading Investment Group",
    challenge: "Legacy on-premise infrastructure unable to scale with growing transaction volumes and strict compliance demands from regulators.",
    solution: "We designed a hybrid cloud architecture with dedicated on-premise servers for sensitive data and AWS cloud for scalable workloads. Implemented FortiGate firewall policies, MPLS backbone, and a centralized NOC.",
    outcome: "99.99% uptime achieved within 3 months. Compliance audit passed. 35% reduction in infrastructure OpEx.",
    metrics: [{ label: "Uptime", value: "99.99%" }, { label: "OpEx Savings", value: "35%" }, { label: "Deployment", value: "3 months" }],
    tags: ["Cloud Migration", "Disaster Recovery", "FortiGate", "Compliance"],
  },
  {
    num: "02", industry: "Financial Services", client: "Giant in Financial Services Sector",
    challenge: "Fragmented IT estate across 12 offices with no centralized monitoring, inconsistent security policies, and frequent network outages disrupting trading operations.",
    solution: "Deployed MPLS backbone connecting all offices, unified FortiGate UTM security layer across all sites, and set up a 24/7 NOC with passive and active monitoring. Migrated on-premise Exchange to Microsoft 365.",
    outcome: "Network outages reduced to zero. Unified security posture across all 12 locations. IT team headcount reduced by 2 FTEs through managed services.",
    metrics: [{ label: "Outages", value: "0" }, { label: "Sites covered", value: "12" }, { label: "FTE savings", value: "2" }],
    tags: ["MPLS", "FortiGate", "NOC", "Microsoft 365"],
  },
  {
    num: "03", industry: "E-commerce", client: "Reputed Online Shopping Channel",
    challenge: "Peak-season infrastructure failures causing revenue loss and customer attrition during high-traffic sale events (Big Billion Day type campaigns).",
    solution: "Implemented auto-scaling IaaS on AWS with load balancers, CDN configuration, and database read replicas. Set up real-time capacity monitoring with auto-trigger thresholds.",
    outcome: "Zero downtime across next three major sale events. Peak concurrent users handled: 3x previous capacity. Customer complaints down 90%.",
    metrics: [{ label: "Downtime", value: "Zero" }, { label: "Traffic capacity", value: "3×" }, { label: "Complaints", value: "−90%" }],
    tags: ["IaaS", "Auto-scaling", "AWS", "Load Balancing"],
  },
  {
    num: "04", industry: "Technology", client: "Oracle Database on AWS",
    challenge: "Oracle licensing complexity combined with high AWS infrastructure costs and degraded query performance as data volumes grew.",
    solution: "Conducted a full license audit, right-sized EC2 instances to match actual workload, enabled Reserved Instances for predictable workloads, and optimised Oracle configuration for AWS storage.",
    outcome: "40% reduction in monthly cloud spend. Query performance improved by 60%. License compliance achieved with no over-provisioning.",
    metrics: [{ label: "Cloud spend", value: "−40%" }, { label: "Query speed", value: "+60%" }, { label: "Timeline", value: "6 weeks" }],
    tags: ["Oracle", "AWS", "License Optimization", "Cost Reduction"],
  },
];

export default function CaseStudiesPage() {
  return (
    <PageLayout>
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(230,57,70,0.07),transparent)]" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-semibold text-[var(--accent-rose)] uppercase tracking-widest mb-4">Case Studies</p>
            <h1 className="text-5xl md:text-6xl font-black text-[var(--text-1)] tracking-tight mb-5">
              Results you can<br />
              <span className="brand-gradient animate-gradient">put a number on.</span>
            </h1>
            <p className="text-[var(--text-2)] text-xl max-w-2xl leading-relaxed">
              Real challenges. Real solutions. Measurable outcomes from enterprises that trusted us with their IT.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {cases.map((c, i) => (
            <motion.div key={c.num}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-violet-500/20 transition-all duration-300">
              {/* Header */}
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

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {c.metrics.map((m) => (
                  <div key={m.label} className="p-4 rounded-xl bg-gradient-to-br from-violet-500/[0.06] to-cyan-500/[0.06] border border-violet-500/15 text-center">
                    <div className="text-2xl font-black brand-gradient mb-1">{m.value}</div>
                    <div className="text-[11px] text-[var(--text-3)] font-medium">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--bg-card-2)] border border-[var(--border)] text-[var(--text-2)] font-semibold">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto mt-12 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#7c3aed]/10 to-[#06b6d4]/10 border border-violet-500/20 text-center">
          <h3 className="text-2xl md:text-3xl font-black text-[var(--text-1)] mb-3">Want results like these?</h3>
          <p className="text-[var(--text-2)] mb-6">Start with a free IT assessment. No commitment required.</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20">
            Get Free Assessment <ArrowUpRight size={15} />
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
