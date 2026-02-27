"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";

interface SlideToPayButtonProps {
    onSuccess: () => void;
    className?: string;
}

export function SlideToPayButton({ onSuccess, className }: SlideToPayButtonProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    const [isSuccess, setIsSuccess] = useState(false);

    // Track dragging state
    const isDragging = useRef(false);
    const startX = useRef(0);
    const currentX = useRef(0);
    const maxX = useRef(0);

    useEffect(() => {
        if (!containerRef.current || !handleRef.current) return;

        // We add a tiny bit of padding (8px) from the edges
        const padding = 8;

        const setMaxX = () => {
            if (containerRef.current && handleRef.current) {
                maxX.current = containerRef.current.offsetWidth - handleRef.current.offsetWidth - padding * 2;
            }
        };
        setMaxX();
        window.addEventListener('resize', setMaxX);

        const handleDown = (e: PointerEvent) => {
            if (isSuccess) return;
            isDragging.current = true;
            startX.current = e.clientX - currentX.current;
            handleRef.current!.setPointerCapture(e.pointerId);

            // Small scale effect on the handle
            gsap.to(handleRef.current, { scale: 0.95, duration: 0.2 });
        };

        const handleMove = (e: PointerEvent) => {
            if (!isDragging.current || isSuccess) return;

            let x = e.clientX - startX.current;
            x = Math.max(0, Math.min(x, maxX.current));
            currentX.current = x;

            // Update visually without React state for 60fps performance
            gsap.set(handleRef.current, { x });
            gsap.set(bgRef.current, { width: x + handleRef.current!.offsetWidth + padding });

            // Fade text based on progress
            const progress = x / maxX.current;
            gsap.set(textRef.current, { opacity: 1 - progress * 1.2, x: progress * 20 });
        };

        const handleUp = (e: PointerEvent) => {
            if (!isDragging.current || isSuccess) return;
            isDragging.current = false;

            if (handleRef.current) {
                handleRef.current.releasePointerCapture(e.pointerId);
                gsap.to(handleRef.current, { scale: 1, duration: 0.2 });
            }

            const threshold = maxX.current * 0.85; // 85% to trigger

            if (currentX.current >= threshold) {
                // Success
                setIsSuccess(true);
                currentX.current = maxX.current;

                gsap.to(handleRef.current, { x: maxX.current, duration: 0.3, ease: "power3.out" });
                gsap.to(bgRef.current, { width: "100%", duration: 0.3, ease: "power3.out" });
                gsap.to(textRef.current, { opacity: 0, duration: 0.2 });

                // Calculate origin based on the handle position
                let originX = 0.5;
                let originY = 0.6;
                if (handleRef.current) {
                    const rect = handleRef.current.getBoundingClientRect();
                    originX = (rect.left + rect.width / 2) / window.innerWidth;
                    originY = (rect.top + rect.height / 2) / window.innerHeight;
                }

                // Trigger subtle confetti
                confetti({
                    particleCount: 40,
                    spread: 45,
                    startVelocity: 20,
                    gravity: 1.2,
                    origin: { x: originX, y: originY },
                    colors: ['#C5E063', '#003032', '#74BD00', '#FFEC8B'],
                    disableForReducedMotion: true,
                    zIndex: 1000
                });

                // Wait a little before calling onSuccess
                setTimeout(() => {
                    onSuccess();
                }, 1200);
            } else {
                // Snap back
                currentX.current = 0;
                gsap.to(handleRef.current, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.75)" });
                gsap.to(bgRef.current, { width: handleRef.current!.offsetWidth + padding, duration: 0.5, ease: "elastic.out(1, 0.75)" });
                gsap.to(textRef.current, { opacity: 1, x: 0, duration: 0.4 });
            }
        };

        const handleEl = handleRef.current;
        handleEl.addEventListener("pointerdown", handleDown);
        handleEl.addEventListener("pointermove", handleMove);
        handleEl.addEventListener("pointerup", handleUp);
        handleEl.addEventListener("pointercancel", handleUp);

        // Initial bg width setup
        gsap.set(bgRef.current, { width: handleEl.offsetWidth + padding });

        return () => {
            handleEl.removeEventListener("pointerdown", handleDown);
            handleEl.removeEventListener("pointermove", handleMove);
            handleEl.removeEventListener("pointerup", handleUp);
            handleEl.removeEventListener("pointercancel", handleUp);
            window.removeEventListener('resize', setMaxX);
        };
    }, [isSuccess, onSuccess]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full bg-white rounded-full flex items-center p-2 overflow-hidden select-none touch-none shadow-sm ${className || ''}`}
        >
            {/* Dynamic background that fills as you slide */}
            <div
                ref={bgRef}
                className="absolute left-0 top-0 bottom-0 bg-slate-100 rounded-full"
                style={{ width: '0%' }}
            />

            {/* Instruction Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <span ref={textRef} className="text-black font-extrabold text-lg tracking-tight pl-6">
                    {isSuccess ? 'Processing...' : 'Slide to Pay'}
                </span>
            </div>

            {/* Draggable Handle */}
            <div
                ref={handleRef}
                className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing z-20 shrink-0 transition-colors ${isSuccess ? 'bg-[#74BD00]' : 'bg-[#C5E063]'
                    }`}
            >
                {isSuccess ? (
                    <span className="material-icons-round text-white font-bold animate-in zoom-in spin-in-180 duration-500">check</span>
                ) : (
                    <span className="material-icons-round text-black font-bold">double_arrow</span>
                )}
            </div>
        </div>
    );
}
