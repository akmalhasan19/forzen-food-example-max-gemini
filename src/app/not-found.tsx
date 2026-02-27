import Link from "next/link";
import { Snowflake } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
      <Snowflake className="h-16 w-16 text-teal-300 animate-pulse" />
      <h1 className="text-4xl font-bold text-slate-900">404</h1>
      <p className="text-lg text-slate-500 max-w-md">
        Halaman ini sepertinya sudah mencair. Ayo kembali ke kesegaran
        beku.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
