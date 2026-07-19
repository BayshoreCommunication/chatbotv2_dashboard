"use server";

import { auth } from "@/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";

export interface Lead {
  id: string;
  company_id: string;
  session_id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  is_contacted: boolean;
  // Set only once Calendly confirms a real booking (webhook-verified) — null
  // means no appointment, never a placeholder for "offered but unconfirmed".
  appointment_time: string | null;
  created_at: string;
}

export interface LeadsResponse {
  ok: boolean;
  data?: Lead[];
  error?: string;
}

async function getAuthToken() {
  const session = await auth();
  return (session?.user as any)?.accessToken;
}

export async function getLeadsAction(): Promise<LeadsResponse> {
  const token = await getAuthToken();
  if (!token) return { ok: false, error: "Not authenticated" };

  try {
    const response = await fetch(`${API_URL}/api/v1/leads/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { ok: false, error: errorData.detail || "Failed to fetch leads" };
    }

    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    console.error("Error in getLeadsAction:", error);
    return { ok: false, error: "Network error" };
  }
}

export async function searchLeadsAction(query: string): Promise<LeadsResponse> {
  const token = await getAuthToken();
  if (!token) return { ok: false, error: "Not authenticated" };
  if (!query.trim()) return { ok: true, data: [] };

  try {
    const response = await fetch(
      `${API_URL}/api/v1/leads/search?q=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { ok: false, error: errorData.detail || "Search failed" };
    }

    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    console.error("Error in searchLeadsAction:", error);
    return { ok: false, error: "Network error" };
  }
}

export async function setLeadContactedAction(
  leadId: string,
  isContacted: boolean,
): Promise<{ ok: boolean; data?: Lead; error?: string }> {
  const token = await getAuthToken();
  if (!token) return { ok: false, error: "Not authenticated" };

  try {
    const response = await fetch(`${API_URL}/api/v1/leads/${leadId}/contacted`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ is_contacted: isContacted }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { ok: false, error: errorData.detail || "Failed to update lead" };
    }

    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    console.error("Error in setLeadContactedAction:", error);
    return { ok: false, error: "Network error" };
  }
}

export async function deleteLeadAction(leadId: string): Promise<{ ok: boolean; error?: string }> {
  const token = await getAuthToken();
  if (!token) return { ok: false, error: "Not authenticated" };

  try {
    const response = await fetch(`${API_URL}/api/v1/leads/${leadId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { ok: false, error: errorData.detail || "Failed to delete lead" };
    }

    return { ok: true };
  } catch (error) {
    console.error("Error in deleteLeadAction:", error);
    return { ok: false, error: "Network error" };
  }
}
