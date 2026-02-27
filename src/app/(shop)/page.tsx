import { Metadata } from "next";
import { HeroImageCarousel } from "@/components/features/hero/hero-image-carousel";
import { ScrollRevealGroup } from "@/components/shared/animate-on-scroll";

export const metadata: Metadata = {
  title: "ColdFresh | Healthy Snacks Delivered",
  description:
    "Discover a world of guilt-free snacking. From crunchy coconut chips to rich dark chocolate, we curate the best for your afternoon boost.",
};

const products = [
  {
    brand: "Dang",
    name: "Coconut Chips",
    price: "$06.00",
    rating: "4.8",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlLaM3j0uXayB951tKyC-3UC3WMSxF3Ib9kb6FAPJkegM-1NcGsWVBbwZqiFBt0rMacfObd-BMdlbeI0C_K1fISc5Zxc7citjMro9mRUppkEt7AiK9zDKPrBQNC7Bl0uadRgzc01TII0c-Vc-mD1499t9iUr9fYD7W_7Ig2_9nBV_-a2MSJDoUC4MAkGnoQSaudfnufxxEEYCUdY_tL8KHFHqWik28w_NEC7rMSrTHMyeKeeAoPXh0YCBOu2QNeADfb8HcC4z6rAQ",
    highlight: true,
  },
  {
    brand: "Perfect Snacks",
    name: "Dark Chocolate",
    price: "$08.00",
    rating: "4.9",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_t_joQUF3IM1yPC5HKWy716mTMGqUglUZI6pJdnqadlDboTBxAvPflmw_2pB4OIa-gC8Lkez1GsP12GWCNN-EBo1M7iKqlfJaA1fI-fVkoWayRGMEujBNwAP6Jb3VeO1nrfUfr-HfuOimC6HADn0ML9g4AnpMikD2RNVID549UcMg8eI-krl7KP-bEDqfZFcVCd_THI666qLW5uRQa0VLUvqceXceFz-xS2fLmmwQF7hqQ_VyineocAiEjAEf3g8fF-02e6d0D98",
    highlight: false,
  },
  {
    brand: "RXBAR",
    name: "Blueberry Bar",
    price: "$04.50",
    rating: "4.7",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGsu0_RpM_CREjxdJcPVvAJXQaJ8DL5EE-ifU03c8G70SPUw3bPG3KTe0EUij4RxNU7N_I9Lk8uft71PeMJlF5CtXZ_32LGJ0o0BreJUbk6QzJiY34tST2JbMkkkcOugQxxZkx7c3VCxi0BYSFzkJEju-gMi4cHby3k9npYNvT8BqPVhMpNjLIvKnV5ZuXvM6RaLCNDsxi5MvXIBHotQ6-nFCSBwHESXb75gr3TFJYNSznQ_e7rpFO-nbDGQ3mxMrDqe8F4cLFWKw",
    highlight: false,
  },
  {
    brand: "Power Up",
    name: "Mega Omega Mix",
    price: "$12.00",
    rating: "5.0",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtwpBsCxnYLUgtPuKZ1hjtA7tqfXiGaME20NfmLopGrvUXt82HpEeHIFQ4UfIfjaIOO7xTSpEjF4QhxEDnGvYsB6-eS2jjjVzLcBPn2AzKOeTX6CLdYTzahxwvF2Jdx24zG1ABZmT4y7Jtosb1XccyayMoMvWdOpqvB1QzCZdw-arnpU8Mvujvwn3ay0V_arD7dZiwheRnLT1LJwnByU0qWk5q4O_BmpFUth8KkEftgsQn0MZNcc-zF1ag7wEdsMsOjk3fk3DwoYE",
    highlight: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Order From The <br />
              Best Of{" "}
              <span className="relative inline-block z-10">
                Snacks
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
              Discover a world of guilt-free snacking. From crunchy coconut
              chips to rich dark chocolate, we curate the best for your
              afternoon boost.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                Explore Shop
                <span className="material-icons-round">arrow_forward</span>
              </button>
              <button className="bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center gap-2">
                <span className="material-icons-round">play_circle</span>
                Watch Video
              </button>
            </div>
            <div className="pt-8 flex items-center gap-6">
              <div className="flex -space-x-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="User 1"
                  className="w-12 h-12 rounded-full border-2 border-white dark:border-zinc-900"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVT1UKr9WDUx9Zio-rjGcLZ544GzyE3Uxnf_kYKH9Slcszoz2G0OzZI_w1lWThhSTYMkWLnyi12h5xOqK1Q8RP6oaTYj9yhijarSOD_87srFTq05Gb7QvdXEkSiCkok1fbvU2Hdhq8S9kDs2rMJcPe__wC7av5Rn6m0xeqnQ3jwo_3zQew1dXHwqghtBsDm7ksavMbQNRVSqKfIj0j5bg4Mpt9L7plYqaTaFD2g3qbZhTgjgcFhkcbIwGFRcxEqJHm8JsnAtQxDKY"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="User 2"
                  className="w-12 h-12 rounded-full border-2 border-white dark:border-zinc-900"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8dHLi3uqGkQICl4ZBmlYuaTW2SBJktZqyW32kf1JjTb2BI4oO0vx1FTvKsFdpijuxnKyC7ANGelEtyGKIyT6sLMAiJl7COxkpp8945oz09Soh7Nc_Mn9cDNUY-66JvGKgnrZr1tk0Kdt50-SylPpL8Ki0jPl5gFY19fEjv_sf-IVtNQ1rnIeqwYXDXAKEw3KoHGXymBRaJy94C8ZlSDexH2cnAJsO4OPFYbA0WdBj9SXDK3W1pov_sO09XhHpTtaH1hJNmeyzsrk"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="User 3"
                  className="w-12 h-12 rounded-full border-2 border-white dark:border-zinc-900"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAafc_uN_qpUlKD6R7RY4Cfr_PUs95iZrelS_KYWselkSv5xK_o8iS3ZI9CIdrgjHakgOqkNfXAJb4-9uTJdVdedvMHyk3rryojxCACd5nyakrhV-VX-9H1tSRiEAkZLh6LvwxyuRROqI9SiJUpQqbFbmIBmNax05f1K0sJzPFacndv2QNcITnB9xgXGQbmRtbGVJbkWTq2lY-wTBT8ZbeyDpcsZ79mOpUhdwHBvmS2CSAm3wGTm3bWTjIbP6eb0vkage7_S2FOWdM"
                />
                <div className="w-12 h-12 rounded-full border-2 border-white dark:border-zinc-900 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400">
                  +2k
                </div>
              </div>
              <div className="text-sm font-medium">
                <span className="block text-gray-900 dark:text-white text-lg font-bold">
                  4.9/5
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  Happy Munchers
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="-mt-12 lg:-mt-16">
            <HeroImageCarousel />
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollRevealGroup className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 overflow-hidden">
          <div>
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Our Collections
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Explore the tastiest categories.
            </p>
          </div>
          <div className="reveal-slide-right-bounce flex gap-2 overflow-x-auto hide-scrollbar pb-2 w-full md:w-auto">
            <button className="px-6 py-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-medium text-sm whitespace-nowrap shadow-md">
              All Snacks
            </button>
            <button className="px-6 py-3 rounded-2xl bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium text-sm whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
              <span className="material-icons-round text-yellow-600 text-base">
                cookie
              </span>
              Choco
            </button>
            <button className="px-6 py-3 rounded-2xl bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium text-sm whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
              <span className="material-icons-round text-orange-400 text-base">
                bakery_dining
              </span>
              Chips
            </button>
            <button className="px-6 py-3 rounded-2xl bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium text-sm whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
              <span className="material-icons-round text-base">grass</span>
              Nuts
            </button>
            <button className="px-6 py-3 rounded-2xl bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium text-sm whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
              <span className="material-icons-round text-pink-400 text-base">
                icecream
              </span>
              Sweets
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
                    className={`w-12 h-12 rounded-2xl ${product.highlight
                        ? "bg-[#93C572] text-white hover:bg-green-700 shadow-lg hover:shadow-green-700/50 dark:hover:shadow-none"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-[#93C572] hover:text-white hover:shadow-lg"
                      } flex items-center justify-center transition-all duration-300 transform active:scale-95`}
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
            View All Products
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
                Unreal Muffin Snacks
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-sm">
                Experience the soft, chewy goodness of our newest muffin
                collection. 100% plant-based and delicious.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#93C572] text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-700/20">
                  Shop Now
                </button>
                <div className="flex items-center gap-4 px-4 py-2">
                  <div className="bg-gray-800 p-3 rounded-xl">
                    <span className="material-icons-round text-[#93C572]">
                      local_shipping
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Free Shipping</p>
                    <p className="text-xs text-gray-400">
                      On orders over $50
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 rounded-3xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Muffin Snacks"
                className="relative z-0 w-3/4 md:w-full object-contain transform rotate-6 hover:rotate-0 transition duration-700 drop-shadow-2xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHCwCdxykUKB0yjclCnbBJTg7ttRgsXFILOO7VR0oe-KqxgUI5jO3KkYqKaz1yW5ciNzn2Z9y2X_2FH0B2ozZfLqcD6LLLvkYkXV4Q0IG5xANU6E1hqCvvaXgSmoH31k4JFXA5obEl83fzlvK3eYX76Yt4MKZCL4TUpJg91cwU7Wlw0bxdOWigfajA9XAH6Jg4-t8mSCK57jhL0EGyZuVZ31DXyH3Ql1en-X3VyuhPCgvEpnXVDTxiR5eB4IfStAV6tS-kmXVJXxY"
              />
              <div className="absolute top-4 right-4 md:right-10 bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-2xl z-20">
                <span className="block text-xs uppercase tracking-widest text-[#93C572] mb-1">
                  New Arrival
                </span>
                <span className="font-bold text-xl">Choco Muffin</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
