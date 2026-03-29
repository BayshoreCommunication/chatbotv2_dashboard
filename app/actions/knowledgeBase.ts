"use server";

import { auth } from "@/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";

// ── Shared types ──────────────────────────────────────────────────────────────

export type ActionResponse<T = unknown> = {
  ok: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
};

type SessionWithToken = {
  user?: { accessToken?: string };
};

export type TrainStatus = {
  company_id: string;
  company_name: string;
  is_trained: boolean;
  quality_score: number;
  entries_stored: number;
  pages_crawled: number;
  categories: string[];
  last_updated: string | null;
  update_count: number;
  update_limit: number;
  vector_store_id: string | null;
  namespace: string | null;
};

export type TrainResult = {
  message: string;
  company_id: string;
  pages_crawled: number;
  search_results: number;
  entries_stored: number;
  quality_score: number;
  categories: string[];
  vector_store_id: string;
  namespace: string;
  last_updated: string;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") return fallback;
  const d = payload as Record<string, unknown>;
  return (
    (typeof d.detail === "string" ? d.detail : "") ||
    (typeof d.message === "string" ? d.message : "") ||
    (typeof d.error === "string" ? d.error : "") ||
    fallback
  );
}

async function apiCall<T>(
  url: string,
  options: RequestInit
): Promise<ActionResponse<T>> {
  try {
    const resp = await fetch(url, { ...options, cache: "no-store" });
    const text = await resp.text();
    let payload: unknown;
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { message: text };
    }
    if (!resp.ok) {
      return {
        ok: false,
        statusCode: resp.status,
        error: parseErrorMessage(payload, "Request failed."),
      };
    }
    return { ok: true, statusCode: resp.status, data: payload as T };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Network error.",
    };
  }
}

async function getToken(): Promise<string | undefined> {
  const session = (await auth()) as SessionWithToken | null;
  return session?.user?.accessToken;
}

// ── Actions ───────────────────────────────────────────────────────────────────

/**
 * POST /api/v1/knowledge/train/{companyId}
 * Crawls the website, extracts knowledge with LLM, stores in Pinecone.
 */
export async function trainKnowledgeBaseAction(
  companyId: string,
  websiteUrl: string,
  companyName: string,
  companyType: string
): Promise<ActionResponse<TrainResult>> {
  if (!companyId) return { ok: false, error: "Missing company ID." };
  if (!websiteUrl) return { ok: false, error: "Website URL is required." };

  const token = await getToken();

  // Training can take 60-120s — give it up to 10 minutes before giving up
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10 * 60 * 1000);

  try {
    return await apiCall<TrainResult>(
      `${API_URL}/api/v1/knowledge/train/${companyId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          website_url: websiteUrl,
          company_name: companyName,
          company_type: companyType,
        }),
        signal: controller.signal,
      }
    );
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { ok: false, error: "Training timed out. The website may be very large. Please try again." };
    }
    return { ok: false, error: err instanceof Error ? err.message : "Network error." };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * GET /api/v1/knowledge/status/{companyId}
 * Returns current training metadata from MongoDB.
 */
export async function getKnowledgeStatusAction(
  companyId: string
): Promise<ActionResponse<TrainStatus>> {
  if (!companyId) return { ok: false, error: "Missing company ID." };

  const token = await getToken();

  return apiCall<TrainStatus>(
    `${API_URL}/api/v1/knowledge/status/${companyId}`,
    {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
}
