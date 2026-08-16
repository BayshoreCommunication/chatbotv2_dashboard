import type { Metadata } from "next";
import LegalPageLayout from "@/components/shared/LegalPageLayout";
import { OG_IMAGE } from "@/config/seo";

const PAGE_TITLE = "Cookie Policy | Go Converto";
const PAGE_DESCRIPTION =
  "See how Go Converto uses cookies to improve website performance, remember your preferences, analyze traffic, and support necessary website functions.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/cookie-policy" },
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

// Drafted boilerplate reflecting the product and business practices.
// Have qualified legal counsel review before publishing.
const SECTIONS = [
  {
    heading: "What Are Cookies",
    body: "A cookie is a small text file that is placed on your computer by a website that you visit. They allow the site to remember how you have visited the site, like your sign in status and any preferences that you chose.",
  },
  {
    heading: "How We Use Cookies",
    body: "Cookies keep your dashboard session active, save your chat widget preferences, and provide information about how our service is used. That information allows us to improve Go Converto over time.",
  },
  {
    heading: "Types of Cookies We Use",
    body: "Blocking essential cookies will require other features not to work, including the user dashboard, chat widget, etc. Functional cookies remember preferences, including your chat widget configuration. Analytics cookies collect information about overall usage patterns so we can continue improving Go Converto.",
  },
  {
    heading: "Managing Your Cookie Preferences",
    body: "Your most common Web browsers can offer options to view, delete or block cookies. You might not be able to access your dashboard or other service features if you disable important cookies. You can disable only non-essential cookies, if you do not wish for analytics cookies to be used.",
  },
  {
    heading: "Third-Party Cookies",
    body: "Third-party services that support the operation of Go Converto, including our payment processor and analytics provider, may also place cookies on your device. Those providers maintain their own privacy and cookie practices, and we encourage you to review their policies.",
  },
  {
    heading: "Changes to This Policy",
    body: "This Cookie Policy may be updated from time to time, depending on changes in our use of cookies. Changes to the material will be indicated by the date at the top of this page.",
  },
  {
    heading: "Contact Us",
    body: "If you have questions about how Go Converto uses cookies, contact us at hello@goconverto.com or by mail at 1211 Tech Blvd Suite 120, Tampa, FL 33619, United States.",
  },
];

const CookiePolicyPage = () => {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      lastUpdated="July 22, 2026"
      sections={SECTIONS}
    />
  );
};

export default CookiePolicyPage;
