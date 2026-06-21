export type InvoiceStatus = "paid" | "due";

export type Invoice = {
  id: string;
  date: string;
  plan: string;
  amount: string;
  status: InvoiceStatus;
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
