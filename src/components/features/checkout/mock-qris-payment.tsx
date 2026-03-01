"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

interface MockQrisPaymentProps {
    onSuccessAcknowledge: (redirectPath: string) => void;
    totalAmount: number;
    isAuthenticated: boolean;
}

export function MockQrisPayment({ onSuccessAcknowledge, totalAmount, isAuthenticated }: MockQrisPaymentProps) {
    const [status, setStatus] = useState<"scanning" | "success">("scanning");

    const scanLineRef = useRef<HTMLDivElement>(null);
    const qrRef = useRef<HTMLDivElement>(null);
    const successRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to the top of the page when the component mounts to fix the issue where
        // clicking the button at the bottom leaves the user scrolled down.
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (status === "scanning") {
            // Animate scan line over the QR code
            const scanAnim = gsap.to(scanLineRef.current, {
                y: 200, // moves down the height of the QR box
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });

            // Provide a 3-second fake delay for processing
            const timer = setTimeout(() => {
                scanAnim.kill();

                // Hide QR animation
                gsap.to(qrRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.4,
                    ease: "back.in(1.7)",
                    onComplete: () => {
                        setStatus("success");
                    }
                });
            }, 3000);

            return () => {
                clearTimeout(timer);
                scanAnim.kill();
            };
        } else if (status === "success") {
            // Fire confetti for celebration
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ["#0d9488", "#14b8a6", "#99f6e4", "#2dd4bf"]
            });

            // Animate success pop-in
            gsap.fromTo(successRef.current,
                { scale: 0.5, opacity: 0, rotation: -10 },
                {
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.7,
                    ease: "elastic.out(1, 0.5)",
                    delay: 0.1
                }
            );
        }
    }, [status]);

    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center min-h-[450px] bg-white rounded-xl border border-slate-200">
            {status === "scanning" && (
                <div ref={qrRef} className="space-y-6 flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-slate-900">Menunggu Pembayaran QRIS</h2>
                    <p className="text-slate-500 max-w-sm">
                        Silakan scan kode QR di bawah ini dengan aplikasi e-wallet atau m-banking Anda.
                    </p>

                    <div className="relative w-52 h-52 bg-white rounded-2xl border-4 border-slate-100 shadow-sm p-4 overflow-hidden">
                        {/* Mock QR Code Pattern using generic API */}
                        <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ColdFreshMockPayment123&color=0f172a')] bg-cover opacity-90" />

                        {/* Scanning Line overlay */}
                        <div
                            ref={scanLineRef}
                            className="absolute top-0 left-0 w-full h-[3px] bg-teal-500 shadow-[0_0_20px_4px_rgba(20,184,166,0.6)] z-10"
                            style={{ transform: 'translateY(0)' }}
                        />
                    </div>

                    <div className="text-2xl font-bold text-teal-700 bg-teal-50 px-6 py-2 rounded-full">
                        Rp {(totalAmount / 100).toLocaleString('id-ID')}
                    </div>
                    <p className="text-sm font-medium text-amber-600 animate-pulse bg-amber-50 px-4 py-1.5 rounded-full inline-block">
                        Mengecek transaksi otomatis...
                    </p>
                </div>
            )}

            {status === "success" && (
                <div ref={successRef} className="space-y-6 flex flex-col items-center">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-green-100/50">
                        <Check className="w-12 h-12" strokeWidth={4} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Pembayaran Berhasil!</h2>
                    <p className="text-slate-500 text-lg max-w-sm">
                        Terima kasih, pesanan Anda telah kami terima dan akan segera disiapkan.
                    </p>
                    <div className="pt-8">
                        <Button
                            onClick={() => onSuccessAcknowledge(isAuthenticated ? "/orders" : "/")}
                            className="bg-teal-600 hover:bg-teal-700 px-8 py-6 text-lg rounded-full font-semibold shadow-xl shadow-teal-600/20 transition-all hover:scale-105"
                        >
                            {isAuthenticated ? "Lanjut ke Pesanan Saya" : "Kembali ke Home"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
