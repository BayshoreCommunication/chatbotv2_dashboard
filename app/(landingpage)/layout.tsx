import { auth } from "@/auth";
import { getCurrentUserDetails } from "@/app/actions/user";
import Footer from "@/components/landingPage/Footer";
import Navbar from "@/components/landingPage/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { OG_IMAGE, SITE_IS_LIVE } from "@/config/seo";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const LANDING_TITLE = "Go Converto — AI That Turns Visitors Into Customers";
const LANDING_DESCRIPTION =
  "Instant replies, more leads, and happier customers — all powered by AI. Train Go Converto on your website and start converting visitors in minutes.";

export const metadata: Metadata = {
  // `absolute` opts out of the root layout's `%s · Go Converto` title
  // template — this title is already complete, the template would just
  // append "· Go Converto" a second time onto the end of it.
  title: { absolute: LANDING_TITLE },
  description: LANDING_DESCRIPTION,
  // Site isn't publicly launched yet — keep it out of search results until
  // SITE_IS_LIVE is flipped on.
  robots: SITE_IS_LIVE
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    title: LANDING_TITLE,
    description: LANDING_DESCRIPTION,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: LANDING_TITLE,
    description: LANDING_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default async function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  // Fetch fresh company/profile data from the backend so the navbar never shows
  // stale info baked into the long-lived (30-day) NextAuth session JWT.
  const userDetails = session?.user
    ? await getCurrentUserDetails()
    : null;
  const freshUser = userDetails?.ok ? userDetails.data : null;

  // Transform user to match Navbar's expected type — prefer fresh backend data,
  // falling back to the session JWT if the backend call fails.
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
      <main>{children}</main>
      <Footer />
    </div>
  );
}
