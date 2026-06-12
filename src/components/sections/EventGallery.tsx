"use client";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { urlFor } from "@/sanity/image";
import { LayoutGrid, type LayoutCard } from "@/components/ui/layout-grid";
import type { Home, EventPhoto } from "@/sanity/types";

// Fallback paths — order MUST match EVENT_PHOTOS_DEFAULT in defaults.ts.
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

// Masonry sizing — first big, next two medium, rest standard.
// Each index here corresponds to the same-indexed photo.
const GRID_CLASSES = [
  "md:col-span-2 row-span-2",  // hero card
  "md:col-span-2",             // wide
  "",                          // standard
  "row-span-2",                // tall
  "",
  "",
  "md:col-span-2",
  "",
  "",
  "",
  "row-span-2",
];

type Props = { home: Home; photos: EventPhoto[] };

export function EventGallery({ home, photos }: Props) {
  const cards: LayoutCard[] = photos.map((p, i) => ({
    id: p._id ?? `ev-${i}`,
    thumbnail: p.image ? urlFor(p.image).width(1600).url() : (FALLBACK_SRCS[i] ?? FALLBACK_SRCS[0]),
    alt:         p.alt,
    title:       p.caption,
    description: p.alt,
    className:   GRID_CLASSES[i % GRID_CLASSES.length],
  }));

  return (
    <section id="events" className="relative bg-[var(--bg-card)] py-24 border-t border-[var(--border)] overflow-hidden">

      <div
        className="absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent_85%)] pointer-events-none"
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
          <p className="text-xs text-[var(--text-3)] mt-3">Click any photo to expand</p>
        </motion.div>

        <LayoutGrid cards={cards} />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-[var(--text-3)] mt-10"
        >
          Real customer-facing events conducted in Mumbai · 2024–2026.
        </motion.p>
      </div>
    </section>
  );
}
