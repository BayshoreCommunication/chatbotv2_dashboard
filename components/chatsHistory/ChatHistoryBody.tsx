"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BiDownArrowAlt, BiLoaderAlt, BiSend } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { sendOwnerReplyAction, toggleTakeoverAction } from "@/app/actions/conversationHistory";
import type { ConversationHistoryItem, ConversationHistoryMessage } from "@/types/conversation-history";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";
const WS_BASE = API_URL.replace(/^https/, "wss").replace(/^http/, "ws");

// Where a conversation came in from — sessions without a channel are
// website-widget chats.
const CHANNEL_BADGES: Record<string, { label: string; className: string }> = {
  messenger: { label: "Messenger", className: "bg-blue-50 text-blue-700" },
  instagram: { label: "Instagram", className: "bg-pink-50 text-pink-700" },
  whatsapp: { label: "WhatsApp", className: "bg-green-50 text-green-700" },
};
const WIDGET_BADGE = { label: "Website", className: "bg-gray-100 text-gray-600" };

// The dashboard websocket requires the signed-in user's token. Read fresh
// on every (re)connect so a refreshed or re-issued token is picked up. A
// plain GET to NextAuth's session endpoint, deliberately not a server
// action: Next.js discards in-flight server actions on navigation, which
// would leave the socket never connecting.
async function fetchRealtimeToken(): Promise<string> {
  try {
    const res = await fetch("/api/auth/session", { cache: "no-store" });
    const data = (await res.json()) as { user?: { accessToken?: string } } | null;
    return data?.user?.accessToken ?? "";
  } catch {
    return "";
  }
}

interface ChatHistoryBodyProps {
  companyId: string;
  selectedSession: ConversationHistoryItem | null;
  onSessionActivity?: (
    sessionId: string,
    role: string,
    content: string,
    timestamp: string | null,
    channel?: string | null,
  ) => void;
  takeoverOverrides: Record<string, boolean>;
  onTakeoverChange: (changes: Record<string, boolean>) => void;
}

// Messages that arrived since the page loaded. `id` is a stable React key;
// `fresh` plays the slide-in animation once (cleared when it ends, so
// switching back to a chat doesn't replay it); `status: "sending"` is an
// owner reply shown immediately, before the backend confirms delivery.
type LiveMessage = ConversationHistoryMessage & {
  source?: string;
  id?: string;
  fresh?: boolean;
  status?: "sending";
};

let liveMessageSeq = 0;
function newLiveMessageId(): string {
  liveMessageSeq += 1;
  return `live-${Date.now()}-${liveMessageSeq}`;
}

function getSessionTitle(session: ConversationHistoryItem): string {
  if (session.lead_captured && session.lead_name?.trim()) return session.lead_name.trim();
  return session.session_id;
}

function formatTimestamp(value: string | null): string {
  if (!value) return "";
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleString();
}

