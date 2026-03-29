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
