"use client";

import {
  changeSubscriptionPlanAction,
  createSubscriptionIntentAction,
  getIsSubscribedAction,
  getSessionInfoAction,
  getSubscriptionAction,
} from "@/app/actions/subscriptions";
import { invalidateUserProfileCacheAction } from "@/app/actions/user";
import { getWidgetSettingsAction } from "@/app/actions/widgetSettings";
import { type BeforeConfirmResult, SignupPaymentForm } from "@/components/billing/SignupPaymentForm";
import { StripeElementsProvider } from "@/components/billing/StripeElementsProvider";
import { pricingPlans } from "@/config/pricing";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { BiArrowBack, BiCheckCircle, BiEnvelope, BiLoaderAlt } from "react-icons/bi";
import { BsShieldCheck } from "react-icons/bs";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const planId       = searchParams.get("plan") ?? "professional";
  const billingCycle = searchParams.get("billing") === "yearly" ? "annual" : "monthly";
  const redirectParam = searchParams.get("redirect");
  const [confirming, setConfirming] = useState(false);
  const [redirectError, setRedirectError] = useState<string | null>(null);
  const paymentHandledRef = useRef(false);

  // Canonical /checkout URL (same plan/billing/redirect params) — this is
  // what Stripe sends the browser back to for payment methods that require a
  // full-page redirect (3D Secure / SCA). Must stay on this page (middleware-
  // exempt) rather than /dashboard or /widget-settings (both gated on
  // is_subscribed) so handlePaymentSuccess's poll below can actually run
  // before we navigate onward — landing straight on a gated page with zero
  // wait is what was bouncing users back to "/".
  const returnUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/checkout?plan=${encodeURIComponent(planId)}&billing=${
          billingCycle === "annual" ? "yearly" : "monthly"
        }${redirectParam ? `&redirect=${encodeURIComponent(redirectParam)}` : ""}`
      : "/checkout";

  // Stripe's webhook writes the subscription doc and flips users.is_subscribed
  // — the exact field middleware.ts requires on every page except /checkout
  // and /widget-settings — asynchronously, after confirmPayment/confirmSetup
  // has already resolved. Poll from this exempt page until it lands;
  // otherwise the very next navigation to /dashboard gets bounced straight
  // back to "/" by middleware seeing a still-stale is_subscribed. Checking
  // getIsSubscribedAction specifically (not getSubscriptionAction's
  // is_active) matters: they read different Mongo collections written by two
  // separate updates in the same webhook handler, so is_active can go true
  // while is_subscribed is still lagging (or never lands).
  //
  // Checks immediately first (the common case — an existing active
  // subscriber changing plans — is already true with zero wait) and only
  // then backs off, so a fresh signup's webhook lag costs as little latency
  // as possible instead of a flat 2s tax per attempt.
  const waitForSubscriptionActive = async () => {
    const delaysMs = [0, 400, 800, 1200, 1600, 2000]; // ~6s worst case, was a flat 10s
    for (const delay of delaysMs) {
      if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
      const res = await getIsSubscribedAction();
      if (res.ok && res.data) return;
    }
  };

  // After payment, land the user on the most useful page in one hop instead
  // of bouncing through an intermediate page that re-derives the same
  // decision (avoids a duplicate subscription/widget fetch + extra page load).
  const handlePaymentSuccess = async () => {
    setConfirming(true);
    // Cache-bust is fire-and-forget — nothing downstream needs to wait on it,
    // it only has to land before some *later* page reads the cached profile.
    invalidateUserProfileCacheAction();

    if (redirectParam === "start-free-trial" || redirectParam === "widget-settings") {
      const widget = await getWidgetSettingsAction();
      if (widget.ok && widget.data) {
        // Already has a configured widget — this is a returning subscriber
        // upgrading, not a first-time trial signup. /dashboard is gated, so
        // wait for is_subscribed before heading there.
        await waitForSubscriptionActive();
        router.push("/dashboard?subscription=success");
      } else {
        // /widget-settings is middleware-exempt and has its own webhook-wait
        // polling ("activating" view state) built in — no need to duplicate
        // that wait here, just get the user there immediately.
        router.push("/widget-settings?subscription=success");
      }
      return;
    }

    await waitForSubscriptionActive();
    router.push("/dashboard?subscription=success");
  };

  // Handles the case where Stripe redirected the browser away for 3D Secure /
  // SCA authentication and back to this same /checkout URL (returnUrl above)
  // instead of calling onSuccess() directly in-page — Stripe appends
  // redirect_status to the URL when it does this.
  useEffect(() => {
    const redirectStatus = searchParams.get("redirect_status");
    if (!redirectStatus || paymentHandledRef.current) return;
    paymentHandledRef.current = true;
    if (redirectStatus === "succeeded") {
      handlePaymentSuccess();
    } else {
      setRedirectError("Card authentication was not completed. Please try again.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const plan =
    pricingPlans.find((p) => p.id === planId) ??
    pricingPlans.find((p) => p.id === "professional")!;

  const [userEmail, setUserEmail] = useState("");

  // Only read session info on load — no Stripe API calls here.
  useEffect(() => {
    getSessionInfoAction().then((info) => setUserEmail(info.email));
  }, []);

  const [trialEndDate, setTrialEndDate] = useState<string | null>(null);

  // Date.now() is impure — compute the trial end date in an effect rather
  // than inline during render (React purity rule).
  useEffect(() => {
    if (!plan.trialDays) {
      setTrialEndDate(null);
      return;
    }
    setTrialEndDate(
      new Date(Date.now() + plan.trialDays * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { month: "long", day: "numeric", year: "numeric" }
      )
    );
  }, [plan.trialDays]);

  const tier = plan.id === "trial"
    ? "free"
    : (plan.id as "free" | "professional" | "advanced" | "enterprise");

  const isTrial      = !!plan.trialDays;
  const price        = billingCycle === "annual" ? plan.yearlyPrice : plan.monthlyPrice;
  const cycleLabel   = billingCycle === "annual" ? "year" : "month";

  // Deferred Elements mode: "setup" collects a card for future billing (trial),
  // "payment" collects a card for immediate charge (no trial).
  const elementsMode   = isTrial ? ("setup" as const) : ("payment" as const);
  const elementsAmount = isTrial ? 0 : Math.round(price * 100);

  // Called only when the user clicks the submit button — no subscription is
  // created or modified until this point.
  const handleBeforeConfirm = async (): Promise<BeforeConfirmResult> => {
    const existingSub = await getSubscriptionAction();
    const hasActivePaidSub =
      existingSub.ok &&
      existingSub.data &&
      existingSub.data.subscription_tier !== "free" &&
      (existingSub.data.subscription_status === "active" ||
        existingSub.data.subscription_status === "trialing");

    if (hasActivePaidSub) {
      const result = await changeSubscriptionPlanAction(tier, billingCycle);
      if (!result.ok || !result.data)
        throw new Error(result.error ?? "Failed to change plan.");
      return {
        clientSecret:    result.data.client_secret,
        intentKind:      "payment",
        requiresPayment: result.data.requires_payment,
      };
    }

    const result = await createSubscriptionIntentAction(tier, billingCycle);
    if (!result.ok || !result.data)
      throw new Error(result.error ?? "Failed to start subscription.");
    return {
      clientSecret:    result.data.client_secret,
      intentKind:      result.data.intent_kind ?? "payment",
      requiresPayment: result.data.requires_payment,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center px-4 py-4 sm:px-6">
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
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
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {isTrial
                ? `Start your ${plan.name} trial`
                : `Subscribe to ${plan.name}`}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              {isTrial
                ? `Add a payment method to activate your AI assistant. You won't be charged during your ${plan.trialDays}-day free trial — cancel anytime before it ends.`
                : "Your subscription begins immediately upon payment."}
            </p>

            {/* Form card */}
            <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-6">
              {/* Billing email */}
              <div className="mb-6">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                  Billing Details
                </p>
                <div className="mt-3 space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Billing email
                  </label>
                  <div className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                    <BiEnvelope className="shrink-0 text-gray-400" size={16} />
                    {userEmail || (
                      <span className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                    )}
                  </div>
                </div>
              </div>

              {/* Payment form — Elements mounted in deferred mode; no Stripe
                  subscription is created until the user clicks submit. */}
              <StripeElementsProvider
                mode={elementsMode}
                amount={elementsAmount}
                currency="usd"
              >
                <SignupPaymentForm
                  onBeforeConfirm={handleBeforeConfirm}
                  onSuccess={handlePaymentSuccess}
                  returnUrl={returnUrl}
                  isTrial={isTrial}
                  planName={plan.name}
                  trialDays={plan.trialDays}
                  price={price}
                  billingCycle={billingCycle}
                />
              </StripeElementsProvider>

              {confirming && (
                <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-gray-500">
                  <BiLoaderAlt className="animate-spin" size={14} />
                  Payment received — confirming your subscription…
                </p>
              )}

              {redirectError && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {redirectError}
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Order summary ───────────────────────────────────── */}
          <div className="lg:col-span-2 lg:self-start lg:sticky lg:top-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                Order Summary
              </p>

              {/* Plan header */}
              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      {plan.name}
                    </span>
                    {plan.recommended && (
                      <span className="rounded-full bg-primary-dark px-2.5 py-0.5 text-xs font-semibold text-white">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {plan.description}
                  </p>
                </div>
                {!plan.isCustomPricing && (
                  <div className="shrink-0 text-right">
                    <span className="text-2xl font-bold text-gray-900">
                      ${price}
                    </span>
                    <span className="text-sm text-gray-400">
                      /{cycleLabel}
                    </span>
                  </div>
                )}
              </div>

              {/* Trial box */}
              {isTrial && trialEndDate && (
                <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <BiCheckCircle
                      className="shrink-0 text-green-600"
                      size={16}
                    />
                    <span className="text-sm font-semibold text-green-800">
                      {plan.trialDays}-day free trial
                    </span>
                  </div>
                  <p className="mt-0.5 pl-6 text-xs text-green-700">
                    Free until {trialEndDate}
                  </p>
                </div>
              )}

              {/* Line items */}
              {!plan.isCustomPricing && (
                <div className="mt-5 space-y-2.5 border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {plan.name} ({billingCycle === "annual" ? "yearly" : "monthly"})
                    </span>
                    <span className="font-medium text-gray-900">
                      ${price}.00
                    </span>
                  </div>
                  {isTrial && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {plan.trialDays}-day free trial
                      </span>
                      <span className="font-semibold text-green-600">
                        -${price}.00
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-2.5">
                    <span className="font-semibold text-gray-900">
                      Due today
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      ${isTrial ? "0.00" : `${price}.00`}
                    </span>
                  </div>
                </div>
              )}

              {/* After-trial note */}
              {isTrial && trialEndDate && (
                <p className="mt-3 text-xs leading-relaxed text-gray-400">
                  After your trial, you&apos;ll be charged ${price}/{cycleLabel}{" "}
                  starting {trialEndDate}. Cancel anytime before then and you
                  won&apos;t be charged.
                </p>
              )}

              {/* Features */}
              <div className="mt-5 border-t border-gray-100 pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                  Included in {plan.name}
                </p>
                <ul className="mt-3 space-y-2">
                  {plan.features.slice(0, 4).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <BiCheckCircle
                        className="mt-0.5 shrink-0 text-primary-dark"
                        size={15}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guarantee + Change plan */}
              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <BsShieldCheck className="shrink-0 text-green-500" size={13} />
                  14-day money-back guarantee
                </div>
                <Link
                  href="/#pricing"
                  className="text-xs font-medium text-primary-dark hover:text-primary"
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
      fallback={<div className="min-h-screen bg-gray-50" />}
    >
      <CheckoutContent />
    </Suspense>
  );
}
