"use client";

import {
  changeSubscriptionPlanAction,
  createSubscriptionIntentAction,
  getSessionInfoAction,
  getSubscriptionAction,
} from "@/app/actions/subscriptions";
import { SignupPaymentForm } from "@/components/billing/SignupPaymentForm";
import { StripeElementsProvider } from "@/components/billing/StripeElementsProvider";
import { pricingPlans } from "@/config/pricing";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { BiArrowBack, BiCheckCircle, BiEnvelope } from "react-icons/bi";
import { BsShieldCheck } from "react-icons/bs";

type Status = "loading" | "payment" | "error";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const planId = searchParams.get("plan") ?? "professional";
  const billingCycle =
    searchParams.get("billing") === "yearly" ? "annual" : "monthly";
  const redirectParam = searchParams.get("redirect");
  // "widget-settings" → go to widget settings after payment (free-trial flow)
  // anything else (or absent) → go to dashboard (landing page flow)
  const successUrl =
    redirectParam === "widget-settings"
      ? "/widget-settings?subscription=success"
      : "/dashboard";

  const plan =
    pricingPlans.find((p) => p.id === planId) ??
    pricingPlans.find((p) => p.id === "professional")!;

  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [intentKind, setIntentKind] = useState<"payment" | "setup">("payment");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    let cancelled = false;

    // Fetch email in parallel — non-blocking
    getSessionInfoAction().then((info) => {
      if (!cancelled) setUserEmail(info.email);
    });

    (async () => {
      try {
        const tier =
          plan.id === "trial"
            ? "free"
            : (plan.id as "free" | "professional" | "advanced" | "enterprise");

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
          router.replace(successUrl);
          return;
        }

        if (result.data.client_secret) {
          const kind = (result.data as { intent_kind?: "payment" | "setup" })
            .intent_kind;
          setIntentKind(kind ?? "payment");
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
  const cycleLabel = billingCycle === "annual" ? "year" : "month";
  const isPlanWithTrial = !!plan.trialDays;

  const trialEndDate = plan.trialDays
    ? new Date(
        Date.now() + plan.trialDays * 24 * 60 * 60 * 1000
      ).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top nav */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
        <div className="mx-auto flex max-w-5xl items-center px-4 py-4 sm:px-6">
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <BiArrowBack size={16} />
            Back to plans
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* ── Left: Payment form ─────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {isPlanWithTrial
                ? `Start your ${plan.name} trial`
                : `Subscribe to ${plan.name}`}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {isPlanWithTrial
                ? `Add a payment method to activate your AI assistant. You won't be charged during your ${plan.trialDays}-day free trial — cancel anytime before it ends.`
                : "Your subscription begins immediately upon payment."}
            </p>

            {/* Form card */}
            <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              {/* Loading skeleton */}
              {status === "loading" && (
                <div className="animate-pulse space-y-4">
                  <div className="h-3.5 w-28 rounded-md bg-gray-100 dark:bg-gray-800" />
                  <div className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800" />
                  <div className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800" />
                    <div className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800" />
                  </div>
                  <div className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800" />
                    <div className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800" />
                  </div>
                  <div className="mt-2 h-12 rounded-xl bg-gray-200 dark:bg-gray-700" />
                </div>
              )}

              {/* Error */}
              {status === "error" && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Payment form */}
              {status === "payment" && clientSecret && (
                <>
                  {/* Billing email */}
                  <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      Billing Details
                    </p>
                    <div className="mt-3 space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Billing email
                      </label>
                      <div className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        <BiEnvelope className="shrink-0 text-gray-400" size={16} />
                        {userEmail || (
                          <span className="h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                        )}
                      </div>
                    </div>
                  </div>

                  <StripeElementsProvider clientSecret={clientSecret}>
                    <SignupPaymentForm
                      intentKind={intentKind}
                      planName={plan.name}
                      trialDays={plan.trialDays}
                      price={price}
                      billingCycle={billingCycle}
                      onSuccess={() =>
                        router.push(successUrl)
                      }
                    />
                  </StripeElementsProvider>
                </>
              )}
            </div>
          </div>

          {/* ── Right: Order summary ───────────────────────────────────── */}
          <div className="lg:col-span-2 lg:self-start lg:sticky lg:top-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Order Summary
              </p>

              {/* Plan header */}
              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </span>
                    {plan.recommended && (
                      <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                    {plan.description}
                  </p>
                </div>
                {!plan.isCustomPricing && (
                  <div className="shrink-0 text-right">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${price}
                    </span>
                    <span className="text-sm text-gray-400 dark:text-gray-500">
                      /{cycleLabel}
                    </span>
                  </div>
                )}
              </div>

              {/* Trial box */}
              {isPlanWithTrial && trialEndDate && (
                <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 dark:border-green-900 dark:bg-green-950">
                  <div className="flex items-center gap-2">
                    <BiCheckCircle
                      className="shrink-0 text-green-600 dark:text-green-400"
                      size={16}
                    />
                    <span className="text-sm font-semibold text-green-800 dark:text-green-300">
                      {plan.trialDays}-day free trial
                    </span>
                  </div>
                  <p className="mt-0.5 pl-6 text-xs text-green-700 dark:text-green-400">
                    Free until {trialEndDate}
                  </p>
                </div>
              )}

              {/* Line items */}
              {!plan.isCustomPricing && (
                <div className="mt-5 space-y-2.5 border-t border-gray-100 pt-4 dark:border-gray-800">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {plan.name} ({billingCycle === "annual" ? "yearly" : "monthly"})
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${price}.00
                    </span>
                  </div>
                  {isPlanWithTrial && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {plan.trialDays}-day free trial
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        -${price}.00
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-2.5 dark:border-gray-800">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Due today
                    </span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ${isPlanWithTrial ? "0.00" : `${price}.00`}
                    </span>
                  </div>
                </div>
              )}

              {/* After-trial note */}
              {isPlanWithTrial && trialEndDate && (
                <p className="mt-3 text-xs leading-relaxed text-gray-400 dark:text-gray-500">
                  After your trial, you&apos;ll be charged ${price}/{cycleLabel}{" "}
                  starting {trialEndDate}. Cancel anytime before then and you
                  won&apos;t be charged.
                </p>
              )}

              {/* Features */}
              <div className="mt-5 border-t border-gray-100 pt-4 dark:border-gray-800">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Included in {plan.name}
                </p>
                <ul className="mt-3 space-y-2">
                  {plan.features.slice(0, 4).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <BiCheckCircle
                        className="mt-0.5 shrink-0 text-blue-500"
                        size={15}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guarantee + Change plan */}
              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <BsShieldCheck
                    className="shrink-0 text-green-500"
                    size={13}
                  />
                  14-day money-back guarantee
                </div>
                <Link
                  href="/#pricing"
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Change plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-950" />}
    >
      <CheckoutContent />
    </Suspense>
  );
}
