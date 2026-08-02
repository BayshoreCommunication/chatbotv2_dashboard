import type { Metadata } from "next";
import LegalPageLayout from "@/components/shared/LegalPageLayout";
import { OG_IMAGE } from "@/config/seo";

const PAGE_TITLE = "Terms of Service — Go Converto";
const PAGE_DESCRIPTION =
  "The terms and conditions that govern your use of Go Converto.";

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
    heading: "Acceptance of Terms",
    body: "By creating an account or using Go Converto, you agree to these Terms of Service. If you're using Go Converto on behalf of a company, you're agreeing on that company's behalf and confirming you have the authority to do so.",
  },
  {
    heading: "Description of Service",
    body: "Go Converto is an AI chatbot platform that trains itself on your website's content, engages your visitors in conversation, answers their questions, captures leads, and can book appointments on your behalf. Specific features available to you depend on your subscription plan.",
  },
  {
    heading: "User Accounts & Responsibilities",
    body: "You're responsible for providing accurate information when creating your account and for keeping your login credentials secure. You're responsible for all activity that happens under your account, so let us know right away if you suspect unauthorized access.",
  },
  {
    heading: "Subscription & Billing",
    body: "Paid plans are billed on a recurring basis and renew automatically until cancelled. You can upgrade, downgrade, or cancel your subscription at any time from your dashboard. Cancelling stops future billing but does not refund the current billing period unless required by law.",
  },
  {
    heading: "Acceptable Use",
    body: "You agree not to use Go Converto for any unlawful purpose, to attempt to reverse-engineer or scrape the platform, to overload or disrupt our systems, or to train your assistant on content you don't have the right to use.",
  },
  {
    heading: "Connecting Facebook, Instagram & Other Third-Party Channels",
    body: "If you connect a Facebook Page, Instagram Business Account, or other third-party channel to Go Converto, you confirm that you're authorized to connect and grant us access to that account, and that doing so complies with that platform's own terms (including Meta's Platform Terms and Community Standards). You're responsible for the content your customers send to and receive from your connected channels through your assistant. You can disconnect any connected channel at any time from your dashboard, which revokes our access to it going forward.",
  },
  {
    heading: "Intellectual Property",
    body: "Go Converto and its underlying technology are our property. You retain all rights to your own website content and data — by using our service, you grant us a limited license to process that content solely to provide and improve the service for you.",
  },
  {
    heading: "Termination",
    body: "You may stop using Go Converto and cancel your account at any time. We may suspend or terminate accounts that violate these Terms or that we reasonably believe pose a risk to our service or other users. Upon termination, your data is handled as described in our Privacy Policy.",
  },
  {
    heading: "Limitation of Liability",
    body: "Go Converto is provided \"as is\" without warranties of any kind. To the fullest extent permitted by law, we are not liable for indirect, incidental, or consequential damages, and our total liability for any claim is limited to the amount you paid us in the twelve months before the claim arose.",
  },
  {
    heading: "Governing Law",
    body: "These Terms are governed by the laws of the State of Florida, United States, without regard to conflict-of-law principles.",
  },
  {
    heading: "Changes to These Terms",
    body: "We may update these Terms from time to time. If we make material changes, we'll update the date at the top of this page and, where appropriate, notify you directly. Continued use of Go Converto after a change means you accept the updated Terms.",
  },
  {
    heading: "Contact Us",
    body: "Questions about these Terms? Reach us at info@goconverto.com or 1211 Tech Blvd Suite 120, Tampa, FL 33619, United States.",
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
