import type { Metadata } from "next";
import WhyEveryBusinessNeedsAnAiLeadGenerationChatbot from "@/components/static-blog/blogs/why-every-business-needs-an-ai-lead-generation-chatbot";
import { SITE_URL } from "@/config/seo";

const PAGE_TITLE = "Why Florida Businesses Need AI Lead Gen Chatbots";
const PAGE_DESCRIPTION =
  "Convert website traffic faster with an AI lead generation chatbot. Compare 2026 data on response times and static form conversion rates.";
const CANONICAL_URL = `${SITE_URL}/blog/why-every-business-needs-an-ai-lead-generation-chatbot`;

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
        url: `${SITE_URL}/assets/static-blog/why-every-business-needs-an-ai-lead-generation-chatbot.webp`,
        width: 1200,
        height: 630,
        alt: "Friendly robot using a Go Converto chatbot interface to engage visitors and qualify leads for a business.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/assets/static-blog/why-every-business-needs-an-ai-lead-generation-chatbot.webp`],
  },
};

export default function Page() {
  return <WhyEveryBusinessNeedsAnAiLeadGenerationChatbot />;
}
