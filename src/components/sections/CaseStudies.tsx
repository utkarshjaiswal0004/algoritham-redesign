"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const cases = [
  { num: "01", industry: "Financial Services", client: "A Leading Investment Group", challenge: "Legacy on-premise infrastructure unable to scale with growing transaction volumes and compliance demands.", outcome: "Migrated to hybrid cloud with dedicated disaster recovery. 99.99% uptime achieved within 3 months.", tags: ["Cloud Migration", "Disaster Recovery", "Compliance"] },
  { num: "02", industry: "Financial Services", client: "Giant in Financial Services", challenge: "Fragmented IT estate across multiple offices with no centralized monitoring or unified security policy.", outcome: "Deployed MPLS backbone, unified FortiGate security layer, and centralized NOC monitoring across all locations.", tags: ["MPLS", "FortiGate", "NOC"] },
  { num: "03", industry: "E-commerce", client: "Reputed Online Shopping Channel", challenge: "Peak-season infrastructure failures causing revenue loss during high-traffic sale events.", outcome: "Implemented auto-scaling IaaS with load balancing. Zero downtime during the next three peak events.", tags: ["IaaS", "Auto-scaling", "Load Balancing"] },
  { num: "04", industry: "Technology", client: "Oracle Database on AWS", challenge: "Oracle licensing complexity combined with high AWS infrastructure costs and poor query performance.", outcome: "Optimized license footprint and right-sized EC2 instances. 40% reduction in monthly cloud spend.", tags: ["Oracle", "AWS", "License Optimization"] },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="bg-[var(--bg-base)] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p className="text-xs font-semibold text-[var(--accent-rose)] uppercase tracking-widest mb-4">Case Studies</p>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-1)] tracking-tight">Results our clients<br />can measure.</h2>
          </div>
          <Link href="/case-studies" className="self-start md:self-auto inline-flex items-center gap-2 text-sm text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors font-medium">
            View all <ArrowUpRight size={15} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cases.map((c, i) => (
            <motion.div key={c.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="group p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-violet-500/25 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="text-xs font-semibold text-[var(--accent-rose)] uppercase tracking-widest">{c.industry}</span>
                  <h3 className="text-[var(--text-1)] font-bold text-lg mt-1">{c.client}</h3>
                </div>
                <span className="text-4xl font-black text-[var(--text-1)] opacity-[0.05] select-none">{c.num}</span>
              </div>
              <p className="text-[11px] font-semibold text-[var(--text-3)] uppercase tracking-widest mb-1">Challenge</p>
              <p className="text-[var(--text-2)] text-sm leading-relaxed mb-4">{c.challenge}</p>
              <div className="p-3.5 rounded-xl bg-violet-500/[0.06] border border-violet-500/15 mb-5">
                <p className="text-[11px] font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-1">Outcome</p>
                <p className="text-[var(--text-1)] text-sm leading-relaxed">{c.outcome}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span key={t} className="text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--bg-card-2)] border border-[var(--border)] text-[var(--text-2)] font-medium">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
