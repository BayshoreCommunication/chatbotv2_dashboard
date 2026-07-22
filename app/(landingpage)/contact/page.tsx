import type { Metadata } from "next";
import ContactForm from "@/components/landingPage/home/ContactForm";
import PageHero from "@/components/shared/PageHero";
import { OG_IMAGE } from "@/config/seo";

const PAGE_TITLE = "Contact — Go Converto";
const PAGE_DESCRIPTION =
  "Have a question about pricing, setup, or how BayAI fits your business? Get in touch and we'll get back to you shortly.";

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

const ContactPage = () => {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title="Get in touch"
      />
      <ContactForm showMap />
    </>
  );
};

export default ContactPage;
