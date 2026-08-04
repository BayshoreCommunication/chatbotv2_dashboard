"use server";

import { auth } from "@/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";

export interface CalendlySettings {
  calendly_url: string;
  calendly_access_token: string;
  event_type_uri: string;
  auto_embed: boolean;
}

export interface CalendlyEvent {
  uri: string;
  name: string;
  duration: number;
  status: string;
  booking_url: string;
}

export interface CalendlySlot {
  start_time: string;
  scheduling_url: string;
}

export interface CalendlyStats {
  total_events: number;
  active_events: number;
  upcoming_bookings: number;
}

export interface CalendlySnapshot {
  settings: CalendlySettings;
  token_configured: boolean;
  connected: boolean;
  events: CalendlyEvent[];
  stats: CalendlyStats;
  slots: CalendlySlot[];
  error?: string | null;
}

type ActionSuccess<T> = { ok: true; data: T };
type ActionError = { ok: false; error: string; status?: number };
type ActionResult<T> = ActionSuccess<T> | ActionError;

function getErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") return fallback;

  const value = payload as {
    detail?: unknown;
    error?: unknown;
    message?: unknown;
  };

  if (typeof value.detail === "string" && value.detail.trim())
    return value.detail;
  if (Array.isArray(value.detail) && value.detail.length > 0) {
    const first = value.detail[0] as { msg?: unknown } | undefined;
    if (first && typeof first.msg === "string" && first.msg.trim())
      return first.msg;
  }
  if (typeof value.error === "string" && value.error.trim()) return value.error;
  if (typeof value.message === "string" && value.message.trim())
    return value.message;

  return fallback;
}

async function buildAuthHeaders(): Promise<
  { ok: true; headers: HeadersInit } | ActionError
> {
  const session = await auth();
  const accessToken = (session?.user as { accessToken?: string } | undefined)
    ?.accessToken;

  if (!accessToken) {
    return { ok: false, error: "Not authenticated", status: 401 };
  }

  if (!API_URL) {
    return { ok: false, error: "API URL is not configured", status: 500 };
  }

  return {
    ok: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
}

async function apiRequest<T>(
  path: string,
  init: RequestInit,
  fallbackError: string,
): Promise<ActionResult<T>> {
  try {
    const authHeaders = await buildAuthHeaders();
    if (!authHeaders.ok) return authHeaders;

    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        ...authHeaders.headers,
        ...(init.headers || {}),
      },
      cache: "no-store",
    });

    let payload: unknown = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: getErrorMessage(payload, fallbackError),
      };
    }

    return { ok: true, data: payload as T };
  } catch (error) {
    console.error("Calendly action request failed:", error);
    return { ok: false, error: "Network error while contacting backend" };
  }
}

function emptySettings(): CalendlySettings {
  return {
    calendly_url: "",
    calendly_access_token: "",
    event_type_uri: "",
    auto_embed: true,
  };
}

function emptyStats(): CalendlyStats {
  return {
    total_events: 0,
    active_events: 0,
    upcoming_bookings: 0,
  };
}

function emptySnapshot(): CalendlySnapshot {
  return {
    settings: emptySettings(),
    token_configured: false,
    connected: false,
    events: [],
    stats: emptyStats(),
    slots: [],
    error: null,
  };
}

export async function getCalendlySnapshot(): Promise<{
  ok: boolean;
  snapshot?: CalendlySnapshot;
  error?: string;
}> {
  const result = await apiRequest<CalendlySnapshot>(
    "/api/appointments/calendly/snapshot",
    { method: "GET" },
    "Failed to fetch Calendly snapshot",
  );

  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  return { ok: true, snapshot: result.data || emptySnapshot() };
}

export async function connectCalendlyToken(accessToken: string): Promise<{
  ok: boolean;
  snapshot?: CalendlySnapshot;
  error?: string;
}> {
  const result = await apiRequest<CalendlySnapshot>(
    "/api/appointments/calendly/connect",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: accessToken }),
    },
    "Failed to connect Calendly token",
  );

  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  return { ok: true, snapshot: result.data || emptySnapshot() };
}

export async function deleteCalendlyToken(): Promise<{
  ok: boolean;
  snapshot?: CalendlySnapshot;
  error?: string;
}> {
  const result = await apiRequest<CalendlySnapshot>(
    "/api/appointments/calendly/token",
    { method: "DELETE" },
    "Failed to delete Calendly token",
  );

  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  return { ok: true, snapshot: result.data || emptySnapshot() };
}

export async function updateCalendlyEventType(eventTypeUri: string): Promise<{
  ok: boolean;
  snapshot?: CalendlySnapshot;
  error?: string;
}> {
  const result = await apiRequest<CalendlySnapshot>(
    "/api/appointments/calendly/event-type",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event_type_uri: eventTypeUri }),
    },
    "Failed to update event type",
  );

  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  return { ok: true, snapshot: result.data || emptySnapshot() };
}

export async function testCalendlyConnection(
  calendlyAccessToken: string,
): Promise<{
  ok: boolean;
  valid?: boolean;
  error?: string;
}> {
  const result = await apiRequest<{ valid?: boolean }>(
    "/api/appointments/calendly/test-connection",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: calendlyAccessToken,
      }),
    },
    "Failed to test connection",
  );

  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  return { ok: true, valid: !!result.data?.valid };
}

// Backward-compatible exports for legacy usage.
export async function getCalendlySettings(): Promise<{
  ok: boolean;
  settings?: CalendlySettings;
  error?: string;
}> {
  const result = await getCalendlySnapshot();
  if (!result.ok || !result.snapshot) return { ok: false, error: result.error };
  return { ok: true, settings: result.snapshot.settings };
}

