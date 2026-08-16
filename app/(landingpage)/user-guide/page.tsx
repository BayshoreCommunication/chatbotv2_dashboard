import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import Container from "@/components/shared/Container";
import CTABanner from "@/components/shared/CTABanner";
import UserGudeDetials from "@/components/userGuide/UserGudeDetials";
import { OG_IMAGE } from "@/config/seo";

const PAGE_TITLE = "User Guide — Go Converto";
const PAGE_DESCRIPTION =
  "A step-by-step roadmap for getting the most out of Go Converto — from creating your assistant to connecting channels, appointments, and billing.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/user-guide" },
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

const UserGuidePage = () => {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "User Guide" }]}
        title="Your Go Converto roadmap"
      />
      <UserGudeDetials />
      <div className="my-14">
        <Container>
          <CTABanner />
        </Container>
      </div>
    </>
  );
};

export default UserGuidePage;
