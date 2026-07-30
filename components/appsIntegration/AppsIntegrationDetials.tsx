"use client";

import {
  connectMessenger,
  connectMessengerEmbedded,
  connectWhatsApp,
  connectWhatsAppEmbedded,
  disconnectMessenger,
  disconnectWhatsApp,
  getMessengerSnapshot,
  getWhatsAppSnapshot,
  type MessengerSettings,
  type WhatsAppSettings,
} from "@/app/actions/appsintegrations";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { BiCheckCircle, BiLoaderAlt, BiX } from "react-icons/bi";
import { FaFacebookMessenger, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { toast } from "react-hot-toast";

// ── Facebook JS SDK (Embedded Signup / Login for Business) ──────────────────
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
const META_EMBEDDED_SIGNUP_CONFIG_ID =
  process.env.NEXT_PUBLIC_META_EMBEDDED_SIGNUP_CONFIG_ID || "";
// Separate Meta App "Facebook Login for Business" configuration scoped to
// pages_messaging — WhatsApp's config_id above is scoped to WhatsApp's own
// Embedded Signup product and can't be reused for Page login.
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

const INTEGRATIONS: IntegrationApp[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    subtitle: "Instant Messaging",
    description:
      "Let customers message your AI assistant directly on WhatsApp using the same knowledge base and conversation history as your website chat. Perfect for regions where WhatsApp is the first place people reach out, with instant replies, lead capture, and round-the-clock availability built in from day one.",
    icon: FaWhatsapp,
    color: "bg-gray-100",
    iconColor: "text-black",
  },
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

const EMPTY_WHATSAPP_FORM = { phoneNumberId: "", accessToken: "", businessAccountId: "" };
const EMPTY_MESSENGER_FORM = { pageId: "", accessToken: "" };

type Channel = "whatsapp" | "messenger";
type ConnectMode = "choose" | "manual";

const AppsIntegrationDetials = () => {
  const [whatsapp, setWhatsapp] = useState<WhatsAppSettings | null>(null);
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [loadingWhatsAppSnapshot, setLoadingWhatsAppSnapshot] = useState(true);

  const [messenger, setMessenger] = useState<MessengerSettings | null>(null);
  const [messengerConnected, setMessengerConnected] = useState(false);
  const [loadingMessengerSnapshot, setLoadingMessengerSnapshot] = useState(true);

  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [mode, setMode] = useState<ConnectMode>("choose");
  const [waForm, setWaForm] = useState(EMPTY_WHATSAPP_FORM);
  const [msgForm, setMsgForm] = useState(EMPTY_MESSENGER_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [disconnectingChannel, setDisconnectingChannel] = useState<Channel | null>(null);
  const [embeddedConnecting, setEmbeddedConnecting] = useState(false);

  // WhatsApp Embedded Signup: the auth `code` (from FB.login's callback) and
  // the phone_number_id/waba_id (from Meta's postMessage events) arrive
  // independently and asynchronously — this holds whichever has landed so
  // far, and a separate effect fires the actual connect once both are in.
  // Messenger's Login for Business has no postMessage step, so it doesn't
  // need this — its FB.login callback connects directly (see
  // handleFacebookLogin).
  const [embeddedCode, setEmbeddedCode] = useState<string | null>(null);
  const [embeddedIds, setEmbeddedIds] = useState<{
    phoneNumberId: string;
    businessAccountId: string;
  } | null>(null);
  const embeddedSubmittedRef = useRef(false);

  useEffect(() => {
    loadFacebookSdk();
  }, []);

  // Meta posts the phone number / WABA the user picked inside the popup —
  // these never come back through FB.login()'s own callback. WhatsApp-only.
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!/facebook\.com$/.test(event.origin.replace(/^https?:\/\//, "").split("/")[0]))
        return;
      let data: unknown;
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      const payload = data as {
        type?: string;
        event?: string;
        data?: { phone_number_id?: string; waba_id?: string };
      };
      if (payload?.type === "WA_EMBEDDED_SIGNUP" && payload.event === "FINISH") {
        const phoneNumberId = payload.data?.phone_number_id;
        const businessAccountId = payload.data?.waba_id;
        if (phoneNumberId && businessAccountId) {
          setEmbeddedIds({ phoneNumberId, businessAccountId });
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Fires the actual WhatsApp connect the moment both the code and the ids
  // have arrived — order between the two isn't guaranteed by Meta.
  useEffect(() => {
    if (!embeddedCode || !embeddedIds || embeddedSubmittedRef.current) return;
    embeddedSubmittedRef.current = true;

    const submit = async () => {
      setEmbeddedConnecting(true);
      const result = await connectWhatsAppEmbedded({
        code: embeddedCode,
        phoneNumberId: embeddedIds.phoneNumberId,
        businessAccountId: embeddedIds.businessAccountId,
      });
      setEmbeddedConnecting(false);
      embeddedSubmittedRef.current = false;
      setEmbeddedCode(null);
      setEmbeddedIds(null);

      if (!result.ok || !result.snapshot) {
        toast.error(result.error || "Failed to connect WhatsApp via Facebook");
        return;
      }

      setWhatsapp(result.snapshot.settings);
      setWhatsappConnected(result.snapshot.connected);
      setActiveChannel(null);
      toast.success("WhatsApp connected");
    };
    submit();
  }, [embeddedCode, embeddedIds]);

  useEffect(() => {
    const loadWhatsAppSnapshot = async () => {
      setLoadingWhatsAppSnapshot(true);
      const result = await getWhatsAppSnapshot();
      if (result.ok && result.snapshot) {
        setWhatsapp(result.snapshot.settings);
        setWhatsappConnected(result.snapshot.connected);
      } else if (result.error) {
        toast.error(result.error);
      }
      setLoadingWhatsAppSnapshot(false);
    };
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
    loadWhatsAppSnapshot();
    loadMessengerSnapshot();
  }, []);

  const openModal = (channel: Channel) => {
    setActiveChannel(channel);
    setMode("choose");
    if (channel === "whatsapp") setWaForm(EMPTY_WHATSAPP_FORM);
    else setMsgForm(EMPTY_MESSENGER_FORM);
  };

  const closeModal = () => {
    if (submitting || embeddedConnecting) return;
    setActiveChannel(null);
  };

  const handleManualConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (activeChannel === "whatsapp") {
      const result = await connectWhatsApp(waForm);
      setSubmitting(false);
      if (!result.ok || !result.snapshot) {
        toast.error(result.error || "Failed to connect WhatsApp");
        return;
      }
      setWhatsapp(result.snapshot.settings);
      setWhatsappConnected(result.snapshot.connected);
      setActiveChannel(null);
      setWaForm(EMPTY_WHATSAPP_FORM);
      toast.success("WhatsApp connected");
      return;
    }

    if (activeChannel === "messenger") {
      const result = await connectMessenger(msgForm);
      setSubmitting(false);
      if (!result.ok || !result.snapshot) {
        toast.error(result.error || "Failed to connect Messenger");
        return;
      }
      setMessenger(result.snapshot.settings);
      setMessengerConnected(result.snapshot.connected);
      setActiveChannel(null);
      setMsgForm(EMPTY_MESSENGER_FORM);
      toast.success("Messenger connected");
      return;
    }

    setSubmitting(false);
  };

  const handleFacebookLogin = () => {
    if (!window.FB) {
      toast.error("Facebook SDK is still loading — try again in a moment.");
      return;
    }

    if (activeChannel === "whatsapp") {
      if (!META_EMBEDDED_SIGNUP_CONFIG_ID) {
        toast.error("Embedded signup isn't configured yet — use manual setup for now.");
        return;
      }
      window.FB.login(
        (response) => {
          if (response.authResponse?.code) {
            setEmbeddedCode(response.authResponse.code);
          } else {
            toast.error("Facebook login was cancelled or failed.");
          }
        },
        {
          config_id: META_EMBEDDED_SIGNUP_CONFIG_ID,
          response_type: "code",
          override_default_response_type: true,
          extras: { setup: {}, featureType: "", sessionInfoVersion: "3" },
        },
      );
      return;
    }

    if (activeChannel === "messenger") {
      if (!META_MESSENGER_CONFIG_ID) {
        toast.error("Facebook login isn't configured yet — use manual setup for now.");
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
            setActiveChannel(null);
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
    }
  };

  const handleDisconnect = async (channel: Channel) => {
    setDisconnectingChannel(channel);
    const result = channel === "whatsapp" ? await disconnectWhatsApp() : await disconnectMessenger();
    setDisconnectingChannel(null);

    if (!result.ok) {
      toast.error(
        result.error || `Failed to disconnect ${channel === "whatsapp" ? "WhatsApp" : "Messenger"}`,
      );
      return;
    }

    if (channel === "whatsapp") {
      setWhatsapp(null);
      setWhatsappConnected(false);
      toast.success("WhatsApp disconnected");
    } else {
      setMessenger(null);
      setMessengerConnected(false);
      toast.success("Messenger disconnected");
    }
  };

  const modalTitle = activeChannel === "whatsapp" ? "Connect WhatsApp" : "Connect Messenger";
  const modalHelperText =
    activeChannel === "whatsapp"
      ? "Log into your Facebook Business account — we'll pick up your WhatsApp number automatically, no copy-pasting."
      : "Log into Facebook — we'll connect the Page you manage automatically, no copy-pasting.";

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
            const channel: Channel | null =
              app.id === "whatsapp" || app.id === "messenger" ? (app.id as Channel) : null;

            const isConnected = channel === "whatsapp" ? whatsappConnected : channel === "messenger" ? messengerConnected : false;
            const loadingSnapshot =
              channel === "whatsapp"
                ? loadingWhatsAppSnapshot
                : channel === "messenger"
                  ? loadingMessengerSnapshot
                  : false;
            const isDisconnecting = disconnectingChannel === channel;

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

                {channel && isConnected ? (
                  <div className="space-y-2">
                    {channel === "whatsapp" &&
                      (whatsapp?.verified_name || whatsapp?.display_phone_number) && (
                        <p className="text-xs text-gray-500">
                          {whatsapp.verified_name && (
                            <span className="font-medium text-gray-700">
                              {whatsapp.verified_name}
                            </span>
                          )}
                          {whatsapp.verified_name && whatsapp.display_phone_number && " — "}
                          {whatsapp.display_phone_number}
                        </p>
                      )}
                    {channel === "messenger" && messenger?.page_name && (
                      <p className="text-xs text-gray-500">
                        <span className="font-medium text-gray-700">
                          {messenger.page_name}
                        </span>
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDisconnect(channel)}
                      disabled={isDisconnecting}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                    >
                      {isDisconnecting && <BiLoaderAlt className="animate-spin" size={16} />}
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={channel ? () => openModal(channel) : undefined}
                    disabled={!!channel && loadingSnapshot}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-thunder-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-thunder-black/90 disabled:opacity-50"
                  >
                    {channel && loadingSnapshot && (
                      <BiLoaderAlt className="animate-spin" size={16} />
                    )}
                    Connect {app.name}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Connect channel modal — shared shell, content switches on activeChannel */}
      {activeChannel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">{modalTitle}</h3>
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
                <p className="text-center text-[11px] text-gray-400">{modalHelperText}</p>

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

            {mode === "manual" && activeChannel === "whatsapp" && (
              <form onSubmit={handleManualConnect} className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Phone Number ID
                  </label>
                  <input
                    type="text"
                    required
                    value={waForm.phoneNumberId}
                    onChange={(e) =>
                      setWaForm((f) => ({ ...f, phoneNumberId: e.target.value }))
                    }
                    placeholder="From Meta → WhatsApp → API Setup"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Access Token
                  </label>
                  <input
                    type="password"
                    required
                    value={waForm.accessToken}
                    onChange={(e) =>
                      setWaForm((f) => ({ ...f, accessToken: e.target.value }))
                    }
                    placeholder="Temporary or permanent token"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    WhatsApp Business Account ID
                  </label>
                  <input
                    type="text"
                    required
                    value={waForm.businessAccountId}
                    onChange={(e) =>
                      setWaForm((f) => ({ ...f, businessAccountId: e.target.value }))
                    }
                    placeholder="WABA ID"
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

            {mode === "manual" && activeChannel === "messenger" && (
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
    </div>
  );
};

export default AppsIntegrationDetials;
