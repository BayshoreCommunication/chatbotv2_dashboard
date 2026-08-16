import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import IndustriesPageContent from "@/components/landingPage/industries/IndustriesPageContent";
import { OG_IMAGE } from "@/config/seo";

const PAGE_TITLE = "AI Chatbot for SaaS & Tech Companies | Go Converto";

const PAGE_DESCRIPTION =
  "Bayshore Communication offers the Go Converto AI assistant for your website, answering client questions anytime and helping qualify leads and book calls.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/industries" },
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
