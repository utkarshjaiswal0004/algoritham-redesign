"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Aceternity-inspired masonry layout-grid.
 * Click a card → it expands into a centred lightbox with the description.
 * Click outside the expanded card → it collapses.
 *
 * Each card has a `className` for grid placement (e.g. "md:col-span-2 row-span-2")
 * so callers can build any masonry shape.
 */
export type LayoutCard = {
  id: number | string;
  thumbnail: string;
  alt: string;
  title: string;
  description?: string;
  className?: string;
};

export function LayoutGrid({ cards }: { cards: LayoutCard[] }) {
  const [selected, setSelected] = useState<LayoutCard | null>(null);
  const [last,     setLast]     = useState<LayoutCard | null>(null);

  const open = (c: LayoutCard) => { setLast(c); setSelected(c); };
  const close = () => setSelected(null);

  return (
    <div className="w-full relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[15rem]">
        {cards.map((card) => (
          <div key={card.id} className={cn("relative", card.className)}>
            <motion.div
              onClick={() => open(card)}
              layoutId={`card-${card.id}`}
              className={cn(
                "relative w-full h-full overflow-hidden rounded-2xl cursor-zoom-in border border-[var(--border)] hover:border-[var(--accent-violet-border)] group transition-colors duration-300",
                selected?.id === card.id && "z-50",
              )}
            >
              <CardImage card={card} />

              {/* Hover caption */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 text-left translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/85 via-black/30 to-transparent">
                <p className="text-[9.5px] font-bold tracking-widest uppercase text-cyan-300/90 mb-1">
                  Event
                </p>
                <p className="text-white font-bold text-sm sm:text-base leading-tight drop-shadow">
                  {card.title}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-50 grid place-items-center p-4 pointer-events-none">
              <motion.div
                layoutId={`card-${selected.id}`}
                onClick={close}
                className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden cursor-zoom-out pointer-events-auto"
              >
                <CardImage card={selected} priority />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-black/90 via-black/45 to-transparent"
                >
                  <p className="text-[10px] font-bold tracking-widest uppercase text-cyan-300/90 mb-2">Event</p>
                  <h3 className="text-white font-black text-xl sm:text-3xl tracking-tight mb-2">
                    {selected.title}
                  </h3>
                  {selected.description && (
                    <p className="text-white/80 text-sm sm:text-base max-w-2xl leading-relaxed">{selected.description}</p>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Hidden carrier for shared-layout return animation */}
      {last && selected === null && (
        <motion.div
          layoutId={`card-${last.id}`}
          style={{ display: "none" }}
          aria-hidden
        />
      )}
    </div>
  );
}

function CardImage({ card, priority = false }: { card: LayoutCard; priority?: boolean }) {
  return (
    <Image
      src={card.thumbnail}
      alt={card.alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
    />
  );
}
