"use server";

import { auth } from "@/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";

export type InviteStatus = "pending" | "active" | "revoked";

export interface Invite {
  id: string;
  owner_id: string;
  invitee_email: string;
  invitee_name: string;
  token: string;
  status: InviteStatus;
  created_at: string;
}

interface ActionResponse<T = null> {
  ok: boolean;
  data?: T;
  error?: string;
}

async function getToken(): Promise<string | null> {
  const session = await auth();
  return (
    (session?.user as { accessToken?: string } | undefined)?.accessToken ?? null
  );
}

function authHeader(token: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function parseError(res: Response, fallback: string): Promise<string> {
  try {
    const body = await res.json();
    if (typeof body?.detail === "string") return body.detail;
    if (typeof body?.message === "string") return body.message;
    if (typeof body?.error === "string") return body.error;
  } catch {
    // ignore
  }
  return fallback;
}

export async function sendInviteAction(
  name: string,
  email: string
): Promise<ActionResponse<Invite>> {
  const token = await getToken();
  if (!token) return { ok: false, error: "Not authenticated." };

  try {
    const res = await fetch(`${API_URL}/api/v1/invites`, {
      method: "POST",
      headers: authHeader(token),
      body: JSON.stringify({ name, email }),
    });
    if (!res.ok)
      return { ok: false, error: await parseError(res, "Failed to send invite.") };
    const data = (await res.json()) as Invite;
    return { ok: true, data };
  } catch {
    return { ok: false, error: "An unexpected error occurred." };
  }
}

export async function getInvitesAction(): Promise<ActionResponse<Invite[]>> {
  const token = await getToken();
  if (!token) return { ok: false, error: "Not authenticated." };

  try {
    const res = await fetch(`${API_URL}/api/v1/invites`, {
      method: "GET",
      headers: authHeader(token),
      cache: "no-store",
    });
    if (!res.ok)
      return { ok: false, error: await parseError(res, "Failed to load invites.") };
    const data = (await res.json()) as Invite[];
    return { ok: true, data };
  } catch {
    return { ok: false, error: "An unexpected error occurred." };
  }
}

export async function revokeInviteAction(
  id: string
): Promise<ActionResponse> {
  const token = await getToken();
  if (!token) return { ok: false, error: "Not authenticated." };

  try {
    const res = await fetch(`${API_URL}/api/v1/invites/${id}`, {
      method: "DELETE",
      headers: authHeader(token),
    });
    if (!res.ok)
      return { ok: false, error: await parseError(res, "Failed to revoke invite.") };
    return { ok: true };
  } catch {
    return { ok: false, error: "An unexpected error occurred." };
  }
}

// Called from the accept-invite page — no auth required
export async function acceptInviteAction(
  token: string
): Promise<ActionResponse<{ email: string; company_name: string }>> {
  try {
    const res = await fetch(`${API_URL}/api/v1/invites/accept`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (!res.ok)
      return { ok: false, error: await parseError(res, "Failed to accept invite.") };
    const data = (await res.json()) as { email: string; company_name: string };
    return { ok: true, data };
  } catch {
    return { ok: false, error: "An unexpected error occurred." };
  }
}
