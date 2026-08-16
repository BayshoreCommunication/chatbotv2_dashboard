import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/sign-in" },
};

export default function SignInLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
