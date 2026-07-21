"use client";

import { getSubscriptionAction } from "@/app/actions/subscriptions";
import { PricingPlan, pricingPlans } from "@/config/pricing";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiSparkles } from "react-icons/hi";
import { PricingCard } from "./PricingCard";

interface User {
  name?: string | null;
  email?: string | null;
  id?: string | null;
}

interface SubscriptionSectionProps {
  isAuthenticated: boolean;
  user: User | null;
  /** When set, the checkout page redirects here on success instead of /dashboard */
  redirectAfterCheckout?: string;
}

const SubscriptionSection = ({
  isAuthenticated,
  user,
  redirectAfterCheckout,
}: SubscriptionSectionProps) => {
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [currentTier, setCurrentTier] = useState<string | null>(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const router = useRouter();

  // The session never carries real subscription state (no has_paid_subscription
  // field is populated upstream) — check the real subscription from the backend
  // instead. Also gives us the current tier, needed for Upgrade/Downgrade labels.
  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;
    getSubscriptionAction().then((res) => {
      if (cancelled) return;
      if (res.ok && res.data) {
        setCurrentTier(res.data.subscription_tier);
        setHasActiveSubscription(res.data.is_active);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const handleSubscribe = (
    plan: PricingPlan,
    billingCycle: "monthly" | "yearly"
  ) => {
    const redirectParam = redirectAfterCheckout
      ? `&redirect=${encodeURIComponent(redirectAfterCheckout)}`
      : "";

    if (!isAuthenticated) {
      const checkoutUrl = `/checkout?plan=${plan.id}&billing=${billingCycle}${redirectParam}`;
      router.push(`/sign-in?callbackUrl=${encodeURIComponent(checkoutUrl)}`);
      return;
    }

    setLoading(plan.id);
    router.push(`/checkout?plan=${plan.id}&billing=${billingCycle}${redirectParam}`);
  };

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-white py-3 lg:py-20"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-[7px] text-[13px] font-semibold text-primary-dark">
            <HiSparkles className="h-4 w-4 text-primary" />
            Pricing
          </span>

          <h2 className="mb-4 mt-4 text-4xl font-extrabold tracking-tight text-thunder-black sm:text-5xl lg:mb-6">
            Simple plans that scale with your business
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-gray-600">
            Start free for 14 days. Upgrade, downgrade, or cancel anytime.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span
              className={`text-sm font-semibold transition-colors ${
                !isYearly ? "text-thunder-black" : "text-gray-400"
              }`}
            >
              Monthly
            </span>

            <button
              onClick={() => setIsYearly((prev) => !prev)}
              role="switch"
              aria-checked={isYearly}
              aria-label="Toggle yearly billing"
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                isYearly ? "bg-primary" : "bg-gray-200"
              }`}
            >
              <motion.span
                animate={{ x: isYearly ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md"
              />
            </button>

            <span
              className={`text-sm font-semibold transition-colors ${
                isYearly ? "text-thunder-black" : "text-gray-400"
              }`}
            >
              Yearly
            </span>

            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
              Save 17%
            </span>
          </div>
        </motion.div>

        <motion.div
          key={isYearly ? "yearly" : "monthly"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch"
        >
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              loading={loading}
              handleSubscribe={handleSubscribe}
              isAuthenticated={isAuthenticated}
              isYearly={isYearly}
              hasActiveSubscription={hasActiveSubscription}
              currentTier={currentTier}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
