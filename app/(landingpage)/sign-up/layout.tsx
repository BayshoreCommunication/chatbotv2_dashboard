import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/sign-up" },
};

export default function SignUpLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
