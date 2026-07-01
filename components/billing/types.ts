export type InvoiceStatus = "paid" | "due";

export type InvoiceKind = "trial" | "first_charge" | "renewal" | "plan_change" | "manual";

export type Invoice = {
  id: string;
  date: string;
  plan: string;
  /** Raw dollar amount billed (e.g. 49.00) */
  amountDue: number;
  /** Formatted display string including currency symbol */
  amount: string;
  status: InvoiceStatus;
  /** Categorised event type derived from billing_reason + is_trial */
  kind: InvoiceKind;
  /** Human-readable billing period, e.g. "Jun 1 – Jun 30, 2025" */
  period: string | null;
  hostedInvoiceUrl?: string | null;
  invoicePdf?: string | null;
};

export type PaymentCard = {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
};

export type BillingCycle = "monthly" | "annual";

export type DisplayPlan = {
  id: string;
  name: string;
  description: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  features?: string[];
  isCustomPricing?: boolean;
};
