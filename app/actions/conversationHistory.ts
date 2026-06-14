"use server";

import { auth } from "@/auth";
import type {
  ConversationHistoryActionResult,
  ConversationHistoryResponse,
} from "@/types/conversation-history";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";

type SessionWithToken = {
  user?: {
    accessToken?: string;
  };
};

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

export async function getConversationHistoryAction(
  companyId: string,
  limit = 50,
  offset = 0
): Promise<ConversationHistoryActionResult> {
  if (!companyId.trim()) {
    return { ok: false, error: "Company ID is required." };
  }

  const session = (await auth()) as SessionWithToken | null;
  const token = session?.user?.accessToken;

  const url = new URL(`${API_URL}/api/v1/chat/${companyId.trim()}/history`);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    const raw = await response.text();
    const payload = parsePayload(raw);

    if (!response.ok) {
      return {
        ok: false,
        statusCode: response.status,
        error: parseError(payload, "Failed to load conversation history."),
      };
    }

    return {
      ok: true,
      statusCode: response.status,
      data: payload as ConversationHistoryResponse,
    };
  } catch (error: unknown) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error while loading conversation history.",
    };
  }
}

export type SimpleActionResult = {
  ok: boolean;
  error?: string;
  statusCode?: number;
  timestamp?: string;
};

export async function toggleTakeoverAction(
  companyId: string,
  sessionId: string,
  active: boolean
): Promise<SimpleActionResult> {
  const session = (await auth()) as SessionWithToken | null;
  const token = session?.user?.accessToken;

  try {
    const response = await fetch(
      `${API_URL}/api/v1/chat/${companyId.trim()}/${sessionId}/takeover`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ active }),
        cache: "no-store",
      }
    );

    const raw = await response.text();
    const payload = parsePayload(raw);

    if (!response.ok) {
      return {
        ok: false,
        statusCode: response.status,
        error: parseError(payload, "Failed to toggle takeover."),
      };
    }

    return { ok: true, statusCode: response.status };
  } catch (error: unknown) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error while toggling takeover.",
    };
  }
}

export async function sendOwnerReplyAction(
  companyId: string,
  sessionId: string,
  content: string
): Promise<SimpleActionResult> {
  const session = (await auth()) as SessionWithToken | null;
  const token = session?.user?.accessToken;

  try {
    const response = await fetch(
      `${API_URL}/api/v1/chat/${companyId.trim()}/${sessionId}/owner-reply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ content }),
        cache: "no-store",
      }
    );

    const raw = await response.text();
    const payload = parsePayload(raw);

    if (!response.ok) {
      return {
        ok: false,
        statusCode: response.status,
        error: parseError(payload, "Failed to send reply."),
      };
    }

    const data = payload as { timestamp?: string };
    return { ok: true, statusCode: response.status, timestamp: data.timestamp };
  } catch (error: unknown) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error while sending reply.",
    };
  }
}
