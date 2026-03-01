"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface HeroSlide {
  brand: string;
  name: string;
  category: string;
  price: string;
  image: string;
}

const slides: HeroSlide[] = [
  {
    brand: "Seafood",
    name: "Salmon Premium",
    category: "Ikan Beku",
    price: "Rp89.000",
    image:
      "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=600&h=500&fit=crop&q=80",
  },
  {
    brand: "Daging",
    name: "Wagyu Slice A5",
    category: "Daging Premium",
    price: "Rp125.000",
    image:
      "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=600&h=500&fit=crop&q=80",
  },
  {
    brand: "Olahan",
    name: "Dimsum Premium",
    category: "Makanan Olahan",
    price: "Rp45.000",
    image:
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&h=500&fit=crop&q=80",
  },
  {
    brand: "Seafood",
    name: "Udang Vaname",
    category: "Udang & Kepiting",
    price: "Rp72.000",
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&h=500&fit=crop&q=80",
  },
  {
    brand: "Sayuran",
    name: "Mix Veggies",
    category: "Sayuran Beku",
    price: "Rp35.000",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=500&fit=crop&q=80",
  },
];

export function HeroImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const textBrandRef = useRef<HTMLSpanElement>(null);
  const textNameRef = useRef<HTMLHeadingElement>(null);
  const textCategoryRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);
  const isPausedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    // Scope all GSAP animations to the container for safe bulk cleanup
    const ctx = gsap.context(() => { }, containerRef);

    return () => {
      isMountedRef.current = false;
      // 1. Stop the interval source FIRST to prevent new animations from being created
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // 2. Kill the active timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      // 3. Revert all GSAP animations scoped to this container
      ctx.revert();
    };
  }, []);

  const animateTransition = useCallback((nextIndex: number) => {
    if (isAnimatingRef.current || isPausedRef.current || !isMountedRef.current) return;

    // Ensure all refs are attached before animating
    if (
      !imageRef.current ||
      !priceRef.current ||
      !textBrandRef.current ||
      !textNameRef.current ||
      !textCategoryRef.current
    ) {
      return;
    }

    isAnimatingRef.current = true;

    const nextSlide = slides[nextIndex];

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
    timelineRef.current = tl;

    // Phase 1: Slide current content up + fade out
    tl.to(
      imageRef.current,
      {
        y: -60,
        opacity: 0,
        scale: 0.92,
        duration: 0.5,
        ease: "power2.in",
      },
      0
    )
      .to(
        priceRef.current,
        {
          y: -30,
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          ease: "power2.in",
        },
        0
      )
      .to(
        [textBrandRef.current, textNameRef.current, textCategoryRef.current],
        {
          y: -20,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
          stagger: 0.05,
        },
        0
      )

      // Phase 2: Instant swap — set new content below, then slide in
      .call(() => {
        // Guard: abort if component unmounted or refs detached during async timeline
        if (
          !isMountedRef.current ||
          !imageRef.current ||
          !priceRef.current ||
          !textBrandRef.current ||
          !textNameRef.current ||
          !textCategoryRef.current
        ) {
          // Kill the timeline to prevent Phase 3 from running on null refs
          if (timelineRef.current) {
            timelineRef.current.kill();
            timelineRef.current = null;
          }
          isAnimatingRef.current = false;
          return;
        }

        setCurrentIndex(nextIndex);

        // Reset positions to below for entrance
        gsap.set(imageRef.current, {
          y: 60,
          opacity: 0,
          scale: 0.92,
        });
        gsap.set(priceRef.current, {
          y: 30,
          opacity: 0,
          scale: 0.9,
        });
        gsap.set(
          [textBrandRef.current, textNameRef.current, textCategoryRef.current],
          {
            y: 20,
            opacity: 0,
          }
        );

        // Pre-load image src swap
        imageRef.current.src = nextSlide.image;
        imageRef.current.alt = `${nextSlide.name} product`;
      })

      // Phase 3: Slide new content up from bottom + fade in
      .to(
        imageRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          ease: "power2.out",
        },
        "+=0.05"
      )
      .to(
        priceRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.45"
      )
      .to(
        [textBrandRef.current, textNameRef.current, textCategoryRef.current],
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.06,
        },
        "-=0.4"
      );
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        const next = (currentIndex + 1) % slides.length;
        animateTransition(next);
      }
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex, animateTransition]);

  const handlePointerDown = () => {
    isPausedRef.current = true;
  };

  const handlePointerUp = () => {
    isPausedRef.current = false;
  };

  const current = slides[currentIndex];

  return (
    <div className="relative" ref={containerRef}>
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[#93C572]/20 dark:bg-[#93C572]/10 rounded-[3rem] transform rotate-3 scale-95 z-0" />
      <div className="absolute inset-0 bg-pink-100/40 dark:bg-pink-900/20 rounded-[3rem] transform -rotate-2 scale-90 z-0" />

      {/* Main card */}
      <div
        className="relative z-10 bg-white dark:bg-zinc-800 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl p-5 sm:p-8 transform transition hover:scale-[1.01] duration-500 border border-gray-100 dark:border-gray-800 overflow-hidden cursor-pointer"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >


        <div className="grid grid-cols-[1.2fr_1fr] sm:grid-cols-2 gap-3 sm:gap-4 h-full">
          {/* Text content */}
          <div className="flex flex-col justify-center space-y-3 sm:space-y-4">
            <span
              ref={textBrandRef}
              className="text-xs sm:text-sm font-semibold tracking-wider text-gray-400 uppercase"
            >
              Featured
            </span>
            <h2
              ref={textNameRef}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight sm:leading-none"
            >
              {current.name}
            </h2>
            <span
              ref={textCategoryRef}
              className="inline-block bg-gray-100 dark:bg-gray-700 px-2 py-1 sm:px-3 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-sm font-medium w-max"
            >
              {current.category}
            </span>
            <div className="pt-2 sm:pt-4">
              <button className="bg-black dark:bg-white text-white dark:text-black p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16">
                <span className="material-icons-round text-xl sm:text-2xl">
                  shopping_basket
                </span>
              </button>
            </div>
          </div>

          {/* Image container */}
          <div className="flex items-center justify-center relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[200px]">
            <div className="absolute w-48 h-48 bg-red-100 dark:bg-red-900/30 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

            {/* Price badge moved inside Image Container */}
            <div
              ref={priceRef}
              className="absolute top-0 right-0 bg-[#93C572] text-white font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-bl-2xl rounded-tr-2xl sm:rounded-bl-[1.5rem] sm:rounded-tr-[1.5rem] shadow-sm z-20 text-xs sm:text-base border-b border-l border-white/20"
            >
              {current.price}
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              alt={`${current.name} product`}
              className="relative z-10 w-full h-full object-cover drop-shadow-xl rounded-2xl sm:rounded-3xl"
              src={current.image}
              style={{ maxHeight: "400px" }}
            />
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`block h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex
                ? "w-6 bg-[#93C572]"
                : "w-1.5 bg-gray-300 dark:bg-gray-600"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
