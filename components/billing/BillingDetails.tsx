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
  BiGift,
  BiPlus,
  BiRefresh,
  BiRotateLeft,
  BiTransfer,
  BiWallet,
} from "react-icons/bi";
import { BsFileEarmarkText, BsLightningCharge } from "react-icons/bs";
import { ChangePlanModal } from "./ChangePlanModal";
import { PaymentMethodsModal } from "./PaymentMethodsModal";
import { StatusBadge } from "./StatusBadge";
import { Invoice, InvoiceKind, PaymentCard } from "./types";

// ── Helpers ───────────────────────────────────────────────────────────────────

const TIER_DISPLAY_NAMES: Record<string, string> = {
  free: "Free",
  professional: "Professional",
  advanced: "Advanced",
  enterprise: "Enterprise",
};

function tierDisplayName(tier: string): string {
  return TIER_DISPLAY_NAMES[tier] ?? tier;
}

function formatUnixDate(
  unix: number | null | undefined,
  opts?: Intl.DateTimeFormatOptions
): string {
  if (!unix) return "—";
  return new Date(unix * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...opts,
  });
}

function formatIsoDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function billingPeriod(start: number | null, end: number | null): string | null {
  if (!start || !end) return null;
  const fmt = (ts: number) =>
    new Date(ts * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  return `${fmt(start)} – ${fmt(end)}`;
}

function invoiceKind(inv: ApiInvoice): InvoiceKind {
  if (inv.is_trial) return "trial";
  const r = inv.billing_reason ?? "";
  if (r === "subscription_create") return "first_charge";
  if (r === "subscription_update") return "plan_change";
  if (r === "subscription_cycle") return "renewal";
  return "manual";
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

function mapApiInvoiceToUiInvoice(inv: ApiInvoice, fallbackPlanName: string): Invoice {
  const kind = invoiceKind(inv);
  return {
    id: inv.id,
    date: formatUnixDate(inv.created),
    plan: inv.tier ? tierDisplayName(inv.tier) : fallbackPlanName,
    amountDue: inv.amount_due,
    amount:
      kind === "trial"
        ? "$0.00"
        : `$${inv.amount_due.toFixed(2)}`,
    status: inv.status,
    kind,
    period: billingPeriod(inv.period_start, inv.period_end),
    hostedInvoiceUrl: inv.hosted_invoice_url,
    invoicePdf: inv.invoice_pdf,
  };
}

// ── Invoice kind meta ─────────────────────────────────────────────────────────

const KIND_META: Record<
  InvoiceKind,
  { label: string; icon: React.ReactNode; colors: string }
> = {
  trial: {
    label: "Free Trial Started",
    icon: <BiGift size={18} />,
    colors: "bg-purple-50 text-purple-600 border-purple-200",
  },
  first_charge: {
    label: "Subscription Started",
    icon: <BsLightningCharge size={16} />,
    colors: "bg-primary/10 text-primary-dark border-primary/20",
  },
  renewal: {
    label: "Renewal",
    icon: <BiRotateLeft size={18} />,
    colors: "bg-green-50 text-green-600 border-green-200",
  },
  plan_change: {
    label: "Plan Changed",
    icon: <BiTransfer size={18} />,
    colors: "bg-orange-50 text-orange-600 border-orange-200",
  },
  manual: {
    label: "Invoice",
    icon: <BsFileEarmarkText size={16} />,
    colors: "bg-gray-50 text-gray-600 border-gray-200",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

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

      const history =
        invoicesRes.ok && invoicesRes.data
          ? invoicesRes.data.invoices.map((inv) =>
              mapApiInvoiceToUiInvoice(inv, planName)
            )
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
    if (!res.ok) void loadAll();
  };

  const handleRemoveCard = async (id: string) => {
    const prevCards = cards;
    setCards((prev) => prev.filter((c) => c.id !== id));
    const res = await removePaymentMethodAction(id);
    if (!res.ok) setCards(prevCards);
  };

  // Summary stats
  const totalPaid = invoices
    .filter((inv) => inv.status === "paid" && inv.kind !== "trial")
    .reduce((sum, inv) => sum + inv.amountDue, 0);

  const stats = subscription
    ? [
        {
          title: "Current Plan",
          value: tierDisplayName(subscription.subscription_tier),
          subtitle: `$${subscription.payment_amount.toFixed(2)} / ${
            subscription.billing_cycle === "annual" ? "year" : "month"
          }`,
          icon: <BiWallet size={20} />,
          bg: "bg-primary/10 dark:bg-primary/20",
          iconColor: "text-primary-dark dark:text-primary",
        },
        {
          title: "Status",
          value: subscription.is_in_trial
            ? "Free Trial"
            : subscription.is_active
              ? "Active"
              : subscription.subscription_status,
          subtitle: subscription.is_in_trial
            ? `Ends ${formatIsoDate(subscription.trial_end)}`
            : subscription.is_active
              ? "Subscription in good standing"
              : "Action may be needed",
          icon: <BiCheckCircle size={20} />,
          bg: subscription.is_in_trial
            ? "bg-purple-50 dark:bg-purple-950"
            : subscription.is_active
              ? "bg-green-50 dark:bg-green-950"
              : "bg-yellow-50 dark:bg-yellow-950",
          iconColor: subscription.is_in_trial
            ? "text-purple-600 dark:text-purple-400"
            : subscription.is_active
              ? "text-green-600 dark:text-green-400"
              : "text-yellow-600 dark:text-yellow-400",
        },
        {
          title: "Billing Cycle",
          value:
            subscription.billing_cycle === "annual" ? "Yearly" : "Monthly",
          subtitle: subscription.cancel_at_period_end
            ? "Will not renew"
            : "Renews automatically",
          icon: <BiCalendar size={20} />,
          bg: "bg-indigo-50 dark:bg-indigo-950",
          iconColor: "text-indigo-600 dark:text-indigo-400",
        },
        {
          title: "Total Paid",
          value: `$${totalPaid.toFixed(2)}`,
          subtitle:
            invoices.length === 0
              ? "No payment history yet"
              : `Across ${invoices.filter((i) => i.kind !== "trial").length} invoice(s)`,
          icon: <BiCreditCard size={20} />,
          bg: "bg-emerald-50 dark:bg-emerald-950",
          iconColor: "text-emerald-600 dark:text-emerald-400",
        },
      ]
    : [];

  // ── Loading skeleton ──────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="h-20 animate-pulse rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
            />
          ))}
        </div>
        <div className="h-40 animate-pulse rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900" />
        <div className="h-64 animate-pulse rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900" />
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────

  if (error) {
    return (
      <div className="flex flex-col gap-4 p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
        <button
          onClick={() => void loadAll()}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <BiRefresh size={16} />
          Retry
        </button>
      </div>
    );
  }

  // ── Main view ─────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-6">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Billing &amp; Subscription
          </h1>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            Manage your plan, payment method, and invoice history
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => void loadAll()}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <BiRefresh size={16} />
            Refresh
          </button>
          <button
            onClick={() => setIsPlanModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-thunder-black px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-thunder-black/90"
          >
            <BiCreditCard size={16} />
            Manage Billing
          </button>
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

      {/* ── Stat cards ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.bg}`}
              >
                <span className={stat.iconColor}>{stat.icon}</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {stat.title}
              </p>
            </div>
            <p className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              {stat.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* ── Trial banner ───────────────────────────────────────────────── */}
      {subscription?.is_in_trial && (
        <div className="flex items-start gap-3 rounded-xl border border-purple-200 bg-purple-50 px-5 py-4 dark:border-purple-900 dark:bg-purple-950">
          <BiGift
            size={20}
            className="mt-0.5 shrink-0 text-purple-600 dark:text-purple-400"
          />
          <div className="min-w-0">
            <p className="font-semibold text-purple-800 dark:text-purple-200">
              You&apos;re on a free trial
            </p>
            <p className="mt-0.5 text-sm text-purple-700 dark:text-purple-300">
              Your trial ends on{" "}
              <strong>{formatIsoDate(subscription.trial_end)}</strong>. Your
              saved card will be charged automatically when it ends — cancel any
              time before then at no cost.
            </p>
          </div>
        </div>
      )}

      {/* ── Payment method ─────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-3 dark:border-gray-800 dark:bg-gray-900/60">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <BiCreditCard size={15} className="text-gray-400" />
            Payment Method
          </div>
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-white dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <BiPlus size={14} />
            Add Card
          </button>
        </div>
        <div className="p-5">
          {defaultCard ? (
            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-14 items-center justify-center rounded-md bg-gray-900 dark:bg-gray-700">
                  <span className="text-[11px] font-bold text-white">
                    {defaultCard.brand}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    •••• •••• •••• {defaultCard.last4}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Expires {defaultCard.expiry}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="text-sm font-medium text-primary-dark hover:text-primary dark:text-primary"
              >
                Update
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No payment method on file.
            </p>
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

      {/* ── Payment history ────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-5 py-3 dark:border-gray-800 dark:bg-gray-900/60">
          <BiWallet size={15} className="text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Payment History
          </h2>
          {invoices.length > 0 && (
            <span className="ml-auto rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {invoices.length}
            </span>
          )}
        </div>

        {invoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <BsFileEarmarkText
                size={22}
                className="text-gray-400 dark:text-gray-500"
              />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              No payment history yet
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Invoices will appear here once your subscription is billed.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {invoices.map((invoice, idx) => {
              const meta = KIND_META[invoice.kind];
              const isFree = invoice.kind === "trial";

              return (
                <li
                  key={invoice.id}
                  className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-gray-50/60 dark:hover:bg-gray-800/40"
                >
                  {/* Timeline indicator */}
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${meta.colors}`}
                    >
                      {meta.icon}
                    </div>
                    {idx < invoices.length - 1 && (
                      <div className="mt-1 w-px flex-1 bg-gray-200 dark:bg-gray-700" style={{ minHeight: 24 }} />
                    )}
                  </div>

                  {/* Body */}
                  <div className="min-w-0 flex-1 pt-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {meta.label}
                      </span>
                      {/* Plan badge */}
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                        {invoice.plan}
                      </span>
                      {/* Status badge */}
                      <StatusBadge status={invoice.status} />
                      {/* Trial label */}
                      {isFree && (
                        <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                          Card saved · No charge
                        </span>
                      )}
                    </div>

                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {invoice.period
                        ? `${invoice.date} · ${invoice.period}`
                        : invoice.date}
                    </p>
                  </div>

                  {/* Right: amount + download */}
                  <div className="flex shrink-0 flex-col items-end gap-1.5 pt-1">
                    <span
                      className={`text-lg font-bold ${
                        isFree
                          ? "text-purple-600 dark:text-purple-400"
                          : invoice.status === "paid"
                            ? "text-gray-900 dark:text-white"
                            : "text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {invoice.amount}
                    </span>

                    {invoice.status === "due" && invoice.hostedInvoiceUrl ? (
                      <a
                        href={invoice.hostedInvoiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-thunder-black px-3 py-1 text-[11px] font-semibold text-white hover:bg-thunder-black/90"
                      >
                        Pay Now
                      </a>
                    ) : invoice.invoicePdf ? (
                      <a
                        href={invoice.invoicePdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Download PDF"
                        className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-[11px] font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <BiDownload size={13} />
                        PDF
                      </a>
                    ) : (
                      <span className="text-[11px] text-gray-300 dark:text-gray-600">
                        —
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BillingDetails;
