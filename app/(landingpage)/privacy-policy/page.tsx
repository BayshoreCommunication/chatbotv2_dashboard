import type { Metadata } from "next";
import LegalPageLayout from "@/components/shared/LegalPageLayout";
import { OG_IMAGE } from "@/config/seo";

const PAGE_TITLE = "Privacy Policy | Go Converto";
const PAGE_DESCRIPTION =
  "Read the Privacy Policy of Go Converto to understand how we collect, use, store, share, and protect your information when you use our website and services.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/privacy-policy" },
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
    body: "To create an account, you'll need to provide some of your details, such as your name, e-mail address, company name, and your website URL. Payments are encrypted and processed securely by Stripe, who will process your payment. Go Converto does not store your payment card details. Information collected through the service also includes conversations between your website visitors and your AI assistant, along with the publicly available pages and content from your website that are used to train your assistant. We also collect information about how the dashboard is used, including the features you access.",
  },
  {
    heading: "How We Use Your Information",
    body: "The information we collect allows us to operate and improve Go Converto. It is used to train and deliver your AI assistant, process payments, manage subscriptions, send account and billing communications, respond to support inquiries, and maintain the performance and reliability of the service.",
  },
  {
    heading: "Cookies & Tracking Technologies",
    body: "Cookies are used to maintain your account, to remember your preferences for widgets and dashboard and to optimize the use of the platform. This information enables us to refine the experience and make effective changes in the future. More information about cookies we use as well as the options you have regarding cookies are available in our Cookie Policy.",
  },
  {
    heading: "Data Sharing & Third Parties",
    body: "It is important to us to respect your privacy. Personal information is never sold. Certain trusted providers receive access to data only when it is necessary to deliver the services that support Go Converto. These providers include Stripe for payment processing, MongoDB Atlas for secure data storage, AI infrastructure providers that generate chatbot responses, and Calendly if you choose to connect it for appointment scheduling. Each provider is authorized to use your information only to perform services on our behalf.",
  },
  {
    heading: "Data Security",
    body: "Multiple layers of security are needed to protect your information. Data is encrypted while being transmitted and while stored. Only members of our team with authorization for access to such personal information will have access to it. While there is no absolute security, suitable security measures for information are maintained at an appropriate level, depending on the sensitivity of the information.",
  },
  {
    heading: "Your Rights & Choices",
    body: "Account information can be reviewed, updated, or deleted at any time through your dashboard settings. A copy of your data is available upon request, and you may also ask us to delete your information entirely by contacting us. Marketing emails can be stopped at any time by selecting the unsubscribe link included in those communications.",
  },
  {
    heading: "Children's Privacy",
    body: "Go Converto is intended for business use and is not directed to children under the age of 13. Personal information from children is not knowingly collected. Anyone who believes a child has submitted personal information to us should contact us so that it can be removed.",
  },
  {
    heading: "Changes to This Policy",
    body: "This Privacy Policy may be revised from time to time. When significant changes are made, the date at the top of this page will be updated. Direct notice will also be provided when appropriate.",
  },
  {
    heading: "Contact Us",
    body: "Questions about this Privacy Policy or the way Go Converto handles your information may be sent to hello@goconverto.com. You may also write to us at 1211 Tech Blvd Suite 120, Tampa, FL 33619, United States.",
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
