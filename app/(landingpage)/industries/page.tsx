import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import IndustriesPageContent from "@/components/landingPage/industries/IndustriesPageContent";
import { OG_IMAGE } from "@/config/seo";

const PAGE_TITLE = "Industries — Go Converto";
const PAGE_DESCRIPTION =
  "See how Go Converto's AI assistant adapts to your industry — from law firms and healthcare to real estate, agencies, and more.";

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
