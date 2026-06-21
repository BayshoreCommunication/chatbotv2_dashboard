"use client";

import { getSubscriptionAction } from "@/app/actions/subscriptions";
import { PricingPlan, pricingPlans } from "@/config/pricing";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { LuSparkles } from "react-icons/lu";
import { PricingCard } from "./PricingCard";

interface User {
  name?: string | null;
  email?: string | null;
  id?: string | null;
}

interface SubscriptionSectionProps {
  isAuthenticated: boolean;
  user: User | null;
}

const SubscriptionSection = ({
  isAuthenticated,
  user,
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
    if (!isAuthenticated) {
      const checkoutUrl = `/checkout?plan=${plan.id}&billing=${billingCycle}`;
      router.push(`/sign-in?callbackUrl=${encodeURIComponent(checkoutUrl)}`);
      return;
    }

    setLoading(plan.id);
    // Custom checkout page handles the rest: auto-detecting an existing
    // subscription vs. brand-new signup, and showing the Stripe Elements
    // card form only if actually needed.
    router.push(`/checkout?plan=${plan.id}&billing=${billingCycle}`);
  };

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-white pb-32 dark:bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 opacity-50 dark:from-gray-900 dark:via-black dark:to-black" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 mt-10 text-4xl font-bold sm:text-6xl">
            <span className="block bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              Choose your
            </span>
            <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              perfect plan
            </span>
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 dark:text-gray-400">
            Start free, scale as you grow. No hidden fees, cancel anytime.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mx-auto mb-6 flex w-fit flex-col items-center gap-4">
            <motion.div
              className="relative flex items-center justify-center gap-3 rounded-full border border-gray-300 bg-white p-1.5 shadow-lg dark:border-gray-700 dark:bg-gray-900"
              layout
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  background: isYearly
                    ? "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))"
                    : "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))",
                }}
                transition={{ duration: 0.3 }}
              />

              <motion.button
                onClick={() => setIsYearly(false)}
                className="relative z-10 rounded-full px-6 py-2.5 text-sm font-semibold transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {!isYearly && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    !isYearly
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Monthly
                </span>
              </motion.button>

              <motion.button
                onClick={() => setIsYearly(true)}
                className="relative z-10 flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isYearly && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    isYearly ? "text-white" : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Yearly
                </span>
                <motion.span
                  className="relative z-10 rounded-full bg-green-500 px-2 py-0.5 text-xs font-bold text-white shadow-md"
                  animate={{ scale: isYearly ? [1, 1.1, 1] : 1 }}
                  transition={{
                    duration: 0.5,
                    repeat: isYearly ? Infinity : 0,
                    repeatDelay: 2,
                  }}
                >
                  Save 17%
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Savings Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: isYearly ? 1 : 0,
                y: isYearly ? 0 : -10,
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-center"
            >
              <motion.div
                animate={{ rotate: isYearly ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <IoSparkles className="h-4 w-4 text-green-500" />
              </motion.div>
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-sm font-semibold text-transparent dark:from-green-400 dark:to-emerald-400">
                Save $118/year with Professional plan or $178/year with
                Enterprise plan!
              </span>
              <motion.div
                animate={{ rotate: isYearly ? -360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <LuSparkles className="h-4 w-4 text-green-500" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          key={isYearly ? "yearly" : "monthly"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 pt-6 lg:grid-cols-3"
        >
          {/* Simple glow effect */}
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 opacity-20 blur-[120px]" />

          {pricingPlans
            .filter((plan) => !plan.isCustomPricing)
            .map((plan) => (
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

        {/* Enterprise — custom pricing, shown as a distinct full-width banner */}
        {pricingPlans
          .filter((plan) => plan.isCustomPricing)
          .map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative mx-auto mt-20 max-w-6xl overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-900 to-black p-8 dark:border-gray-800 sm:p-10"
            >
              <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                <div>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-2 max-w-xl text-gray-400">{plan.description}</p>
                  <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-300 sm:justify-start">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <BiCheckCircle className="h-4 w-4 text-blue-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="mailto:sales@bayshorecommunication.com?subject=Enterprise%20Plan%20Inquiry"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105"
                >
                  Contact Sales
                  <BsArrowRight className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default SubscriptionSection;
