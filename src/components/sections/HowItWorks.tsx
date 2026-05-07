"use client";
import { motion } from "framer-motion";
import { Search, PenTool, Rocket, ArrowRight } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Assess",
    subtitle: "Free IT Environment Audit",
    desc: "Certified engineers review your infrastructure — servers, network, security posture, and cloud footprint. We identify gaps, risks, and optimization opportunities.",
    detail: "2–3 business days",
    accent: "var(--accent-rose)",
    grad:   "from-[#e63946] to-[#c0417a]",
  },
  {
    num: "02",
    icon: PenTool,
    title: "Design",
    subtitle: "Custom Strategy Session",
    desc: "We design a tailored IT roadmap built around your business goals. Vendor selection, cost modelling, and phased rollout — no generic templates.",
    detail: "Aligned to your timeline",
    accent: "var(--accent-violet)",
    grad:   "from-[#7c3aed] to-[#3b5cc4]",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Deploy & Manage",
    subtitle: "Implementation + 24/7 Support",
    desc: "Dedicated teams handle installation, configuration, and go-live. Post-deployment: proactive monitoring, maintenance, and round-the-clock helpdesk.",
    detail: "100% Uptime SLA",
    accent: "var(--accent-cyan)",
    grad:   "from-[#3b5cc4] to-[#06b6d4]",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-[var(--bg-card)] py-24 overflow-hidden">

      {/* Subtle dotted backdrop */}
      <div
        className="absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent_80%)]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--border-strong) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4">How It Works</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-1)] tracking-tight mb-4">
            Three steps. <span className="brand-gradient animate-gradient">Infinite uptime.</span>
          </h2>
          <p className="text-[var(--text-2)] text-lg max-w-xl mx-auto">From initial audit to fully managed infrastructure — we take ownership end-to-end.</p>
        </motion.div>

        {/* Animated gradient connector */}
        <div className="relative">
          <svg
            className="hidden lg:block absolute top-[88px] left-[calc(16.67%+30px)] right-[calc(16.67%+30px)] h-2 z-0 pointer-events-none"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="hiw-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"  stopColor="#e63946" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <line x1="0" y1="1" x2="100" y2="1" stroke="url(#hiw-line)" strokeWidth="1" strokeDasharray="3 2" />
          </svg>

          {/* Three step cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="relative"
                >
                  <CardSpotlight
                    className="rounded-2xl bg-[var(--bg-base)] border border-[var(--border)] hover:border-[var(--accent-violet-border)] transition-colors duration-300 h-full"
                    color={s.accent}
                    radius={400}
                  >
                    <div className="p-7 h-full flex flex-col">

                      {/* Icon + step number */}
                      <div className="flex items-center justify-between mb-7">
                        <motion.div
                          whileHover={{ scale: 1.08, rotate: -3 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${s.grad} flex items-center justify-center shadow-xl shadow-violet-500/25`}
                        >
                          <Icon size={22} className="text-white relative z-10" />
                          {/* Pulse ring */}
                          <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.grad} animate-ping opacity-20`} />
                        </motion.div>
                        <span className="text-5xl font-black text-[var(--text-1)] opacity-[0.06] select-none tracking-tight">{s.num}</span>
                      </div>

                      <h3 className="text-[var(--text-1)] font-black text-2xl mb-1.5 tracking-tight">{s.title}</h3>
                      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: s.accent }}>{s.subtitle}</p>
                      <p className="text-[var(--text-2)] text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>

                      <div className="flex items-center justify-between pt-5 border-t border-[var(--border)]">
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs text-[var(--text-3)] font-medium">{s.detail}</span>
                        </span>
                        {i < steps.length - 1 && (
                          <ArrowRight size={14} className="text-[var(--text-3)] hidden lg:block" />
                        )}
                      </div>
                    </div>
                  </CardSpotlight>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
