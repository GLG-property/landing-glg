"use client";

import { createElement, useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Signals the layout's fallback timer that the client bundle actually loaded,
// so the `.js` reveal gate stays on. See layout.tsx.
if (typeof window !== "undefined") {
  (window as unknown as { __glgJs?: boolean }).__glgJs = true;
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: boolean;
  /** Extra transition delay in ms (single-block mode). */
  delay?: number;
  as?: "div" | "section" | "ul";
};

/**
 * Fades content in on first scroll into view.
 * The hidden initial state only applies under `html.js` (set in layout),
 * so content stays fully visible when JavaScript is unavailable.
 */
export function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      // low threshold so very tall groups (mobile stacks) still trigger on short viewports
      { threshold: 0.05, rootMargin: "0px 0px -48px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: clsx(stagger ? "reveal-group" : "reveal", visible && "is-visible", className),
      style: delay ? { animationDelay: `${delay}ms` } : undefined,
    },
    children
  );
}
