import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { OG_IMAGE, SITE_URL } from "@/config/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_DESCRIPTION =
  "Go Converto is the AI chatbot that learns your business automatically and turns website visitors into customers, 24/7.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Go Converto — AI Chatbot for Your Business",
    template: "%s · Go Converto",
  },
  description: SITE_DESCRIPTION,
  verification: {
    google: "google8fed4938c81df47d.html",
  },
  openGraph: {
    siteName: "Go Converto",
    type: "website",
    title: "Go Converto — AI Chatbot for Your Business",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Go Converto — AI Chatbot for Your Business",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastProvider />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: { fontSize: "0.875rem", fontWeight: 500 },
            success: { style: { background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0" } },
            error: { style: { background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" } },
          }}
        />
      </body>
    </html>
  );
}
