import { Metadata } from "next";
import { HeroImageCarousel } from "@/components/features/hero/hero-image-carousel";
import { ScrollRevealGroup } from "@/components/shared/animate-on-scroll";
import { CustomerRatingDropdown } from "@/components/features/hero/customer-rating-dropdown";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ColdFresh | Frozen Food Premium",
  description:
    "Belanja makanan beku berkualitas premium. Dari daging segar, seafood pilihan, hingga sayuran beku — semua diantar dengan rantai dingin.",
};

const products = [
  {
    brand: "Seafood",
    name: "Salmon Fillet",
    price: "Rp89.000",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=600&h=400&fit=crop&q=80",
    highlight: true,
  },
  {
    brand: "Daging Premium",
    name: "Wagyu Slice",
    price: "Rp125.000",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=600&h=400&fit=crop&q=80",
    highlight: false,
  },
  {
    brand: "Olahan",
    name: "Dimsum Premium",
    price: "Rp45.000",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&h=400&fit=crop&q=80",
    highlight: false,
  },
  {
    brand: "Seafood",
    name: "Udang Vaname",
    price: "Rp72.000",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&h=400&fit=crop&q=80",
    highlight: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center">
          {/* Title and Description */}
          <div className="space-y-8 order-1 lg:col-start-1 lg:row-start-1">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Cold & Fresh <br />
              Kualitas{" "}
              <span className="relative inline-block z-10">
                Premium
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 -z-10 text-[#93C572]"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 20"
                >
                  <path
                    d="M0 15 Q 50 25 100 15"
                    fill="none"
                    opacity="0.6"
                    stroke="currentColor"
                    strokeWidth="12"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md">
              Temukan pilihan makanan beku premium — dari daging segar,
              seafood pilihan, hingga sayuran dan olahan siap masak.
              Diantar dengan rantai dingin.
            </p>
          </div>

          {/* Hero Image Card */}
          <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-3 mt-0 lg:-mt-16 relative z-20">
            <HeroImageCarousel />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 order-3 lg:col-start-1 lg:row-start-2">
            <Link href="/products" className="w-full sm:w-auto">
              <button className="w-full bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                Belanja Sekarang
                <span className="material-icons-round">arrow_forward</span>
              </button>
            </Link>
            <button className="w-full sm:w-auto bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2">
              <span className="material-icons-round">play_circle</span>
              Lihat Video
            </button>
          </div>

          {/* Customer Rating */}
          <div className="order-4 lg:col-start-1 lg:row-start-3 pt-2 relative z-30 lg:-mt-4">
            <CustomerRatingDropdown />
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollRevealGroup className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Koleksi Kami
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Jelajahi kategori produk beku terbaik.
            </p>
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 w-full md:w-auto">
            <button className="reveal-slide-from-right border-0 px-6 py-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-medium text-sm whitespace-nowrap shadow-md">
              Semua
            </button>
            <button className="reveal-slide-from-right border-0 px-6 py-3 rounded-2xl bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 font-medium text-sm whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
              <span className="material-icons-round text-red-400 text-base">
                restaurant
              </span>
              Daging
            </button>
            <button className="reveal-slide-from-right border-0 px-6 py-3 rounded-2xl bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 font-medium text-sm whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
              <span className="material-icons-round text-blue-400 text-base">
                set_meal
              </span>
              Seafood
            </button>
            <button className="reveal-slide-from-right border-0 px-6 py-3 rounded-2xl bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 font-medium text-sm whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
              <span className="material-icons-round text-green-500 text-base">spa</span>
              Sayuran
            </button>
            <button className="reveal-slide-from-right border-0 px-6 py-3 rounded-2xl bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 font-medium text-sm whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
              <span className="material-icons-round text-orange-400 text-base">
                lunch_dining
              </span>
              Olahan
            </button>
          </div>
        </ScrollRevealGroup>

        {/* Product Cards */}
        <ScrollRevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.name}
              className="reveal-slide-up group bg-white dark:bg-zinc-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/50 transition-all duration-300 flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-5 z-20">
                <button className="w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/50 text-gray-400 hover:text-red-500 transition-colors">
                  <span className="material-icons-round text-xl">
                    favorite_border
                  </span>
                </button>
              </div>
              <div className="h-48 w-full rounded-2xl mb-4 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  src={product.image}
                />
              </div>
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                      {product.brand}
                    </p>
                    <h4 className="font-display font-bold text-xl text-gray-900 dark:text-white leading-tight">
                      {product.name}
                    </h4>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <span className="material-icons-round text-yellow-400 text-sm">
                    star
                  </span>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {product.rating}
                  </span>
                </div>
                <div className="mt-auto flex justify-between items-center">
                  <span className="font-display font-bold text-2xl text-gray-900 dark:text-white">
                    {product.price}
                  </span>
                  <button
                    className="w-12 h-12 rounded-2xl bg-[#93C572] text-white hover:bg-green-700 shadow-lg hover:shadow-green-700/50 dark:hover:shadow-none flex items-center justify-center transition-all duration-300 transform active:scale-95"
                  >
                    <span className="material-icons-round">add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ScrollRevealGroup>

        <div className="mt-12 flex justify-center">
          <button className="px-8 py-3 rounded-2xl bg-transparent border-2 border-black dark:border-white text-black dark:text-white font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300">
            Lihat Semua Produk
          </button>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-black dark:bg-zinc-800 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 dark:bg-gray-700 rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-50" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-800 dark:bg-gray-700 rounded-full transform -translate-x-1/2 translate-y-1/2 opacity-50" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Paket Seafood Segar
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-sm">
                Nikmati kesegaran lobster, kepiting, dan udang premium
                langsung dari laut. Dibekukan cepat, kualitas terjaga.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#93C572] text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-700/20">
                  Pesan Sekarang
                </button>
                <div className="flex items-center gap-4 px-4 py-2">
                  <div className="bg-gray-800 p-3 rounded-xl">
                    <span className="material-icons-round text-[#93C572]">
                      ac_unit
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Rantai Dingin</p>
                    <p className="text-xs text-gray-400">
                      Gratis ongkir pesanan Rp200rb+
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 rounded-3xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Paket Seafood"
                className="relative z-0 w-3/4 md:w-full object-contain transform rotate-6 hover:rotate-0 transition duration-700 drop-shadow-2xl"
                src="https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=600&h=500&fit=crop&q=80"
              />
              <div className="absolute top-4 right-4 md:right-10 bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-2xl z-20">
                <span className="block text-xs uppercase tracking-widest text-[#93C572] mb-1">
                  Produk Baru
                </span>
                <span className="font-bold text-xl">Lobster Segar</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
