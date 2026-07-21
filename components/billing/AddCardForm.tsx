"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export function AddCardForm({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    const { error: confirmError } = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message || "Failed to add card.");
      setSubmitting(false);
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={{ layout: "tabs" }} />

      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || submitting}
          className="rounded-lg bg-thunder-black px-4 py-2 text-sm font-medium text-white hover:bg-thunder-black/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Adding…" : "Add Card"}
        </button>
      </div>
    </form>
  );
}
