"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, ChevronDown } from "lucide-react";
import { LoginModal } from "../auth/login-modal";
import { RegisterModal } from "../auth/register-modal";

export function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const openLogin = () => { setIsLoginModalOpen(true); setIsRegisterModalOpen(false); setIsOpen(false); };
    const openRegister = () => { setIsRegisterModalOpen(true); setIsLoginModalOpen(false); setIsOpen(false); };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative hidden md:block ml-2" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-zinc-800/80 px-2 py-1.5 rounded-full transition-colors"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-[1.5px] border-gray-900 dark:border-gray-100">
                    <User className="w-5 h-5 text-gray-900 dark:text-gray-100" strokeWidth={2} />
                </div>
                <span className="font-medium text-[15px] text-gray-900 dark:text-gray-100">Log In / Sign Up</span>
                <ChevronDown
                    className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    strokeWidth={2}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-[260px] bg-white dark:bg-zinc-900 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.1)] border border-gray-100 dark:border-zinc-800 py-4 z-50 transform origin-top-right transition-all animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-5 pb-4 border-b border-gray-100 dark:border-zinc-800">
                        <h3 className="text-center font-bold text-gray-900 dark:text-white text-[15px] mb-3">Welcome to ColdFresh</h3>
                        <Link
                            href="#"
                            className="block w-full bg-[#93C572] hover:bg-[#82AA65] text-white font-semibold py-2 rounded-md text-center transition-colors mb-3"
                            onClick={(e) => {
                                e.preventDefault();
                                openLogin();
                            }}
                        >
                            Log In
                        </Link>
                        <p className="text-center text-[13px] text-gray-500 dark:text-gray-400">
                            New here?{" "}
                            <button
                                className="text-gray-900 dark:text-white font-semibold hover:underline"
                                onClick={openRegister}
                            >
                                Create an account
                            </button>
                        </p>
                    </div>

                    <div className="pt-2">
                        <Link
                            href="/orders"
                            className="block px-5 py-2.5 text-[14px] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Orders
                        </Link>
                        <Link
                            href="/help"
                            className="block px-5 py-2.5 text-[14px] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Help Center
                        </Link>
                    </div>
                </div>
            )}

            {/* GSAP Animated Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onSwitchToRegister={openRegister}
            />

            {/* GSAP Animated Register Modal */}
            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
                onSwitchToLogin={openLogin}
            />
        </div>
    );
}
