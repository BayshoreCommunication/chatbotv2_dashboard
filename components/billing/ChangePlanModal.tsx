import {
  changeSubscriptionPlanAction,
  createSubscriptionIntentAction,
} from "@/app/actions/subscriptions";
import { pricingPlans } from "@/config/pricing";
import { useState } from "react";
import { BiX } from "react-icons/bi";
import toast from "react-hot-toast";
import { BillingCycleToggle } from "./BillingCycleToggle";
import { PlanCard } from "./PlanCard";
import { BeforeConfirmResult, SignupPaymentForm } from "./SignupPaymentForm";
import { StripeElementsProvider } from "./StripeElementsProvider";
import { BillingCycle, DisplayPlan } from "./types";

/** Price for a plan id at a given cycle, or null for custom-priced plans. */
function getPlanPrice(planId: string, cycle: BillingCycle): number | null {
  const plan = pricingPlans.find((p) => p.id === planId);
  if (!plan || plan.isCustomPricing) return null;
  return cycle === "annual" ? plan.yearlyPrice : plan.monthlyPrice;
}

export function ChangePlanModal({
  currentPlanId,
  currentBillingCycle,
  currentPeriodEnd,
  hasPaymentMethod,
  isInTrial = false,
  onClose,
  onChanged,
}: {
  currentPlanId: string;
  currentBillingCycle: BillingCycle;
  /** ISO date string — when a downgrade to a lower tier would take effect. */
  currentPeriodEnd?: string | null;
  /** True if a card is already on file — switches plan directly with no payment form. */
  hasPaymentMethod: boolean;
  /** True while the current subscription is still trialing — every plan
   *  switch during a trial ends it immediately and charges the target
   *  plan's FULL price (never a diff), regardless of up/down direction. */
  isInTrial?: boolean;
  onClose: () => void;
  onChanged: () => void;
}) {
  const [isYearly, setIsYearly] = useState(currentBillingCycle === "annual");
  const [switchingPlanId, setSwitchingPlanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pendingPayment, setPendingPayment] = useState<string | null>(null);
  const [pendingIntentKind, setPendingIntentKind] = useState<"payment" | "setup">("payment");
  // Shown in the payment form so the amount about to be charged is never a
  // surprise — computed the same way describeSilentSwitch works out what a
  // silent charge actually did.
  const [pendingPlanName, setPendingPlanName] = useState<string>("");
  const [pendingAmount, setPendingAmount] = useState<number | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ planName: string; amount: number | null } | null>(null);

  const selectedCycle: BillingCycle = isYearly ? "annual" : "monthly";

  const displayPlans: DisplayPlan[] = pricingPlans.filter(
    (plan) => plan.id !== "trial",
  );

  /** What a silent (requires_payment: false) plan switch actually did —
   *  used to show a clear confirmation instead of just closing the modal,
   *  since a saved card can get charged with zero other feedback otherwise. */
  const describeSilentSwitch = (tier: string) => {
    const planName = pricingPlans.find((p) => p.id === tier)?.name ?? tier;
    if (isInTrial) {
      return { planName, amount: getPlanPrice(tier, selectedCycle), scheduled: false };
    }
    const currentPrice = getPlanPrice(currentPlanId, currentBillingCycle);
    const targetPrice = getPlanPrice(tier, selectedCycle);
    if (currentPrice != null && targetPrice != null && targetPrice < currentPrice) {
      return { planName, amount: null, scheduled: true }; // downgrade — nothing charged now
    }
    const amount =
      currentPrice != null && targetPrice != null && targetPrice > currentPrice
        ? targetPrice - currentPrice // upgrade — flat top-up diff
        : targetPrice; // same price / edge case — full price
    return { planName, amount, scheduled: false };
  };

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
          const msg = result.error || "Failed to switch plan.";
          setError(msg);
          toast.error(msg);
          setSwitchingPlanId(null);
          return;
        }

        if (!result.data.requires_payment) {
          const { planName, amount, scheduled } = describeSilentSwitch(tier);
          onChanged();
          setSwitchingPlanId(null);
          setSuccessInfo({ planName, amount: scheduled ? null : amount });
          toast.success(
            scheduled
              ? `Switching to ${planName} at your next renewal.`
              : `You're now on ${planName}.`,
          );
          return;
        }

        if (result.data.client_secret) {
          // This path only ever ends up here for the upgrade branch (a full
          // price charge during trial or a downgrade never returns
          // requires_payment: true), so the diff/full-price split from
          // describeSilentSwitch doesn't apply — the amount due is always
          // whatever the confirm screen's own describeSilentSwitch(tier)
          // amount would be for an upgrade or trial-ending switch.
          const { planName, amount } = describeSilentSwitch(tier);
          setPendingPlanName(planName);
          setPendingAmount(amount);
          setPendingPayment(result.data.client_secret);
          setPendingIntentKind(result.data.intent_kind ?? "payment");
        } else {
          const msg = "Failed to switch plan.";
          setError(msg);
          toast.error(msg);
          setSwitchingPlanId(null);
        }
        return;
      }

      // No card on file yet — collect one with a custom Stripe Elements
      // form right here, no redirect to Stripe Checkout.
      const result = await createSubscriptionIntentAction(tier, selectedCycle);
      if (!result.ok || !result.data) {
        const msg = result.error || "Failed to start signup.";
        setError(msg);
        toast.error(msg);
        setSwitchingPlanId(null);
        return;
      }

      if (!result.data.requires_payment) {
        // Free plan — nothing to charge, subscription is already active.
        toast.success("Subscription updated successfully.");
        onChanged();
        onClose();
        return;
      }

      if (result.data.client_secret) {
        setPendingPlanName(pricingPlans.find((p) => p.id === tier)?.name ?? tier);
        // intent_kind "setup" means this is a genuine new trial (no charge
        // yet) — otherwise it's a real signup charge for the full price.
        setPendingAmount(
          result.data.intent_kind === "setup" ? 0 : getPlanPrice(tier, selectedCycle),
        );
        setPendingPayment(result.data.client_secret);
        setPendingIntentKind(result.data.intent_kind ?? "payment");
      } else {
        const msg = "Failed to start signup.";
        setError(msg);
        toast.error(msg);
        setSwitchingPlanId(null);
      }
    } catch {
      const msg = "An unexpected error occurred.";
      setError(msg);
      toast.error(msg);
      setSwitchingPlanId(null);
    }
  };

  const handlePaymentSuccess = () => {
    onChanged();
    setSuccessInfo({ planName: pendingPlanName, amount: pendingAmount });
    setPendingPayment(null);
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

          {successInfo ? (
            <div className="mx-auto max-w-md rounded-xl border border-green-200 bg-green-50 p-5 text-center">
              <p className="font-semibold text-green-800">
                You&apos;re now on {successInfo.planName}
              </p>
              <p className="mt-1 text-sm text-green-700">
                {successInfo.amount === null
                  ? "No charge today — this takes effect at your next renewal, no refund for the current period."
                  : successInfo.amount === 0
                    ? "$0.00 charged today."
                    : `$${successInfo.amount} charged to your card on file just now.`}
              </p>
              <button
                onClick={onClose}
                className="mt-4 rounded-lg bg-thunder-black px-4 py-2 text-sm font-semibold text-white hover:bg-thunder-black/90"
              >
                Done
              </button>
            </div>
          ) : pendingPayment ? (
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
                  isTrial={pendingIntentKind === "setup"}
                  planName={pendingPlanName}
                  price={pendingAmount ?? undefined}
                  billingCycle={selectedCycle}
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

                  // Direction compared the same way the backend decides it:
                  // the currently-billed price (at currentBillingCycle) vs.
                  // the target price at the cycle being selected here — not
                  // hasPaymentMethod-only "Switch & Pay" copy from before.
                  const currentPrice = getPlanPrice(currentPlanId, currentBillingCycle);
                  const targetPrice = getPlanPrice(plan.id, selectedCycle);
                  const direction: "upgrade" | "downgrade" | "same" =
                    isContactOnly || currentPrice == null || targetPrice == null
                      ? "same"
                      : targetPrice > currentPrice
                        ? "upgrade"
                        : targetPrice < currentPrice
                          ? "downgrade"
                          : "same";

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
                      direction={isCurrent ? "same" : direction}
                      priceDiff={
                        currentPrice != null && targetPrice != null
                          ? Math.abs(targetPrice - currentPrice)
                          : null
                      }
                      renewalDate={currentPeriodEnd ?? null}
                      isInTrial={isInTrial}
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
