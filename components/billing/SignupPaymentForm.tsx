"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { BiLock, BiLoaderAlt } from "react-icons/bi";

export function SignupPaymentForm({
  onSuccess,
  onCancel: _onCancel,
  intentKind = "payment",
  planName,
  trialDays,
  price,
  billingCycle = "monthly",
}: {
  onSuccess: () => void;
  onCancel?: () => void;
  intentKind?: "payment" | "setup";
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

    const { error: confirmError } =
      intentKind === "setup"
        ? await stripe.confirmSetup({ elements, redirect: "if_required" })
        : await stripe.confirmPayment({ elements, redirect: "if_required" });

    if (confirmError) {
      setError(confirmError.message || "Payment failed.");
      setSubmitting(false);
      return;
    }

    onSuccess();
  };

  const cycleLabel = billingCycle === "annual" ? "year" : "month";
  const isTrial = intentKind === "setup";

  const chargeText =
    isTrial && price
      ? `$${price}/${cycleLabel} after my free trial, unless I cancel`
      : "";

  const buttonLabel = isTrial
    ? `Start ${trialDays ?? 14}-Day Free Trial`
    : `Subscribe to ${planName ?? "Plan"}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement options={{ layout: "tabs" }} />

      {/* Terms of Service checkbox */}
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-blue-600"
        />
        <span className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          I agree to the{" "}
          <a
            href="/terms"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Terms of Service
          </a>{" "}
          and authorize BayAI to charge this card
          {chargeText ? ` ${chargeText}` : ""}.
        </span>
      </label>

      {/* Error message */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!stripe || submitting || !agreed}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <BiLoaderAlt className="animate-spin" size={18} />
        ) : (
          <BiLock size={16} />
        )}
        {submitting ? "Processing…" : buttonLabel}
      </button>

      {/* Security note */}
      <p className="text-center text-xs text-gray-400 dark:text-gray-500">
        Payments are secure and encrypted
        {isTrial ? " · $0.00 due today" : price ? ` · $${price} due today` : ""}
      </p>
    </form>
  );
}
