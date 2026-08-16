import type { Metadata } from "next";
import LegalPageLayout from "@/components/shared/LegalPageLayout";
import { OG_IMAGE } from "@/config/seo";

const PAGE_TITLE = "Data Deletion Instructions — Go Converto";
const PAGE_DESCRIPTION =
  "How to request deletion of your data from Go Converto, including data accessed through connected Facebook and Instagram accounts.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/data-deletion" },
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
// counsel review before publishing. This page exists as a standalone,
// directly-linkable URL for Meta's "Data Deletion Instructions URL" App
// Review requirement — see the Facebook, Instagram & Meta Platform Data
// section of the Privacy Policy for what data this covers.
const SECTIONS = [
  {
    heading: "Disconnect a Channel Yourself",
    body: "If you've connected a Facebook Page or Instagram Business Account to Go Converto, you can disconnect it at any time from your dashboard's Apps & Integrations page. Disconnecting immediately revokes our access to that channel, and message data associated with it is deleted from our systems within 30 days.",
  },
  {
    heading: "Request Deletion Directly",
    body: "You can also request deletion of your data at any time — whether or not you've disconnected a channel yourself — by emailing info@goconverto.com from the email address associated with your Go Converto account. Include which data you'd like deleted (for example, \"all data from my connected Facebook Page\" or \"my entire account\"). We'll confirm your identity and process the request within 30 days.",
  },
  {
    heading: "What Gets Deleted",
    body: "A deletion request removes the data we accessed through the connected channel — Page name, Page ID, Instagram Business Account ID, and message content and history exchanged through that channel — along with any other personal data you've asked us to delete. Deleting a channel's data doesn't affect your Go Converto account itself unless you've asked us to delete that too.",
  },
  {
    heading: "If You Remove Go Converto via Facebook",
    body: "Removing Go Converto from your Facebook or Instagram account settings (rather than disconnecting it from our dashboard) stops us from receiving new messages from that channel, but doesn't automatically delete data we've already stored — email info@goconverto.com to request that separately.",
  },
];

const DataDeletionPage = () => {
  return (
    <LegalPageLayout
      title="Data Deletion Instructions"
      lastUpdated="August 2, 2026"
      sections={SECTIONS}
    />
  );
};

export default DataDeletionPage;
