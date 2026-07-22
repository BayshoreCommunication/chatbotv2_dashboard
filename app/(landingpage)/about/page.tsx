import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import AboutPageContent from "@/components/landingPage/about/AboutPageContent";
import { OG_IMAGE } from "@/config/seo";

const PAGE_TITLE = "About — Go Converto";
const PAGE_DESCRIPTION =
  "Go Converto builds AI assistants that learn your business automatically and turn website visitors into leads and appointments.";

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
