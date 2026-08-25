import { getCurrentUserDetails } from "@/app/actions/user";
import { auth } from "@/auth";
import Footer from "@/components/landingPage/Footer";
import Navbar from "@/components/landingPage/Navbar";
import { OG_IMAGE } from "@/config/seo";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SEO_TITLE = "Go Converto AI Chatbot for Website Lead Generation";
const SEO_DESCRIPTION =
  "With Go Converto your client can communicate and ask questions directly with a powerful AI ChatBot to find information and answer questions within seconds.";

export const metadata: Metadata = {
  title: { default: SEO_TITLE, template: "%s · Go Converto" },
  description: SEO_DESCRIPTION,
  robots: { index: true, follow: true },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default async function SeoServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  // Fetch fresh company/profile data from backend
  const userDetails = session?.user ? await getCurrentUserDetails() : null;
  const freshUser = userDetails?.ok ? userDetails.data : null;

  const safeUser = session?.user
    ? {
        email: freshUser?.email || session.user.email || undefined,
        name: session.user.name === null ? undefined : session.user.name,
        companyName: freshUser?.company_name || session.user.companyName,
        avatar: session.user.avatar,
      }
    : null;

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
    >
      <Navbar
        isAuthenticated={!!session}
        user={safeUser}
        isSubscribed={!!freshUser?.is_subscribed}
        glowAnimation={null}
      />
      <main className="flex-1">
        {children}
        <Script
          src="https://widget.goconverto.com/widget.js"
          data-api-key="org-6a815b158c3bd9812b0e7b01"
          strategy="lazyOnload"
        />
      </main>
      <Footer />
    </div>
  );
}
