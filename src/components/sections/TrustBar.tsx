"use client";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import {
  MicrosoftLogo, CiscoLogo, FortinetLogo, DellLogo,
  HPELogo, VMwareLogo, AWSLogo, IBMLogo,
} from "@/components/ui/partner-logo";
import type { Partner, Client, SiteSettings } from "@/sanity/types";
import type { ComponentType } from "react";

type Props = {
  heading: string;
  partners: Partner[];
  clients: Client[];
  site: SiteSettings;
};

const LOGO_REGISTRY: Record<string, ComponentType<{ className?: string }>> = {
  Microsoft: MicrosoftLogo,
  Cisco:     CiscoLogo,
  Fortinet:  FortinetLogo,
  Dell:      DellLogo,
  HPE:       HPELogo,
  VMware:    VMwareLogo,
  AWS:       AWSLogo,
  IBM:       IBMLogo,
};

export function TrustBar({ heading, partners, clients, site }: Props) {
  const partnerLogos = partners.map((p, i) => ({
    id: i + 1,
    name: p.name,
    designation: p.designation ?? "",
    Logo: LOGO_REGISTRY[p.logoKey ?? ""] ?? MicrosoftLogo,
  }));

  const stats = [
    { value: site.yearsInBusiness  ?? "15+",    label: "Years in Business" },
    { value: site.uptimeSLA        ?? "99.99%", label: "Uptime SLA" },
    { value: site.carriers         ?? "40+",    label: "Telecom Carriers" },
    { value: site.projectsDelivered?? "500+",   label: "Projects Delivered" },
  ];

  const tickerNames = clients.map((c) => c.name);

  return (
    <section className="bg-[var(--bg-card)] border-y border-[var(--border)] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[11px] font-semibold text-[var(--text-3)] uppercase tracking-widest mb-8"
        >
          {heading}
        </motion.p>

        <div className="flex flex-wrap items-center justify-center mb-10 px-2">
          <AnimatedTooltip items={partnerLogos} />
        </div>

        <div className="relative overflow-hidden mb-12">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-card)] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-card)] to-transparent z-10" />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex gap-14 whitespace-nowrap"
          >
            {[...tickerNames, ...tickerNames].map((c, i) => (
              <span key={i} className="text-[var(--text-3)] font-semibold text-sm tracking-wide">{c}</span>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-3xl font-black text-[var(--text-1)] mb-1 brand-gradient">{value}</div>
              <div className="text-xs font-medium text-[var(--text-3)]">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
