import type { Metadata } from "next";
import WhatAreConversationalAiAgentsGuide from "@/components/static-blog/blogs/what-are-conversational-ai-agents-guide";
import { SITE_URL } from "@/config/seo";

const PAGE_TITLE = "What Are Conversational AI Agents? (2026 Guide)";
const PAGE_DESCRIPTION =
  "Conversational AI agents handle customer chats and book leads automatically. Learn the secret strategy capturing 8pm Tampa buyers today.";
const CANONICAL_URL = `${SITE_URL}/blog/what-are-conversational-ai-agents-guide`;

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
        url: `${SITE_URL}/assets/blog/what-are-conversational-ai-agents-guide.webp`,
        width: 1200,
        height: 630,
        alt: "Friendly white robot using a laptop next to a digital customer support chatbot interface in an office.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/assets/blog/what-are-conversational-ai-agents-guide.webp`],
  },
};

export default function Page() {
  return <WhatAreConversationalAiAgentsGuide />;
}
