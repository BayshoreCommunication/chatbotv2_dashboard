"use server";

import { auth } from "@/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";

// ── Types ─────────────────────────────────────────────────────────────────────

export type DashboardSummary = {
  total_sessions: number;
  total_messages: number;
  total_leads: number;
  total_train_runs: number;
  entries_stored: number;
  pages_crawled: number;
  kb_score: number;
  last_trained: string | null;
  deltas: {
    sessions_pct: number;
    leads_pct: number;
  };
};

export type ChartBucket = {
  label: string;
  sessions: number;
  messages: number;
  leads: number;
  visitors: number;
};

export type VisitorStats = {
  total_visitors: number;
  new_visitors_30d: number;
  returning_visitors: number;
};

export type RecentSession = {
  session_id: string;
  lead_name: string | null;
  lead_captured: boolean;
  exchange_count: number;
  last_message: string;
  updated_at: string | null;
};

type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; statusCode?: number };

// ── Shared helpers ────────────────────────────────────────────────────────────

type SessionWithToken = { user?: { accessToken?: string } };

async function getToken(): Promise<string | undefined> {
  const session = (await auth()) as SessionWithToken | null;
  return session?.user?.accessToken;
}

function parseError(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") return fallback;
  const obj = payload as Record<string, unknown>;
  return (
    (typeof obj.detail === "string" ? obj.detail : "") ||
    (typeof obj.message === "string" ? obj.message : "") ||
    (typeof obj.error === "string" ? obj.error : "") ||
    fallback
  );
}

async function apiFetch<T>(
  path: string,
  params?: Record<string, string | number>,
): Promise<ActionResult<T>> {
  const token = await getToken();
  const url = new URL(`${API_URL}${path}`);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, String(v));
    }
  }

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: "no-store",
    });

    const text = await res.text();
    let payload: unknown = null;
    try { payload = JSON.parse(text); } catch { payload = { message: text }; }

    if (!res.ok) {
      return { ok: false, statusCode: res.status, error: parseError(payload, "Request failed.") };
    }
    return { ok: true, data: payload as T };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unexpected error." };
  }
}

// ── Actions ───────────────────────────────────────────────────────────────────

export async function getDashboardSummaryAction(
  companyId: string,
): Promise<ActionResult<DashboardSummary>> {
  return apiFetch(`/api/v1/dashboard/${companyId}/summary`);
}

export async function getDashboardChartAction(
  companyId: string,
  granularity: "weekly" | "monthly" = "monthly",
  periods = 12,
  yearOffset = 0,
): Promise<ActionResult<ChartBucket[]>> {
  return apiFetch(`/api/v1/dashboard/${companyId}/chart`, { granularity, periods, year_offset: yearOffset });
}

export async function getDashboardVisitorsAction(
  companyId: string,
): Promise<ActionResult<VisitorStats>> {
  return apiFetch(`/api/v1/dashboard/${companyId}/visitors`);
}

export async function getDashboardRecentSessionsAction(
  companyId: string,
  limit = 5,
): Promise<ActionResult<RecentSession[]>> {
  return apiFetch(`/api/v1/dashboard/${companyId}/recent-sessions`, { limit });
}
