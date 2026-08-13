import type { Metadata } from "next";
import LegalPageLayout from "@/components/shared/LegalPageLayout";
import { OG_IMAGE } from "@/config/seo";

const PAGE_TITLE = "Cookie Policy — Go Converto";
const PAGE_DESCRIPTION =
  "Learn how Go Converto uses cookies and similar technologies to operate its services, remember preferences, and understand website usage.";

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

// Drafted boilerplate reflecting the product and business practices.
// Have qualified legal counsel review before publishing.
const SECTIONS = [
  {
    heading: "What Are Cookies",
    body: "Cookies are small text files placed on your computer or device when you visit a website. They allow the website to remember information about your visit, including your sign-in status, preferences, and other settings, so the service can provide a more consistent experience.",
  },
  {
    heading: "How We Use Cookies",
    body: "Go Converto uses cookies to keep your dashboard session active, remember your chat widget preferences, and understand how visitors and customers use our services. This information helps us maintain essential functionality, improve performance, and enhance the Go Converto experience over time.",
  },
  {
    heading: "Types of Cookies We Use",
    body: "Essential cookies are required for core features such as account authentication, the user dashboard, and the chat widget to function properly. Functional cookies remember preferences and settings, including your chat widget configuration. Analytics cookies help us understand overall usage patterns and how our services are being used so we can identify areas for improvement.",
  },
  {
    heading: "Managing Your Cookie Preferences",
    body: "Most modern web browsers provide options to view, delete, block, or manage cookies through their settings. Disabling essential cookies may prevent you from signing in or accessing certain Go Converto features. If you prefer not to allow analytics cookies, you may choose to disable non-essential cookies through your browser or available cookie preference controls.",
  },
  {
    heading: "Third-Party Cookies",
    body: "Third-party services that support the operation of Go Converto, including payment processors and analytics providers, may place cookies or similar technologies on your device. These third parties maintain their own privacy and cookie practices. We encourage you to review their respective policies to understand how they collect and use information.",
  },
  {
    heading: "Changes to This Policy",
    body: "We may update this Cookie Policy from time to time to reflect changes in our services, technology, or use of cookies and similar tracking technologies. If we make material changes, we will update the date at the top of this page and, where appropriate, provide additional notice.",
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
