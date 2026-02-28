import Link from "next/link";

const contactItems = [
    {
        icon: "location_on",
        title: "Kunjungi Kami",
        content: (
            <>
                Jl. Segar No. 123
                <br />
                Jakarta Selatan, 12345
            </>
        ),
        sub: null,
    },
    {
        icon: "call",
        title: "Hubungi Kami",
        content: "+62 (21) 555-0123",
        sub: "Senin–Jumat, 08.00–17.00 WIB",
    },
    {
        icon: "mail",
        title: "Email Kami",
        content: null,
        email: "hello@coldfresh.com",
        sub: null,
    },
];

export function ContactInfo() {
    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-[42px] font-bold leading-[1.1] mb-4 tracking-tight text-gray-900 dark:text-white">
                    Hubungi Kami<span className="text-[#93C572]">.</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-base lg:text-[15px] font-medium leading-relaxed mb-8">
                    Kami senang mendengar dari Anda. Hubungi kami untuk dukungan,
                    kerjasama, atau sekadar menyapa.
                </p>

                <div className="space-y-5">
                    {contactItems.map((item) => (
                        <div key={item.icon} className="flex items-start gap-4">
                            <div className="shrink-0 w-10 h-10 rounded-full bg-[#93C572] flex items-center justify-center text-white shadow-lg shadow-[#93C572]/20">
                                <span className="material-icons-round text-xl">
                                    {item.icon}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-gray-900 dark:text-white font-bold text-base mb-0.5">
                                    {item.title}
                                </h3>
                                {item.content && (
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                                        {item.content}
                                    </p>
                                )}
                                {item.email && (
                                    <a
                                        href={`mailto:${item.email}`}
                                        className="text-[#93C572] font-medium hover:underline"
                                    >
                                        {item.email}
                                    </a>
                                )}
                                {item.sub && (
                                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                                        {item.sub}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Social Row */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                {[
                    { icon: "facebook", label: "Facebook" },
                    { icon: "camera_alt", label: "Instagram" },
                    { icon: "alternate_email", label: "Twitter" },
                ].map((social) => (
                    <Link
                        key={social.icon}
                        href="#"
                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-[#93C572] hover:text-white transition-all duration-300"
                        aria-label={social.label}
                    >
                        <span className="material-icons-round text-lg">
                            {social.icon}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