export async function saveCalendlySettings(
  settings: CalendlySettings,
): Promise<{
  ok: boolean;
  error?: string;
}> {
  if (!settings.calendly_access_token) {
    const deleted = await deleteCalendlyToken();
    return deleted.ok ? { ok: true } : { ok: false, error: deleted.error };
  }

  const connected = await connectCalendlyToken(settings.calendly_access_token);
  if (!connected.ok) return { ok: false, error: connected.error };

  const updated = await updateCalendlyEventType(settings.event_type_uri || "");
  return updated.ok ? { ok: true } : { ok: false, error: updated.error };
}

export async function getCalendlyEvents(): Promise<{
  ok: boolean;
  events?: CalendlyEvent[];
  error?: string;
}> {
  const result = await getCalendlySnapshot();
  if (!result.ok || !result.snapshot) return { ok: false, error: result.error };
  return { ok: true, events: result.snapshot.events || [] };
}

export async function getCalendlyStats(): Promise<{
  ok: boolean;
  stats?: CalendlyStats;
  error?: string;
}> {
  const result = await getCalendlySnapshot();
  if (!result.ok || !result.snapshot) return { ok: false, error: result.error };
  return { ok: true, stats: result.snapshot.stats || emptyStats() };
}

export async function getCalendlyAvailability(eventTypeUri: string): Promise<{
  ok: boolean;
  slots?: CalendlySlot[];
  error?: string;
}> {
  void eventTypeUri;
  const result = await getCalendlySnapshot();
  if (!result.ok || !result.snapshot) return { ok: false, error: result.error };
  return { ok: true, slots: result.snapshot.slots || [] };
}

// ── Channel connections (multi-Page OAuth flow: Messenger + Instagram) ────────
// Server-redirect OAuth: initiate returns a URL the browser navigates to
// directly, Meta redirects back to the backend's own /oauth/callback (not
// here), which then redirects to this dashboard with a `selection_id`
// query param.

export type ChannelType = "messenger" | "instagram" | "whatsapp";
export type ConnectionStatus = "active" | "disconnected" | "token_expired";

export interface ChannelConnectionSummary {
  id: string;
  channel: ChannelType;
  external_id: string;
  page_name: string;
  status: ConnectionStatus;
  connected_at: string;
}

export interface OAuthCandidatePage {
  external_id: string;
  page_name: string;
  linked_instagram_id: string | null;
  linked_instagram_name: string | null;
}

export async function initiateChannelOAuth(): Promise<{
  ok: boolean;
  authorizeUrl?: string;
  error?: string;
}> {
  const result = await apiRequest<{ authorize_url: string }>(
    "/api/apps-integration/oauth/initiate",
    { method: "GET" },
    "Failed to start Facebook connection",
  );

  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  return { ok: true, authorizeUrl: result.data?.authorize_url };
}

export async function getOAuthPendingSelection(selectionId: string): Promise<{
  ok: boolean;
  pages?: OAuthCandidatePage[];
  error?: string;
}> {
  const result = await apiRequest<{ selection_id: string; pages: OAuthCandidatePage[] }>(
    `/api/apps-integration/oauth/pending/${encodeURIComponent(selectionId)}`,
    { method: "GET" },
    "Failed to load your Facebook Pages",
  );

  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  return { ok: true, pages: result.data?.pages || [] };
}

export async function confirmChannelConnections(
  selectionId: string,
  externalIds: string[],
): Promise<{
  ok: boolean;
  connections?: ChannelConnectionSummary[];
  error?: string;
}> {
  const result = await apiRequest<{ connections: ChannelConnectionSummary[] }>(
    "/api/apps-integration/oauth/confirm",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selection_id: selectionId, external_ids: externalIds }),
    },
    "Failed to connect the selected Page(s)",
  );

  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  return { ok: true, connections: result.data?.connections || [] };
}

export async function listChannelConnections(): Promise<{
  ok: boolean;
  connections?: ChannelConnectionSummary[];
  error?: string;
}> {
  const result = await apiRequest<{ connections: ChannelConnectionSummary[] }>(
    "/api/apps-integration/oauth/connections",
    { method: "GET" },
    "Failed to load connected channels",
  );

  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  return { ok: true, connections: result.data?.connections || [] };
}

export async function disconnectChannelConnection(
  channel: ChannelType,
  externalId: string,
): Promise<{ ok: boolean; error?: string }> {
  const result = await apiRequest<{ ok: boolean }>(
    `/api/apps-integration/oauth/connections/${channel}/${encodeURIComponent(externalId)}`,
    { method: "DELETE" },
    "Failed to disconnect channel",
  );

  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  return { ok: true };
}

// ── WhatsApp (Embedded Signup) ────────────────────────────────────────────
// One-click connect: Meta's own signup wizard handles WABA/phone number
// creation, the frontend just relays the resulting code + IDs here.

export async function connectWhatsAppEmbedded(params: {
  code: string;
  phoneNumberId: string;
  wabaId: string;
}): Promise<{
  ok: boolean;
  connection?: ChannelConnectionSummary;
  error?: string;
}> {
  const result = await apiRequest<ChannelConnectionSummary>(
    "/api/apps-integration/whatsapp/connect-embedded",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: params.code,
        phone_number_id: params.phoneNumberId,
        waba_id: params.wabaId,
      }),
    },
    "Failed to connect WhatsApp",
  );

  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  return { ok: true, connection: result.data };
}
