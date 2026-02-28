import { Metadata } from "next";
import { ContactPageContent } from "@/components/features/contact/contact-page-content";

export const metadata: Metadata = {
    title: "Hubungi Kami | ColdFresh",
    description:
        "Hubungi tim ColdFresh untuk dukungan, kerjasama, atau pertanyaan seputar makanan beku premium kami.",
};

export default function ContactPage() {
    return <ContactPageContent />;
}
