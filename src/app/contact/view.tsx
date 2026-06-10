"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ArrowRight, Globe } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { DottedGlobe } from "@/components/ui/dotted-globe";
import { iconFor } from "@/lib/icon-map";
import type { ContactPage, SiteSettings } from "@/sanity/types";

const SERVICE_OPTIONS = [
  "Infrastructure", "Cloud Solutions", "Cybersecurity",
  "Networking", "Telecom", "System Integration", "Free IT Assessment",
];

const ICON_FALLBACK: Record<string, typeof Phone> = {
  Call: Phone, Write: Mail, Office: MapPin, Availability: Clock,
};

export function ContactView({ page, site }: { page: ContactPage; site: SiteSettings }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", service: "", message: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true); setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed");
    } finally { setSubmitting(false); }
  }

  return (
    <section className="relative pt-28 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(124,58,237,0.10),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_15%_60%,rgba(230,57,70,0.06),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_85%_70%,rgba(6,182,212,0.06),transparent)]" />

      <div className="absolute inset-x-0 top-[280px] flex items-start justify-center pointer-events-none">
        <div className="relative w-[1100px] h-[1100px] max-w-none">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.14),transparent_60%)] blur-2xl" />
          <div className="absolute inset-0 opacity-[0.30] dark:opacity-[0.36] text-[var(--text-1)]">
            <DottedGlobe rings={26} perRing={70} />
          </div>
          <div className="absolute inset-[8%] rounded-full border border-[var(--accent-violet-border)] opacity-30 dark:opacity-40 animate-[contact-orbit_60s_linear_infinite]" />
          <div className="absolute inset-[18%] rounded-full border border-[var(--accent-cyan)]/20 opacity-30 dark:opacity-40 animate-[contact-orbit-rev_75s_linear_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes contact-orbit      { 0% { transform: rotate(0deg);   } 100% { transform: rotate(360deg);   } }
        @keyframes contact-orbit-rev  { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg);     } }
      `}</style>

      <div
        className="absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000,transparent_85%)] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--border-strong) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 lg:mb-16">
          <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
            <Globe size={12} /> {page.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--text-1)] tracking-tight mb-5 max-w-3xl mx-auto leading-tight">
            {page.headlinePre} <span className="brand-gradient animate-gradient">{page.headlineGradient}</span>
          </h1>
          <p className="text-[var(--text-2)] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">{page.subhead}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
            <CardSpotlight className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden" radius={420}>
              <div className="relative p-7 sm:p-9">
                <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_70%)] pointer-events-none" />
                <div className="absolute -bottom-20 -left-16 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.18),transparent_70%)] pointer-events-none" />
                <div className="relative">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent-violet)] mb-3">CONTACT DETAILS</p>
                  <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-1)] tracking-tight mb-3">
                    {page.detailsHeading}
                  </h2>
                  <p className="text-[var(--text-2)] text-sm leading-relaxed max-w-md">{page.detailsCopy}</p>
                </div>
              </div>
            </CardSpotlight>

            <div className="grid sm:grid-cols-2 gap-4">
              {(page.details ?? []).map((d) => {
                const Icon = iconFor(d.icon, ICON_FALLBACK[d.label] ?? Phone);
                return (
                  <CardSpotlight key={d.label} className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]" radius={260}>
                    {d.href ? (
                      <a href={d.href} className="block p-5 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/20 flex items-center justify-center mb-4 group-hover:from-[#7c3aed]/40 group-hover:to-[#06b6d4]/40 transition-all">
                          <Icon size={15} className="text-[var(--accent-violet)]" />
                        </div>
                        <p className="text-[10px] font-bold text-[var(--text-3)] uppercase tracking-widest mb-1">{d.label}</p>
                        <p className="text-[var(--text-1)] font-bold text-sm mb-0.5 group-hover:text-[var(--accent-violet)] transition-colors">{d.value}</p>
                        {d.sub && <p className="text-[var(--text-3)] text-xs leading-snug">{d.sub}</p>}
                      </a>
                    ) : (
                      <div className="p-5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/20 flex items-center justify-center mb-4">
                          <Icon size={15} className="text-[var(--accent-violet)]" />
                        </div>
                        <p className="text-[10px] font-bold text-[var(--text-3)] uppercase tracking-widest mb-1">{d.label}</p>
                        <p className="text-[var(--text-1)] font-bold text-sm mb-0.5">{d.value}</p>
                        {d.sub && <p className="text-[var(--text-3)] text-xs leading-snug">{d.sub}</p>}
                      </div>
                    )}
                  </CardSpotlight>
                );
              })}
            </div>

            {page.mapEmbedUrl && (
              <CardSpotlight className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden h-56">
                <iframe
                  title={`${site.shortName ?? "Algoritham"} office location`}
                  src={page.mapEmbedUrl}
                  width="100%" height="100%" style={{ border: 0 }} loading="lazy"
                  className="opacity-80"
                />
              </CardSpotlight>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <CardSpotlight className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] h-full" radius={520}>
              <div className="p-7 sm:p-9 h-full flex flex-col">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center text-center flex-1 py-8">
                    <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mb-5">
                      <CheckCircle size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-black text-[var(--text-1)] mb-2">Message received.</h3>
                    <p className="text-[var(--text-2)] max-w-sm">Our team will reach out within 1 business day with next steps.</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5 flex flex-col h-full">
                    <div className="mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent-cyan)] mb-2">Send a message</p>
                      <h2 className="text-2xl font-black text-[var(--text-1)] tracking-tight">Tell us about your project</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: "name",    label: "Full Name",    placeholder: "Rahul Sharma",      type: "text",  required: true  },
                        { id: "email",   label: "Work Email",   placeholder: "rahul@company.com", type: "email", required: true  },
                        { id: "company", label: "Company",      placeholder: "Acme Corp",         type: "text",  required: false },
                        { id: "phone",   label: "Phone",        placeholder: "+91 98765 43210",   type: "tel",   required: false },
                      ].map((f) => (
                        <div key={f.id}>
                          <label htmlFor={f.id} className="block text-[10px] font-semibold text-[var(--text-2)] mb-1.5 uppercase tracking-wider">
                            {f.label}{f.required && <span className="text-rose-500 ml-0.5">*</span>}
                          </label>
                          <input
                            id={f.id} type={f.type} placeholder={f.placeholder} required={f.required}
                            value={form[f.id as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card-2)] border border-[var(--border)] text-[var(--text-1)] placeholder:text-[var(--text-3)] text-sm focus:outline-none focus:border-[var(--accent-violet-border)] focus:ring-2 focus:ring-[var(--accent-violet-bg)] transition-all"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-[10px] font-semibold text-[var(--text-2)] mb-1.5 uppercase tracking-wider">
                        Service of Interest
                      </label>
                      <select
                        id="service"
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card-2)] border border-[var(--border)] text-[var(--text-1)] text-sm focus:outline-none focus:border-[var(--accent-violet-border)] focus:ring-2 focus:ring-[var(--accent-violet-bg)] transition-all"
                      >
                        <option value="">Select a service…</option>
                        {SERVICE_OPTIONS.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <label htmlFor="message" className="block text-[10px] font-semibold text-[var(--text-2)] mb-1.5 uppercase tracking-wider">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="message" rows={5} required
                        placeholder="Tell us about your current IT setup and what you're looking to achieve…"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full flex-1 px-4 py-3 rounded-xl bg-[var(--bg-card-2)] border border-[var(--border)] text-[var(--text-1)] placeholder:text-[var(--text-3)] text-sm focus:outline-none focus:border-[var(--accent-violet-border)] focus:ring-2 focus:ring-[var(--accent-violet-bg)] transition-all resize-none"
                      />
                    </div>

                    {error && <p className="text-xs text-rose-500">{error}</p>}

                    <button
                      type="submit" disabled={submitting}
                      className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:opacity-95 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/45 hover:-translate-y-0.5 duration-200 disabled:opacity-60"
                    >
                      <Send size={15} />
                      {submitting ? "Sending…" : "Send Message"}
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-center text-[11px] text-[var(--text-3)]">{page.responsePromise}</p>
                  </form>
                )}
              </div>
            </CardSpotlight>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
