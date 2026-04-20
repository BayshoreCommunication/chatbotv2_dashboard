"use server";

import { auth } from "@/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";

// ── Types ─────────────────────────────────────────────────────────────────────

type SubscriptionTier = "starter" | "professional" | "enterprise";
type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "unpaid"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "paused";
type BillingCycle = "monthly" | "annual";

export type SubscriptionData = {
  company_id: string;
  subscription_tier: SubscriptionTier;
  subscription_status: SubscriptionStatus;
  billing_cycle: BillingCycle;
  payment_amount: number;
  currency: string;
  cancel_at_period_end: boolean;
  current_period_start: string | null;
  current_period_end: string | null;
  trial_end: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
      payload = JSON.parse(text);
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

// ── Actions ───────────────────────────────────────────────────────────────────

/**
 * POST /api/v1/subscription/checkout/{companyId}
 * Returns a Stripe Checkout URL for the chosen plan.
 */
export async function createCheckoutSessionAction(
  tier: SubscriptionTier,
  billingCycle: BillingCycle,
  successUrl: string,
  cancelUrl: string
): Promise<ActionResponse<{ checkout_url: string }>> {
  const { token, companyId } = await getSession();
  if (!token || !companyId)
    return { ok: false, error: "You must be logged in to subscribe." };

  return apiFetch<{ checkout_url: string }>(
    `/api/v1/subscription/checkout/${companyId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tier,
        billing_cycle: billingCycle,
        success_url: successUrl,
        cancel_url: cancelUrl,
      }),
    }
  );
}

/**
 * POST /api/v1/subscription/portal/{companyId}
 * Returns a Stripe Billing Portal URL so the user can manage their plan.
 */
export async function createPortalSessionAction(
  returnUrl: string
): Promise<ActionResponse<{ portal_url: string }>> {
  const { token, companyId } = await getSession();
  if (!token || !companyId)
    return { ok: false, error: "You must be logged in." };

  return apiFetch<{ portal_url: string }>(
    `/api/v1/subscription/portal/${companyId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ return_url: returnUrl }),
    }
  );
}

/**
 * POST /api/v1/subscription/cancel/{companyId}
 * Cancels the subscription. Default: at period end (user keeps access).
 */
export async function cancelSubscriptionAction(
  immediately = false
): Promise<ActionResponse<{ ok: boolean; message: string }>> {
  const { token, companyId } = await getSession();
  if (!token || !companyId)
    return { ok: false, error: "You must be logged in." };

  return apiFetch<{ ok: boolean; message: string }>(
    `/api/v1/subscription/cancel/${companyId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ immediately }),
    }
  );
}

/**
 * GET /api/v1/subscription/{companyId}
 * Returns the current subscription status for the logged-in company.
 */
export async function getSubscriptionAction(): Promise<
  ActionResponse<SubscriptionData>
> {
  const { token, companyId } = await getSession();
  if (!token || !companyId)
    return { ok: false, error: "You must be logged in." };

  return apiFetch<SubscriptionData>(`/api/v1/subscription/${companyId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}
