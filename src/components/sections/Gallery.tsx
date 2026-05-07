"use client";
import { motion } from "framer-motion";
import { Award, Trophy, Star, ShieldCheck, Sparkles, Server, Building2, Users } from "lucide-react";
import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { DottedBackground } from "@/components/ui/dotted-background";

const items = [
  {
    span:  "2x2" as const,
    icon:  Trophy,
    title: "15 Years of Excellence",
    desc:  "From a Mumbai start-up in 2009 to a national technology integrator with clients across India.",
    accent: "violet",
    stat:  "2009 – 2026",
    big:   true,
  },
  { span: "1x1" as const, icon: Award,       title: "ISO 9001",                    desc: "Quality management certified since 2011.",   accent: "rose"   },
  { span: "1x1" as const, icon: ShieldCheck, title: "Fortinet Authorized",          desc: "FortiGate firewall partner.",                accent: "cyan"   },
  { span: "2x1" as const, icon: Server,      title: "500+ Enterprise Projects",     desc: "Delivered across infrastructure, cloud, security, networking & telecom — for Fortune-listed clients to growing SMEs.", accent: "violet" },
  { span: "1x1" as const, icon: Star,        title: "ITIL Aligned",                 desc: "24/7 NOC monitoring practice.",              accent: "rose"   },
  { span: "1x1" as const, icon: Building2,   title: "Microsoft · Dell · HPE",       desc: "Authorised partnerships.",                   accent: "cyan"   },
  { span: "2x1" as const, icon: Users,       title: "40+ Telecom Carriers",         desc: "MPLS, ILL, broadband, voice & SD-WAN — single-vendor circuit management nationwide.", accent: "violet" },
];

const accentColor = (a: string) =>
  a === "violet" ? "var(--accent-violet)" : a === "rose" ? "var(--accent-rose)" : "var(--accent-cyan)";

export function Gallery() {
  return (
    <section id="gallery" className="relative py-24 px-6 overflow-hidden">
      <DottedBackground />
      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
            <Sparkles size={12} />
            Achievements & Milestones
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-1)] tracking-tight max-w-2xl mx-auto">
            Trusted by enterprises. <span className="brand-gradient">Built on results.</span>
          </h2>
        </motion.div>

        {/* Bento grid — every tile is a stretched EvervaultCard */}
        <BentoGrid>
          {items.map(({ icon: Icon, title, desc, accent, span, big, stat }, i) => (
            <BentoItem key={title} span={span} className="!border-0 !bg-transparent">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="h-full"
              >
                <EvervaultCard className="h-full rounded-2xl border border-[var(--border)] hover:border-[var(--accent-violet-border)] transition-colors duration-300">
                  <div className={`relative h-full p-6 sm:p-7 flex flex-col ${big ? "items-center text-center justify-center" : "items-start"}`}>
                    <div
                      className={`rounded-xl flex items-center justify-center mb-4 ${big ? "w-14 h-14" : "w-10 h-10"}`}
                      style={{ background: `${accentColor(accent)}20`, color: accentColor(accent) }}
                    >
                      <Icon size={big ? 24 : 18} />
                    </div>

                    {big && stat && (
                      <p className="text-[10px] font-bold tracking-widest text-[var(--text-3)] uppercase mb-2">{stat}</p>
                    )}

                    <h3 className={`text-[var(--text-1)] font-black leading-tight mb-2 ${big ? "text-2xl md:text-3xl tracking-tight" : "text-base"}`}>
                      {title}
                    </h3>
                    <p className={`text-[var(--text-2)] leading-relaxed ${big ? "text-sm md:text-base max-w-sm" : "text-xs"}`}>
                      {desc}
                    </p>
                  </div>
                </EvervaultCard>
              </motion.div>
            </BentoItem>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
