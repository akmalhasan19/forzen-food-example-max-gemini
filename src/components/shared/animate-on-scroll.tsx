"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealGroupProps {
  children: ReactNode;
  className?: string;
  /** IntersectionObserver threshold (0-1). Default 0.1 */
  threshold?: number;
  /** Negative bottom margin shrinks the trigger zone so animation fires earlier. */
  rootMargin?: string;
}

/**
 * Wraps a section and adds `data-revealed` attribute when scrolled into view.
 * Child elements use CSS classes like `.reveal-slide-up` or `.reveal-slide-right-bounce`
 * that are activated by the `[data-revealed]` parent selector.
 */
export function ScrollRevealGroup({
  children,
  className,
  threshold = 0.1,
  rootMargin = "0px 0px -60px 0px",
}: ScrollRevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      data-revealed={revealed || undefined}
    >
      {children}
    </div>
  );
}
