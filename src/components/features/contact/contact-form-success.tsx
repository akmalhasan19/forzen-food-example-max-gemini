"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface ContactFormSuccessProps {
    userName: string;
}

export function ContactFormSuccess({ userName }: ContactFormSuccessProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const checkRef = useRef<SVGPathElement>(null);
    const blob1Ref = useRef<HTMLDivElement>(null);
    const blob2Ref = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const bodyRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLAnchorElement>(null);
    const secondaryRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Set initial states
            gsap.set(
                [
                    circleRef.current,
                    blob1Ref.current,
                    blob2Ref.current,
                    headingRef.current,
                    bodyRef.current,
                    btnRef.current,
                    secondaryRef.current,
                ],
                { opacity: 0 }
            );

            // Set checkmark initial stroke
            gsap.set(checkRef.current, {
                strokeDasharray: 100,
                strokeDashoffset: 100,
                opacity: 1,
            });

            // 1. Icon circle — scale from 0 with bounce
            tl.fromTo(
                circleRef.current,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                }
            );

            // 2. Checkmark draw
            tl.to(
                checkRef.current,
                {
                    strokeDashoffset: 0,
                    duration: 0.5,
                    ease: "power2.inOut",
                },
                "-=0.15"
            );

            // 3. Decorative blobs — pop in
            tl.fromTo(
                [blob1Ref.current, blob2Ref.current],
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.35,
                    stagger: 0.08,
                    ease: "back.out(2)",
                },
                "-=0.2"
            );

            // 4. Heading — fade up
            tl.fromTo(
                headingRef.current,
                { y: 24, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                },
                "-=0.15"
            );

            // 5. Body text — fade up
            tl.fromTo(
                bodyRef.current,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.45,
                },
                "-=0.25"
            );

            // 6. Primary button — fade up + scale pop
            tl.fromTo(
                btnRef.current,
                { y: 16, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.45,
                    ease: "back.out(1.4)",
                },
                "-=0.15"
            );

            // 7. Secondary link — gentle fade in
            tl.fromTo(
                secondaryRef.current,
                { y: 10, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.35,
                },
                "-=0.1"
            );
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="flex flex-col items-center text-center max-w-md w-full mx-auto"
        >
            {/* Success Icon */}
            <div className="relative mb-8">
                <div
                    ref={circleRef}
                    className="w-24 h-24 rounded-full bg-gray-50 dark:bg-zinc-800/60 flex items-center justify-center"
                >
                    <svg
                        className="w-12 h-12 text-[#93C572]"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        viewBox="0 0 24 24"
                    >
                        <path ref={checkRef} d="M20 6L9 17l-5-5" />
                    </svg>
                </div>
                {/* Decorative blobs */}
                <div
                    ref={blob1Ref}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-[#93C572]/20 rounded-full blur-sm"
                />
                <div
                    ref={blob2Ref}
                    className="absolute -bottom-1 -left-2 w-4 h-4 bg-[#93C572]/30 rounded-full blur-sm"
                />
            </div>

            {/* Heading */}
            <h2
                ref={headingRef}
                className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4 tracking-tight"
            >
                Pesan Terkirim!
            </h2>

            {/* Body Text */}
            <p
                ref={bodyRef}
                className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-10"
            >
                Terima kasih sudah menghubungi kami,{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                    {userName}
                </span>
                . Tim kami biasanya merespons dalam 24 jam.
            </p>

            {/* Primary Action — Return to Shop */}
            <Link
                ref={btnRef}
                href="/products"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-gray-900 dark:text-white transition-all duration-200 bg-transparent border-2 border-gray-900 dark:border-white rounded-full hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white w-full sm:w-auto min-w-[200px]"
            >
                <span className="mr-2">Kembali ke Toko</span>
                <span className="material-icons-round text-lg transition-transform group-hover:translate-x-1">
                    arrow_forward
                </span>
            </Link>

            {/* Secondary Link */}
            <div
                ref={secondaryRef}
                className="mt-8 text-sm text-gray-500 dark:text-gray-400"
            >
                <Link
                    href="/profile"
                    className="underline hover:text-[#93C572] transition-colors"
                >
                    Lihat riwayat pesan
                </Link>{" "}
                di akun.
            </div>
        </div>
    );
}
