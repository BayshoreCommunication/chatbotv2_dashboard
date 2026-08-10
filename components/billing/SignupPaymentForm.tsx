"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { BiLock, BiLoaderAlt } from "react-icons/bi";

export type BeforeConfirmResult = {
  clientSecret: string | null;
  intentKind: "payment" | "setup";
  requiresPayment: boolean;
};

export function SignupPaymentForm({
  onSuccess,
  onBeforeConfirm,
  returnUrl,
  isTrial = false,
  planName,
  trialDays,
  price,
  billingCycle = "monthly",
}: {
  onSuccess: () => void;
  /**
   * Called on submit (before Stripe confirmation) to create or change the
   * subscription server-side. Returns the intent details needed to confirm.
   * No Stripe subscription is created until the user actually clicks submit.
   */
  onBeforeConfirm: () => Promise<BeforeConfirmResult>;
  /** Fallback URL for payment methods that require a browser redirect (e.g. 3D Secure). */
  returnUrl: string;
  isTrial?: boolean;
  planName?: string;
  trialDays?: number;
  price?: number;
  billingCycle?: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!agreed) {
      setError("Please agree to the Terms of Service to continue.");
      return;
    }

    setSubmitting(true);
    setError(null);

    // 1. Create / change the subscription server-side (only on submit).
    let confirmResult: BeforeConfirmResult;
    try {
      confirmResult = await onBeforeConfirm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start subscription.");
      setSubmitting(false);
      return;
    }

    const { clientSecret, intentKind, requiresPayment } = confirmResult;

    // 2. Existing subscriber whose saved card was auto-charged — nothing more to do.
    if (!requiresPayment) {
      onSuccess();
      return;
    }

    if (!clientSecret) {
      setError("Failed to start subscription.");
      setSubmitting(false);
      return;
    }

    // 3. Validate card fields before confirming (required for deferred intents).
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Please check your card details.");
      setSubmitting(false);
      return;
    }

    // 4. Confirm payment / setup with the freshly created intent's client_secret.
    const { error: confirmError } =
      intentKind === "setup"
        ? await stripe.confirmSetup({
            elements,
            clientSecret,
            confirmParams: { return_url: returnUrl },
            redirect: "if_required",
          })
        : await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: { return_url: returnUrl },
            redirect: "if_required",
          });

    if (confirmError) {
      setError(confirmError.message ?? "Payment failed.");
      setSubmitting(false);
      return;
    }

    onSuccess();
  };

  const cycleLabel = billingCycle === "annual" ? "year" : "month";
  const buttonLabel = isTrial
    ? `Start ${trialDays ?? 14}-Day Free Trial`
    : `Subscribe to ${planName ?? "Plan"}`;
  const chargeText =
    isTrial && price
      ? `$${price}/${cycleLabel} after my free trial, unless I cancel`
      : "";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement options={{ layout: "tabs" }} />

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary-dark"
        />
        <span className="text-xs leading-relaxed text-gray-500">
          I agree to the{" "}
          <a
            href="/terms"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary-dark hover:underline"
          >
            Terms of Service
          </a>{" "}
          and authorize Go Converto to charge this card
          {chargeText ? ` ${chargeText}` : ""}.
        </span>
      </label>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || submitting || !agreed}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-thunder-black py-3.5 text-sm font-semibold text-white transition-colors hover:bg-thunder-black/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <BiLoaderAlt className="animate-spin" size={18} />
        ) : (
          <BiLock size={16} />
        )}
        {submitting ? "Processing…" : buttonLabel}
      </button>

      <p className="text-center text-xs text-gray-400">
        Payments are secure and encrypted
        {isTrial ? " · $0.00 due today" : price ? ` · $${price} due today` : ""}
      </p>
    </form>
  );
}
