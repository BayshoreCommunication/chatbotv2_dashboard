"use client";

import {
  changeSubscriptionPlanAction,
  createSubscriptionIntentAction,
  getSubscriptionAction,
} from "@/app/actions/subscriptions";
import { SignupPaymentForm } from "@/components/billing/SignupPaymentForm";
import { StripeElementsProvider } from "@/components/billing/StripeElementsProvider";
import { pricingPlans } from "@/config/pricing";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { BiArrowBack, BiCheckCircle } from "react-icons/bi";

type Status = "loading" | "payment" | "error";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const planId = searchParams.get("plan") ?? "professional";
  const billingCycle = searchParams.get("billing") === "yearly" ? "annual" : "monthly";

  const plan =
    pricingPlans.find((p) => p.id === planId) ??
    pricingPlans.find((p) => p.id === "professional")!;

  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const tier =
          plan.id === "trial"
            ? "free"
            : (plan.id as "free" | "professional" | "advanced" | "enterprise");

        // Auto-detect: existing subscription (even free-tier) switches
        // directly and reuses the saved card with no form at all; a
        // brand-new subscriber gets a PaymentIntent to confirm below.
        const existingSub = await getSubscriptionAction();
        const result =
          existingSub.ok && existingSub.data
            ? await changeSubscriptionPlanAction(tier, billingCycle)
            : await createSubscriptionIntentAction(tier, billingCycle);

        if (cancelled) return;

        if (!result.ok || !result.data) {
          setError(result.error || "Failed to start subscription.");
          setStatus("error");
          return;
        }

        if (!result.data.requires_payment) {
          router.replace("/dashboard?subscription=success");
          return;
        }

        if (result.data.client_secret) {
          setClientSecret(result.data.client_secret);
          setStatus("payment");
        } else {
          setError("Failed to start subscription.");
          setStatus("error");
        }
      } catch {
        if (!cancelled) {
          setError("An unexpected error occurred.");
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [plan.id, billingCycle, router]);

  const price = billingCycle === "annual" ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/#pricing"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <BiArrowBack size={16} /> Back to plans
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {plan.name} Plan
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {plan.description}
              </p>
              <p className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                {plan.isCustomPricing ? "Custom" : `$${price}`}
                {!plan.isCustomPricing && (
                  <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    / {billingCycle === "annual" ? "year" : "month"}
                  </span>
                )}
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <BiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Payment form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Payment details
              </h2>

              {status === "loading" && (
                <div className="flex items-center justify-center py-12">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                </div>
              )}

              {status === "error" && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {status === "payment" && clientSecret && (
                <StripeElementsProvider clientSecret={clientSecret}>
                  <SignupPaymentForm
                    onSuccess={() => router.push("/dashboard?subscription=success")}
                    onCancel={() => router.push("/#pricing")}
                  />
                </StripeElementsProvider>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-black" />}>
      <CheckoutContent />
    </Suspense>
  );
}
