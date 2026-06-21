"use client";

import {
  getInvoicesAction,
  getPaymentMethodsAction,
  removePaymentMethodAction,
  setDefaultPaymentMethodAction,
  PaymentCard as ApiPaymentCard,
  Invoice as ApiInvoice,
} from "@/app/actions/billing";
import {
  getSubscriptionAction,
  SubscriptionData,
} from "@/app/actions/subscriptions";
import { useCallback, useEffect, useState } from "react";
import {
  BiCalendar,
  BiCheckCircle,
  BiCreditCard,
  BiDownload,
  BiPlus,
  BiRefresh,
  BiWallet,
} from "react-icons/bi";
import { ChangePlanModal } from "./ChangePlanModal";
import { PaymentMethodsModal } from "./PaymentMethodsModal";
import { StatusBadge } from "./StatusBadge";
import { Invoice, PaymentCard } from "./types";

const TIER_DISPLAY_NAMES: Record<string, string> = {
  free: "Free",
  professional: "Professional",
  advanced: "Advanced",
  enterprise: "Enterprise",
};

function tierDisplayName(tier: string): string {
  return TIER_DISPLAY_NAMES[tier] ?? tier;
}

function formatUnixDate(unixSeconds: number | null | undefined): string {
  if (!unixSeconds) return "—";
  return new Date(unixSeconds * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatIsoDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function mapApiCardToUiCard(card: ApiPaymentCard): PaymentCard {
  const expiry =
    card.exp_month && card.exp_year
      ? `${String(card.exp_month).padStart(2, "0")}/${String(card.exp_year).slice(-2)}`
      : "—";
  return {
    id: card.id,
    brand: card.brand.toUpperCase(),
    last4: card.last4,
    expiry,
    isDefault: card.is_default,
  };
}

function mapApiInvoiceToUiInvoice(invoice: ApiInvoice, fallbackPlanName: string): Invoice {
  return {
    id: invoice.id,
    date: formatUnixDate(invoice.created),
    // Use the plan that was actually billed on this invoice, not the
    // company's current tier — otherwise switching plans relabels old,
    // already-paid invoices with the new plan name.
    plan: invoice.tier ? tierDisplayName(invoice.tier) : fallbackPlanName,
    amount: `$${invoice.amount_due.toFixed(2)}`,
    status: invoice.status,
    hostedInvoiceUrl: invoice.hosted_invoice_url,
    invoicePdf: invoice.invoice_pdf,
  };
}

const BillingDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [cards, setCards] = useState<PaymentCard[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [subRes, cardsRes, invoicesRes] = await Promise.all([
        getSubscriptionAction(),
        getPaymentMethodsAction(),
        getInvoicesAction(),
      ]);

      if (!subRes.ok || !subRes.data) {
        setError(subRes.error || "No subscription found for this account.");
        return;
      }
      setSubscription(subRes.data);

      const planName = tierDisplayName(subRes.data.subscription_tier);

      if (cardsRes.ok && cardsRes.data) {
        setCards(cardsRes.data.cards.map(mapApiCardToUiCard));
      }

      const history = invoicesRes.ok && invoicesRes.data
        ? invoicesRes.data.invoices.map((inv) => mapApiInvoiceToUiInvoice(inv, planName))
        : [];

      setInvoices(history);
    } catch {
      setError("Failed to load billing details.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const defaultCard = cards.find((c) => c.isDefault) ?? cards[0];

  const handleSetDefault = async (id: string) => {
    setCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })));
    const res = await setDefaultPaymentMethodAction(id);
    if (!res.ok) {
      void loadAll();
    }
  };

  const handleRemoveCard = async (id: string) => {
    const prevCards = cards;
    setCards((prev) => prev.filter((c) => c.id !== id));
    const res = await removePaymentMethodAction(id);
    if (!res.ok) {
      setCards(prevCards);
    }
  };

  const stats = subscription
    ? [
        {
          title: "Current Plan",
          value: tierDisplayName(subscription.subscription_tier),
          subtitle: `$${subscription.payment_amount.toFixed(2)} / ${subscription.billing_cycle === "annual" ? "year" : "month"}`,
          icon: <BiWallet size={20} />,
          color: "bg-blue-50",
          iconColor: "text-blue-600",
        },
        {
          title: "Status",
          value: subscription.is_active ? "Active" : subscription.subscription_status,
          subtitle: subscription.is_active
            ? "Subscription in good standing"
            : "Action may be needed",
          icon: <BiCheckCircle size={20} />,
          color: subscription.is_active ? "bg-green-50" : "bg-yellow-50",
          iconColor: subscription.is_active ? "text-green-600" : "text-yellow-600",
        },
        {
          title: "Billing Cycle",
          value: subscription.billing_cycle === "annual" ? "Yearly" : "Monthly",
          subtitle: subscription.cancel_at_period_end
            ? "Will not renew"
            : "Renews automatically",
          icon: <BiCalendar size={20} />,
          color: "bg-purple-50",
          iconColor: "text-purple-600",
        },
        {
          title: subscription.cancel_at_period_end ? "Access Ends" : "Next Renewal",
          value: formatIsoDate(subscription.current_period_end),
          subtitle: `$${subscription.payment_amount.toFixed(2)} ${subscription.cancel_at_period_end ? "(final charge)" : "will be charged"}`,
          icon: <BiCalendar size={20} />,
          color: "bg-orange-50",
          iconColor: "text-orange-600",
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex flex-col gap-6 bg-gray-50 min-h-screen">
        <div className="rounded border border-gray-200 bg-white p-6">
          <div className="h-6 w-48 animate-pulse rounded bg-gray-100" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded border border-gray-200 bg-white" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 bg-gray-50 min-h-screen p-6">
        <div className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
        <button
          onClick={() => void loadAll()}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white"
        >
          <BiRefresh size={16} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="rounded border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Billing & Subscription
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your plan, payment method, and invoice history
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => void loadAll()}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <BiRefresh size={18} />
              Refresh
            </button>
            <button
              onClick={() => setIsPlanModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <BiCreditCard size={18} />
              Manage Billing
            </button>
          </div>
        </div>
      </div>

      {isPlanModalOpen && subscription && (
        <ChangePlanModal
          currentPlanId={subscription.subscription_tier}
          currentBillingCycle={subscription.billing_cycle}
          hasPaymentMethod={cards.length > 0}
          onClose={() => setIsPlanModalOpen(false)}
          onChanged={() => void loadAll()}
        />
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded border border-gray-200 bg-white p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}
              >
                <span className={stat.iconColor}>{stat.icon}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-700">
                {stat.title}
              </h3>
            </div>
            <p className="mb-1 text-2xl font-bold text-gray-900">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Payment Method */}
      <div className="rounded border border-gray-200 bg-white overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BiCreditCard size={16} className="text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
              Payment Method
            </h2>
          </div>
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white"
          >
            <BiPlus size={16} />
            Add Card
          </button>
        </div>
        <div className="p-6">
          {defaultCard ? (
            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-14 items-center justify-center rounded-md bg-gray-900">
                  <span className="text-xs font-bold text-white">
                    {defaultCard.brand}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    •••• •••• •••• {defaultCard.last4}
                  </p>
                  <p className="text-xs text-gray-500">
                    Expires {defaultCard.expiry}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Update
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No payment method on file.</p>
          )}
        </div>
      </div>

      {isPaymentModalOpen && (
        <PaymentMethodsModal
          cards={cards}
          autoPayment={subscription?.cancel_at_period_end !== true}
          onClose={() => setIsPaymentModalOpen(false)}
          onSetDefault={handleSetDefault}
          onRemove={handleRemoveCard}
          onCardAdded={() => void loadAll()}
          onToggleAutoPayment={() => {}}
        />
      )}

      {/* Payment History */}
      <div className="rounded border border-gray-200 bg-white overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 flex items-center gap-2">
          <BiWallet size={16} className="text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
            Payment History
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                    No payment history yet.
                  </td>
                </tr>
              ) : (
                invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{invoice.date}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{invoice.plan}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {invoice.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {invoice.status === "due" ? (
                        <a
                          href={invoice.hostedInvoiceUrl ?? undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                        >
                          Pay Now
                        </a>
                      ) : invoice.invoicePdf ? (
                        <a
                          href={invoice.invoicePdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Download Invoice"
                          className="inline-block text-gray-500 hover:text-gray-700 transition-colors p-1"
                        >
                          <BiDownload size={18} />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
