import type { Metadata } from "next";
import LegalPageLayout from "@/components/shared/LegalPageLayout";
import { OG_IMAGE } from "@/config/seo";

const PAGE_TITLE = "Go Converto Terms of Service";
const PAGE_DESCRIPTION =
  "Read the Go Converto Terms of Service. Learn about user account responsibilities, subscription billing, data ownership, acceptable use, and service limits.";

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
    heading: "Acceptance of Terms",
    body: "Creating a Go Converto account confirms your agreement to these Terms of Service. Authorized representatives registering for an organization confirm full legal authority to bind their company to these operational rules.",
  },
  {
    heading: "Description of Service",
    body: "Go Converto operates as an AI chatbot platform that ingests your website URL to answer visitor questions, capture sales leads, and schedule calendar appointments automatically. Active feature access matches your specific subscription tier.",
  },
  {
    heading: "User Accounts & Responsibilities",
    body: "Account registration requires accurate contact details and strict password security management. Account holders hold full accountability for all actions performed within their user dashboard. Immediate support notifications protect your account if you suspect unauthorized login activity.",
  },
  {
    heading: "Subscription & Billing",
    body: "Paid subscriptions renew automatically on a recurring billing cycle unless cancelled within your billing settings. You can update or cancel plan access at any time from your user dashboard. Canceling stops subsequent invoice charges while retaining paid access through your current billing cycle end date.",
  },
  {
    heading: "Acceptable Use",
    body: "Users must avoid platform web scraping, system overloading, unlawful activity, and unauthorized software reverse engineering. Ingesting copyrighted materials or proprietary text without proper usage rights violates our acceptable use standards.",
  },
  {
    heading: "Intellectual Property",
    body: "Website owners retain 100% intellectual property rights over all training text uploaded to our system. Go Converto maintains sole ownership of the underlying AI algorithms, proprietary chatbot code, and platform infrastructure. Your uploaded data receives a limited processing license strictly used to deliver customized conversation responses to your site visitors.",
  },
  {
    heading: "Termination",
    body: "Account owners retain full freedom to stop service and close accounts at any moment. Go Converto reserves suspension rights for accounts causing system security risks or policy violations. Stored user data follows standard deletion and retention routines defined in our Privacy Policy upon account closure.",
  },
  {
    heading: "Limitation of Liability",
    body: 'Go Converto provides AI customer service tools on an "as is" basis without implied performance guarantees. Total financial liability for service issues caps strictly at the actual fees paid during the preceding 12 month period. Indirect or consequential damages remain excluded under standard legal protections.',
  },
  {
    heading: "Governing Law",
    body: "State of Florida legal statutes govern these Terms of Service and user agreements. Any formal legal proceedings resolve under Florida judicial jurisdiction regardless of local conflict-of-law rules.",
  },
  {
    heading: "Changes to These Terms",
    body: "Updated terms publish directly to this page alongside a refreshed revision date. Material updates prompt direct email notifications sent to active account administrators. Continued dashboard usage following policy updates confirms user agreement to modified terms.",
  },
  {
    heading: "Contact Us",
    body: "Support questions regarding policy compliance resolve via email at hello@bayai.com. Physical correspondence routes to 1211 Tech Blvd Suite 120, Tampa, FL 33619, United States.",
  },
];

const TermsOfServicePage = () => {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="July 22, 2026"
      sections={SECTIONS}
    />
  );
};

export default TermsOfServicePage;
