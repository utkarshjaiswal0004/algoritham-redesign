"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Users, Maximize2 } from "lucide-react";
import { urlFor } from "@/sanity/image";
import type { Home, EventPhoto } from "@/sanity/types";

const Lightbox = dynamic(() => import("@/components/ui/lightbox").then(m => m.Lightbox), { ssr: false });

// Fallback paths — order MUST match EVENT_PHOTOS_DEFAULT in defaults.ts.
// 2026 events first, then the older archive.
const FALLBACK_SRCS = [
  "/gallery/rnr-event-2026.jpg",
  "/gallery/adobe-immersion-2026.jpg",
  "/gallery/adobe-ai-briefing.jpg",
  "/gallery/adobe-ai-deep-dive.jpg",
  "/gallery/adobe-team-2026.jpg",
  "/gallery/lts.webp",
  "/gallery/sup.webp",
  "/gallery/mx.webp",
  "/gallery/mix1.webp",
  "/gallery/im.webp",
  "/gallery/amk-team.webp",
];

type Props = { home: Home; photos: EventPhoto[] };

export function EventGallery({ home, photos }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const resolved = photos.map((p, i) => ({
    src: p.image ? urlFor(p.image).width(1200).url() : (FALLBACK_SRCS[i] ?? FALLBACK_SRCS[0]),
    caption: p.caption,
    alt:     p.alt,
    span:    p.span ?? "",
  }));

  const onNext = () => setOpenIndex((i) => (i === null ? null : (i + 1) % resolved.length));
  const onPrev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + resolved.length) % resolved.length));

  return (
    <section id="events" className="relative bg-[var(--bg-card)] py-24 border-t border-[var(--border)] overflow-hidden">

      <div
        className="absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent_85%)] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--border-strong) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_0%,rgba(124,58,237,0.06),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-widest mb-4 inline-flex items-center gap-2 justify-center">
            <Camera size={12} />
            {home.eventsEyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-1)] tracking-tight max-w-2xl mx-auto leading-tight">
            {home.eventsHeadline}
          </h2>
          {home.eventsSubhead && (
            <p className="text-[var(--text-2)] text-base sm:text-lg mt-5 max-w-xl mx-auto">{home.eventsSubhead}</p>
          )}
          <p className="text-xs text-[var(--text-3)] mt-3">Hover to reveal · click to expand</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[14rem] sm:auto-rows-[16rem] gap-4">
          {resolved.map((p, i) => (
            <motion.button
              key={`${p.src}-${i}`}
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

              <div
                className="absolute inset-0 mix-blend-color transition-opacity duration-500 group-hover:opacity-0 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.45) 0%, rgba(6,182,212,0.40) 100%)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 text-left">
                <p className="text-[10px] font-bold text-cyan-300/90 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <Users size={10} /> Event
                </p>
                <p className="text-white font-bold text-sm sm:text-base leading-tight drop-shadow">{p.caption}</p>
              </div>

              <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/55 backdrop-blur text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all">
                <Maximize2 size={10} /> Open
              </div>
            </motion.button>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-[var(--text-3)] mt-10"
        >
          Photos from real customer-facing events conducted in Mumbai · 2024–2025.
        </motion.p>
      </div>

      <Lightbox
        images={resolved.map(p => ({ src: p.src, alt: p.alt, caption: p.caption }))}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNext={onNext}
        onPrev={onPrev}
      />
    </section>
  );
}
