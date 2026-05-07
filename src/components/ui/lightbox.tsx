"use client";
import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

export function Lightbox({
  images, openIndex, onClose, onNext, onPrev,
}: {
  images: LightboxImage[];
  openIndex: number | null;
  onClose: () => void;
  onNext:  () => void;
  onPrev:  () => void;
}) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (openIndex === null) return;
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft")  onPrev();
  }, [openIndex, onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Body scroll lock while open
  useEffect(() => {
    if (openIndex !== null) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [openIndex]);

  return (
    <AnimatePresence>
      {openIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous"
            className="absolute left-4 sm:left-8 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next"
            className="absolute right-4 sm:right-8 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          {/* Image */}
          <motion.div
            key={openIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl aspect-[16/13] sm:aspect-[16/12]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[openIndex].src}
              alt={images[openIndex].alt}
              fill
              sizes="100vw"
              priority
              className="object-contain"
            />
            {images[openIndex].caption && (
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/90 text-sm font-medium tracking-wide bg-black/50 backdrop-blur px-3 py-1.5 rounded-full whitespace-nowrap">
                {images[openIndex].caption}
              </p>
            )}
          </motion.div>

          {/* Counter */}
          <div className="absolute bottom-4 right-4 text-white/70 text-xs font-mono">
            {openIndex + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
