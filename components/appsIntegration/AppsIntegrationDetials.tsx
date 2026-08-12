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
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { BiCheckCircle, BiErrorCircle, BiLoaderAlt, BiX } from "react-icons/bi";
import { FaFacebookMessenger, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { toast } from "react-hot-toast";

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
          extras: { setup: object };
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

const AppsIntegrationDetials = () => {
  const [connections, setConnections] = useState<ChannelConnectionSummary[]>([]);
  const [loadingConnections, setLoadingConnections] = useState(true);
  const [connectionsError, setConnectionsError] = useState<string | null>(null);
  const [startingOAuth, setStartingOAuth] = useState(false);
  const [connectingWhatsApp, setConnectingWhatsApp] = useState(false);

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
    const load = async () => {
      await loadConnections();
    };
    load();
  }, []);

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
      const result = await connectWhatsAppEmbedded({ code, phoneNumberId, wabaId });
      cleanup();

      if (!result.ok) {
        toast.error(result.error || "Failed to connect WhatsApp");
        return;
      }
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
      if (hostname !== "facebook.com" && !hostname.endsWith(".facebook.com")) return;

      let data: { type?: string; event?: string; data?: WhatsAppSignupFinishData };
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      if (data?.type !== "WA_EMBEDDED_SIGNUP") return;

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
      if (data.event !== "FINISH" || !data.data) return;

      phoneNumberId = data.data.phone_number_id;
      wabaId = data.data.waba_id;
      if (pendingCode) trySubmit(pendingCode);
    };
    window.addEventListener("message", onMessage);

    window.FB.login(
      (response) => {
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
        extras: { setup: {} },
      },
    );
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

  return (
    <div className="@container">
      <div className="flex flex-col gap-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="rounded border border-gray-200 bg-white p-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Apps &amp; Integrations
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Connect your AI assistant to the channels your customers already
            use
          </p>
        </div>

        {/* Connected Channels — single Facebook connect flow covers both
            Messenger and any Instagram account linked to the same Page. */}
        <div className="rounded border border-gray-200 bg-white p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-gray-900">
                  Connected Channels
                </h2>
                <FaFacebookMessenger size={16} className="text-gray-400" />
                <FaInstagram size={16} className="text-gray-400" />
                <FaWhatsapp size={16} className="text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Connect a Facebook Page to bring your AI assistant to
                Messenger — any Instagram account linked to that Page
                connects automatically alongside it. Connect WhatsApp
                separately below.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleConnectFacebookPage}
                disabled={startingOAuth}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#1877F2] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1877F2]/90 disabled:opacity-50"
              >
                {startingOAuth ? (
                  <BiLoaderAlt className="animate-spin" size={16} />
                ) : (
                  <FaFacebookF size={14} />
                )}
                {startingOAuth ? "Redirecting…" : "Connect Facebook"}
              </button>
              <button
                type="button"
                onClick={handleConnectWhatsApp}
                disabled={connectingWhatsApp}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#25D366]/90 disabled:opacity-50"
              >
                {connectingWhatsApp ? (
                  <BiLoaderAlt className="animate-spin" size={16} />
                ) : (
                  <FaWhatsapp size={14} />
                )}
                {connectingWhatsApp ? "Connecting…" : "Connect WhatsApp"}
              </button>
            </div>
          </div>

          {loadingConnections ? (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-gray-400">
              <BiLoaderAlt className="animate-spin" size={18} />
              Loading connected channels…
            </div>
          ) : connectionsError ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <p className="text-sm text-red-600">{connectionsError}</p>
              <button
                type="button"
                onClick={loadConnections}
                className="text-xs font-medium text-primary hover:underline"
              >
                Try again
              </button>
            </div>
          ) : connections.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">
              No channels connected yet — click Connect Facebook or Connect
              WhatsApp to add one.
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {connections.map((connection) => {
                const Icon = CHANNEL_ICON[connection.channel];
                return (
                  <div
                    key={connection.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                        <Icon size={18} className="text-black" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">
                            {connection.page_name || connection.external_id}
                          </span>
                          {connection.status === "active" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                              <BiCheckCircle size={12} />
                              Connected
                            </span>
                          )}
                          {connection.status === "token_expired" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                              <BiErrorCircle size={12} />
                              Reconnect needed
                            </span>
                          )}
                          {connection.status === "disconnected" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                              Disconnected
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">
                          {CHANNEL_LABEL[connection.channel]}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {connection.status === "active" && (
                        <button
                          type="button"
                          onClick={() => requestDisconnect(connection)}
                          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                          Disconnect
                        </button>
                      )}
                      {connection.status === "token_expired" && (
                        <button
                          type="button"
                          onClick={
                            connection.channel === "whatsapp"
                              ? handleConnectWhatsApp
                              : handleConnectFacebookPage
                          }
                          disabled={startingOAuth || connectingWhatsApp}
                          className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
                        >
                          Reconnect
                        </button>
                      )}
                      {connection.status === "disconnected" && (
                        <button
                          type="button"
                          onClick={
                            connection.channel === "whatsapp"
                              ? handleConnectWhatsApp
                              : handleConnectFacebookPage
                          }
                          disabled={startingOAuth || connectingWhatsApp}
                          className="rounded-lg bg-thunder-black px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-thunder-black/90 disabled:opacity-50"
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Page picker — shown after Meta redirects back with ?selection_id= */}
      {pendingSelectionId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={closePicker}>
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">
                Choose Page(s) to connect
              </h3>
              <button
                type="button"
                onClick={closePicker}
                disabled={confirmingSelection}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
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
                {pendingPages.map((page) => (
                  <label
                    key={page.external_id}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedExternalIds.has(page.external_id)}
                      onChange={() => toggleSelectedPage(page.external_id)}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{page.page_name}</p>
                      {page.linked_instagram_id ? (
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                          <FaInstagram size={12} />
                          Instagram detected
                          {page.linked_instagram_name ? `: @${page.linked_instagram_name}` : ""}
                          {" — will connect automatically"}
                        </p>
                      ) : (
                        <p className="mt-0.5 text-xs text-gray-400">No Instagram account linked</p>
                      )}
                    </div>
                  </label>
                ))}
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => !disconnectingTarget && setDisconnectTarget(null)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-2 text-base font-bold text-gray-900">
              Disconnect {disconnectTarget.pageName}?
            </h3>
            <p className="mb-5 text-sm text-gray-500">
              Your chatbot will stop replying to messages on this channel
              until you reconnect it.
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
