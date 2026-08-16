import FAQPageContent from "@/components/landingPage/faq/FAQPageContent";
import CTABanner from "@/components/shared/CTABanner";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";
import { OG_IMAGE } from "@/config/seo";
import type { Metadata } from "next";

const PAGE_TITLE = "Contact Go Converto";
const PAGE_DESCRIPTION =
  "Have a question or need help choosing a plan? Reach out to us & we'll respond as soon as possible.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/faq" },
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

const FAQPage = () => {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        title="Frequently asked questions"
      />
      <FAQPageContent />
      <div className="my-14">
        <Container>
          <CTABanner />
        </Container>
      </div>
    </>
  );
};

export default FAQPage;
