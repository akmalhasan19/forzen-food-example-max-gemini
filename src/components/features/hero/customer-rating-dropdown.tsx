"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
    gsap.registerPlugin(Flip);
}

const REVIEWS = [
    {
        name: "Budi Santoso",
        comment: "Bikin nagih daging wagyunya!",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBVT1UKr9WDUx9Zio-rjGcLZ544GzyE3Uxnf_kYKH9Slcszoz2G0OzZI_w1lWThhSTYMkWLnyi12h5xOqK1Q8RP6oaTYj9yhijarSOD_87srFTq05Gb7QvdXEkSiCkok1fbvU2Hdhq8S9kDs2rMJcPe__wC7av5Rn6m0xeqnQ3jwo_3zQew1dXHwqghtBsDm7ksavMbQNRVSqKfIj0j5bg4Mpt9L7plYqaTaFD2g3qbZhTgjgcFhkcbIwGFRcxEqJHm8JsnAtQxDKY",
    },
    {
        name: "Siti Aminah",
        comment: "Pengiriman luar biasa cepat.",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD8dHLi3uqGkQICl4ZBmlYuaTW2SBJktZqyW32kf1JjTb2BI4oO0vx1FTvKsFdpijuxnKyC7ANGelEtyGKIyT6sLMAiJl7COxkpp8945oz09Soh7Nc_Mn9cDNUY-66JvGKgnrZr1tk0Kdt50-SylPpL8Ki0jPl5gFY19fEjv_sf-IVtNQ1rnIeqwYXDXAKEw3KoHGXymBRaJy94C8ZlSDexH2cnAJsO4OPFYbA0WdBj9SXDK3W1pov_sO09XhHpTtaH1hJNmeyzsrk",
    },
    {
        name: "Andi Wijaya",
        comment: "Kualitas premium, mantap!",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAafc_uN_qpUlKD6R7RY4Cfr_PUs95iZrelS_KYWselkSv5xK_o8iS3ZI9CIdrgjHakgOqkNfXAJb4-9uTJdVdedvMHyk3rryojxCACd5nyakrhV-VX-9H1tSRiEAkZLh6LvwxyuRROqI9SiJUpQqbFbmIBmNax05f1K0sJzPFacndv2QNcITnB9xgXGQbmRtbGVJbkWTq2lY-wTBT8ZbeyDpcsZ79mOpUhdwHBvmS2CSAm3wGTm3bWTjIbP6eb0vkage7_S2FOWdM",
    },
    {
        name: "Lina Marlina",
        comment: "Sangat direkomendasikan!",
        avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80",
    },
];

export function CustomerRatingDropdown() {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const flipStateRef = useRef<any>(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

    useEffect(() => {
        // Initial setup: hide list content
        gsap.set(listRef.current, { height: 0, opacity: 0 });
    }, []);

    const toggleDropdown = contextSafe(() => {
        // Capture flip state right before DOM change
        flipStateRef.current = Flip.getState(".flip-avatar");

        if (isExpanded) {
            // Collapse container
            gsap.to(listRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power3.inOut",
            });
            setIsExpanded(false);
        } else {
            // Expand container
            gsap.to(listRef.current, {
                height: "auto",
                opacity: 1,
                duration: 0.4,
                ease: "power3.inOut",
            });
            setIsExpanded(true);
        }
    });

    useGSAP(() => {
        if (!flipStateRef.current) return;

        // Let FLIP animate the avatars transitioning between the unmounted and mounted DOM nodes
        Flip.from(flipStateRef.current, {
            duration: 0.4,
            ease: "power3.inOut",
            absolute: true, // Takes them out of container flow during transition
            absoluteOnTop: true, // Elevates above overflow:hidden
            scale: true,
        });

        flipStateRef.current = null;
    }, { dependencies: [isExpanded], scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="bg-white dark:bg-zinc-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-zinc-800 w-[340px] select-none"
        >
            {/* Top Main Section */}
            <div className="p-4 flex justify-between items-start">
                <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-[#93C572] flex items-center justify-center text-white font-bold text-xl shadow-inner shadow-black/10">
                        4.9
                    </div>
                    <div>
                        <div className="font-bold text-lg text-gray-900 dark:text-white leading-none mb-1">
                            ColdFresh
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                            hello@coldfresh.com
                        </div>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1">
                    <span className="material-icons-round text-xl">settings</span>
                </button>
            </div>

            <div className="h-px bg-gray-100 dark:bg-zinc-800/80 mx-2" />

            {/* Dropdown Section */}
            <div className="p-2">
                {/* Header Toggle */}
                <div
                    className="px-3 py-2 flex items-center justify-between cursor-pointer rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors group"
                    onClick={toggleDropdown}
                >
                    <span className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">
                        PELANGGAN PUAS
                    </span>

                    <div className="flex items-center gap-2 h-8 relative w-[140px]">
                        {/* Expanded Mode: Icons only (add, expand_less) */}
                        <div
                            className={`absolute right-0 flex items-center gap-1 transition-all duration-300 ${isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
                                }`}
                        >
                            <span className="material-icons-round text-sm text-gray-400 font-bold hover:text-gray-700">
                                add
                            </span>
                            <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center border border-gray-200 dark:border-zinc-700 shadow-sm">
                                <span className="material-icons-round text-sm text-gray-600 dark:text-gray-300">
                                    expand_less
                                </span>
                            </div>
                        </div>

                        {/* Collapsed Mode: Avatars stack and expand_more */}
                        {!isExpanded && (
                            <div className="flex items-center absolute right-0 top-0 h-full">
                                <div className="flex -space-x-2">
                                    {REVIEWS.map((review, i) => (
                                        <img
                                            key={i}
                                            data-flip-id={`avatar-${i}`}
                                            src={review.avatar}
                                            alt={review.name}
                                            className="flip-avatar w-6 h-6 rounded-full border-2 border-white dark:border-zinc-900 object-cover bg-gray-100 flex-shrink-0"
                                        />
                                    ))}
                                    <div
                                        data-flip-id="avatar-more"
                                        className="flip-avatar w-6 h-6 rounded-full border-2 border-white dark:border-zinc-900 bg-[#3a4f2b] text-white flex items-center justify-center text-[9px] font-bold tracking-tighter flex-shrink-0"
                                    >
                                        +2k
                                    </div>
                                </div>
                                <div className="w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 ml-1.5 flex items-center justify-center shadow-sm border border-gray-200 dark:border-zinc-700 transition-colors flex-shrink-0">
                                    <span className="material-icons-round text-sm text-gray-600 dark:text-gray-300">
                                        expand_more
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* List Content */}
                <div ref={listRef} className="overflow-hidden">
                    <div ref={contentRef} className="py-2 flex flex-col gap-1">
                        {REVIEWS.map((review, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer group"
                            >
                                {/* In expanded state, map the same flip IDs to these avatars */}
                                {isExpanded ? (
                                    <img
                                        data-flip-id={`avatar-${i}`}
                                        src={review.avatar}
                                        alt={review.name}
                                        className="flip-avatar w-10 h-10 rounded-full bg-black flex-shrink-0 object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full flex-shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                        {review.name}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">
                                        {review.comment}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
