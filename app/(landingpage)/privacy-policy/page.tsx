import type { Metadata } from "next";
import LegalPageLayout from "@/components/shared/LegalPageLayout";
import { OG_IMAGE } from "@/config/seo";

const PAGE_TITLE = "Privacy Policy — Go Converto";
const PAGE_DESCRIPTION =
  "How Go Converto collects, uses, and protects your information.";

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
    heading: "Information We Collect",
    body: "We collect information you provide directly, such as your name, email address, company name, and website URL when you create an account. When you subscribe to a paid plan, payment details are collected and processed by our payment provider, Stripe — we do not store your card information ourselves. We also collect the content of conversations between your website visitors and your AI assistant, the pages and public content from your website that we crawl to train your assistant, and usage data such as which dashboard features you use.",
  },
  {
    heading: "How We Use Your Information",
    body: "We use the information we collect to provide and train your AI assistant, process payments and manage your subscription, send account and billing-related communications, respond to support requests, and improve and maintain the reliability of our service.",
  },
  {
    heading: "Cookies & Tracking Technologies",
    body: "We use cookies to keep you signed in, remember your widget and dashboard preferences, and understand how our service is used so we can improve it. See our Cookie Policy for details on the specific cookies we use and how to manage them.",
  },
  {
    heading: "Data Sharing & Third Parties",
    body: "We do not sell your personal information. We share data only with the service providers that help us operate Go Converto — including Stripe for payment processing, MongoDB Atlas for secure data storage, our AI infrastructure providers for generating chatbot responses, and Calendly where you've connected it for appointment booking. These providers are only permitted to use your data to perform services on our behalf.",
  },
  {
    heading: "Facebook, Instagram & Meta Platform Data",
    body: "When you connect your Facebook Page or Instagram Business Account to Go Converto, we access limited data through Meta's Platform (via the Facebook Login and Messenger/Instagram Messaging APIs), including your Page name, Page ID, Instagram Business Account ID, and the content of messages sent to your Page or Instagram account by your customers. We use this data solely to generate and deliver AI-powered responses through your trained assistant on your behalf. We do not use this data for advertising, and we do not sell or share it with third parties other than the service providers listed above that help us operate this feature. You can disconnect your Facebook Page or Instagram account at any time from your dashboard, which revokes our access to this data. Message data associated with a disconnected channel is deleted from our systems within 30 days of disconnection, or upon request.",
  },
  {
    heading: "Data Security",
    body: "We use industry-standard safeguards to protect your data, including encryption in transit and at rest, and access controls that limit who within our team can view your information. No method of transmission or storage is completely secure, but we work to protect your data using practices appropriate to its sensitivity.",
  },
  {
    heading: "Your Rights & Choices",
    body: "You can access, update, or delete your account information at any time from your dashboard settings. You may also request a copy of your data or ask us to delete it entirely by contacting us. If you no longer wish to receive marketing communications, you can unsubscribe using the link in any email we send.",
  },
  {
    heading: "Children's Privacy",
    body: "Go Converto is intended for businesses and is not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it.",
  },
  {
    heading: "Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. If we make material changes, we'll update the date at the top of this page and, where appropriate, notify you directly.",
  },
  {
    heading: "Contact Us",
    body: "If you have questions about this Privacy Policy or how we handle your data, contact us at info@goconverto.com or 1211 Tech Blvd Suite 120, Tampa, FL 33619, United States.",
  },
];

const PrivacyPolicyPage = () => {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="July 22, 2026"
      sections={SECTIONS}
    />
  );
};

export default PrivacyPolicyPage;
