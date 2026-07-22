import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import HowItWorksPageContent from "@/components/landingPage/howitworks/HowItWorksPageContent";
import { OG_IMAGE } from "@/config/seo";

const PAGE_TITLE = "How It Works — Go Converto";
const PAGE_DESCRIPTION =
  "From pasting your URL to going live — see exactly how Go Converto scans, trains, and responds on your behalf.";

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

const HowItWorksPage = () => {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "How It Works" }]}
        title="How Go Converto works"
      />
      <HowItWorksPageContent />
    </>
  );
};

export default HowItWorksPage;
