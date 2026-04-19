"use server";

import { auth } from "@/auth";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ThemeSettings {
  primary_color: string;
  font_family: string;
}

export interface BehaviorSettings {
  auto_open: boolean;
  open_delay: number;
  show_welcome_message: boolean;
}

export interface ContentSettings {
  welcome_message: string;
  welcome_video: string;
  welcome_video_autoplay: boolean;
  input_placeholder: string;
}

export interface LauncherSettings {
  position: string;
  icon_style: string;
  show_bubbles: boolean;
  brand_image_url: string;
}

export interface WidgetSettings {
  bot_name: string;
  theme: ThemeSettings;
  behavior: BehaviorSettings;
  content: ContentSettings;
  launcher: LauncherSettings;
}

export interface WidgetSettingsResponse {
  id?: string;
  company_id: string;
  bot_name: string;
  theme: ThemeSettings;
  behavior: BehaviorSettings;
  content: ContentSettings;
  launcher: LauncherSettings;
}

interface ActionResponse<T = unknown> {
  ok: boolean;
  data?: T | null;
  error?: string;
  statusCode?: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function getAuthContext() {
  const session = await auth();
  const token = (session?.user as { accessToken?: string } | undefined)?.accessToken;
  return {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com",
    token,
  };
}

function authHeader(token: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function parseError(response: Response, fallback: string): Promise<string> {
  try {
    const body = await response.json();
    if (typeof body?.detail === "string") return body.detail;
    if (typeof body?.message === "string") return body.message;
    if (typeof body?.error === "string") return body.error;
  } catch {
    // ignore parse failure
  }
  return fallback;
}

// ── Actions ───────────────────────────────────────────────────────────────────

export async function getWidgetSettingsAction(): Promise<ActionResponse<WidgetSettingsResponse>> {
  const { apiUrl, token } = await getAuthContext();
  if (!token) return { ok: false, error: "Not authenticated" };

  try {
    const response = await fetch(`${apiUrl}/api/v1/widget-settings`, {
      method: "GET",
      headers: authHeader(token),
      cache: "no-store",
    });

    // 404 means no settings saved yet — not an error, just show setup screen
    if (response.status === 404) {
      return { ok: false, statusCode: 404, data: null };
    }

    if (!response.ok) {
      return {
        ok: false,
        statusCode: response.status,
        error: await parseError(response, "Failed to fetch widget settings."),
      };
    }

    const data = (await response.json()) as WidgetSettingsResponse;
    return { ok: true, statusCode: response.status, data };
  } catch (error) {
    console.error("Error in getWidgetSettingsAction:", error);
    return { ok: false, error: "An unexpected error occurred. Please try again later." };
  }
}

export async function updateWidgetSettingsAction(
  settings: WidgetSettings
): Promise<ActionResponse<WidgetSettingsResponse>> {
  const { apiUrl, token } = await getAuthContext();
  if (!token) return { ok: false, error: "Not authenticated" };

  try {
    const response = await fetch(`${apiUrl}/api/v1/widget-settings`, {
      method: "PUT",
      headers: authHeader(token),
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      return {
        ok: false,
        statusCode: response.status,
        error: await parseError(response, "Failed to update widget settings."),
      };
    }

    const data = (await response.json()) as WidgetSettingsResponse;
    return { ok: true, statusCode: response.status, data };
  } catch (error) {
    console.error("Error in updateWidgetSettingsAction:", error);
    return { ok: false, error: "An unexpected error occurred. Please try again later." };
  }
}

export async function deleteWidgetSettingsAction(): Promise<ActionResponse<null>> {
  const { apiUrl, token } = await getAuthContext();
  if (!token) return { ok: false, error: "Not authenticated" };

  try {
    const response = await fetch(`${apiUrl}/api/v1/widget-settings`, {
      method: "DELETE",
      headers: authHeader(token),
    });

    if (!response.ok) {
      return {
        ok: false,
        statusCode: response.status,
        error: await parseError(response, "Failed to delete widget settings."),
      };
    }

    return { ok: true, statusCode: response.status, data: null };
  } catch (error) {
    console.error("Error in deleteWidgetSettingsAction:", error);
    return { ok: false, error: "An unexpected error occurred. Please try again later." };
  }
}
