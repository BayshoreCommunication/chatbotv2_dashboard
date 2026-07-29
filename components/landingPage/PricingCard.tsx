"use client";

import { Button, buttonVariants } from "@/components/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { cn } from "@/lib/utils";
import { PricingPlan } from "@/config/pricing";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

interface PricingCardProps {
  plan: PricingPlan;
  loading: string | null;
  handleSubscribe: (plan: PricingPlan, billingCycle: "monthly" | "yearly") => void;
  isAuthenticated: boolean;
  isYearly: boolean;
  /** Real subscription state from the backend — has_paid_subscription on the session is never populated, don't rely on it. */
  hasActiveSubscription?: boolean;
  currentTier?: string | null;
}

const CONTACT_SALES_HREF =
  "mailto:sales@goconverto.com?subject=Enterprise%20Plan%20Inquiry";

// "trial" (this plan's id) and "free" (the backend tier name for it) refer
// to the same plan — normalize before ranking.
const TIER_RANK: Record<string, number> = {
  trial: 0,
  free: 0,
  professional: 1,
  advanced: 2,
  enterprise: 3,
};

export const PricingCard = memo(
  ({
    plan,
    loading,
    handleSubscribe,
    isAuthenticated,
    isYearly,
    hasActiveSubscription = false,
    currentTier = null,
  }: PricingCardProps) => {
    const router = useRouter();
    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const displayPrice = isYearly && plan.id !== "trial" ? price / 12 : price;

    // Free tier = no paid plan; only show Upgrade/Downgrade for actually paid plans
    const hasPaidPlan =
      hasActiveSubscription && !!currentTier && currentTier !== "free";

    const isCurrentPlan =
      hasPaidPlan && TIER_RANK[plan.id] === TIER_RANK[currentTier!];
    const isUpgrade =
      hasPaidPlan && !isCurrentPlan && TIER_RANK[plan.id] > TIER_RANK[currentTier!];

    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative h-full"
      >
        {plan.recommended && (
          <span className="absolute -top-3.5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary-dark px-4 py-1.5 text-xs font-semibold text-white shadow-md">
            Most Popular
          </span>
        )}

        <Card
          className={cn(
            "relative flex h-full flex-col overflow-visible rounded-2xl bg-white",
            plan.recommended
              ? "border-2 border-primary shadow-lg"
              : "border border-gray-200 hover:border-gray-300"
          )}
        >
          <CardHeader className="pb-2 pt-8 text-left">
            <CardTitle className="mb-1 text-xl font-bold text-thunder-black">
              {plan.name}
            </CardTitle>
            <CardDescription className="mb-6 text-sm leading-relaxed text-gray-500">
              {plan.description}
            </CardDescription>

            {plan.isCustomPricing ? (
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-thunder-black">
                  Custom
                </span>
                <p className="mt-1 text-sm text-gray-500">
                  Tailored to your usage
                </p>
              </div>
            ) : (
              <div className="mb-6">
                <div className="flex items-baseline justify-start gap-1">
                  <span className="text-4xl font-extrabold text-thunder-black">
                    ${displayPrice.toFixed(0)}
                  </span>
                  <span className="text-base text-gray-500">/month</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {isYearly ? `Billed $${price} annually` : "Billed monthly"}
                </p>
                {plan.trialDays && !isCurrentPlan && (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    {plan.trialDays}-day free trial — then billed automatically
                  </span>
                )}
              </div>
            )}
          </CardHeader>

          <CardContent className="flex flex-grow flex-col pt-0">
            <ul className="mb-8 flex-grow space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <li
                  key={featureIndex}
                  className="flex items-start justify-start gap-2.5 text-sm text-gray-700"
                >
                  <BiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary-dark" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              {plan.isCustomPricing ? (
                <a
                  href={CONTACT_SALES_HREF}
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className:
                      "w-full rounded-lg border-thunder-black bg-white text-thunder-black hover:bg-thunder-black hover:text-white",
                  })}
                >
                  <span className="flex items-center justify-center gap-2">
                    Contact Sales
                    <BsArrowRight className="h-5 w-5" />
                  </span>
                </a>
              ) : (
                <Button
                  variant="outline"
                  size="lg"
                  className={cn(
                    "w-full rounded-lg",
                    plan.recommended
                      ? "border-thunder-black bg-thunder-black text-white hover:bg-thunder-black/90 hover:text-white"
                      : "border-thunder-black bg-white text-thunder-black hover:bg-thunder-black hover:text-white"
                  )}
                  onClick={() =>
                    isCurrentPlan
                      ? router.push("/dashboard")
                      : handleSubscribe(plan, isYearly ? "yearly" : "monthly")
                  }
                  disabled={loading === plan.id}
                >
                  {loading === plan.id ? (
                    <span className="flex items-center justify-center">Processing...</span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {!isAuthenticated
                        ? "Sign In"
                        : isCurrentPlan
                          ? "Go to Dashboard"
                          : hasPaidPlan
                            ? isUpgrade
                              ? `Upgrade to ${plan.name}`
                              : `Downgrade to ${plan.name}`
                            : plan.trialDays
                              ? `Start ${plan.trialDays}-Day Free Trial`
                              : "Get Started"}
                      <BsArrowRight className="h-5 w-5" />
                    </span>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

PricingCard.displayName = "PricingCard";
