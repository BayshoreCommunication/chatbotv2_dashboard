import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/google" },
};

export default function GoogleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
