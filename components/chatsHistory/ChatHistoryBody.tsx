"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BiCheck, BiCopy, BiDownArrowAlt, BiSend } from "react-icons/bi";
import type { ConversationHistoryItem, ConversationHistoryMessage } from "@/types/conversation-history";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";
const WS_BASE = API_URL.replace(/^https/, "wss").replace(/^http/, "ws");

interface ChatHistoryBodyProps {
  companyId: string;
  selectedSession: ConversationHistoryItem | null;
  onSessionActivity?: (sessionId: string, role: string, content: string, timestamp: string | null) => void;
}

type LiveMessage = ConversationHistoryMessage & { source?: string };

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

async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  Object.assign(ta.style, { position: "fixed", top: "0", left: "0", opacity: "0" });
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

const ChatHistoryBody = ({ companyId, selectedSession, onSessionActivity }: ChatHistoryBodyProps) => {
  const [replyText, setReplyText] = useState("");
  const [isTakeover, setIsTakeover] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [liveMessages, setLiveMessages] = useState<LiveMessage[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const pingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Ref so WS onmessage always sees the current selected session (no stale closure)
  const selectedSessionRef = useRef(selectedSession);
  useEffect(() => { selectedSessionRef.current = selectedSession; }, [selectedSession]);

  // Reset live messages and takeover state when session changes
  useEffect(() => {
    setLiveMessages([]);
    setIsTakeover(false);
    setIsAiTyping(false);
    setReplyText("");
  }, [selectedSession?.session_id]);

  // Dashboard WebSocket — receive new visitor messages in real-time
  useEffect(() => {
    if (!companyId) return;
    let unmounted = false;

    const url = `${WS_BASE}/api/v1/chat/${companyId}/ws`;

    function connect() {
      const ws = new WebSocket(url);
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
            onSessionActivity?.(data.session_id, "user", data.content, data.timestamp ?? null);
            if (isSelected) {
              setLiveMessages((prev) => {
                const exists = prev.some(
                  (m) => m.role === "user" && m.content === data.content && m.timestamp === (data.timestamp ?? null)
                );
                if (exists) return prev;
                return [...prev, { role: "user", content: data.content, timestamp: data.timestamp ?? null }];
              });
              endRef.current?.scrollIntoView({ behavior: "smooth" });
            }
          } else if (data.type === "typing_start" && isSelected) {
            setIsAiTyping(true);
            endRef.current?.scrollIntoView({ behavior: "smooth" });
          } else if (data.type === "ai_reply") {
            onSessionActivity?.(data.session_id, "assistant", data.content, data.timestamp ?? null);
            if (isSelected) {
              setIsAiTyping(false);
              setLiveMessages((prev) => {
                const exists = prev.some(
                  (m) => m.role === "assistant" && m.content === data.content && m.timestamp === (data.timestamp ?? null)
                );
                if (exists) return prev;
                return [...prev, { role: "assistant", content: data.content, timestamp: data.timestamp ?? null }];
              });
              endRef.current?.scrollIntoView({ behavior: "smooth" });
            }
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

  // Auto-scroll when session changes
  useEffect(() => {
    if (!selectedSession) return;
    endRef.current?.scrollIntoView({ behavior: "auto" });
  }, [selectedSession?.session_id]);

  const takeoverBtnClass = isTakeover
    ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
    : "bg-gray-100 text-gray-700 hover:bg-gray-200";

  const handleToggleTakeover = async () => {
    if (!selectedSession) return;
    const next = !isTakeover;
    try {
      await fetch(`${API_URL}/api/v1/chat/${companyId}/${selectedSession.session_id}/takeover`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: next }),
      });
      setIsTakeover(next);
    } catch (err) {
      console.error("Takeover toggle failed", err);
    }
  };

  const handleSendReply = async () => {
    if (!replyText.trim() || !selectedSession || isSending) return;
    const content = replyText.trim();
    setReplyText("");
    setIsSending(true);

    try {
      const res = await fetch(`${API_URL}/api/v1/chat/${companyId}/${selectedSession.session_id}/owner-reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      setLiveMessages((prev) => [
        ...prev,
        { role: "assistant", content, timestamp: data.timestamp ?? new Date().toISOString(), source: "human" },
      ]);
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Owner reply failed", err);
    } finally {
      setIsSending(false);
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

  const handleCopyJson = async () => {
    if (!selectedSession) return;
    try {
      await copyToClipboard(JSON.stringify({ messages: allMessages }, null, 2));
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    } catch {}
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
            <p className="text-sm font-semibold text-gray-900">{getSessionTitle(selectedSession)}</p>
            {isTakeover && (
              <p className="text-xs text-amber-600 font-medium">Human takeover active</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyJson}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {copiedJson ? <BiCheck size={16} /> : <BiCopy size={16} />}
            {copiedJson ? "Copied" : "Copy JSON"}
          </button>

          <button
            type="button"
            onClick={() => endRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <BiDownArrowAlt size={16} />
            Latest
          </button>

          {/* Take Over toggle */}
          <button
            type="button"
            onClick={handleToggleTakeover}
            className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${takeoverBtnClass}`}
          >
            <span className={`h-2 w-2 rounded-full ${isTakeover ? "bg-amber-500" : "bg-gray-400"}`} />
            {isTakeover ? "Release Control" : "Take Over"}
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
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <div className="space-y-4">
          {allMessages.map((msg, index) => (
            <div
              key={`${msg.role}-${index}-${msg.timestamp ?? "na"}`}
              className={`flex ${msg.role === "assistant" ? "justify-end" : "justify-start"}`}
            >
              {msg.role !== "assistant" && (
                <div className="flex items-start gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                    V
                  </div>
                  <div>
                    <div className="max-w-md rounded-2xl rounded-tl-sm bg-blue-600 px-4 py-2 text-white">
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
                    <div className="max-w-md rounded-2xl rounded-tr-sm bg-gray-200 px-4 py-2 text-gray-900">
                      {msg.content}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-xs text-gray-400">{formatTimestamp(msg.timestamp)}</span>
                      {(msg as LiveMessage).source === "human" ? (
                        <span className="rounded px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium">
                          You
                        </span>
                      ) : (
                        <span className="rounded px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium">
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
            <div className="flex justify-end">
              <div className="flex flex-row-reverse items-start gap-2">
                <div className="flex flex-col items-end">
                  <div className="max-w-md rounded-2xl rounded-tr-sm bg-gray-200 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:300ms]" />
                    </div>
                  </div>
                  <span className="mt-1 rounded px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium">AI</span>
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
            disabled={!isTakeover || isSending}
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
          />
          <button
            type="button"
            onClick={handleSendReply}
            disabled={!isTakeover || !replyText.trim() || isSending}
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
