"use client";
import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface TimelineEntry {
  title: string;
  content: ReactNode;
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref          = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const [height, setHeight] = useState(0);
  const [activeIdx, setActiveIdx] = useState(-1);

  // Measure list height for the gradient beam
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      // Element may have unmounted by the time the observer fires
      if (!ref.current) return;
      setHeight(ref.current.getBoundingClientRect().height);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Track which entry is most prominently in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibility = new Array(data.length).fill(0);

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            visibility[i] = entry.intersectionRatio;
          }
          // Pick the index with highest visibility above a small threshold
          let bestIdx = -1, bestVal = 0.05;
          for (let j = 0; j < visibility.length; j++) {
            if (visibility[j] > bestVal) { bestVal = visibility[j]; bestIdx = j; }
          }
          setActiveIdx(bestIdx);
        },
        // Multiple thresholds so we can compare entries by ratio
        { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-30% 0px -30% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [data.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 60%"],
  });

  const heightTransform   = useTransform(scrollYProgress, [0, 1],   [0, height]);
  const opacityTransform  = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="w-full">
      <div ref={ref} className="relative max-w-7xl mx-auto pb-16">
        {data.map((item, i) => {
          const active = i === activeIdx;
          return (
            <div
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="flex justify-start pt-10 md:pt-28 md:gap-10"
            >
              {/* Left rail — sticky year + circle marker */}
              <div className="sticky flex flex-col md:flex-row z-10 items-center top-28 self-start max-w-xs lg:max-w-sm md:w-full">
                {/* Marker circle */}
                <div
                  className={`h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    active
                      ? "ring-2 ring-[var(--brand-purple)] shadow-[0_0_22px_rgba(124,58,237,0.65)] bg-[var(--bg-base)]"
                      : "ring-1 ring-[var(--border-strong)] bg-[var(--bg-card)]"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full transition-all duration-500 relative ${
                      active
                        ? "bg-gradient-to-br from-[#e63946] via-[#7c3aed] to-[#06b6d4] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.30)]"
                        : "bg-[var(--bg-card-2)] border border-[var(--border-strong)]"
                    }`}
                  >
                    {active && (
                      <div className="absolute inset-0 rounded-full animate-ping bg-[var(--brand-purple)] opacity-30" />
                    )}
                  </div>
                </div>

                <h3
                  className={`hidden md:block text-xl md:pl-20 md:text-4xl lg:text-5xl font-black tracking-tight transition-all duration-500 ${
                    active ? "brand-gradient" : "text-[var(--text-3)] opacity-60"
                  }`}
                >
                  {item.title}
                </h3>
              </div>

              {/* Right content */}
              <div className="relative pl-20 pr-2 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-3 text-left font-black brand-gradient">
                  {item.title}
                </h3>
                <motion.div
                  initial={{ opacity: 0.4, y: 10 }}
                  animate={active ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {item.content}
                </motion.div>
              </div>
            </div>
          );
        })}

        {/* Vertical gradient beam */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]"
        >
          <div className="absolute inset-0 bg-[var(--border-strong)]" />
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-[#e63946] via-[#7c3aed] to-[#06b6d4] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
