"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Award, CheckCircle2, Lock } from "lucide-react";

const certs = [
  { icon: Award,        title: "ISO 9001 Certified", desc: "Quality management systems ensuring consistent, auditable processes across all service delivery." },
  { icon: ShieldCheck,  title: "ITIL Framework",     desc: "IT Infrastructure Library best practices for incident, change, and service management." },
  { icon: Lock,         title: "Fortinet Authorized", desc: "Certified to deploy, configure, and manage FortiGate firewalls and FortiGuard security services." },
  { icon: CheckCircle2, title: "Microsoft Partner",  desc: "Volume Licensing, Microsoft 365, Azure, and SQL Server — authorized reseller and support partner." },
];

export function Certifications() {
  return (
    <section className="bg-[var(--bg-base)] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4">Trust & Compliance</p>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-1)] tracking-tight mb-4">Trust is non-negotiable.</h2>
          <p className="text-[var(--text-2)] text-lg max-w-xl mx-auto">Enterprise-grade compliance isn&apos;t a checkbox. It&apos;s built into every layer of our service delivery.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certs.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-violet-500/25 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed]/15 to-[#06b6d4]/15 flex items-center justify-center mb-4">
                <Icon size={18} className="text-violet-500" />
              </div>
              <h3 className="text-[var(--text-1)] font-bold mb-2">{title}</h3>
              <p className="text-[var(--text-2)] text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
