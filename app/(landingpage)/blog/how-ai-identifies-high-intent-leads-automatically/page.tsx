import type { Metadata } from "next";
import HowAiIdentifiesHighIntentLeadsAutomatically from "@/components/static-blog/blogs/how-ai-identifies-high-intent-leads-automatically";
import { SITE_URL } from "@/config/seo";

const PAGE_TITLE = "How AI Identifies High-Intent Leads Faster";
const PAGE_DESCRIPTION =
  "See how AI scores buyer intent in real time using behavior and language, and why a five-minute response can boost qualification 900%.";
const CANONICAL_URL = `${SITE_URL}/blog/how-ai-identifies-high-intent-leads-automatically`;

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
        url: `${SITE_URL}/assets/blog/how-ai-identifies-high-intent-leads-automatically.webp`,
        width: 1200,
        height: 630,
        alt: "Friendly robot analyzing website visits and behavioral signals to automatically identify high-intent leads with Go Converto.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/assets/blog/how-ai-identifies-high-intent-leads-automatically.webp`],
  },
};

export default function Page() {
  return <HowAiIdentifiesHighIntentLeadsAutomatically />;
}
