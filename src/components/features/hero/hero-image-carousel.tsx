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
    brand: "Good Source",
    name: "Good Source",
    category: "Chocolates",
    price: "$08.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDh1BKtz50dkehemLs3jusfoM5DGVg9ZhU4dbTBzIjHFQ2Z75d1B3QeoQgOR7HheVCOQJV_LBbaU7Qm1QdXr27LteXLyLZ6NFgaWXQF-5tfiYKtjLMaDUlXr681WW8aXQfEZYWecXa8RLztgx6N5G2Lf83nt2sWVY1uxexm8IHWRVjpPFkLWEWgIQDXovMWfYD3CVp3-_6Zb8gQf8-C83sno-7vqUloEWprJQjF0JzugtllKy-F0tTHApGsHYNAEwxFfecZqkIB3rY",
  },
  {
    brand: "Dang",
    name: "Coconut Chips",
    category: "Healthy Snacks",
    price: "$06.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlLaM3j0uXayB951tKyC-3UC3WMSxF3Ib9kb6FAPJkegM-1NcGsWVBbwZqiFBt0rMacfObd-BMdlbeI0C_K1fISc5Zxc7citjMro9mRUppkEt7AiK9zDKPrBQNC7Bl0uadRgzc01TII0c-Vc-mD1499t9iUr9fYD7W_7Ig2_9nBV_-a2MSJDoUC4MAkGnoQSaudfnufxxEEYCUdY_tL8KHFHqWik28w_NEC7rMSrTHMyeKeeAoPXh0YCBOu2QNeADfb8HcC4z6rAQ",
  },
  {
    brand: "Perfect Snacks",
    name: "Dark Chocolate",
    category: "Energy Bars",
    price: "$08.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_t_joQUF3IM1yPC5HKWy716mTMGqUglUZI6pJdnqadlDboTBxAvPflmw_2pB4OIa-gC8Lkez1GsP12GWCNN-EBo1M7iKqlfJaA1fI-fVkoWayRGMEujBNwAP6Jb3VeO1nrfUfr-HfuOimC6HADn0ML9g4AnpMikD2RNVID549UcMg8eI-krl7KP-bEDqfZFcVCd_THI666qLW5uRQa0VLUvqceXceFz-xS2fLmmwQF7hqQ_VyineocAiEjAEf3g8fF-02e6d0D98",
  },
  {
    brand: "RXBAR",
    name: "Blueberry Bar",
    category: "Protein Bars",
    price: "$04.50",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGsu0_RpM_CREjxdJcPVvAJXQaJ8DL5EE-ifU03c8G70SPUw3bPG3KTe0EUij4RxNU7N_I9Lk8uft71PeMJlF5CtXZ_32LGJ0o0BreJUbk6QzJiY34tST2JbMkkkcOugQxxZkx7c3VCxi0BYSFzkJEju-gMi4cHby3k9npYNvT8BqPVhMpNjLIvKnV5ZuXvM6RaLCNDsxi5MvXIBHotQ6-nFCSBwHESXb75gr3TFJYNSznQ_e7rpFO-nbDGQ3mxMrDqe8F4cLFWKw",
  },
  {
    brand: "Power Up",
    name: "Mega Omega Mix",
    category: "Trail Mix",
    price: "$12.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtwpBsCxnYLUgtPuKZ1hjtA7tqfXiGaME20NfmLopGrvUXt82HpEeHIFQ4UfIfjaIOO7xTSpEjF4QhxEDnGvYsB6-eS2jjjVzLcBPn2AzKOeTX6CLdYTzahxwvF2Jdx24zG1ABZmT4y7Jtosb1XccyayMoMvWdOpqvB1QzCZdw-arnpU8Mvujvwn3ay0V_arD7dZiwheRnLT1LJwnByU0qWk5q4O_BmpFUth8KkEftgsQn0MZNcc-zF1ag7wEdsMsOjk3fk3DwoYE",
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

  const animateTransition = useCallback((nextIndex: number) => {
    if (isAnimatingRef.current || isPausedRef.current) return;
    isAnimatingRef.current = true;

    const nextSlide = slides[nextIndex];
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

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
        if (imageRef.current) {
          imageRef.current.src = nextSlide.image;
          imageRef.current.alt = `${nextSlide.name} product`;
        }
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
        className="relative z-10 bg-white dark:bg-zinc-800 rounded-[2.5rem] shadow-2xl p-8 transform transition hover:scale-[1.01] duration-500 border border-gray-100 dark:border-gray-800 overflow-hidden cursor-pointer"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Price badge */}
        <div
          ref={priceRef}
          className="absolute top-8 right-8 bg-[#93C572] text-white font-bold px-4 py-2 rounded-full shadow-sm z-20"
        >
          {current.price}
        </div>

        <div className="grid grid-cols-2 gap-4 h-full">
          {/* Text content */}
          <div className="flex flex-col justify-center space-y-4">
            <span
              ref={textBrandRef}
              className="text-sm font-semibold tracking-wider text-gray-400 uppercase"
            >
              Featured
            </span>
            <h2
              ref={textNameRef}
              className="font-display text-4xl font-bold text-gray-900 dark:text-white"
            >
              {current.name}
            </h2>
            <span
              ref={textCategoryRef}
              className="inline-block bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm font-medium w-max"
            >
              {current.category}
            </span>
            <div className="pt-4">
              <button className="bg-black dark:bg-white text-white dark:text-black p-4 rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg flex items-center justify-center w-16 h-16">
                <span className="material-icons-round text-2xl">
                  shopping_basket
                </span>
              </button>
            </div>
          </div>

          {/* Image container */}
          <div className="flex items-center justify-center relative rounded-3xl overflow-hidden">
            <div className="absolute w-48 h-48 bg-red-100 dark:bg-red-900/30 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              alt={`${current.name} product`}
              className="relative z-10 w-full h-full object-cover drop-shadow-xl rounded-3xl"
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
              className={`block h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex
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
