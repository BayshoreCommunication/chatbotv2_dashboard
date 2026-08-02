"use client";

import {
  connectMessenger,
  connectMessengerEmbedded,
  confirmChannelConnections,
  disconnectChannelConnection,
  disconnectMessenger,
  getMessengerSnapshot,
  getOAuthPendingSelection,
  initiateChannelOAuth,
  listChannelConnections,
  type ChannelConnectionSummary,
  type ChannelType,
  type MessengerSettings,
  type OAuthCandidatePage,
} from "@/app/actions/appsintegrations";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { BiCheckCircle, BiErrorCircle, BiLoaderAlt, BiX } from "react-icons/bi";
import { FaFacebookMessenger, FaFacebookF, FaInstagram } from "react-icons/fa";
import { toast } from "react-hot-toast";

// ── Facebook JS SDK (Login for Business) ─────────────────────────────────────
// Minimal shape for the pieces we actually call — the real SDK type is much
// larger, this just keeps `window.FB` usable without `any` everywhere below.
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
          extras: { setup: object; featureType: string; sessionInfoVersion: string };
        },
      ) => void;
    };
  }
}

const META_APP_ID = process.env.NEXT_PUBLIC_META_APP_ID || "";
// Facebook Login for Business configuration scoped to pages_messaging.
const META_MESSENGER_CONFIG_ID = process.env.NEXT_PUBLIC_META_MESSENGER_CONFIG_ID || "";

function loadFacebookSdk() {
  if (document.getElementById("facebook-jssdk") || !META_APP_ID) return;
  window.fbAsyncInit = () => {
    window.FB?.init({
      appId: META_APP_ID,
      autoLogAppEvents: true,
      xfbml: true,
      version: "v21.0",
    });
  };
  const script = document.createElement("script");
  script.id = "facebook-jssdk";
  script.src = "https://connect.facebook.net/en_US/sdk.js";
  script.async = true;
  document.body.appendChild(script);
}

interface IntegrationApp {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: IconType;
  color: string;
  iconColor: string;
}

// Instagram is listed for now but not wired up yet — see
// backend/docs/social-channels-integration-plan.md.
const INTEGRATIONS: IntegrationApp[] = [
  {
    id: "messenger",
    name: "Messenger",
    subtitle: "Social Messaging",
    description:
      "Bring your AI chatbot to Facebook Messenger using the same knowledge base and conversation history as your website chat. Handle FAQs, capture leads, and keep every conversation in sync with your dashboard, so customers get instant, accurate answers wherever they reach out.",
    icon: FaFacebookMessenger,
    color: "bg-gray-100",
    iconColor: "text-black",
  },
  {
    id: "instagram",
    name: "Instagram",
    subtitle: "Direct Messages",
    description:
      "Auto-reply to Instagram DMs using the same knowledge base and conversation history as your website chat, day or night. Turn story replies, comments, and quick questions into real conversations that convert, without adding any extra work for your already busy support team.",
    icon: FaInstagram,
    color: "bg-gray-100",
    iconColor: "text-black",
  },
];

const CHANNEL_ICON: Record<ChannelType, IconType> = {
  messenger: FaFacebookMessenger,
  instagram: FaInstagram,
};

const CHANNEL_LABEL: Record<ChannelType, string> = {
  messenger: "Messenger",
  instagram: "Instagram",
};

const EMPTY_MESSENGER_FORM = { pageId: "", accessToken: "" };

type ConnectMode = "choose" | "manual";

