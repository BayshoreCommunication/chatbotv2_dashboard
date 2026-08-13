import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import IndustriesPageContent from "@/components/landingPage/industries/IndustriesPageContent";
import { OG_IMAGE } from "@/config/seo";

const PAGE_TITLE = "AI Chatbot for SaaS & Tech Companies | Go Converto";

const PAGE_DESCRIPTION =
  "Go Converto is an AI chatbot that answers pricing and product questions, recommends solutions, qualifies leads, and routes demo requests. Train it on your website and go live in minutes.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const IndustriesPage = () => {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        title="Go Converto AI Chatbot for Every Business Type"
      />
      <IndustriesPageContent />
    </>
  );
};

export default IndustriesPage;
