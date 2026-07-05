import {
  changeSubscriptionPlanAction,
  createSubscriptionIntentAction,
} from "@/app/actions/subscriptions";
import { pricingPlans } from "@/config/pricing";
import { useState } from "react";
import { BiX } from "react-icons/bi";
import { BillingCycleToggle } from "./BillingCycleToggle";
import { PlanCard } from "./PlanCard";
import { BeforeConfirmResult, SignupPaymentForm } from "./SignupPaymentForm";
import { StripeElementsProvider } from "./StripeElementsProvider";
import { BillingCycle, DisplayPlan } from "./types";

export function ChangePlanModal({
  currentPlanId,
  currentBillingCycle,
  hasPaymentMethod,
  onClose,
  onChanged,
}: {
  currentPlanId: string;
  currentBillingCycle: BillingCycle;
  /** True if a card is already on file — switches plan directly with no payment form. */
  hasPaymentMethod: boolean;
  onClose: () => void;
  onChanged: () => void;
}) {
  const [isYearly, setIsYearly] = useState(currentBillingCycle === "annual");
  const [switchingPlanId, setSwitchingPlanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pendingPayment, setPendingPayment] = useState<string | null>(null);
  const [pendingIntentKind, setPendingIntentKind] = useState<"payment" | "setup">("payment");

  const selectedCycle: BillingCycle = isYearly ? "annual" : "monthly";

  const displayPlans: DisplayPlan[] = pricingPlans.filter(
    (plan) => plan.id !== "trial",
  );

  const handleSwitchPlan = async (planId: string) => {
    setError(null);
    setSwitchingPlanId(planId);
    try {
      const tier = planId as "professional" | "advanced";

      if (hasPaymentMethod) {
        // Existing card on file — switch via the Subscription API. Usually
        // Stripe charges the saved card immediately with no form; only if
        // that charge can't complete silently (rare) do we fall back to
        // showing the payment form below.
        const result = await changeSubscriptionPlanAction(tier, selectedCycle);
        if (!result.ok || !result.data) {
          setError(result.error || "Failed to switch plan.");
          setSwitchingPlanId(null);
          return;
        }

        if (!result.data.requires_payment) {
          onChanged();
          onClose();
          return;
        }

        if (result.data.client_secret) {
          setPendingPayment(result.data.client_secret);
          setPendingIntentKind(result.data.intent_kind ?? "payment");
        } else {
          setError("Failed to switch plan.");
          setSwitchingPlanId(null);
        }
        return;
      }

      // No card on file yet — collect one with a custom Stripe Elements
      // form right here, no redirect to Stripe Checkout.
      const result = await createSubscriptionIntentAction(tier, selectedCycle);
      if (!result.ok || !result.data) {
        setError(result.error || "Failed to start signup.");
        setSwitchingPlanId(null);
        return;
      }

      if (!result.data.requires_payment) {
        // Free plan — nothing to charge, subscription is already active.
        onChanged();
        onClose();
        return;
      }

      if (result.data.client_secret) {
        setPendingPayment(result.data.client_secret);
        setPendingIntentKind(result.data.intent_kind ?? "payment");
      } else {
        setError("Failed to start signup.");
        setSwitchingPlanId(null);
      }
    } catch {
      setError("An unexpected error occurred.");
      setSwitchingPlanId(null);
    }
  };

  const handlePaymentSuccess = () => {
    setPendingPayment(null);
    onChanged();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-4xl rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">
            Change Plan
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <BiX size={20} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          {error && (
            <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {pendingPayment ? (
            <div className="mx-auto max-w-md">
              <p className="mb-4 text-sm text-gray-600">
                Enter your card details to complete the subscription.
              </p>
              <StripeElementsProvider clientSecret={pendingPayment}>
                <SignupPaymentForm
                  onSuccess={handlePaymentSuccess}
                  onBeforeConfirm={async (): Promise<BeforeConfirmResult> => ({
                    clientSecret: pendingPayment,
                    intentKind: pendingIntentKind,
                    requiresPayment: true,
                  })}
                  returnUrl={
                    typeof window !== "undefined"
                      ? window.location.href
                      : "/dashboard/settings"
                  }
                />
              </StripeElementsProvider>
            </div>
          ) : (
            <>
              <BillingCycleToggle isYearly={isYearly} onChange={setIsYearly} />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {displayPlans.map((plan) => {
                  const isContactOnly = !!plan.isCustomPricing;
                  const isCurrent = !isContactOnly && plan.id === currentPlanId;
                  const isExactMatch = isCurrent && selectedCycle === currentBillingCycle;

                  return (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      displayName={plan.name}
                      isCurrent={isCurrent}
                      isExactMatch={isExactMatch}
                      isContactOnly={isContactOnly}
                      isYearly={isYearly}
                      currentBillingCycle={currentBillingCycle}
                      switchingPlanId={switchingPlanId}
                      onSwitchPlan={handleSwitchPlan}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
