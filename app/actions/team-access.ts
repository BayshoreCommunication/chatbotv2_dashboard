"use server";

import { auth } from "@/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";

export type TeamMemberStatus = "pending" | "active" | "inactive" | "revoked";

export interface TeamMember {
  id: string;
  owner_id: string;
  name: string;
  email: string;
  status: TeamMemberStatus;
  created_at: string;
  updated_at: string;
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

// POST /api/v1/team-access — owner adds a member
export async function addTeamMemberAction(
  name: string,
  email: string
): Promise<ActionResponse<TeamMember>> {
  const token = await getToken();
  if (!token) return { ok: false, error: "Not authenticated." };

  try {
    const res = await fetch(`${API_URL}/api/v1/team-access`, {
      method: "POST",
      headers: authHeader(token),
      body: JSON.stringify({ name, email }),
    });
    if (!res.ok)
      return { ok: false, error: await parseError(res, "Failed to add team member.") };
    const data = (await res.json()) as TeamMember;
    return { ok: true, data };
  } catch {
    return { ok: false, error: "An unexpected error occurred." };
  }
}

// GET /api/v1/team-access — owner lists all members
export async function getTeamMembersAction(): Promise<ActionResponse<TeamMember[]>> {
  const token = await getToken();
  if (!token) return { ok: false, error: "Not authenticated." };

  try {
    const res = await fetch(`${API_URL}/api/v1/team-access`, {
      method: "GET",
      headers: authHeader(token),
      cache: "no-store",
    });
    if (!res.ok)
      return { ok: false, error: await parseError(res, "Failed to load team members.") };
    const data = (await res.json()) as TeamMember[];
    return { ok: true, data };
  } catch {
    return { ok: false, error: "An unexpected error occurred." };
  }
}

// PATCH /api/v1/team-access/{id}/toggle — block (inactive) or unblock (active)
export async function toggleTeamMemberAction(
  id: string,
  status: "active" | "inactive"
): Promise<ActionResponse> {
  const token = await getToken();
  if (!token) return { ok: false, error: "Not authenticated." };

  try {
    const res = await fetch(`${API_URL}/api/v1/team-access/${id}/toggle`, {
      method: "PATCH",
      headers: authHeader(token),
      body: JSON.stringify({ status }),
    });
    if (!res.ok)
      return { ok: false, error: await parseError(res, "Failed to update member status.") };
    return { ok: true };
  } catch {
    return { ok: false, error: "An unexpected error occurred." };
  }
}

// DELETE /api/v1/team-access/{id} — revoke access permanently
export async function revokeTeamMemberAction(id: string): Promise<ActionResponse> {
  const token = await getToken();
  if (!token) return { ok: false, error: "Not authenticated." };

  try {
    const res = await fetch(`${API_URL}/api/v1/team-access/${id}`, {
      method: "DELETE",
      headers: authHeader(token),
    });
    if (!res.ok)
      return { ok: false, error: await parseError(res, "Failed to revoke access.") };
    return { ok: true };
  } catch {
    return { ok: false, error: "An unexpected error occurred." };
  }
}

// POST /api/v1/team-access/verify — member clicks verify link (no auth)
export async function verifyTeamAccessAction(
  token: string
): Promise<ActionResponse<{ email: string; already_verified: boolean }>> {
  try {
    const res = await fetch(`${API_URL}/api/v1/team-access/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (!res.ok)
      return { ok: false, error: await parseError(res, "Failed to verify access.") };
    const data = (await res.json()) as { email: string; already_verified: boolean };
    return { ok: true, data };
  } catch {
    return { ok: false, error: "An unexpected error occurred." };
  }
}
