"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealGroupProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** IntersectionObserver threshold (0-1). Default 0.1 */
  threshold?: number;
  /** Negative bottom margin shrinks the trigger zone so animation fires earlier. */
  rootMargin?: string;
  /** If true, reveals immediately without waiting for scroll. */
  forceReveal?: boolean;
}

/**
 * Wraps a section and adds `data-revealed` attribute when scrolled into view.
 * Child elements use CSS classes like `.reveal-slide-up` or `.reveal-slide-right-bounce`
 * that are activated by the `[data-revealed]` parent selector.
 */
export function ScrollRevealGroup({
  children,
  className,
  id,
  threshold = 0.1,
  rootMargin = "0px 0px -60px 0px",
  forceReveal = false,
}: ScrollRevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(forceReveal);

  useEffect(() => {
    if (forceReveal) {
      setRevealed(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let observer: IntersectionObserver;

    // Small delay to prevent IntersectionObserver from firing synchronously 
    // on route changes before the scroll position is reset to 0 by Next.js
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(el);
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(el);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [threshold, rootMargin, forceReveal]);

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      data-revealed={revealed || undefined}
    >
      {children}
    </div>
  );
}
