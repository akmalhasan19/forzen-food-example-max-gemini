import type { Metadata } from "next";
import { APP_NAME, APP_DESCRIPTION, APP_URL } from "@/lib/constants/theme";

export function buildMetadata(options: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const title = options.title
    ? `${options.title} | ${APP_NAME}`
    : `${APP_NAME} | ${APP_DESCRIPTION}`;
  const description = options.description ?? APP_DESCRIPTION;
  const url = options.path ? `${APP_URL}${options.path}` : APP_URL;
  const image = options.image ?? "/images/og/default.svg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: APP_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}
