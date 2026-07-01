import { auth } from "@/auth";
import { getCurrentUserDetails } from "@/app/actions/user";
import Footer from "@/components/landingPage/Footer";
import Navbar from "@/components/landingPage/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Assistant",
  description: "Your intelligent workflow partner",
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
        glowAnimation={null}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
