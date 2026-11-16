import type { Metadata } from "next";
import AiVsLiveChatWhichIncreasesWebsiteConversions from "@/components/static-blog/blogs/ai-vs-live-chat-which-increases-website-conversions";
import { SITE_URL } from "@/config/seo";

const PAGE_TITLE = "AI Vs Live Chat: Which Drives More Conversions?";
const PAGE_DESCRIPTION =
  "Compare AI vs Live Chat to discover which improves website conversions, customer experience, and lead generation for your business.";
const CANONICAL_URL = `${SITE_URL}/blog/ai-vs-live-chat-which-increases-website-conversions`;

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
        url: `${SITE_URL}/assets/static-blog/ai-vs-live-chat-which-increases-website-conversions.webp`,
        width: 1200,
        height: 630,
        alt: "Laptop comparing AI chat robot and human live chat agent benefits beneath a rising website conversions chart.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      `${SITE_URL}/assets/static-blog/ai-vs-live-chat-which-increases-website-conversions.webp`,
    ],
  },
};

export default function Page() {
  return <AiVsLiveChatWhichIncreasesWebsiteConversions />;
}
