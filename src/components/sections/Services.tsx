"use client";
import { motion } from "framer-motion";
import { Server, Cloud, Shield, Network, Radio, GitMerge, ArrowUpRight } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";

const services = [
  {
    num: "01", icon: Server, title: "Infrastructure",
    desc: "Enterprise servers, data center suites, and 24/7 managed infrastructure from IBM, Lenovo, HP, Dell and Cisco. x86, Blade, and Hyper-Converged solutions.",
    tags: ["Servers", "Data Center", "Virtualization", "Storage"],
    grad: "from-[#e63946] to-[#c0417a]",
    ring: "hover:border-rose-500/30",
    icon_bg: "bg-rose-500/10 text-rose-500",
    tag_bg: "bg-rose-500/10 text-[var(--accent-rose)] border-rose-500/20",
  },
  {
    num: "02", icon: Cloud, title: "Cloud Solutions",
    desc: "IaaS, PaaS, and SaaS deployment and management. Architect, migrate, and run cloud workloads without large capital outlays.",
    tags: ["IaaS", "PaaS", "SaaS", "Cloud Migration"],
    grad: "from-[#7c3aed] to-[#06b6d4]",
    ring: "hover:border-violet-500/30",
    icon_bg: "bg-violet-500/10 text-violet-500",
    tag_bg: "bg-violet-500/10 text-[var(--accent-violet)] border-violet-500/20",
  },
  {
    num: "03", icon: Shield, title: "Cybersecurity",
    desc: "FortiGate UTM, IPS, Web Filtering, Application Control, and FortiGuard subscription services. Zero-trust architecture across your full estate.",
    tags: ["FortiGate", "UTM", "Zero-Trust", "Compliance"],
    grad: "from-[#06b6d4] to-[#2563eb]",
    ring: "hover:border-cyan-500/30",
    icon_bg: "bg-cyan-500/10 text-cyan-500",
    tag_bg: "bg-cyan-500/10 text-[var(--accent-cyan)] border-cyan-500/20",
  },
  {
    num: "04", icon: Network, title: "Networking",
    desc: "Proactive management of firewalls, routers, switches, and security gateways. Threshold alerts, error tracking, and uninterrupted access always.",
    tags: ["Cisco", "Firewalls", "LAN/WAN", "MPLS"],
    grad: "from-[#2563eb] to-[#7c3aed]",
    ring: "hover:border-blue-500/30",
    icon_bg: "bg-blue-500/10 text-blue-500",
    tag_bg: "bg-blue-500/10 text-[var(--accent-violet)] border-blue-500/20",
  },
  {
    num: "05", icon: Radio, title: "Telecom",
    desc: "30–70% savings negotiated across 40+ carriers. Hosted PBX, SIP, T1, Ethernet, MPLS, VOIP, and high-speed circuits — one partner for all connectivity.",
    tags: ["Hosted PBX", "SIP", "MPLS", "VOIP"],
    grad: "from-[#c0417a] to-[#7c3aed]",
    ring: "hover:border-pink-500/30",
    icon_bg: "bg-pink-500/10 text-pink-500",
    tag_bg: "bg-pink-500/10 text-[var(--accent-rose)] border-pink-500/20",
  },
  {
    num: "06", icon: GitMerge, title: "System Integration",
    desc: "Embedding new IT systems into existing environments. ISO 9001 and ITIL-certified engineers across Cisco, Microsoft, IBM, and HP.",
    tags: ["ISO 9001", "ITIL", "FMS", "ERP"],
    grad: "from-[#e63946] to-[#7c3aed]",
    ring: "hover:border-violet-500/30",
    icon_bg: "bg-violet-500/10 text-violet-500",
    tag_bg: "bg-violet-500/10 text-[var(--accent-violet)] border-violet-500/20",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-[var(--bg-base)] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-1)] tracking-tight mb-4">
            Everything your IT needs.<br />Nothing it doesn&apos;t.
          </h2>
          <p className="text-[var(--text-2)] text-lg leading-relaxed">
            One partner across your entire technology stack — from the server room to the cloud edge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <CardSpotlight className={`group rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] ${s.ring} transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 h-full`}>
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.icon_bg}`}>
                        <Icon size={18} />
                      </div>
                      <span className={`text-3xl font-black bg-gradient-to-br ${s.grad} bg-clip-text text-transparent opacity-30 select-none`}>
                        {s.num}
                      </span>
                    </div>

                    <h3 className="text-[var(--text-1)] font-bold text-lg mb-2">{s.title}</h3>
                    <p className="text-[var(--text-2)] text-sm leading-relaxed mb-5 flex-1">{s.desc}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {s.tags.map((t) => (
                        <span key={t} className={`text-[11px] px-2.5 py-0.5 rounded-full border font-semibold ${s.tag_bg}`}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-[var(--text-3)] group-hover:text-[var(--text-2)] transition-colors">
                      Learn more <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </CardSpotlight>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
