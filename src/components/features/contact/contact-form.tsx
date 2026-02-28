"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";

type FormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

const initialForm: FormData = {
    name: "",
    email: "",
    subject: "",
    message: "",
};

const inputBaseClass =
    "w-full h-11 px-4 rounded-xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#93C572] focus:ring-2 focus:ring-[#93C572]/30 focus:outline-none transition-all duration-200 text-sm";

interface ContactFormProps {
    onSuccess?: (name: string) => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
    const [form, setForm] = useState<FormData>(initialForm);
    const [sending, setSending] = useState(false);

    const update = (field: keyof FormData, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.message) {
            toast.error("Mohon lengkapi semua field wajib.");
            return;
        }

        setSending(true);
        // Simulate API call
        await new Promise((r) => setTimeout(r, 1200));
        setSending(false);

        toast.success("Pesan berhasil dikirim! Kami akan segera menghubungi Anda.");

        if (onSuccess) {
            onSuccess(form.name);
        }

        setForm(initialForm);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
                <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-200"
                >
                    Nama
                </label>
                <input
                    id="contact-name"
                    type="text"
                    placeholder="Masukkan nama Anda"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputBaseClass}
                    required
                />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
                <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-200"
                >
                    Email
                </label>
                <input
                    id="contact-email"
                    type="email"
                    placeholder="nama@contoh.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputBaseClass}
                    required
                />
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
                <label
                    htmlFor="contact-subject"
                    className="block text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-200"
                >
                    Subjek
                </label>
                <div className="relative">
                    <select
                        id="contact-subject"
                        value={form.subject}
                        onChange={(e) => update("subject", e.target.value)}
                        className={`${inputBaseClass} appearance-none cursor-pointer pr-10`}
                    >
                        <option value="" disabled>
                            Pilih topik
                        </option>
                        <option value="support">Bantuan Pelanggan</option>
                        <option value="partnerships">Kerjasama</option>
                        <option value="feedback">Masukan Umum</option>
                        <option value="other">Lainnya</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 dark:text-gray-500">
                        <span className="material-icons-round">expand_more</span>
                    </div>
                </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
                <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-200"
                >
                    Pesan
                </label>
                <textarea
                    id="contact-message"
                    placeholder="Apa yang bisa kami bantu?"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="w-full min-h-[110px] p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#93C572] focus:ring-2 focus:ring-[#93C572]/30 focus:outline-none resize-y transition-all duration-200 text-sm"
                    required
                />
            </div>

            {/* Submit */}
            <div className="pt-2 flex justify-end">
                <button
                    type="submit"
                    disabled={sending}
                    className="bg-black dark:bg-white text-white dark:text-black font-semibold text-sm px-8 py-3 rounded-2xl shadow-xl hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0 active:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                >
                    {sending ? (
                        <>
                            <span className="material-icons-round text-lg animate-spin">
                                autorenew
                            </span>
                            Mengirim...
                        </>
                    ) : (
                        <>
                            Kirim Pesan
                            <span className="material-icons-round text-lg">
                                arrow_forward
                            </span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
