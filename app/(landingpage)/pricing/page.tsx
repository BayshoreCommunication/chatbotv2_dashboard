import { auth } from "@/auth";
import SubscriptionSection from "@/components/landingPage/SubscriptionSection";

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

  // Pass the redirect intent through so the checkout page knows where to send
  // the user after payment (e.g. "widget-settings" from the free-trial CTA).
  const redirectAfterCheckout =
    params.redirect === "widget-settings"
      ? "widget-settings"
      : params.redirect === "start-free-trial"
      ? "start-free-trial"
      : undefined;

  return (
    <div className="pt-24">
      <SubscriptionSection
        isAuthenticated={!!session?.user}
        user={user}
        redirectAfterCheckout={redirectAfterCheckout}
      />
    </div>
  );
};

export default page;
