"use client";

import { useState } from "react";

type FaqItem = {
    question: string;
    answer: string;
};

const faqItems: FaqItem[] = [
    {
        question: "Di mana pesanan saya?",
        answer:
            "Anda dapat melacak status pesanan secara real-time di dashboard akun Anda atau dengan mengklik tautan di email konfirmasi pengiriman.",
    },
    {
        question: "Apakah Anda mengirim ke seluruh Indonesia?",
        answer:
            "Ya! Kami mengirim ke seluruh Indonesia menggunakan sistem rantai dingin untuk memastikan produk tetap segar sampai di tujuan.",
    },
    {
        question: "Apa kebijakan pengembalian Anda?",
        answer:
            "Kami menawarkan garansi uang kembali 30 hari untuk semua produk yang belum dibuka. Hubungi dukungan pelanggan untuk memulai pengembalian.",
    },
    {
        question: "Apakah produk Anda organik?",
        answer:
            "Sebagian besar bahan kami bersertifikat organik dan bersumber dari pertanian berkelanjutan. Setiap produk memiliki label sertifikasi di kemasan.",
    },
    {
        question: "Bagaimana cara mengubah langganan?",
        answer:
            "Anda dapat menjeda, melewati, atau membatalkan langganan kapan saja dari pengaturan akun Anda tanpa biaya tambahan.",
    },
    {
        question: "Bagaimana cara menggunakan kode promo?",
        answer:
            "Masukkan kode promo Anda saat checkout di kolom yang tersedia pada halaman pembayaran.",
    },
];

function FaqItemCard({
    item,
    isOpen,
    onToggle,
}: {
    item: FaqItem;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="border-b border-gray-200 dark:border-zinc-700 last:border-b-0">
            <button
                type="button"
                onClick={onToggle}
                className="w-full flex justify-between items-center py-5 text-left group"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-lg text-gray-900 dark:text-white pr-4 group-hover:text-[#93C572] transition-colors">
                    {item.question}
                </span>
                <span
                    className={`material-icons-round text-gray-400 dark:text-gray-500 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-45" : "rotate-0"
                        }`}
                >
                    add
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "max-h-48 opacity-100 pb-5" : "max-h-0 opacity-0"
                    }`}
            >
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.answer}
                </p>
            </div>
        </div>
    );
}

export function FaqAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) =>
        setOpenIndex((prev) => (prev === index ? null : index));

    const col1 = faqItems.slice(0, 3);
    const col2 = faqItems.slice(3);

    return (
        <section className="py-20 border-t border-gray-100 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        Pertanyaan Umum
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                        Temukan jawaban atas pertanyaan yang sering ditanyakan.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
                    {/* Column 1 */}
                    <div>
                        {col1.map((item, index) => (
                            <FaqItemCard
                                key={index}
                                item={item}
                                isOpen={openIndex === index}
                                onToggle={() => toggle(index)}
                            />
                        ))}
                    </div>
                    {/* Column 2 */}
                    <div>
                        {col2.map((item, index) => (
                            <FaqItemCard
                                key={index + 3}
                                item={item}
                                isOpen={openIndex === index + 3}
                                onToggle={() => toggle(index + 3)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