const AppsIntegrationDetials = () => {
  const [messenger, setMessenger] = useState<MessengerSettings | null>(null);
  const [messengerConnected, setMessengerConnected] = useState(false);
  const [loadingMessengerSnapshot, setLoadingMessengerSnapshot] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<ConnectMode>("choose");
  const [msgForm, setMsgForm] = useState(EMPTY_MESSENGER_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [embeddedConnecting, setEmbeddedConnecting] = useState(false);

  // ── Connected Channels (multi-Page OAuth flow) ───────────────────────────
  const [connections, setConnections] = useState<ChannelConnectionSummary[]>([]);
  const [loadingConnections, setLoadingConnections] = useState(true);
  const [connectionsError, setConnectionsError] = useState<string | null>(null);
  const [startingOAuth, setStartingOAuth] = useState(false);

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

  useEffect(() => {
    loadFacebookSdk();
  }, []);

  useEffect(() => {
    const loadMessengerSnapshot = async () => {
      setLoadingMessengerSnapshot(true);
      const result = await getMessengerSnapshot();
      if (result.ok && result.snapshot) {
        setMessenger(result.snapshot.settings);
        setMessengerConnected(result.snapshot.connected);
      } else if (result.error) {
        toast.error(result.error);
      }
      setLoadingMessengerSnapshot(false);
    };
    loadMessengerSnapshot();
  }, []);

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
    const load = async () => {
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
    load();
  }, []);

  // Picks up where the backend's OAuth callback left off: it redirects the
  // browser back here with either ?selection_id=... (pick which Page(s) to
  // connect) or ?oauth_error=... (denied/failed). Read via plain
  // URLSearchParams rather than next/navigation's useSearchParams, matching
  // this file's existing style of talking to the browser directly (see
  // loadFacebookSdk above) — and it sidesteps needing a Suspense boundary.
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

  const openModal = () => {
    setMode("choose");
    setMsgForm(EMPTY_MESSENGER_FORM);
    setShowModal(true);
  };

  const closeModal = () => {
    if (submitting || embeddedConnecting) return;
    setShowModal(false);
  };

  const handleManualConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await connectMessenger(msgForm);
    setSubmitting(false);

    if (!result.ok || !result.snapshot) {
      toast.error(result.error || "Failed to connect Messenger");
      return;
    }

    setMessenger(result.snapshot.settings);
    setMessengerConnected(result.snapshot.connected);
    setShowModal(false);
    setMsgForm(EMPTY_MESSENGER_FORM);
    toast.success("Messenger connected");
  };

  const handleFacebookLogin = () => {
    if (!META_MESSENGER_CONFIG_ID) {
      toast.error("Facebook login isn't configured yet — use manual setup for now.");
      return;
    }
    if (!window.FB) {
      toast.error("Facebook SDK is still loading — try again in a moment.");
      return;
    }
    window.FB.login(
      (response) => {
        if (!response.authResponse?.code) {
          toast.error("Facebook login was cancelled or failed.");
          return;
        }
        const code = response.authResponse.code;
        // No postMessage step for Messenger — the backend resolves the
        // connected Page itself (auto-selected when there's only one).
        const submit = async () => {
          setEmbeddedConnecting(true);
          const result = await connectMessengerEmbedded({ code });
          setEmbeddedConnecting(false);

          if (!result.ok || !result.snapshot) {
            toast.error(result.error || "Failed to connect Messenger via Facebook");
            return;
          }

          setMessenger(result.snapshot.settings);
          setMessengerConnected(result.snapshot.connected);
          setShowModal(false);
          toast.success("Messenger connected");
        };
        submit();
      },
      {
        config_id: META_MESSENGER_CONFIG_ID,
        response_type: "code",
        override_default_response_type: true,
        extras: { setup: {}, featureType: "", sessionInfoVersion: "3" },
      },
    );
  };

  const handleDisconnect = async () => {
    setDisconnecting(true);
    const result = await disconnectMessenger();
    setDisconnecting(false);

    if (!result.ok) {
      toast.error(result.error || "Failed to disconnect Messenger");
      return;
    }

    setMessenger(null);
    setMessengerConnected(false);
    toast.success("Messenger disconnected");
  };

  // ── Connected Channels handlers ──────────────────────────────────────────

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
    // @container: card grid reacts to the actual space available for this
    // page's content, not the raw viewport — see LeadsDetailsView for why
    // viewport breakpoints (sm/lg) don't work here (the fixed nav sidebar's
    // expand/collapse toggle changes available space without changing the
    // viewport).
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

        {/* Integration Cards */}
        <div className="grid grid-cols-1 gap-5 @2xl:grid-cols-2 @4xl:grid-cols-4">
          {INTEGRATIONS.map((app) => {
            const Icon = app.icon;
            const isMessenger = app.id === "messenger";
            const isConnected = isMessenger && messengerConnected;

            return (
              <div
                key={app.id}
                className="rounded border border-gray-200 bg-white p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${app.color}`}
                  >
                    <Icon size={20} className={app.iconColor} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {app.name}
                      </h3>
                      {isConnected && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                          <BiCheckCircle size={12} />
                          Connected
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      {app.subtitle}
                    </p>
                  </div>
                </div>
                <p className="mb-4 text-xs text-gray-500">
                  {app.description}
                </p>

                {isMessenger && isConnected ? (
                  <div className="space-y-2">
                    {messenger?.page_name && (
                      <p className="text-xs text-gray-500">
                        <span className="font-medium text-gray-700">
                          {messenger.page_name}
                        </span>
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={handleDisconnect}
                      disabled={disconnecting}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                    >
                      {disconnecting && <BiLoaderAlt className="animate-spin" size={16} />}
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={isMessenger ? openModal : undefined}
                    disabled={isMessenger && loadingMessengerSnapshot}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-thunder-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-thunder-black/90 disabled:opacity-50"
                  >
                    {isMessenger && loadingMessengerSnapshot && (
                      <BiLoaderAlt className="animate-spin" size={16} />
                    )}
                    Connect {app.name}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Connected Channels — multi-Page OAuth flow (Messenger + Instagram) */}
        <div className="rounded border border-gray-200 bg-white p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Connected Channels
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Connect any number of Facebook Pages — Instagram accounts
                linked to a Page connect automatically alongside it.
              </p>
            </div>
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
              No channels connected yet — click Connect Facebook to add one.
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
                          onClick={handleConnectFacebookPage}
                          disabled={startingOAuth}
                          className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
                        >
                          Reconnect
                        </button>
                      )}
                      {connection.status === "disconnected" && (
                        <button
                          type="button"
                          onClick={handleConnectFacebookPage}
                          disabled={startingOAuth}
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

      {/* Connect Messenger modal (legacy single-connection flow) */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">
                Connect Messenger
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <BiX size={20} />
              </button>
            </div>

            {mode === "choose" && (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleFacebookLogin}
                  disabled={embeddedConnecting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1877F2] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1877F2]/90 disabled:opacity-50"
                >
                  {embeddedConnecting ? (
                    <BiLoaderAlt className="animate-spin" size={16} />
                  ) : (
                    <FaFacebookF size={14} />
                  )}
                  {embeddedConnecting ? "Connecting…" : "Continue with Facebook"}
                </button>
                <p className="text-center text-[11px] text-gray-400">
                  Log into Facebook — we&apos;ll connect the Page you manage
                  automatically, no copy-pasting.
                </p>

                <div className="flex items-center gap-3 py-1">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-[11px] font-medium uppercase text-gray-400">
                    or
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <button
                  type="button"
                  onClick={() => setMode("manual")}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Enter details manually
                </button>
              </div>
            )}

            {mode === "manual" && (
              <form onSubmit={handleManualConnect} className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Page ID
                  </label>
                  <input
                    type="text"
                    required
                    value={msgForm.pageId}
                    onChange={(e) => setMsgForm((f) => ({ ...f, pageId: e.target.value }))}
                    placeholder="From your Facebook Page's About section"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Page Access Token
                  </label>
                  <input
                    type="password"
                    required
                    value={msgForm.accessToken}
                    onChange={(e) =>
                      setMsgForm((f) => ({ ...f, accessToken: e.target.value }))
                    }
                    placeholder="From Meta → Messenger → Access Tokens"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-thunder-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-thunder-black/90 disabled:opacity-50"
                >
                  {submitting && <BiLoaderAlt className="animate-spin" size={16} />}
                  {submitting ? "Connecting…" : "Connect"}
                </button>

                <button
                  type="button"
                  onClick={() => setMode("choose")}
                  className="w-full text-center text-xs font-medium text-gray-500 hover:text-gray-700"
                >
                  ← Back
                </button>
              </form>
            )}
          </div>
        </div>
      )}

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
