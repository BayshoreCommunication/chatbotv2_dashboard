import type { Metadata } from "next";
import HowConversationalAiAgentsImproveCustomerService from "@/components/static-blog/blogs/how-conversational-ai-agents-improve-customer-service";
import { SITE_URL } from "@/config/seo";

const PAGE_TITLE = "Are Conversational AI agents Improving Customer Service?";
const PAGE_DESCRIPTION =
  "Conversational AI agents resolve customer issues instantly by eliminating wait times. Learn how 24/7 automated support lifts retention and sales.";
const CANONICAL_URL = `${SITE_URL}/blog/how-conversational-ai-agents-improve-customer-service`;

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
        url: `${SITE_URL}/assets/static-blog/how-conversational-ai-agents-improve-customer-service.webp`,
        width: 1200,
        height: 630,
        alt: "Friendly robot using a conversational AI agent interface to provide 24/7 customer support and instant answers with Go Converto.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/assets/static-blog/how-conversational-ai-agents-improve-customer-service.webp`],
  },
};

export default function Page() {
  return <HowConversationalAiAgentsImproveCustomerService />;
}
