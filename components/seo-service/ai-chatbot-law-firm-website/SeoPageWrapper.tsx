import React from "react";
import Navbar from "@/components/landingPage/Navbar";
import Footer from "@/components/landingPage/Footer";

interface SeoPageWrapperProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  user?: {
    email?: string;
    name?: string;
    companyName?: string;
    avatar?: string;
    [key: string]: unknown;
  } | null;
  isSubscribed?: boolean;
}

export default function SeoPageWrapper({
  children,
  isAuthenticated = false,
  user = null,
  isSubscribed = false,
}: SeoPageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col antialiased bg-white">
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        isSubscribed={isSubscribed}
        glowAnimation={null}
      />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
