"use server";

import { auth } from "@/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";

// ── Types ─────────────────────────────────────────────────────────────────────

export type PaymentCard = {
  id: string;
  brand: string;
  last4: string;
  exp_month: number | null;
  exp_year: number | null;
  is_default: boolean;
};

export type Invoice = {
  id: string;
  created: number;
  amount_due: number;
  currency: string;
  status: "paid" | "due";
  invoice_pdf: string | null;
  hosted_invoice_url: string | null;
  /** Plan tier that was actually billed on this invoice (e.g. "professional", "advanced") — not the company's current tier. */
  tier: string | null;
};

type ActionResponse<T = unknown> = {
  ok: boolean;
  data?: T;
  error?: string;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

async function getSession() {
  const session = await auth();
  const token = (session?.user as any)?.accessToken as string | undefined;
  const companyId = (session?.user as any)?.id as string | undefined;
  return { session, token, companyId };
}

async function apiFetch<T>(
  path: string,
  options: RequestInit
): Promise<ActionResponse<T>> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      cache: "no-store",
    });
    const text = await res.text();
    let payload: unknown;
    try {
      payload = text ? JSON.parse(text) : {};
    } catch {
      payload = { message: text };
    }
    if (!res.ok) {
      const p = payload as Record<string, unknown>;
      const error =
        (typeof p.detail === "string" ? p.detail : "") ||
        (typeof p.message === "string" ? p.message : "") ||
        "Request failed.";
      return { ok: false, error };
    }
    return { ok: true, data: payload as T };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Network error.",
    };
  }
}

// ── Payment methods ───────────────────────────────────────────────────────────

/**
 * GET /api/v1/billing/payment-methods/{companyId}
 * Lists saved cards for the logged-in company, fetched live from Stripe.
 */
export async function getPaymentMethodsAction(): Promise<
  ActionResponse<{ cards: PaymentCard[] }>
> {
  const { token, companyId } = await getSession();
  if (!token || !companyId) return { ok: false, error: "You must be logged in." };

  return apiFetch<{ cards: PaymentCard[] }>(
    `/api/v1/billing/payment-methods/${companyId}`,
    { method: "GET", headers: { Authorization: `Bearer ${token}` } },
  );
}

/**
 * POST /api/v1/billing/payment-methods/{companyId}/default
 * Sets a card as the default payment method.
 */
export async function setDefaultPaymentMethodAction(
  paymentMethodId: string
): Promise<{ ok: boolean; error?: string }> {
  const { token, companyId } = await getSession();
  if (!token || !companyId) return { ok: false, error: "You must be logged in." };

  return apiFetch(`/api/v1/billing/payment-methods/${companyId}/default`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ payment_method_id: paymentMethodId }),
  });
}

/**
 * DELETE /api/v1/billing/payment-methods/{companyId}/{paymentMethodId}
 * Removes a saved card. Fails if it's the default — set another default first.
 */
export async function removePaymentMethodAction(
  paymentMethodId: string
): Promise<{ ok: boolean; error?: string }> {
  const { token, companyId } = await getSession();
  if (!token || !companyId) return { ok: false, error: "You must be logged in." };

  return apiFetch(
    `/api/v1/billing/payment-methods/${companyId}/${paymentMethodId}`,
    { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
  );
}

/**
 * POST /api/v1/billing/setup-intent/{companyId}
 * Starts a "add new card" flow — returns a SetupIntent client_secret for
 * Stripe Elements (PaymentElement) to collect the card directly in our UI.
 */
export async function createSetupIntentAction(): Promise<
  ActionResponse<{ client_secret: string }>
> {
  const { token, companyId } = await getSession();
  if (!token || !companyId) return { ok: false, error: "You must be logged in." };

  return apiFetch<{ client_secret: string }>(
    `/api/v1/billing/setup-intent/${companyId}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    },
  );
}

// ── Invoice history ───────────────────────────────────────────────────────────

/**
 * GET /api/v1/billing/invoices/{companyId}
 * Returns payment/invoice history, fetched live from Stripe.
 */
export async function getInvoicesAction(): Promise<
  ActionResponse<{ invoices: Invoice[] }>
> {
  const { token, companyId } = await getSession();
  if (!token || !companyId) return { ok: false, error: "You must be logged in." };

  return apiFetch<{ invoices: Invoice[] }>(
    `/api/v1/billing/invoices/${companyId}`,
    { method: "GET", headers: { Authorization: `Bearer ${token}` } },
  );
}
