"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  { quote: "Overall, we are satisfied with the services provided. The team was professional, responsive, and delivered as promised.", name: "Satish",         role: "IT Director", company: "GoodRich" },
  { quote: "The pricing was fair for the level of expertise. The cost was fully justified by the outcome — and ongoing managed service gives us peace of mind.", name: "Manoj Shinde",   role: "IT Head",     company: "Neo Nich" },
  { quote: "Highly impressed with the team's dedication and timely delivery. Excellent communication throughout — they understood our infrastructure better than any previous vendor.", name: "Sachin Mestry",  role: "Designer",    company: "CCI" },
  { quote: "Algoritham took complete ownership of our IT. That level of accountability is rare — and exactly what a growing company needs.",          name: "Rohin Patel",    role: "IT Director", company: "Enterprise" },
  { quote: "From day one, they functioned as our IT department. The hand-off was seamless, and SLA response times have been spot-on.",                name: "Priya Menon",     role: "Operations",  company: "Healthcare Group" },
  { quote: "Multi-site rollout completed on schedule. Their NOC visibility and proactive incident management are best-in-class.",                     name: "Vikram Iyer",     role: "CTO",          company: "Manufacturing" },
];

const Card = ({ t }: { t: (typeof testimonials)[number] }) => (
  <figure className="relative shrink-0 w-[340px] md:w-[400px] mx-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 hover:border-[var(--accent-violet-border)] transition-colors duration-300">
    <Quote size={20} className="text-[var(--accent-violet)]/50 mb-3" />
    <blockquote className="text-[var(--text-1)] text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</blockquote>
    <figcaption className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center text-white font-bold text-xs">
        {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
      </div>
      <div>
        <p className="text-[var(--text-1)] font-semibold text-sm leading-tight">{t.name}</p>
        <p className="text-[var(--text-3)] text-xs">{t.role} · {t.company}</p>
      </div>
    </figcaption>
  </figure>
);

export function Testimonials() {
  // Two rows, scrolling in opposite directions
  const row1 = [...testimonials, ...testimonials];
  const row2 = [...testimonials.slice().reverse(), ...testimonials.slice().reverse()];

  return (
    <section className="relative bg-[var(--bg-card)] py-24 border-t border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <p className="text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-widest mb-4">Client Feedback</p>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-1)] tracking-tight">What our clients say.</h2>
        </motion.div>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[var(--bg-card)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[var(--bg-card)] to-transparent" />

        <div className="overflow-hidden mb-5">
          <div className="flex marquee-row" style={{ width: "max-content" }}>
            {row1.map((t, i) => <Card key={`r1-${i}`} t={t} />)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex marquee-row marquee-reverse" style={{ width: "max-content" }}>
            {row2.map((t, i) => <Card key={`r2-${i}`} t={t} />)}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-row {
          animation: scroll-x 50s linear infinite;
        }
        .marquee-reverse {
          animation: scroll-x 60s linear infinite reverse;
        }
        @keyframes scroll-x {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
