"use client";
import { useEffect, useState } from "react";
import {
  Server, Mail, Phone, MapPin, Send, ArrowUpRight, ArrowUp,
  Layers, Building2, Users, Shield, Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Services:   { icon: Layers,    items: ["Infrastructure", "Cloud Solutions", "Cybersecurity", "Networking", "Telecom", "System Integration"] },
  Industries: { icon: Building2, items: ["Healthcare", "Financial Services", "Manufacturing", "Transportation", "Energy", "Government"]      },
  Company:    { icon: Users,     items: ["About Us", "Case Studies", "Gallery", "Careers"]                                                    },
  Legal:      { icon: Shield,    items: ["Privacy Policy", "Refund Policy", "Terms of Service"]                                              },
};

const linkHrefs: Record<string, Record<string, string>> = {
  Services:   { Infrastructure: "/services#infrastructure", "Cloud Solutions": "/services#cloud", Cybersecurity: "/services#security", Networking: "/services#networking", Telecom: "/services#telecom", "System Integration": "/services#integration" },
  Industries: { Healthcare: "/industries#healthcare", "Financial Services": "/industries#financial", Manufacturing: "/industries#manufacturing", Transportation: "/industries#transportation", Energy: "/industries#energy", Government: "/industries#government" },
  Company:    { "About Us": "/about", "Case Studies": "/case-studies", Gallery: "/#events", Careers: "/contact" },
  Legal:      { "Privacy Policy": "#", "Refund Policy": "#", "Terms of Service": "#" },
};

// Inline brand SVG icons (lucide no longer ships brand marks)
const Linkedin = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34v-7.62H5.81v7.62h2.53Zm-1.27-8.66a1.47 1.47 0 1 0 0-2.94 1.47 1.47 0 0 0 0 2.94Zm11.27 8.66v-4.18c0-2.24-1.2-3.28-2.79-3.28a2.4 2.4 0 0 0-2.18 1.2v-1.04h-2.53v7.3h2.53V14.4c0-1.07.2-2.1 1.5-2.1 1.3 0 1.34 1.21 1.34 2.17v3.87h2.13Z"/>
  </svg>
);
const XLogo = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2H21l-6.51 7.43L22 22h-6.84l-4.83-6.31L4.78 22H2.02l6.97-7.96L2 2h6.99l4.36 5.78L18.244 2Zm-1.2 18.4h1.65L7.05 3.49H5.3l11.74 16.91Z"/>
  </svg>
);
const GitHub = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/>
  </svg>
);

const socials = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: XLogo,    href: "#", label: "X"        },
  { icon: GitHub,   href: "#", label: "GitHub"   },
];

