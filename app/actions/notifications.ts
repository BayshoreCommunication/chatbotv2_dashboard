"use server";

import { auth } from "@/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";

export interface Notification {
  id: string;
  company_id: string;
  type: string;
  title: string;
  message: string;
  lead_id: string | null;
  is_read: boolean;
  created_at: string;
}

async function getAuthToken() {
  const session = await auth();
  return (session?.user as any)?.accessToken;
}

export async function getNotificationsAction(): Promise<{
  ok: boolean;
  data?: Notification[];
  error?: string;
}> {
  const token = await getAuthToken();
  if (!token) return { ok: false, error: "Not authenticated" };

  try {
    const response = await fetch(`${API_URL}/api/v1/notifications/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { ok: false, error: errorData.detail || "Failed to fetch notifications" };
    }

    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    console.error("Error in getNotificationsAction:", error);
    return { ok: false, error: "Network error" };
  }
}

export async function getUnreadNotificationCountAction(): Promise<{
  ok: boolean;
  count?: number;
  error?: string;
}> {
  const token = await getAuthToken();
  if (!token) return { ok: false, error: "Not authenticated" };

  try {
    const response = await fetch(`${API_URL}/api/v1/notifications/unread-count`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { ok: false, error: errorData.detail || "Failed to fetch unread count" };
    }

    const data = await response.json();
    return { ok: true, count: data.count };
  } catch (error) {
    console.error("Error in getUnreadNotificationCountAction:", error);
    return { ok: false, error: "Network error" };
  }
}

export async function markAllNotificationsReadAction(): Promise<{
  ok: boolean;
  error?: string;
}> {
  const token = await getAuthToken();
  if (!token) return { ok: false, error: "Not authenticated" };

  try {
    const response = await fetch(`${API_URL}/api/v1/notifications/read-all`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { ok: false, error: errorData.detail || "Failed to mark notifications read" };
    }

    return { ok: true };
  } catch (error) {
    console.error("Error in markAllNotificationsReadAction:", error);
    return { ok: false, error: "Network error" };
  }
}
