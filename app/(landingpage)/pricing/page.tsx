import type { Metadata } from "next";
import { auth } from "@/auth";
import SubscriptionSection from "@/components/landingPage/SubscriptionSection";
import PageHero from "@/components/shared/PageHero";

const PAGE_TITLE = "AI Chatbot Pricing Plans | Go Converto";

const PAGE_DESCRIPTION =
  "Choose a pricing plan that matches your business needs. Get vigorous AI chatbot features, flexible options, and a simple setup with Go Converto.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) => {
  const [session, params] = await Promise.all([auth(), searchParams]);

  const user = session?.user
    ? {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name === null ? undefined : session.user.name,
      }
    : null;

  const redirectAfterCheckout =
    params.redirect === "widget-settings"
      ? "widget-settings"
      : params.redirect === "start-free-trial"
        ? "start-free-trial"
        : undefined;

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
        title="Simple, transparent pricing"
      />

      <SubscriptionSection
        isAuthenticated={!!session?.user}
        user={user}
        redirectAfterCheckout={redirectAfterCheckout}
      />
    </>
  );
};

export default page;
