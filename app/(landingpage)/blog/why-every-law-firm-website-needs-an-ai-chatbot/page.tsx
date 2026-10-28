import type { Metadata } from "next";
import WhyEveryLawFirmWebsiteNeedsAnAiChatbot from "@/components/static-blog/blogs/why-every-law-firm-website-needs-an-ai-chatbot";
import { SITE_URL } from "@/config/seo";

const PAGE_TITLE = "Why Florida Law Firms Need an AI Chatbot in 2026";
const PAGE_DESCRIPTION =
  "40% of legal inquiries happen after hours. Learn how Florida law firms use compliant AI chatbots to answer instantly and capture more signed cases.";
const CANONICAL_URL = `${SITE_URL}/blog/why-every-law-firm-website-needs-an-ai-chatbot`;

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
        url: `${SITE_URL}/assets/static-blog/why-every-law-firm-website-needs-an-ai-chatbot.webp`,
        width: 1200,
        height: 630,
        alt: "Laptop screen displaying an AI chatbot interface for legal websites on an attorney desk with law books.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/assets/static-blog/why-every-law-firm-website-needs-an-ai-chatbot.webp`],
  },
};

export default function Page() {
  return <WhyEveryLawFirmWebsiteNeedsAnAiChatbot />;
}
