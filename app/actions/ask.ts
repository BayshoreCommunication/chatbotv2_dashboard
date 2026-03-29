"use server";

import { auth } from "@/auth";

// ── Types aligned to the backend ChatResponse schema ──────────────────────────

/** Shape returned by POST /chat/{company_id} */
type ChatApiResponse = {
  reply: string;
  session_id: string;
  company_id: string;
  tools_used: string[];
};

/** What askChatAction returns to the caller */
export type AskActionResponse = {
  ok: boolean;
  data?: ChatApiResponse;
  /** Human-readable error string (detail / message / error from API body) */
  error?: string;
  /** HTTP status code, present on both success and failure */
  statusCode?: number;
  /** True when the company was not found (HTTP 404) */
  companyNotFound?: boolean;
};

type SessionUser = {
  id?: string;
  accessToken?: string;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

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

function parsePayload(raw: string): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return { message: raw };
  }
}

// ── Main action ───────────────────────────────────────────────────────────────

export async function askChatAction(
  companyId: string,
  message: string,
  sessionId: string,
  userTimezone?: string
): Promise<AskActionResponse> {
  // ── Input guards ────────────────────────────────────────────────────────────
  if (!companyId.trim()) {
    return { ok: false, error: "Company ID is required." };
  }
  if (!message.trim()) {
    return { ok: false, error: "Message is required." };
  }
  if (!sessionId.trim()) {
    return { ok: false, error: "Session ID is required." };
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return { ok: false, error: "API URL is not configured." };
  }

  // ── Auth token (optional — public chatbot embeds may not have a session) ─────
  const session = await auth();
  const user = session?.user as SessionUser | undefined;

  // ── Call the backend ─────────────────────────────────────────────────────────
  try {
    const response = await fetch(
      `${apiUrl}/api/v1/chat/${companyId.trim()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(user?.accessToken
            ? { Authorization: `Bearer ${user.accessToken}` }
            : {}),
        },
        body: JSON.stringify({
          session_id: sessionId.trim(),
          message: message.trim(),
          user_timezone: userTimezone?.trim() || undefined,
        }),
        cache: "no-store",
      }
    );

    const raw = await response.text();
    const payload = parsePayload(raw);

    // ── 404 — company not found (new backend check) ───────────────────────────
    if (response.status === 404) {
      return {
        ok: false,
        statusCode: 404,
        companyNotFound: true,
        error: parseError(payload, "Company not found."),
      };
    }

    // ── 400 — empty message (backend guard) ────────────────────────────────────
    if (response.status === 400) {
      return {
        ok: false,
        statusCode: 400,
        error: parseError(payload, "Invalid request."),
      };
    }

    // ── Other errors ───────────────────────────────────────────────────────────
    if (!response.ok) {
      return {
        ok: false,
        statusCode: response.status,
        error: parseError(payload, "Failed to get a chatbot response."),
      };
    }

    // ── Success ────────────────────────────────────────────────────────────────
    return {
      ok: true,
      statusCode: response.status,
      data: payload as ChatApiResponse,
    };
  } catch (error: unknown) {
    // Network / fetch failure
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error while contacting the chatbot.",
    };
  }
}
