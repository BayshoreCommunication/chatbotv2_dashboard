import { BiCheck } from "react-icons/bi";
import { BillingCycle, DisplayPlan } from "./types";

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
}) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <div
      className={`flex min-h-[460px] flex-col rounded-xl border p-5 ${
        isCurrent ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{displayName}</h3>
        {isCurrent && (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
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
        <p className="mt-2 text-xs font-medium text-blue-600">
          Currently on {currentBillingCycle === "annual" ? "yearly" : "monthly"} billing
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
          href="mailto:sales@bayshorecommunication.com?subject=Enterprise%20Plan%20Inquiry"
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
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isExactMatch
            ? "Current Plan"
            : switchingPlanId === plan.id
              ? "Processing…"
              : isCurrent
                ? `Switch to ${isYearly ? "Yearly" : "Monthly"}`
                : "Switch & Pay"}
        </button>
      )}
    </div>
  );
}
