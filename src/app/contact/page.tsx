"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ArrowRight, Globe } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { DottedGlobe } from "@/components/ui/dotted-globe";

const detailGroups = [
  { icon: Phone,   label: "Call us",      value: "+91 99301 81363",    sub: "+91 95942 67666 · 022-35131125", href: "tel:+919930181363"        },
  { icon: Mail,    label: "Write to us",  value: "info@algoritham.in", sub: "Replies within 1 business day",  href: "mailto:info@algoritham.in" },
  { icon: MapPin,  label: "Office",       value: "Mumbai 400069",      sub: "1102, Chandak Chamber, Andheri E"                                  },
  { icon: Clock,   label: "Availability", value: "24/7 Managed Ops",   sub: "Mon–Sat 9am–7pm · new enquiries"                                  },
];

const services = [
  "Infrastructure", "Cloud Solutions", "Cybersecurity",
  "Networking", "Telecom", "System Integration", "Free IT Assessment",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", service: "", message: "" });

  return (
    <PageLayout>
      <section className="relative pt-28 pb-24 overflow-hidden">

        {/* Soft brand washes */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(124,58,237,0.10),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_15%_60%,rgba(230,57,70,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_85%_70%,rgba(6,182,212,0.06),transparent)]" />

        {/* Dotted revolving globe — anchored behind the form/details cards */}
        <div className="absolute inset-x-0 top-[280px] flex items-start justify-center pointer-events-none">
          <div className="relative w-[1100px] h-[1100px] max-w-none">
            {/* Soft halo behind the globe */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.14),transparent_60%)] blur-2xl" />
            {/* Globe itself — bigger + a touch more opaque so it reads behind the cards */}
            <div className="absolute inset-0 opacity-[0.30] dark:opacity-[0.36] text-[var(--text-1)]">
              <DottedGlobe rings={26} perRing={70} />
            </div>
            {/* Slow counter-rotating accent ring */}
            <div className="absolute inset-[8%] rounded-full border border-[var(--accent-violet-border)] opacity-30 dark:opacity-40 animate-[contact-orbit_60s_linear_infinite]" />
            <div className="absolute inset-[18%] rounded-full border border-[var(--accent-cyan)]/20 opacity-30 dark:opacity-40 animate-[contact-orbit-rev_75s_linear_infinite]" />
          </div>
        </div>

        <style jsx>{`
          @keyframes contact-orbit      { 0% { transform: rotate(0deg);   } 100% { transform: rotate(360deg);   } }
          @keyframes contact-orbit-rev  { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg);     } }
        `}</style>

        {/* Subtle dotted bg for the rest of the canvas */}
        <div
          className="absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000,transparent_85%)] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, var(--border-strong) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 lg:mb-16"
          >
            <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
              <Globe size={12} /> Get in touch
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--text-1)] tracking-tight mb-5 max-w-3xl mx-auto leading-tight">
              Let&apos;s talk about <span className="brand-gradient animate-gradient">your IT.</span>
            </h1>
            <p className="text-[var(--text-2)] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Free assessment, no commitment. Tell us what you&apos;re building — our certified engineers will reach out within 1 business day.
            </p>
          </motion.div>

          {/* Two-column grid: details + form */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              {/* Headline card */}
              <CardSpotlight className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden" radius={420}>
                <div className="relative p-7 sm:p-9">
                  {/* Inner soft gradient */}
                  <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_70%)] pointer-events-none" />
                  <div className="absolute -bottom-20 -left-16 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.18),transparent_70%)] pointer-events-none" />
                  <div className="relative">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent-violet)] mb-3">CONTACT DETAILS</p>
                    <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-1)] tracking-tight mb-3">
                      Direct line to engineers — not a call centre.
                    </h2>
                    <p className="text-[var(--text-2)] text-sm leading-relaxed max-w-md">
                      Whether you need a free IT audit, an emergency response, or to talk pricing — we&apos;re a phone call away.
                    </p>
                  </div>
                </div>
              </CardSpotlight>

              {/* Detail cards grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {detailGroups.map(({ icon: Icon, label, value, sub, href }) => (
                  <CardSpotlight key={label} className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]" radius={260}>
                    {href ? (
                      <a href={href} className="block p-5 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/20 flex items-center justify-center mb-4 group-hover:from-[#7c3aed]/40 group-hover:to-[#06b6d4]/40 transition-all">
                          <Icon size={15} className="text-[var(--accent-violet)]" />
                        </div>
                        <p className="text-[10px] font-bold text-[var(--text-3)] uppercase tracking-widest mb-1">{label}</p>
                        <p className="text-[var(--text-1)] font-bold text-sm mb-0.5 group-hover:text-[var(--accent-violet)] transition-colors">{value}</p>
                        <p className="text-[var(--text-3)] text-xs leading-snug">{sub}</p>
                      </a>
                    ) : (
                      <div className="p-5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/20 flex items-center justify-center mb-4">
                          <Icon size={15} className="text-[var(--accent-violet)]" />
                        </div>
                        <p className="text-[10px] font-bold text-[var(--text-3)] uppercase tracking-widest mb-1">{label}</p>
                        <p className="text-[var(--text-1)] font-bold text-sm mb-0.5">{value}</p>
                        <p className="text-[var(--text-3)] text-xs leading-snug">{sub}</p>
                      </div>
                    )}
                  </CardSpotlight>
                ))}
              </div>

              {/* Map */}
              <CardSpotlight className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden h-56">
                <iframe
                  title="Algoritham office location"
                  src="https://maps.google.com/maps?q=Chandak+Chamber+Andheri+East+Mumbai&output=embed"
                  width="100%" height="100%" style={{ border: 0 }} loading="lazy"
                  className="opacity-80"
                />
              </CardSpotlight>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
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
                    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5 flex flex-col h-full">

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
                          {services.map(s => <option key={s}>{s}</option>)}
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

                      <button
                        type="submit"
                        className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:opacity-95 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/45 hover:-translate-y-0.5 duration-200"
                      >
                        <Send size={15} />
                        Send Message
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                      </button>

                      <p className="text-center text-[11px] text-[var(--text-3)]">
                        We respond within 1 business day · No spam, ever.
                      </p>
                    </form>
                  )}
                </div>
              </CardSpotlight>
            </motion.div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
}
