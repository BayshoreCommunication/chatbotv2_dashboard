import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/start-free-trial" },
};

export default function StartFreeTrialLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
