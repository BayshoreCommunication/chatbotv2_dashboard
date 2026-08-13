import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import AboutPageContent from "@/components/landingPage/about/AboutPageContent";
import { OG_IMAGE } from "@/config/seo";

const PAGE_TITLE = "About Go Converto AI Assistant";
const PAGE_DESCRIPTION =
  "Go Converto deploys a custom, zero code AI assistant and answers customer questions in real time and captures sales leads 24/7.";

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

const AboutPage = () => {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title="About Go Converto"
      />
      <AboutPageContent />
    </>
  );
};

export default AboutPage;
