import type { Metadata } from "next";
import HowAiPersonalizesWebsitesToIncreaseConversions from "@/components/static-blog/blogs/how-ai-personalizes-websites-to-increase-conversions";
import { SITE_URL } from "@/config/seo";

const PAGE_TITLE = "How AI Personalizes Websites to Boost Conversions";
const PAGE_DESCRIPTION =
  "Florida traffic has diverse intents. Convert tourists, locals, and snowbirds instantly with adaptive AI site messaging. Get started in minutes.";
const CANONICAL_URL = `${SITE_URL}/blog/how-ai-personalizes-websites-to-increase-conversions`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "article",
    url: CANONICAL_URL,
    images: [
      {
        url: `${SITE_URL}/assets/static-blog/how-ai-personalizes-websites-to-increase-conversions.webp`,
        width: 1200,
        height: 630,
        alt: "Laptop displaying an AI website personalization dashboard alongside a Go Converto mug and visitor segmentation workflow.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/assets/static-blog/how-ai-personalizes-websites-to-increase-conversions.webp`],
  },
};

export default function Page() {
  return <HowAiPersonalizesWebsitesToIncreaseConversions />;
}
