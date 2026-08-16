import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/verify-team-access" },
};

export default function VerifyTeamAccessLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
