"use client";

import {
  confirmChannelConnections,
  connectWhatsAppEmbedded,
  disconnectChannelConnection,
  getOAuthPendingSelection,
  initiateChannelOAuth,
  listChannelConnections,
  type ChannelConnectionSummary,
  type ChannelType,
  type OAuthCandidatePage,
} from "@/app/actions/appsintegrations";
import { getSubscriptionAction } from "@/app/actions/subscriptions";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { BiCheckCircle, BiErrorCircle, BiLoaderAlt, BiLockAlt, BiPlus, BiX } from "react-icons/bi";
import { FaFacebookMessenger, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { toast } from "react-hot-toast";

// Apps Integration is an Advanced-plan feature (see pricing.ts) — the
// backend enforces this on every endpoint (routers/apps_integration_router.py's
// require_advanced_subscription), this is just the friendlier front door so a
// Professional/trial user sees an upgrade prompt instead of a raw 403.
const ADVANCED_TIERS = new Set(["advanced", "enterprise"]);

// ── Facebook JS SDK (shared by every Meta Login for Business flow —
// currently just WhatsApp Embedded Signup) ─────────────────────────────────
interface FacebookLoginResponse {
  authResponse?: { code?: string };
  status?: string;
}
declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB?: {
      init: (options: {
        appId: string;
        autoLogAppEvents?: boolean;
        xfbml?: boolean;
        version: string;
      }) => void;
      login: (
        callback: (response: FacebookLoginResponse) => void,
        options: {
          config_id: string;
          response_type: "code";
          override_default_response_type: true;
          extras: { setup: object; featureType?: string; sessionInfoVersion?: string };
        },
      ) => void;
    };
  }
}

const META_APP_ID = process.env.NEXT_PUBLIC_META_APP_ID || "";
const META_WHATSAPP_CONFIG_ID = process.env.NEXT_PUBLIC_META_WHATSAPP_CONFIG_ID || "";

function loadFacebookSdk() {
  if (document.getElementById("facebook-jssdk") || !META_APP_ID) return;
  window.fbAsyncInit = () => {
    window.FB?.init({
      appId: META_APP_ID,
      autoLogAppEvents: true,
      xfbml: true,
      // WhatsApp Embedded Signup's docs call for pinning this to the
      // latest Graph API version specifically — a stale version here is a
      // documented cause of the signup popup loading blank.
      version: "v25.0",
    });
  };
  const script = document.createElement("script");
  script.id = "facebook-jssdk";
  script.src = "https://connect.facebook.net/en_US/sdk.js";
  script.async = true;
  document.body.appendChild(script);
}

// WhatsApp Embedded Signup posts a window "message" event partway through
// the popup flow (event "WA_EMBEDDED_SIGNUP", data.event "FINISH") carrying
// the phone_number_id/waba_id Meta's own wizard just created or picked —
// this is Meta's documented way to hand those back, there's no API call to
// look them up afterward.
interface WhatsAppSignupFinishData {
  phone_number_id: string;
  waba_id: string;
}

const CHANNEL_ICON: Record<ChannelType, IconType> = {
  messenger: FaFacebookMessenger,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
};

const CHANNEL_LABEL: Record<ChannelType, string> = {
  messenger: "Messenger",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
};

// Brand colour + copy for each channel card.
const CHANNEL_META: Record<ChannelType, { color: string; description: string; hint: string }> = {
  messenger: {
    color: "#0084FF",
    description: "Answer customers who message your Facebook Page, around the clock.",
    hint: "Sign in with Facebook and pick the Page to connect.",
  },
  instagram: {
    color: "#E1306C",
    description: "Reply to Instagram DMs automatically from the same AI assistant.",
    hint: "Connects automatically with the Instagram account linked to your Facebook Page.",
  },
  whatsapp: {
    color: "#25D366",
    description: "Chat with customers on WhatsApp using your business number.",
    hint: "Set up your WhatsApp Business number in a quick guided popup.",
  },
};

// Shown as a placeholder row for any channel with zero connections, so the
// page always makes it obvious which channels are and aren't connected
// instead of one ambiguous "no channels connected" sentence.
const CHANNEL_CHECKLIST: ChannelType[] = ["messenger", "instagram", "whatsapp"];

