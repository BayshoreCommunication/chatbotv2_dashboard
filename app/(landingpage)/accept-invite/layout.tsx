import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/accept-invite" },
};

export default function AcceptInviteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
