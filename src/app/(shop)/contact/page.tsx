import { Metadata } from "next";
import { ContactInfo } from "@/components/features/contact/contact-info";
import { ContactForm } from "@/components/features/contact/contact-form";
import { FaqAccordion } from "@/components/features/contact/faq-accordion";

export const metadata: Metadata = {
    title: "Hubungi Kami | ColdFresh",
    description:
        "Hubungi tim ColdFresh untuk dukungan, kerjasama, atau pertanyaan seputar makanan beku premium kami.",
};

export default function ContactPage() {
    return (
        <>
            {/* Hero + Form Section */}
            <section className="pt-16 md:pt-16 pb-8 lg:pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row overflow-hidden rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-2xl shadow-gray-200/40 dark:shadow-black/30">
                    {/* Left Panel — Info (40%) */}
                    <div className="lg:w-[40%] bg-gray-50 dark:bg-zinc-800/50 p-8 md:p-10 lg:p-10">
                        <ContactInfo />
                    </div>

                    {/* Right Panel — Form (60%) */}
                    <div className="lg:w-[60%] bg-white dark:bg-zinc-900 p-8 md:p-10 lg:p-10 flex flex-col justify-center">
                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FaqAccordion />
        </>
    );
}
