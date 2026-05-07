"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Users, Maximize2 } from "lucide-react";

// Lightbox is only needed when a photo is opened — load on demand
const Lightbox = dynamic(() => import("@/components/ui/lightbox").then(m => m.Lightbox), { ssr: false });

const photos = [
  { src: "/gallery/lts.webp",      caption: "Customer Awareness Training",   alt: "3Gen Data Systems Training Event — group photo", span: "row-span-2" },
  { src: "/gallery/sup.webp",      caption: "Technical Training Sessions",   alt: "Technical Training Session collage",              span: "" },
  { src: "/gallery/mx.webp",       caption: "Partnership Meet — Crimson",    alt: "Crimson 1&3 — partnership team photos",           span: "row-span-2" },
  { src: "/gallery/mix1.webp",     caption: "Team Day & Workshop",           alt: "Team training and group photo",                   span: "" },
  { src: "/gallery/im.webp",       caption: "Customer Engagement Session",   alt: "Audience at training event",                      span: "" },
  { src: "/gallery/amk-team.webp", caption: "Technical Knowledge Transfer",  alt: "Training session collage",                        span: "" },
];

export function EventGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const onNext = () => setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length));
  const onPrev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));

  return (
    <section id="events" className="relative bg-[var(--bg-card)] py-24 border-t border-[var(--border)] overflow-hidden">

      {/* Subtle dotted backdrop */}
      <div
        className="absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent_85%)] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--border-strong) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_0%,rgba(124,58,237,0.06),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
            <Camera size={12} />
            Events & Team Moments
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-1)] tracking-tight max-w-2xl mx-auto leading-tight">
            Behind every project, <span className="brand-gradient">a team that shows up.</span>
          </h2>
          <p className="text-[var(--text-2)] text-base sm:text-lg mt-5 max-w-xl mx-auto">
            Glimpses from training sessions, customer awareness meets, and partnership events with 3Gen Data Systems and friends.
          </p>
          <p className="text-xs text-[var(--text-3)] mt-3">Hover to reveal · click to expand</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[14rem] sm:auto-rows-[16rem] gap-4">
          {photos.map((p, i) => (
            <motion.button
              key={p.src}
              type="button"
              onClick={() => setOpenIndex(i)}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: "easeOut" }}
              className={`group relative h-full rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--accent-violet-border)] transition-colors duration-300 cursor-zoom-in ${p.span}`}
              aria-label={`Open ${p.caption}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-all duration-700 ease-out group-hover:scale-105 grayscale brightness-95 contrast-95 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100"
              />

              {/* Brand-tinted overlay (visible at rest, fades on hover) */}
              <div
                className="absolute inset-0 mix-blend-color transition-opacity duration-500 group-hover:opacity-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.45) 0%, rgba(6,182,212,0.40) 100%)",
                }}
              />

              {/* Bottom caption gradient (kept on hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 text-left">
                <p className="text-[10px] font-bold text-cyan-300/90 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <Users size={10} /> Event
                </p>
                <p className="text-white font-bold text-sm sm:text-base leading-tight drop-shadow">
                  {p.caption}
                </p>
              </div>

              {/* Expand hint chip — appears on hover */}
              <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/55 backdrop-blur text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all">
                <Maximize2 size={10} /> Open
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-[var(--text-3)] mt-10"
        >
          Photos from real customer-facing events conducted in Mumbai · 2024–2025.
        </motion.p>
      </div>

      {/* Lightbox modal */}
      <Lightbox
        images={photos.map(p => ({ src: p.src, alt: p.alt, caption: p.caption }))}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNext={onNext}
        onPrev={onPrev}
      />
    </section>
  );
}