const ChatHistoryBody = ({
  companyId,
  selectedSession,
  onSessionActivity,
  takeoverOverrides,
  onTakeoverChange,
}: ChatHistoryBodyProps) => {
  const [replyText, setReplyText] = useState("");
  const [takeoverPending, setTakeoverPending] = useState(false);
  const isTakeover = selectedSession
    ? (takeoverOverrides[selectedSession.session_id] ?? selectedSession.human_takeover ?? false)
    : false;
  // Kept per conversation (not reset on switching chats) so messages that
  // arrived live — in this chat or in one you weren't looking at — are
  // still there when you open it, without a page refresh.
  const [liveBySession, setLiveBySession] = useState<Record<string, LiveMessage[]>>({});
  const updateLive = (sessionId: string, update: (prev: LiveMessage[]) => LiveMessage[]) => {
    setLiveBySession((all) => ({ ...all, [sessionId]: update(all[sessionId] ?? []) }));
  };
  const selectedSessionId = selectedSession?.session_id;
  const liveMessages = useMemo(
    () => (selectedSessionId ? (liveBySession[selectedSessionId] ?? []) : []),
    [liveBySession, selectedSessionId],
  );
  const [isAiTyping, setIsAiTyping] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // Follow new messages only while the owner is already at the bottom, so
  // scrolling up to read older messages isn't yanked back down.
  const stickToBottomRef = useRef(true);
  const wsRef = useRef<WebSocket | null>(null);
  const pingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Ref so WS onmessage always sees the current selected session (no stale closure)
  const selectedSessionRef = useRef(selectedSession);
  useEffect(() => { selectedSessionRef.current = selectedSession; }, [selectedSession]);
  const onTakeoverChangeRef = useRef(onTakeoverChange);
  useEffect(() => { onTakeoverChangeRef.current = onTakeoverChange; }, [onTakeoverChange]);

  // Reset per-view state when switching chats (live messages are kept)
  useEffect(() => {
    setIsAiTyping(false);
    setReplyText("");
  }, [selectedSession?.session_id]);

  // Dashboard WebSocket — receive new visitor messages in real-time
  useEffect(() => {
    if (!companyId) return;
    let unmounted = false;

    const url = `${WS_BASE}/api/v1/chat/${companyId}/ws`;

    async function connect() {
      const token = await fetchRealtimeToken();
      if (unmounted) return;
      const ws = new WebSocket(`${url}?token=${encodeURIComponent(token)}`);
      wsRef.current = ws;

      ws.onopen = () => {
        pingRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) ws.send("ping");
        }, 25000);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const currentSession = selectedSessionRef.current;
          const isSelected = data.session_id === currentSession?.session_id;

          if (data.type === "new_message") {
            // Always notify list (creates new session row if unknown)
            onSessionActivity?.(data.session_id, "user", data.content, data.timestamp ?? null, data.channel);
            updateLive(data.session_id, (prev) => {
                const newTs = data.timestamp ? new Date(data.timestamp).getTime() : 0;
                // Dedup within 30 s — catches the same message re-broadcast when
                // the widget re-sends a pending question after takeover is released
                const exists = prev.some((m) => {
                  if (m.role !== "user" || m.content !== data.content) return false;
                  if (!m.timestamp) return false;
                  return Math.abs(new Date(m.timestamp).getTime() - newTs) < 30_000;
                });
                if (exists) return prev;
                return [
                  ...prev,
                  { id: newLiveMessageId(), fresh: true, role: "user", content: data.content, timestamp: data.timestamp ?? null },
                ];
              });
          } else if (data.type === "takeover_changed") {
            // Another tab or team member took over / released a chat.
            onTakeoverChangeRef.current({ [data.session_id]: Boolean(data.active) });
          } else if (data.type === "typing_start" && isSelected) {
            setIsAiTyping(true);
          } else if (data.type === "ai_reply") {
            onSessionActivity?.(data.session_id, "assistant", data.content, data.timestamp ?? null, data.channel);
            if (isSelected) setIsAiTyping(false);
            updateLive(data.session_id, (prev) => {
              const exists = prev.some(
                (m) => m.role === "assistant" && m.content === data.content && m.timestamp === (data.timestamp ?? null)
              );
              if (exists) return prev;
              return [
                ...prev,
                { id: newLiveMessageId(), fresh: true, role: "assistant", content: data.content, timestamp: data.timestamp ?? null },
              ];
            });
          }
        } catch {}
      };

      ws.onclose = () => {
        if (pingRef.current) clearInterval(pingRef.current);
        if (!unmounted) setTimeout(connect, 3000);
      };

      ws.onerror = () => ws.close();
    }

    connect();

    return () => {
      unmounted = true;
      if (pingRef.current) clearInterval(pingRef.current);
      wsRef.current?.close();
    };
  }, [companyId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Jump straight to the latest message when a conversation is opened.
  useEffect(() => {
    if (!selectedSession) return;
    stickToBottomRef.current = true;
    endRef.current?.scrollIntoView({ behavior: "auto" });
  }, [selectedSession?.session_id]);

  const takeoverBtnClass = isTakeover
    ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
    : "bg-gray-100 text-gray-700 hover:bg-gray-200";

  const handleToggleTakeover = async () => {
    if (!selectedSession || takeoverPending) return;
    const sessionId = selectedSession.session_id;
    const next = !isTakeover;
    setTakeoverPending(true);
    try {
      const result = await toggleTakeoverAction(companyId, sessionId, next);
      if (!result.ok) {
        toast.error(result.error || "Couldn't change takeover — please try again.");
        return;
      }
      // Only one chat can be taken over at a time — the backend hands any
      // other taken-over chat back to the AI.
      const released = result.releasedSessionIds ?? [];
      onTakeoverChange({
        [sessionId]: next,
        ...Object.fromEntries(released.map((id) => [id, false])),
      });
      if (!next) {
        toast.success("AI is back on for this chat.");
      } else if (released.length > 0) {
        toast.success("You're now replying here. Your previous chat was handed back to the AI.");
      } else {
        toast.success("You're now replying — AI is paused for this chat.");
      }
    } catch (err) {
      console.error("Takeover toggle failed", err);
      toast.error("Couldn't change takeover — please try again.");
    } finally {
      setTakeoverPending(false);
    }
  };

  const handleSendReply = async () => {
    if (!replyText.trim() || !selectedSession) return;
    const content = replyText.trim();
    const sessionId = selectedSession.session_id;
    const id = newLiveMessageId();
    setReplyText("");
    stickToBottomRef.current = true;
    // Show the reply right away (faded, "Sending…") instead of waiting for
    // the backend — for Messenger/Instagram/WhatsApp that wait includes
    // Meta's own send, which made the bubble pop in a second or two late.
    updateLive(sessionId, (prev) => [
      ...prev,
      {
        id,
        fresh: true,
        role: "assistant",
        content,
        timestamp: new Date().toISOString(),
        source: "human",
        status: "sending",
      },
    ]);

    const dropAndRestore = (message: string) => {
      updateLive(sessionId, (prev) => prev.filter((m) => m.id !== id));
      // e.g. Meta's 24-hour reply window closed, or the channel needs
      // reconnecting — say so, and give the owner their text back.
      toast.error(message, { duration: 8000 });
      setReplyText((current) => current || content);
    };

    try {
      const result = await sendOwnerReplyAction(companyId, sessionId, content);
      if (!result.ok) {
        dropAndRestore(result.error || "Message not sent — please try again.");
        return;
      }
      updateLive(sessionId, (prev) => prev.map((m) => (m.id === id ? { ...m, status: undefined } : m)));
    } catch (err) {
      console.error("Owner reply failed", err);
      dropAndRestore("Message not sent — please try again.");
    }
  };

  const allMessages: LiveMessage[] = useMemo(() => {
    const combined = [...(selectedSession?.messages ?? []), ...liveMessages];
    const seen = new Set<string>();
    const deduped = combined.filter((msg) => {
      let ts = "";
      if (msg.timestamp) {
        try { ts = new Date(msg.timestamp).toISOString().slice(0, 19); } catch { ts = msg.timestamp; }
      }
      const key = `${msg.role}|${msg.content}|${ts}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return deduped.sort((a, b) => {
      if (!a.timestamp && !b.timestamp) return 0;
      if (!a.timestamp) return -1;
      if (!b.timestamp) return 1;
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });
  }, [selectedSession?.messages, liveMessages]);

  // Glide down to new messages / the typing dots — after they've rendered,
  // so the scroll lands on them instead of on the old bottom.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !stickToBottomRef.current) return;
    const frame = requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [allMessages.length, isAiTyping]);

  const handleMessagesScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    stickToBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
  };

  if (!selectedSession) {
    return (
      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <p className="text-gray-400 text-sm">Select a conversation to view</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-white border border-gray-200">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
            {getSessionTitle(selectedSession).charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-900">{getSessionTitle(selectedSession)}</p>
              <span
                className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${(selectedSession.channel && CHANNEL_BADGES[selectedSession.channel] || WIDGET_BADGE).className}`}
              >
                {(selectedSession.channel && CHANNEL_BADGES[selectedSession.channel] || WIDGET_BADGE).label}
              </span>
            </div>
            {isTakeover && (
              <p className="text-xs text-amber-600 font-medium">Human takeover active</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              stickToBottomRef.current = true;
              endRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <BiDownArrowAlt size={16} />
            Latest
          </button>

          {/* Take Over toggle */}
          <button
            type="button"
            onClick={handleToggleTakeover}
            disabled={takeoverPending}
            aria-busy={takeoverPending}
            className={`flex min-w-[9.5rem] items-center justify-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors disabled:cursor-wait disabled:opacity-70 ${takeoverBtnClass}`}
          >
            {takeoverPending ? (
              <BiLoaderAlt size={15} className="animate-spin" />
            ) : (
              <span className={`h-2 w-2 rounded-full ${isTakeover ? "bg-amber-500" : "bg-gray-400"}`} />
            )}
            {takeoverPending
              ? isTakeover
                ? "Releasing…"
                : "Taking over…"
              : isTakeover
                ? "Release Control"
                : "Take Over"}
          </button>
        </div>
      </div>

      {/* Takeover banner */}
      {isTakeover && (
        <div className="flex items-center gap-2 border-b border-amber-200 bg-amber-50 px-6 py-2 text-xs text-amber-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
          AI is paused. You are replying as the owner. Click <strong>Release Control</strong> to hand back to AI.
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} onScroll={handleMessagesScroll} className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <div className="space-y-4">
          {allMessages.map((msg, index) => (
            <div
              key={msg.id ?? `${msg.role}-${index}-${msg.timestamp ?? "na"}`}
              className={`flex ${msg.role === "assistant" ? "justify-end" : "justify-start"} ${msg.fresh ? "chat-message-in" : ""}`}
              onAnimationEnd={
                msg.fresh && msg.id && selectedSession
                  ? () =>
                      updateLive(selectedSession.session_id, (prev) =>
                        prev.map((m) => (m.id === msg.id ? { ...m, fresh: false } : m)),
                      )
                  : undefined
              }
            >
              {msg.role !== "assistant" && (
                <div className="flex items-start gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-thunder-black text-sm font-semibold text-white">
                    V
                  </div>
                  <div>
                    <div className="max-w-md rounded-2xl rounded-tl-sm bg-thunder-black px-4 py-2 text-white">
                      {msg.content}
                    </div>
                    <span className="mt-1 block text-xs text-gray-400">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  </div>
                </div>
              )}
              {msg.role === "assistant" && (
                <div className="flex flex-row-reverse items-start gap-2">
                  <div className="flex flex-col items-end">
                    <div
                      className={`max-w-md rounded-2xl rounded-tr-sm bg-gray-200 px-4 py-2 text-gray-900 transition-opacity duration-300 ${msg.status === "sending" ? "opacity-60" : "opacity-100"}`}
                    >
                      {msg.content}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5">
                      {msg.status === "sending" ? (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <BiLoaderAlt size={12} className="animate-spin" />
                          Sending…
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">{formatTimestamp(msg.timestamp)}</span>
                      )}
                      {msg.source === "human" ? (
                        <span className="rounded px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium">
                          You
                        </span>
                      ) : (
                        <span className="rounded px-1.5 py-0.5 bg-primary/10 text-primary-dark text-xs font-medium">
                          AI
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {allMessages.length === 0 && (
            <p className="text-sm text-gray-400">No messages in this session.</p>
          )}

          {/* AI typing indicator */}
          {isAiTyping && (
            <div className="chat-message-in flex justify-end">
              <div className="flex flex-row-reverse items-start gap-2">
                <div className="flex flex-col items-end">
                  <div className="max-w-md rounded-2xl rounded-tr-sm bg-gray-200 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:300ms]" />
                    </div>
                  </div>
                  <span className="mt-1 rounded px-1.5 py-0.5 bg-primary/10 text-primary-dark text-xs font-medium">AI</span>
                </div>
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>
      </div>

      {/* Reply input */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder={isTakeover ? "Type your reply…" : "Enable Take Over to reply manually"}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendReply()}
            disabled={!isTakeover}
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
          />
          <button
            type="button"
            onClick={handleSendReply}
            disabled={!isTakeover || !replyText.trim()}
            className="rounded-lg bg-gray-900 p-2 text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <BiSend size={20} />
          </button>
        </div>
        {!isTakeover && (
          <p className="mt-1.5 text-center text-xs text-gray-400">
            Click <strong>Take Over</strong> to pause AI and reply as yourself
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatHistoryBody;
