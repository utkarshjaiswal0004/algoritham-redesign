"use client";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import {
  MicrosoftLogo, CiscoLogo, FortinetLogo, DellLogo,
  HPELogo, VMwareLogo, AWSLogo, IBMLogo,
} from "@/components/ui/partner-logo";

const clients = [
  "GoodRich", "Neo Nich", "CCI", "A Leading Investment Group",
  "Financial Services Giant", "Oracle on AWS", "Online Shopping Channel",
];

const partnerLogos = [
  { id: 1, name: "Microsoft",     designation: "Authorized Partner",    Logo: MicrosoftLogo },
  { id: 2, name: "Cisco",         designation: "Networking Partner",    Logo: CiscoLogo     },
  { id: 3, name: "Fortinet",      designation: "Security Partner",      Logo: FortinetLogo  },
  { id: 4, name: "Dell EMC",      designation: "Storage Partner",       Logo: DellLogo      },
  { id: 5, name: "HP Enterprise", designation: "Server Partner",        Logo: HPELogo       },
  { id: 6, name: "VMware",        designation: "Virtualization",        Logo: VMwareLogo    },
  { id: 7, name: "AWS",           designation: "Cloud Practice",        Logo: AWSLogo       },
  { id: 8, name: "IBM",           designation: "Enterprise Partner",    Logo: IBMLogo       },
];

const stats = [
  { value: "15+", label: "Years in Business" },
  { value: "100%", label: "Uptime SLA" },
  { value: "40+", label: "Telecom Carriers" },
  { value: "500+", label: "Projects Delivered" },
];

export function TrustBar() {
  return (
    <section className="bg-[var(--bg-card)] border-y border-[var(--border)] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[11px] font-semibold text-[var(--text-3)] uppercase tracking-widest mb-8"
        >
          Trusted by leading enterprises across India
        </motion.p>

        {/* Partner tooltips row */}
        <div className="flex flex-wrap items-center justify-center mb-10 px-2">
          <AnimatedTooltip items={partnerLogos} />
        </div>

        {/* Ticker */}
        <div className="relative overflow-hidden mb-12">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-card)] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-card)] to-transparent z-10" />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex gap-14 whitespace-nowrap"
          >
            {[...clients, ...clients].map((c, i) => (
              <span key={i} className="text-[var(--text-3)] font-semibold text-sm tracking-wide">
                {c}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
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
              <div className="text-3xl font-black text-[var(--text-1)] mb-1 brand-gradient">
                {value}
              </div>
              <div className="text-xs font-medium text-[var(--text-3)]">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