export function Footer() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative bg-[var(--bg-base)] border-t border-[var(--border)] overflow-hidden">

      {/* Floating scroll-to-top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 16, scale: 0.85 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] shadow-xl shadow-violet-500/40 hover:shadow-violet-500/60 text-white flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Top brand-glow line + radial wash */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-purple)]/45 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-72 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.13),transparent_70%)] pointer-events-none" />

      {/* Subtle dotted bg */}
      <div
        className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000,transparent_85%)] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--border-strong) 0.8px, transparent 0.8px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* ──────────────────────────────────────────────── */}
      {/* Newsletter band                                  */}
      {/* ──────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-8 sm:p-10 grid lg:grid-cols-5 gap-6 items-center text-center lg:text-left overflow-hidden"
        >
          {/* Newsletter card decorative gradients */}
          <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.20),transparent_70%)] blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.18),transparent_70%)] blur-2xl pointer-events-none" />

          <div className="relative lg:col-span-3">
            <p className="inline-flex items-center gap-2 text-[10px] font-bold text-[var(--accent-violet)] uppercase tracking-widest mb-3">
              <Sparkles size={12} /> Stay informed
            </p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-1)] tracking-tight mb-2 leading-tight">
              IT operations insights, <span className="brand-gradient">every month.</span>
            </h3>
            <p className="text-[var(--text-3)] text-sm max-w-md mx-auto lg:mx-0">
              Cybersecurity advisories, uptime stats, and infrastructure case studies. No fluff, no spam.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative lg:col-span-2 flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="flex-1 px-4 py-3 rounded-xl bg-[var(--bg-card-2)] border border-[var(--border)] text-[var(--text-1)] placeholder:text-[var(--text-3)] text-sm focus:outline-none focus:border-[var(--accent-violet-border)] focus:ring-2 focus:ring-[var(--accent-violet-bg)] transition-all"
            />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all"
            >
              <Send size={14} className="group-hover:translate-x-0.5 transition-transform" />
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>

      {/* ──────────────────────────────────────────────── */}
      {/* Main grid                                        */}
      {/* ──────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-10 text-center md:text-left">

          {/* Brand block */}
          <div className="lg:col-span-4 flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <Image
                src="/logo.png" alt="Algoritham"
                width={48} height={48}
                className="w-12 h-12 object-contain shrink-0 transition-transform group-hover:scale-105 group-hover:rotate-3"
              />
              <div className="text-left">
                <div className="font-black text-lg text-[var(--text-1)] tracking-tight leading-none">Algoritham</div>
                <div className="text-[9.5px] text-[var(--text-3)] uppercase tracking-widest mt-0.5">Infrastructure Pvt. Ltd.</div>
              </div>
            </Link>

            <p className="text-[var(--text-3)] text-sm leading-relaxed mb-6 max-w-sm">
              End-to-end IT managed services for enterprises across India. Established 2009 — and still building.
            </p>

            {/* Quick contact links */}
            <div className="space-y-2.5 w-full max-w-sm mb-6">
              <a href="mailto:info@algoritham.in" className="group flex items-center justify-center md:justify-start gap-2.5 text-sm text-[var(--text-2)] hover:text-[var(--accent-violet)] transition-colors">
                <span className="w-7 h-7 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent-violet-border)] transition-colors">
                  <Mail size={12} />
                </span>
                info@algoritham.in
              </a>
              <a href="tel:+919930181363" className="group flex items-center justify-center md:justify-start gap-2.5 text-sm text-[var(--text-2)] hover:text-[var(--accent-violet)] transition-colors">
                <span className="w-7 h-7 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent-violet-border)] transition-colors">
                  <Phone size={12} />
                </span>
                +91 99301 81363
              </a>
              <div className="group flex items-start justify-center md:justify-start gap-2.5 text-sm text-[var(--text-2)]">
                <span className="w-7 h-7 mt-0 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center shrink-0">
                  <MapPin size={12} />
                </span>
                <span className="leading-snug pt-1">1102, Chandak Chamber, Andheri East, Mumbai 400069</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center justify-center md:justify-start gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label} href={href} aria-label={label}
                  className="group relative w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-2)] hover:text-white hover:border-transparent transition-all overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([section, { icon: Icon, items }]) => (
              <div key={section}>
                <h4 className="flex items-center gap-2 justify-center md:justify-start text-[var(--text-1)] text-xs font-bold uppercase tracking-widest mb-4">
                  <Icon size={11} className="text-[var(--accent-violet)]" />
                  {section}
                </h4>
                <ul className="space-y-2.5">
                  {items.map((link) => (
                    <li key={link}>
                      <Link
                        href={linkHrefs[section]?.[link] ?? "#"}
                        className="group inline-flex items-center gap-1 text-[var(--text-3)] hover:text-[var(--text-1)] text-sm transition-colors"
                      >
                        {link}
                        <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[var(--accent-violet)]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ──────────────────────────────────────────────── */}
        {/* Bottom band                                      */}
        {/* ──────────────────────────────────────────────── */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[var(--text-3)] text-xs">
            © 2026 Algoritham Infrastructure Pvt. Ltd. · Crafted with care in Mumbai 🇮🇳
          </p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[var(--text-3)] text-xs px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border)]">
              <Server size={11} />
              All systems operational
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-75 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-green-500" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
