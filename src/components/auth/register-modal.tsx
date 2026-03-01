"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Eye, EyeOff, X } from "lucide-react";
import gsap from "gsap";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin?: () => void;
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!shouldRender || !overlayRef.current || !modalRef.current) return;

        if (isOpen) {
            // Animate In
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0, backdropFilter: "blur(0px)" },
                { opacity: 1, backdropFilter: "blur(4px)", duration: 0.3, ease: "power2.out" }
            );

            gsap.fromTo(
                modalRef.current,
                {
                    opacity: 0,
                    y: -50,   // Starts slightly higher
                    x: 100,   // Starts from the right (near dropdown)
                    scale: 0
                },
                {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "back.out(1.2)",
                    delay: 0.05 // Slight delay after overlay starts
                }
            );
        } else {
            // Animate Out
            gsap.to(overlayRef.current, {
                opacity: 0,
                backdropFilter: "blur(0px)",
                duration: 0.2,
                ease: "power2.in"
            });

            gsap.to(modalRef.current, {
                opacity: 0,
                y: 20,
                scale: 0,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => setShouldRender(false)
            });
        }
    }, [isOpen, shouldRender]);

    if (!shouldRender || typeof window === "undefined") return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
        >
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Content */}
            <div
                ref={modalRef}
                className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8">
                    <div className="text-center mb-8 mt-2">
                        <h2 id="modal-title" className="text-2xl font-bold text-gray-900 mb-2">Create an Account</h2>
                        <p className="text-sm text-gray-500">Join ColdFresh for fresh finds delivery.</p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#93C572] focus:ring-2 focus:ring-[#93C572]/20 outline-none transition-all placeholder:text-gray-400 text-gray-900"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#93C572] focus:ring-2 focus:ring-[#93C572]/20 outline-none transition-all placeholder:text-gray-400 text-gray-900"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#93C572] focus:ring-2 focus:ring-[#93C572]/20 outline-none transition-all placeholder:text-gray-400 text-gray-900 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#93C572] hover:bg-[#82AA65] text-white font-semibold py-3.5 rounded-lg transition-colors mt-4 cursor-pointer"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <button
                                onClick={onSwitchToLogin}
                                className="text-[#93C572] hover:text-[#82AA65] font-semibold transition-colors cursor-pointer"
                            >
                                Log in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