const AppsIntegrationDetials = () => {
  // Advanced-plan gate — checked client-side for a friendly upgrade prompt;
  // the backend enforces the real block on every endpoint regardless.
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [hasAdvancedAccess, setHasAdvancedAccess] = useState(false);

  const [connections, setConnections] = useState<ChannelConnectionSummary[]>([]);
  const [loadingConnections, setLoadingConnections] = useState(true);
  const [connectionsError, setConnectionsError] = useState<string | null>(null);
  const [startingOAuth, setStartingOAuth] = useState(false);
  const [connectingWhatsApp, setConnectingWhatsApp] = useState(false);
  // Temporary on-page debug trail for the WhatsApp signup flow — visible
  // directly on the page (no DevTools needed) so a stuck connection can be
  // diagnosed from a screenshot instead of guessing blind.
  const [whatsappDebugLog, setWhatsappDebugLog] = useState<string[]>([]);
  const logWhatsappDebug = (line: string) => {
    setWhatsappDebugLog((prev) => [...prev, `${new Date().toLocaleTimeString()} ${line}`]);
  };

  // Page-picker modal — populated once Meta redirects back with a
  // ?selection_id=... query param (see the mount effect below).
  const [pendingSelectionId, setPendingSelectionId] = useState<string | null>(null);
  const [pendingPages, setPendingPages] = useState<OAuthCandidatePage[]>([]);
  const [loadingPending, setLoadingPending] = useState(false);
  const [selectedExternalIds, setSelectedExternalIds] = useState<Set<string>>(new Set());
  const [confirmingSelection, setConfirmingSelection] = useState(false);

  // Disconnect confirmation dialog
  const [disconnectTarget, setDisconnectTarget] = useState<{
    channel: ChannelType;
    externalId: string;
    pageName: string;
  } | null>(null);
  const [disconnectingTarget, setDisconnectingTarget] = useState(false);

  const loadConnections = async () => {
    setLoadingConnections(true);
    setConnectionsError(null);
    const result = await listChannelConnections();
    if (result.ok) {
      setConnections(result.connections || []);
    } else {
      setConnectionsError(result.error || "Failed to load connected channels");
    }
    setLoadingConnections(false);
  };

  useEffect(() => {
    loadFacebookSdk();
  }, []);

  useEffect(() => {
    let cancelled = false;
    getSubscriptionAction().then((res) => {
      if (cancelled) return;
      const tier = res.ok ? res.data?.subscription_tier : undefined;
      const active = res.ok ? res.data?.is_active : false;
      setHasAdvancedAccess(!!tier && ADVANCED_TIERS.has(tier) && !!active);
      setCheckingAccess(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (checkingAccess || !hasAdvancedAccess) return;
    const load = async () => {
      await loadConnections();
    };
    load();
  }, [checkingAccess, hasAdvancedAccess]);
    

  // Picks up where the backend's OAuth callback left off: it redirects the
  // browser back here with either ?selection_id=... (pick which Page(s) to
  // connect) or ?oauth_error=... (denied/failed).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectionId = params.get("selection_id");
    const oauthError = params.get("oauth_error");

    if (!selectionId && !oauthError) return;

    // Strip the query params so a refresh doesn't re-trigger this.
    const url = new URL(window.location.href);
    url.searchParams.delete("selection_id");
    url.searchParams.delete("oauth_error");
    window.history.replaceState({}, "", url.toString());

    if (oauthError) {
      toast.error(
        oauthError === "denied"
          ? "Facebook login was cancelled."
          : "Failed to connect via Facebook — please try again.",
      );
      return;
    }

    if (selectionId) {
      const loadPending = async () => {
        setLoadingPending(true);
        const result = await getOAuthPendingSelection(selectionId);
        setLoadingPending(false);

        if (!result.ok || !result.pages || result.pages.length === 0) {
          toast.error(result.error || "No Facebook Pages found for this login.");
          return;
        }

        setPendingSelectionId(selectionId);
        setPendingPages(result.pages);
        // Pre-select everything by default — one less click for the
        // common case of a single connected Page.
        setSelectedExternalIds(new Set(result.pages.map((p) => p.external_id)));
      };
      loadPending();
    }
    // Only ever needs to run once, right after the redirect lands.
  }, []);

  const handleConnectFacebookPage = async () => {
    setStartingOAuth(true);
    const result = await initiateChannelOAuth();
    // Deliberately not resetting startingOAuth on success — the page is
    // about to navigate away entirely, so there's no UI left to un-disable.
    if (!result.ok || !result.authorizeUrl) {
      setStartingOAuth(false);
      toast.error(result.error || "Failed to start Facebook connection");
      return;
    }
    window.location.href = result.authorizeUrl;
  };

  const handleConnectWhatsApp = () => {
    if (!META_WHATSAPP_CONFIG_ID) {
      toast.error("WhatsApp connect isn't configured yet.");
      return;
    }
    if (!window.FB) {
      toast.error("Facebook SDK is still loading — try again in a moment.");
      return;
    }

    let phoneNumberId = "";
    let wabaId = "";
    let pendingCode = "";
    let settled = false;

    setConnectingWhatsApp(true);
    setWhatsappDebugLog([]);
    logWhatsappDebug(`starting, config_id=${META_WHATSAPP_CONFIG_ID}`);

    const cleanup = () => {
      settled = true;
      window.removeEventListener("message", onMessage);
      clearTimeout(timeoutId);
      setConnectingWhatsApp(false);
    };

    // The popup flow's IDs (via postMessage) and its authorization code (via
    // the FB.login callback) arrive independently and in no guaranteed
    // order — submit only once both are in hand.
    const trySubmit = async (code: string) => {
      if (settled || !phoneNumberId || !wabaId) return;
      logWhatsappDebug("submitting to backend…");
      const result = await connectWhatsAppEmbedded({ code, phoneNumberId, wabaId });
      cleanup();

      if (!result.ok) {
        logWhatsappDebug(`backend rejected: ${result.error || "unknown error"}`);
        toast.error(result.error || "Failed to connect WhatsApp");
        return;
      }
      logWhatsappDebug("backend confirmed connected");
      toast.success("WhatsApp connected");
      loadConnections();
    };

    // Meta's popup can be closed without either callback firing (e.g. the
    // customer just closes the window) — without a timeout, connectingWhatsApp
    // would spin forever and no one would ever fine out.
    const timeoutId = setTimeout(() => {
      if (settled) return;
      cleanup();
      toast.error("WhatsApp signup timed out — please try again.");
    }, 120_000);

    const onMessage = (event: MessageEvent) => {
      // Matches Meta's own documented pattern for this event: any
      // facebook.com subdomain, not one hardcoded origin — the popup can
      // legitimately post from several.
      let hostname = "";
      try {
        hostname = new URL(event.origin).hostname;
      } catch {
        return;
      }
      if (hostname !== "facebook.com" && !hostname.endsWith(".facebook.com")) {
        return;
      }

      let data: { type?: string; event?: string; data?: WhatsAppSignupFinishData };
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        logWhatsappDebug(`message from ${hostname}, not JSON: ${String(event.data).slice(0, 80)}`);
        return;
      }
      if (data?.type !== "WA_EMBEDDED_SIGNUP") {
        logWhatsappDebug(`message from ${hostname}, type=${data?.type ?? "?"} (ignored)`);
        return;
      }

      logWhatsappDebug(`WA_EMBEDDED_SIGNUP event=${data.event}`);

      if (data.event === "CANCEL") {
        cleanup();
        toast.error("WhatsApp signup was cancelled.");
        return;
      }
      if (data.event === "ERROR") {
        cleanup();
        toast.error("WhatsApp signup failed — please try again.");
        return;
      }
      // Meta documents several finish variants (FINISH, FINISH_ONLY_WABA,
      // FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING, ...) depending on which
      // path the customer took inside the wizard — matching only the exact
      // string "FINISH" silently dropped every other variant, leaving the
      // button stuck on "Connecting…" forever with no error shown.
      if (!data.event?.startsWith("FINISH") || !data.data) return;

      if (!data.data.phone_number_id || !data.data.waba_id) {
        cleanup();
        toast.error(
          "WhatsApp signup finished without a phone number selected — please try again and complete every step.",
        );
        return;
      }

      logWhatsappDebug(`got phone_number_id=${data.data.phone_number_id} waba_id=${data.data.waba_id}`);
      phoneNumberId = data.data.phone_number_id;
      wabaId = data.data.waba_id;
      if (pendingCode) trySubmit(pendingCode);
    };
    window.addEventListener("message", onMessage);

    // FB.login() opens its popup via a plain window.open() call internally
    // — if the browser (or an ad-blocker/privacy extension) silently blocks
    // it, window.open returns null and neither of our callbacks ever fires,
    // leaving the button stuck on "Connecting…" for the full timeout with
    // no explanation. Wrapping window.open for the duration of this one
    // call lets us detect that immediately instead.
    const originalOpen = window.open;
    window.open = (...args) => {
      const popup = originalOpen.apply(window, args);
      window.open = originalOpen;
      if (!popup || popup.closed) {
        cleanup();
        toast.error(
          "The Facebook popup was blocked by your browser — please allow popups for this site (check your address bar or ad-blocker) and try again.",
        );
      }
      return popup;
    };

    window.FB.login(
      (response) => {
        logWhatsappDebug(`FB.login callback: status=${response.status} hasCode=${!!response.authResponse?.code}`);
        if (!response.authResponse?.code) {
          cleanup();
          toast.error("WhatsApp signup was cancelled or failed.");
          return;
        }
        pendingCode = response.authResponse.code;
        trySubmit(pendingCode);
      },
      {
        config_id: META_WHATSAPP_CONFIG_ID,
        response_type: "code",
        override_default_response_type: true,
        // sessionInfoVersion opts into the newer WA_EMBEDDED_SIGNUP event
        // schema that actually carries phone_number_id/waba_id — without it
        // Meta's wizard can complete normally but send back a bare FINISH
        // event with no data, which looks identical to this flow just
        // hanging forever.
        extras: { setup: {}, featureType: "whatsapp_business_app_onboarding", sessionInfoVersion: "3" },
      },
    );
    // Safety net in case FB.login() never calls window.open synchronously
    // (e.g. it defers a tick) — don't leave the real window.open patched.
    setTimeout(() => {
      window.open = originalOpen;
    }, 3000);
  };

  const toggleSelectedPage = (externalId: string) => {
    setSelectedExternalIds((prev) => {
      const next = new Set(prev);
      if (next.has(externalId)) next.delete(externalId);
      else next.add(externalId);
      return next;
    });
  };

  const closePicker = () => {
    if (confirmingSelection) return;
    setPendingSelectionId(null);
    setPendingPages([]);
    setSelectedExternalIds(new Set());
  };

  const handleConfirmSelection = async () => {
    if (!pendingSelectionId || selectedExternalIds.size === 0) {
      toast.error("Select at least one Page to connect");
      return;
    }
    setConfirmingSelection(true);
    const result = await confirmChannelConnections(
      pendingSelectionId,
      Array.from(selectedExternalIds),
    );
    setConfirmingSelection(false);

    if (!result.ok) {
      toast.error(result.error || "Failed to connect the selected Page(s)");
      return;
    }

    toast.success(
      selectedExternalIds.size === 1 ? "Page connected" : "Pages connected",
    );
    closePicker();
    loadConnections();
  };

  const requestDisconnect = (connection: ChannelConnectionSummary) => {
    setDisconnectTarget({
      channel: connection.channel,
      externalId: connection.external_id,
      pageName: connection.page_name,
    });
  };

  const handleConfirmDisconnect = async () => {
    if (!disconnectTarget) return;
    setDisconnectingTarget(true);
    const result = await disconnectChannelConnection(
      disconnectTarget.channel,
      disconnectTarget.externalId,
    );
    setDisconnectingTarget(false);

    if (!result.ok) {
      toast.error(result.error || "Failed to disconnect channel");
      return;
    }

    toast.success(`${disconnectTarget.pageName} disconnected`);
    setDisconnectTarget(null);
    loadConnections();
  };

  const connectedCount = CHANNEL_CHECKLIST.filter((channel) =>
    connections.some((c) => c.channel === channel && c.status === "active"),
  ).length;
  const busy = startingOAuth || connectingWhatsApp;

  if (checkingAccess) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <BiLoaderAlt className="animate-spin text-gray-400" size={24} />
      </div>
    );
  }

  if (!hasAdvancedAccess) {
    return (
      <div className="@container flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Apps &amp; Integrations</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Connect your AI assistant to the channels your customers already use
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex flex-col items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <BiLockAlt size={26} />
            </span>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Available on the Advanced plan</h2>
              <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
                Connect Messenger, Instagram, and WhatsApp to your AI assistant by upgrading to the
                Advanced plan.
              </p>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              {CHANNEL_CHECKLIST.map((channel) => {
                const Icon = CHANNEL_ICON[channel];
                return <Icon key={channel} size={20} />;
              })}
            </div>
            <Link
              href="/pricing"
              className="rounded-lg bg-thunder-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-thunder-black/90"
            >
              Upgrade to Advanced
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const renderStatusBadge = (status: ChannelConnectionSummary["status"]) => {
    if (status === "active") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700">
          <BiCheckCircle size={12} />
          Connected
        </span>
      );
    }
    if (status === "token_expired") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
          <BiErrorCircle size={12} />
          Reconnect needed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-500">
        Disconnected
      </span>
    );
  };

  const renderChannelCard = (channel: ChannelType) => {
    const meta = CHANNEL_META[channel];
    const Icon = CHANNEL_ICON[channel];
    const items = connections.filter((c) => c.channel === channel);
    const connect = channel === "whatsapp" ? handleConnectWhatsApp : handleConnectFacebookPage;
    const connecting = channel === "whatsapp" ? connectingWhatsApp : startingOAuth;
    const hasActive = items.some((c) => c.status === "active");
    const needsReconnect = items.some((c) => c.status === "token_expired");

    return (
      <div
        key={channel}
        className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm"
      >
        <div className="flex items-start justify-between gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${meta.color}14`, color: meta.color }}
          >
            <Icon size={22} />
          </span>
          {hasActive ? (
            renderStatusBadge("active")
          ) : needsReconnect ? (
            renderStatusBadge("token_expired")
          ) : (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-500">
              Not connected
            </span>
          )}
        </div>

        <h3 className="mt-4 text-base font-bold text-gray-900">{CHANNEL_LABEL[channel]}</h3>
        <p className="mt-1 text-sm leading-relaxed text-gray-500">{meta.description}</p>

        <div className="mt-4 flex-1">
          {loadingConnections ? (
            <div className="space-y-2">
              <div className="h-9 animate-pulse rounded-lg bg-gray-100" />
            </div>
          ) : items.length > 0 ? (
            <ul className="space-y-2">
              {items.map((connection) => (
                <li
                  key={connection.id}
                  className="flex items-center justify-between gap-2 rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {connection.page_name || connection.external_id}
                    </p>
                    {connection.status !== "active" && (
                      <div className="mt-0.5">{renderStatusBadge(connection.status)}</div>
                    )}
                  </div>
                  <div className="shrink-0">
                    {connection.status === "active" && (
                      <button
                        type="button"
                        onClick={() => requestDisconnect(connection)}
                        className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        Disconnect
                      </button>
                    )}
                    {connection.status === "token_expired" && (
                      <button
                        type="button"
                        onClick={connect}
                        disabled={busy}
                        className="rounded-lg bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
                      >
                        Reconnect
                      </button>
                    )}
                    {connection.status === "disconnected" && (
                      <button
                        type="button"
                        onClick={connect}
                        disabled={busy}
                        className="rounded-lg bg-thunder-black px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-thunder-black/90 disabled:opacity-50"
                      >
                        Connect
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-400">{meta.hint}</p>
          )}
        </div>

        <button
          type="button"
          onClick={connect}
          disabled={busy}
          className={
            items.length > 0
              ? "mt-4 flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
              : "mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          }
          style={items.length > 0 ? undefined : { backgroundColor: meta.color }}
        >
          {connecting ? (
            <BiLoaderAlt className="animate-spin" size={16} />
          ) : items.length > 0 ? (
            <BiPlus size={16} />
          ) : channel === "whatsapp" ? (
            <FaWhatsapp size={15} />
          ) : (
            <FaFacebookF size={13} />
          )}
          {connecting
            ? channel === "whatsapp"
              ? "Connecting…"
              : "Redirecting…"
            : items.length > 0
              ? channel === "whatsapp"
                ? "Add another number"
                : channel === "instagram"
                  ? "Connect another account"
                  : "Connect another Page"
              : channel === "whatsapp"
                ? "Connect WhatsApp"
                : channel === "instagram"
                  ? "Connect via Facebook"
                  : "Connect Facebook"}
        </button>
      </div>
    );
  };

  return (
    <div className="@container flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Apps &amp; Integrations</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Connect your AI assistant to the channels your customers already use
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600">
          <span
            className={`h-2 w-2 rounded-full ${connectedCount > 0 ? "bg-green-500" : "bg-gray-300"}`}
          />
          {connectedCount} of {CHANNEL_CHECKLIST.length} channels live
        </div>
      </div>

      {(startingOAuth || connectingWhatsApp) && (
        <p className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs leading-relaxed text-blue-700">
          A Facebook popup window should appear now. If nothing shows up, your browser likely
          blocked it — look for a blocked-popup icon in the address bar, allow popups for this
          site, then try again.
        </p>
      )}

      {connectionsError && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">{connectionsError}</p>
          <button
            type="button"
            onClick={loadConnections}
            className="rounded-lg border border-red-200 bg-white px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
          >
            Try again
          </button>
        </div>
      )}

      {/* Channel cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CHANNEL_CHECKLIST.map((channel) => renderChannelCard(channel))}
      </div>

      {/* How it works */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-sm font-bold text-gray-900">How it works</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {
              title: "Connect a channel",
              text: "Sign in with Facebook to link your Page — a linked Instagram account comes along automatically. WhatsApp connects separately.",
            },
            {
              title: "Your AI replies",
              text: "Messages from customers are answered automatically, using everything you've trained your assistant on.",
            },
            {
              title: "Follow every conversation",
              text: "Chats and leads from every channel show up in your dashboard, in one place.",
            },
          ].map((step, index) => (
            <div key={step.title} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Temporary — visible debug trail for the WhatsApp signup flow, so a
          stuck connection can be diagnosed from a screenshot. */}
      {whatsappDebugLog.length > 0 && (
        <details className="rounded-xl border border-gray-200 bg-white px-4 py-3">
          <summary className="cursor-pointer text-xs font-medium text-gray-500">
            WhatsApp connection log
          </summary>
          <div className="mt-2 rounded-lg bg-gray-900 px-3 py-2 font-mono text-[11px] leading-relaxed text-gray-200">
            {whatsappDebugLog.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </details>
      )}

      {/* Page picker — shown after Meta redirects back with ?selection_id= */}
      {pendingSelectionId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          onClick={closePicker}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "#1877F214", color: "#1877F2" }}
                >
                  <FaFacebookF size={15} />
                </span>
                <h3 className="text-base font-bold text-gray-900">Choose Page(s) to connect</h3>
              </div>
              <button
                type="button"
                onClick={closePicker}
                disabled={confirmingSelection}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
              >
                <BiX size={20} />
              </button>
            </div>
            <p className="mb-4 text-xs text-gray-500">
              Only the Page(s) you select here get connected to your chatbot.
            </p>

            {loadingPending ? (
              <div className="flex items-center justify-center gap-2 py-6 text-sm text-gray-400">
                <BiLoaderAlt className="animate-spin" size={18} />
                Loading your Pages…
              </div>
            ) : (
              <div className="mb-4 max-h-64 space-y-2 overflow-y-auto">
                {pendingPages.map((page) => {
                  const selected = selectedExternalIds.has(page.external_id);
                  return (
                    <label
                      key={page.external_id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                        selected
                          ? "border-thunder-black bg-gray-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleSelectedPage(page.external_id)}
                        className="mt-0.5 accent-black"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{page.page_name}</p>
                        {page.linked_instagram_id ? (
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                            <FaInstagram size={12} className="text-[#E1306C]" />
                            Instagram detected
                            {page.linked_instagram_name ? `: @${page.linked_instagram_name}` : ""}
                            {" — will connect automatically"}
                          </p>
                        ) : (
                          <p className="mt-0.5 text-xs text-gray-400">No Instagram account linked</p>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            )}

            <button
              type="button"
              onClick={handleConfirmSelection}
              disabled={confirmingSelection || loadingPending || selectedExternalIds.size === 0}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-thunder-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-thunder-black/90 disabled:opacity-50"
            >
              {confirmingSelection && <BiLoaderAlt className="animate-spin" size={16} />}
              {confirmingSelection
                ? "Connecting…"
                : `Connect selected (${selectedExternalIds.size})`}
            </button>
          </div>
        </div>
      )}

      {/* Disconnect confirmation */}
      {disconnectTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          onClick={() => !disconnectingTarget && setDisconnectTarget(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <BiErrorCircle size={22} />
            </span>
            <h3 className="mb-1 text-base font-bold text-gray-900">
              Disconnect {disconnectTarget.pageName}?
            </h3>
            <p className="mb-5 text-sm text-gray-500">
              Your chatbot will stop replying to messages on this channel until you reconnect it.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDisconnectTarget(null)}
                disabled={disconnectingTarget}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDisconnect}
                disabled={disconnectingTarget}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {disconnectingTarget && <BiLoaderAlt className="animate-spin" size={16} />}
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppsIntegrationDetials;
