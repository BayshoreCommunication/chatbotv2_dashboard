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
    body: "Creating a Go Converto account confirms your agreement to these Terms of Service. If you register or use Go Converto on behalf of an organization, you confirm that you have the legal authority to bind that organization to these Terms.",
  },
  {
    heading: "Description of Service",
    body: "Go Converto is an AI chatbot platform that uses your website URL and business information to answer visitor questions, capture sales leads, and schedule calendar appointments automatically. The features and functionality available to you depend on your selected subscription plan.",
  },
  {
    heading: "User Accounts & Responsibilities",
    body: "You are responsible for providing accurate account and contact information and for maintaining the security of your login credentials. Account holders are responsible for all activity performed through their account and dashboard. If you suspect unauthorized access to your account, you should contact our support team as soon as possible.",
  },
  {
    heading: "Subscription & Billing",
    body: "Paid subscriptions renew automatically according to the billing cycle associated with your selected plan unless you cancel before the next billing period. You can upgrade, downgrade, or cancel your subscription through your dashboard. Cancellation stops future charges, while your paid access remains available through the end of the current billing period unless otherwise stated or required by law.",
  },
  {
    heading: "Acceptable Use",
    body: "You agree not to use Go Converto for unlawful activities, unauthorized web scraping, system overloading, service disruption, or reverse engineering of the platform or its software. You must also ensure that any copyrighted, proprietary, or other protected content provided to Go Converto is content you have the legal right to use and process.",
  },
  {
    heading: "Intellectual Property",
    body: "You retain all intellectual property rights in the website content, business information, and other materials you provide to Go Converto. Go Converto retains all rights to its AI technology, algorithms, software, chatbot code, platform infrastructure, and related intellectual property. By providing content to Go Converto, you grant us a limited license to process that content solely as necessary to provide and operate the service, including generating customized responses for your website visitors.",
  },
  {
    heading: "Termination",
    body: "You may stop using Go Converto and close your account at any time. Go Converto may suspend or terminate an account if it violates these Terms, creates a security risk, disrupts the service, or otherwise presents a reasonable risk to Go Converto or its users. Following account closure, user data is handled according to the applicable retention and deletion practices described in our Privacy Policy.",
  },
  {
    heading: "Limitation of Liability",
    body: 'Go Converto provides its AI customer service tools on an "as is" and "as available" basis without implied guarantees regarding uninterrupted availability, accuracy, or specific business results. To the fullest extent permitted by law, Go Converto will not be responsible for indirect, incidental, special, consequential, or similar damages. Our total liability for claims arising from or related to the service will not exceed the fees you actually paid to Go Converto during the twelve months preceding the event giving rise to the claim.',
  },
  {
    heading: "Governing Law",
    body: "These Terms of Service are governed by the laws of the State of Florida, United States, without regard to its conflict-of-law principles. Any formal legal proceedings relating to these Terms or the service will be subject to the applicable jurisdiction of the courts in Florida.",
  },
  {
    heading: "Changes to These Terms",
    body: "We may update these Terms of Service from time to time. Updated terms will be published on this page with a revised effective or last-updated date. For material changes, we may also notify active account administrators by email. Your continued use of Go Converto after updated Terms become effective constitutes acceptance of the revised Terms.",
  },
  {
    heading: "Contact Us",
    body: "For questions about these Terms of Service or policy compliance, contact us at hello@bayai.com. Physical correspondence can be sent to 1211 Tech Blvd Suite 120, Tampa, FL 33619, United States.",
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
