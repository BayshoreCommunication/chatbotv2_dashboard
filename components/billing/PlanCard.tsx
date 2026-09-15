import { BiCheck } from "react-icons/bi";
import { BillingCycle, DisplayPlan } from "./types";

function formatShortDate(iso: string | null | undefined): string {
  if (!iso) return "your next billing date";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "your next billing date";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function PlanCard({
  plan,
  displayName,
  isCurrent,
  isExactMatch,
  isContactOnly,
  isYearly,
  currentBillingCycle,
  switchingPlanId,
  onSwitchPlan,
  direction = "same",
  priceDiff = null,
  renewalDate = null,
  isInTrial = false,
}: {
  plan: DisplayPlan;
  displayName: string;
  isCurrent: boolean;
  isExactMatch: boolean;
  isContactOnly: boolean;
  isYearly: boolean;
  currentBillingCycle: BillingCycle;
  switchingPlanId: string | null;
  onSwitchPlan: (planId: string) => void;
  /** How this plan's price compares to the currently-billed plan. */
  direction?: "upgrade" | "downgrade" | "same";
  /** Absolute dollar difference vs. the current plan, for display only —
   *  the real charge is always computed server-side from live Stripe prices. */
  priceDiff?: number | null;
  /** Current period's end date, shown for downgrade's "takes effect on" copy. */
  renewalDate?: string | null;
  /** True while the CURRENT subscription is still in its free trial —
   *  switching plans then ends the trial immediately and charges this
   *  plan's FULL price (never a diff, since nothing's been paid yet), no
   *  matter whether the target plan costs more or less than the current one. */
  isInTrial?: boolean;
}) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <div
      className={`flex min-h-[460px] flex-col rounded-xl border p-5 ${
        isCurrent ? "border-primary/30 bg-primary/10" : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{displayName}</h3>
        {isCurrent && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary-dark">
            <BiCheck size={12} /> Current
          </span>
        )}
      </div>

      {isContactOnly ? (
        <p className="mt-2 text-2xl font-bold text-gray-900">Custom</p>
      ) : (
        <p className="mt-2 text-2xl font-bold text-gray-900">
          ${price}
          <span className="text-sm font-normal text-gray-500">
            /{isYearly ? "yr" : "mo"}
          </span>
        </p>
      )}

      <p className="mt-1 text-xs text-gray-500">{plan.description}</p>

      {isCurrent && !isExactMatch && (
        <p className="mt-2 text-xs font-medium text-primary-dark">
          Currently on {currentBillingCycle === "annual" ? "yearly" : "monthly"} billing
        </p>
      )}

      {!isCurrent && !isContactOnly && isInTrial && (
        <p className="mt-2 text-xs font-medium text-amber-600">
          Ends your free trial immediately — charged the full ${price} now,
          not a difference.
        </p>
      )}
      {!isCurrent && !isContactOnly && !isInTrial && direction === "upgrade" && (
        <p className="mt-2 text-xs text-gray-500">
          Charged{priceDiff != null ? ` $${priceDiff}` : ""} immediately — your
          renewal date doesn&apos;t change.
        </p>
      )}
      {!isCurrent && !isContactOnly && !isInTrial && direction === "downgrade" && (
        <p className="mt-2 text-xs text-gray-500">
          Takes effect on {formatShortDate(renewalDate)}. No refund for the
          current period.
        </p>
      )}

      {plan.features && plan.features.length > 0 && (
        <ul className="mt-4 flex-1 space-y-2 border-t border-gray-100 pt-4">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-xs text-gray-600"
            >
              <BiCheck size={14} className="mt-0.5 flex-shrink-0 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {isContactOnly ? (
        <a
          href="mailto:sales@goconverto.com?subject=Enterprise%20Plan%20Inquiry"
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Contact Us
        </a>
      ) : (
        <button
          onClick={() => onSwitchPlan(plan.id)}
          disabled={isExactMatch || switchingPlanId !== null}
          className={`mt-4 rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
            isExactMatch
              ? "bg-gray-100 text-gray-400"
              : "bg-thunder-black text-white hover:bg-thunder-black/90"
          }`}
        >
          {isExactMatch
            ? "Current Plan"
            : switchingPlanId === plan.id
              ? "Processing…"
              : isCurrent
                ? `Switch to ${isYearly ? "Yearly" : "Monthly"}`
                : isInTrial
                  ? `End Trial & Pay $${price} Now`
                  : direction === "upgrade"
                    ? `Upgrade & Pay${priceDiff != null ? ` $${priceDiff}` : ""} Now`
                    : direction === "downgrade"
                      ? "Switch at Renewal"
                      : "Switch & Pay"}
        </button>
      )}
    </div>
  );
}
