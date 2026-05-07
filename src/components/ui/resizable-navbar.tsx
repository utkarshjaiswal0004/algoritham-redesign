"use client";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import React, { useRef, useState } from "react";

interface NavbarProps        { children: React.ReactNode; className?: string; }
interface NavBodyProps       { children: React.ReactNode; className?: string; visible?: boolean; }
interface NavItemsProps      {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}
interface MobileNavProps       { children: React.ReactNode; className?: string; visible?: boolean; }
interface MobileNavHeaderProps { children: React.ReactNode; className?: string; }
interface MobileNavMenuProps   {
  children: React.ReactNode;
  className?: string;
  isOpen:    boolean;
  onClose:   () => void;
}

/**
 * Aceternity-style Resizable Navbar primitives.
 * - At rest: full-width, transparent.
 * - On scroll past 100px: shrinks to a centred 40% pill with backdrop blur + shadow.
 * Adapted to our stack (framer-motion + lucide icons + theme CSS variables).
 */
export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => setVisible(latest > 100));

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px) saturate(180%)" : "blur(10px) saturate(120%)",
        boxShadow: visible
          ? "0 0 24px rgba(34,42,53,0.08), 0 1px 1px rgba(0,0,0,0.05), 0 0 0 1px rgba(34,42,53,0.05), 0 0 4px rgba(34,42,53,0.08), 0 16px 68px rgba(47,48,55,0.06), 0 1px 0 rgba(255,255,255,0.10) inset"
          : "none",
        width:  visible ? "78%" : "100%",
        y:      visible ? 14    : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      style={{ minWidth: "min(940px, 100%)", WebkitBackdropFilter: "inherit" } as React.CSSProperties}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full pl-4 pr-3 py-2.5 lg:flex",
        // Fully glass — no solid color until scrolled, only blur reveals what's behind
        visible
          ? "bg-[var(--bg-base)]/55 border border-[var(--border)]"
          : "bg-transparent border border-transparent",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium transition duration-200 lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          key={`link-${idx}`}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors"
        >
          {hovered === idx && (
            <motion.div
              layoutId="nav-hover-pill"
              className="absolute inset-0 h-full w-full rounded-full bg-[var(--bg-card-2)]"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px) saturate(180%)" : "blur(12px) saturate(120%)",
        boxShadow: visible
          ? "0 0 24px rgba(34,42,53,0.08), 0 1px 1px rgba(0,0,0,0.05), 0 0 0 1px rgba(34,42,53,0.05), 0 0 4px rgba(34,42,53,0.08), 0 16px 68px rgba(47,48,55,0.06), 0 1px 0 rgba(255,255,255,0.10) inset"
          : "none",
        width:        visible ? "94%"  : "100%",
        paddingRight: visible ? "14px" : "16px",
        paddingLeft:  visible ? "14px" : "16px",
        borderRadius: visible ? "24px" : "0px",
        y:            visible ? 12     : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      style={{ WebkitBackdropFilter: "inherit" } as React.CSSProperties}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-1rem)] flex-col items-center justify-between py-3 lg:hidden",
        visible
          ? "bg-[var(--bg-base)]/60 border border-[var(--border)]"
          : "bg-transparent",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => (
  <div className={cn("flex w-full flex-row items-center justify-between", className)}>
    {children}
  </div>
);

export const MobileNavMenu = ({ children, className, isOpen }: MobileNavMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y:  0 }}
        exit={{    opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-1 rounded-2xl px-4 py-6 mt-2 mx-auto max-w-[calc(100vw-2rem)] bg-[var(--bg-card)] border border-[var(--border)] shadow-2xl shadow-black/30",
          className,
        )}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export const MobileNavToggle = ({
  isOpen, onClick,
}: { isOpen: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-1)] border border-[var(--border)] bg-[var(--bg-card)]"
    aria-label="Toggle menu"
  >
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={isOpen ? "x" : "menu"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate:   0, opacity: 1 }}
        exit={{    rotate:  90, opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </motion.span>
    </AnimatePresence>
  </button>
);

export const NavbarButton = ({
  href, as: Tag = "a", children, className, variant = "primary", ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "gradient";
} & (React.ComponentPropsWithoutRef<"a"> | React.ComponentPropsWithoutRef<"button">)) => {
  const base =
    "inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5";
  const variants = {
    primary:   "bg-[var(--bg-card)] text-[var(--text-1)] border border-[var(--border)] hover:bg-[var(--bg-card-2)]",
    secondary: "bg-transparent text-[var(--text-2)] hover:text-[var(--text-1)]",
    gradient:  "text-white bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40",
  };
  return (
    <Tag href={href} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Tag>
  );
};
