"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Shield, Snowflake, Truck, ShieldCheck, Leaf } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

const features = [
    {
        icon: Snowflake,
        title: "Rantai Dingin Terjaga",
        desc: "Suhu -18°C dari gudang sampai rumah Anda",
    },
    {
        icon: Truck,
        title: "Pengiriman Cepat",
        desc: "Sampai dalam 2 jam untuk area terdekat",
    },
    {
        icon: ShieldCheck,
        title: "Jaminan Kualitas",
        desc: "100% uang kembali jika tidak puas",
    },
    {
        icon: Leaf,
        title: "Produk Segar",
        desc: "Dipilih langsung dari sumber terpercaya",
    },
];

export default function LoginPage() {
    const router = useRouter();
    const { login, isAuthenticated } = useAuthStore();

    // If already authenticated, redirect to profile
    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/profile");
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
        return null;
    }

    const handleLogin = (email: string) => {
        login(email);
        router.push("/profile");
    };

    return (
        <main className="min-h-[calc(100vh-5rem)] flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800">
                {/* Decorative circles */}
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5" />
                <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/5" />
                <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-teal-500/20 blur-3xl" />

                <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full">
                    {/* Top - Logo */}
                    <div className="flex items-center gap-2.5">
                        <span className="material-icons-round text-3xl text-white/90">eco</span>
                        <span className="font-display font-bold text-2xl text-white tracking-tight">
                            Cold<span className="text-emerald-300">Fresh</span>
                        </span>
                    </div>

                    {/* Center - Headline */}
                    <div className="space-y-6">
                        <h1 className="text-4xl xl:text-5xl font-display font-bold text-white leading-tight">
                            Makanan Beku
                            <br />
                            <span className="text-emerald-300">Premium</span> untuk
                            <br />
                            Keluarga Anda
                        </h1>
                        <p className="text-teal-100/80 text-lg max-w-sm leading-relaxed">
                            Nikmati kemudahan belanja makanan beku berkualitas tinggi dengan pengiriman rantai dingin langsung ke pintu rumah.
                        </p>
                    </div>

                    {/* Bottom - Features Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className="flex items-start gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 transition-colors hover:bg-white/15"
                            >
                                <div className="flex-shrink-0 p-2 rounded-lg bg-white/10">
                                    <f.icon className="h-4 w-4 text-emerald-300" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white leading-tight">{f.title}</p>
                                    <p className="text-xs text-teal-200/70 mt-0.5 leading-snug">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-slate-50">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Logo (hidden on desktop since left panel shows it) */}
                    <div className="lg:hidden flex items-center justify-center gap-2.5 mb-4">
                        <span className="material-icons-round text-3xl text-[#93C572]">eco</span>
                        <span className="font-display font-bold text-2xl tracking-tight text-slate-900">
                            Cold<span className="text-[#93C572]">Fresh</span>
                        </span>
                    </div>

                    {/* Header */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-display font-bold text-slate-900">
                            Selamat Datang 👋
                        </h2>
                        <p className="mt-2 text-slate-500">
                            Pilih akun simulasi untuk melanjutkan
                        </p>
                    </div>

                    {/* Login Cards */}
                    <div className="space-y-4">
                        {/* Customer Login */}
                        <button
                            onClick={() => handleLogin("pelanggan@contoh.com")}
                            className="group w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300 text-left cursor-pointer"
                        >
                            <div className="flex-shrink-0 p-3 rounded-xl bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
                                <User className="h-6 w-6 text-teal-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-base font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                                    Masuk sebagai Pelanggan
                                </p>
                                <p className="text-sm text-slate-400 mt-0.5 truncate">
                                    pelanggan@contoh.com
                                </p>
                            </div>
                            <span className="material-icons-round text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all duration-300">
                                arrow_forward
                            </span>
                        </button>

                        {/* Admin Login */}
                        <button
                            onClick={() => handleLogin("admin@frozenfresh.com")}
                            className="group w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 text-left cursor-pointer"
                        >
                            <div className="flex-shrink-0 p-3 rounded-xl bg-purple-50 group-hover:bg-purple-100 transition-colors duration-300">
                                <Shield className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-base font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">
                                    Masuk sebagai Admin
                                </p>
                                <p className="text-sm text-slate-400 mt-0.5 truncate">
                                    admin@frozenfresh.com
                                </p>
                            </div>
                            <span className="material-icons-round text-slate-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all duration-300">
                                arrow_forward
                            </span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-slate-50 px-3 text-slate-400 uppercase tracking-wider">Simulasi Demo</span>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                        <div className="flex gap-3">
                            <span className="material-icons-round text-blue-500 text-xl flex-shrink-0 mt-0.5">info</span>
                            <div className="text-sm text-blue-700">
                                <p className="font-medium">Ini adalah mode demo</p>
                                <p className="mt-1 text-blue-600/80">
                                    Pilih salah satu akun di atas untuk menjelajahi fitur aplikasi. Data akan direset saat browser ditutup.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer text */}
                    <p className="text-center text-xs text-slate-400">
                        Dengan masuk, Anda menyetujui{" "}
                        <span className="text-teal-600 hover:underline cursor-pointer">Syarat & Ketentuan</span>
                        {" "}dan{" "}
                        <span className="text-teal-600 hover:underline cursor-pointer">Kebijakan Privasi</span>
                    </p>
                </div>
            </div>
        </main>
    );
}
