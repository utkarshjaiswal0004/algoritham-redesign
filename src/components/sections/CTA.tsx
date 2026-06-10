"use client";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { Meteors } from "@/components/ui/meteors";
import { GridBackground } from "@/components/ui/dotted-background";
import type { Home, SiteSettings } from "@/sanity/types";

type Props = { home: Home; site: SiteSettings };

export function CTA({ home, site }: Props) {
  return (
    <section id="contact-cta" className="bg-[var(--bg-card)] py-24 relative overflow-hidden border-t border-[var(--border)]">
      <GridBackground />
      <Meteors number={18} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(124,58,237,0.08),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_50%,rgba(230,57,70,0.05),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_50%,rgba(6,182,212,0.05),transparent)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-6">{home.ctaEyebrow}</p>
          <h2 className="text-4xl md:text-6xl font-black text-[var(--text-1)] tracking-tight mb-6 leading-tight">{home.ctaHeadline}</h2>
          {home.ctaSubhead && (
            <p className="text-[var(--text-2)] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">{home.ctaSubhead}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            {home.ctaPrimary && (
              <Link href={home.ctaPrimary.href}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all duration-200">
                {home.ctaPrimary.label}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            {home.ctaSecondary && (
              <a href={home.ctaSecondary.href}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium text-[var(--text-1)] bg-[var(--bg-card-2)] border border-[var(--border)] rounded-xl hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
                <Phone size={14} /> {home.ctaSecondary.label}
              </a>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-sm text-[var(--text-3)]">
            {site.email && (
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-[var(--text-2)] transition-colors">
                <Mail size={14} />{site.email}
              </a>
            )}
            <span className="hidden sm:block w-px h-4 bg-[var(--border)]" />
            {site.phonePrimary && (
              <a href={`tel:${site.phonePrimary.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-[var(--text-2)] transition-colors">
                <Phone size={14} />{site.phonePrimary}
              </a>
            )}
            <span className="hidden sm:block w-px h-4 bg-[var(--border)]" />
            <span>{site.city ?? ""} {site.postalCode ?? ""}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
