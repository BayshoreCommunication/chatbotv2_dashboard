import type { Metadata } from "next";
import AiChatbotVsContactFormsForLeadGenerationInFlorida from "@/components/static-blog/blogs/ai-chatbot-vs-contact-forms-for-lead-generation-in-florida";
import { SITE_URL } from "@/config/seo";

const PAGE_TITLE = "AI Chatbot Vs Contact Forms: Florida Leads";
const PAGE_DESCRIPTION =
  "Compare AI Chatbot Vs Contact Forms for lead generation in Florida. Discover which option captures more leads and improves conversions.";
const CANONICAL_URL = `${SITE_URL}/blog/ai-chatbot-vs-contact-forms-for-lead-generation-in-florida`;

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
        url: `${SITE_URL}/assets/static-blog/ai-chatbot-vs-contact-forms-for-lead-generation-fl.webp`,
        width: 1200,
        height: 630,
        alt: "Laptop comparing an AI chatbot robot and a website contact form for lead generation with a mug and notebook on a desk.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      `${SITE_URL}/assets/static-blog/ai-chatbot-vs-contact-forms-for-lead-generation-fl.webp`,
    ],
  },
};

export default function Page() {
  return <AiChatbotVsContactFormsForLeadGenerationInFlorida />;
}
