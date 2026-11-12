import type { Metadata } from "next";
import WhatIsAnAiPoweredChatbotForWebsites from "@/components/static-blog/blogs/what-is-an-ai-powered-chatbot-for-websites";
import { SITE_URL } from "@/config/seo";

const PAGE_TITLE = "What’s an AI Chatbot for Websites & Why You Need One Today?";
const PAGE_DESCRIPTION =
  "AI website chatbot is a smart virtual helper that engages online users and qualifies leads. See why top brands refuse to live without this new tech.";
const CANONICAL_URL = `${SITE_URL}/blog/what-is-an-ai-powered-chatbot-for-websites`;

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
        url: `${SITE_URL}/assets/static-blog/what-is-an-ai-powered-chatbot-for-websites-guide.webp`,
        width: 1200,
        height: 630,
        alt: "3D AI robot gesturing toward a laptop displaying an automated website chat assistant with feature icons above.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      `${SITE_URL}/assets/static-blog/what-is-an-ai-powered-chatbot-for-websites-guide.webp`,
    ],
  },
};

export default function Page() {
  return <WhatIsAnAiPoweredChatbotForWebsites />;
}

