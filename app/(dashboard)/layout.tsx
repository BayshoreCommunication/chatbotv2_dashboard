import LayoutWrapper from "@/components/layout/LayoutWrapper";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { OG_IMAGE } from "@/config/seo";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DASHBOARD_TITLE = "Dashboard — Go Converto";
const DASHBOARD_DESCRIPTION =
  "Manage your AI chatbot, leads, conversations, and appointments from your Go Converto dashboard.";

export const metadata: Metadata = {
  // `absolute` opts out of the root layout's `%s · Go Converto` title
  // template — this title is already complete.
  title: { absolute: DASHBOARD_TITLE },
  description: DASHBOARD_DESCRIPTION,
  // Authenticated app area — keep it out of search results.
  robots: { index: false, follow: false },
  openGraph: {
    title: DASHBOARD_TITLE,
    description: DASHBOARD_DESCRIPTION,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DASHBOARD_TITLE,
    description: DASHBOARD_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <LayoutWrapper>{children}</LayoutWrapper>
    </div>
  );
}
