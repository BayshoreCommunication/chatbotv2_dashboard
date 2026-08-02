import type { Metadata } from "next";
import LegalPageLayout from "@/components/shared/LegalPageLayout";
import { OG_IMAGE } from "@/config/seo";

const PAGE_TITLE = "Cookie Policy — Go Converto";
const PAGE_DESCRIPTION =
  "How Go Converto uses cookies and similar tracking technologies.";

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

// Drafted boilerplate reflecting how the product actually works — have
// counsel review before publishing.
const SECTIONS = [
  {
    heading: "What Are Cookies",
    body: "Cookies are small text files placed on your device when you visit a website. They let a site remember information about your visit, like whether you're signed in or what preferences you've set.",
  },
  {
    heading: "How We Use Cookies",
    body: "We use cookies to keep you signed in to your dashboard, remember settings for your chat widget, and understand how our service is used so we can improve it over time.",
  },
  {
    heading: "Types of Cookies We Use",
    body: "Essential cookies keep you signed in and let core features like the dashboard and chat widget function — these can't be turned off without breaking the service. Functional cookies remember preferences such as your widget configuration. Analytics cookies help us understand overall usage patterns so we can improve Go Converto.",
  },
  {
    heading: "Managing Your Cookie Preferences",
    body: "Most browsers let you view, delete, and block cookies through their settings. Blocking essential cookies may prevent you from signing in or using parts of the dashboard, so we recommend only disabling non-essential cookies if you'd prefer not to be tracked for analytics purposes.",
  },
  {
    heading: "Third-Party Cookies",
    body: "Some cookies may be set by third-party services we rely on to operate Go Converto, such as our payment processor or analytics provider. If you connect a Facebook Page or Instagram Business Account, Meta's Facebook SDK (loaded when you use the \"Continue with Facebook\" option) may also set its own cookies as part of that login process. These providers have their own privacy and cookie practices, which we encourage you to review.",
  },
  {
    heading: "Changes to This Policy",
    body: "We may update this Cookie Policy from time to time as our use of cookies changes. If we make material changes, we'll update the date at the top of this page.",
  },
  {
    heading: "Contact Us",
    body: "Questions about how we use cookies? Reach us at info@goconverto.com or 1211 Tech Blvd Suite 120, Tampa, FL 33619, United States.",
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
