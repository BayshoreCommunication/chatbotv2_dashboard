"use client";

import { askChatAction, type AskActionResponse } from "@/app/actions/ask";
import { useEffect, useRef, useState, useTransition } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  tools_used?: string[];
  error?: boolean;
};

type ParsedAssistantContent = {
  text: string;
  calendlyUrl: string | null;
  slots: string[];
};

function stripMarkdown(value: string): string {
  return value.replace(/\*\*/g, "").replace(/`/g, "").trim();
}

function parseAssistantContent(content: string): ParsedAssistantContent {
  let calendlyUrl: string | null = null;
  let normalized = content;

  normalized = normalized.replace(
    /\[([^\]]+)\]\((https?:\/\/calendly\.com\/[^)\s]+)\)/gi,
    (_full, label, url) => {
      if (!calendlyUrl) calendlyUrl = url;
      return String(label);
    },
  );

  const rawCalendlyMatch = normalized.match(/https?:\/\/calendly\.com\/[^\s)]+/i);
  if (!calendlyUrl && rawCalendlyMatch) calendlyUrl = rawCalendlyMatch[0];

  normalized = normalized.replace(/https?:\/\/calendly\.com\/[^\s)]+/gi, "").trim();

  const slots: string[] = [];
  const keptLines: string[] = [];

  for (const line of normalized.split("\n")) {
    const trimmed = line.trim();
    const slotMatch = trimmed.match(/^\d+[\.\)]\s*(.+)$/);
    if (slotMatch) {
      const candidate = stripMarkdown(slotMatch[1]);
      if (/(AM|PM|UTC|\d{1,2}:\d{2})/i.test(candidate)) {
        slots.push(candidate);
        continue;
      }
    }
    keptLines.push(line);
  }

  return {
    text: keptLines.join("\n").replace(/\n{3,}/g, "\n\n").trim(),
    calendlyUrl,
    slots: Array.from(new Set(slots)).slice(0, 8),
  };
}

type Props = {
  companyId: string;
  isKbTrained?: boolean;
};

export default function TestLiveChat({ companyId, isKbTrained = false }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatting, startChat] = useTransition();
  const [sessionId] = useState(() => `test-${Date.now()}`);
  const [copied, setCopied] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const [userTimezone] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      }
    } catch {}
    return "";
  });

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendChatMessage = (rawMessage: string) => {
    const msg = rawMessage.trim();
    if (!msg || isChatting) return;
    if (rawMessage === chatInput) setChatInput("");

    setMessages((prev) => [...prev, { role: "user", content: msg }]);

    startChat(async () => {
      const res: AskActionResponse = await askChatAction(companyId, msg, sessionId, userTimezone);
      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: res.companyNotFound
              ? "Company not found. Check the company ID."
              : res.error || "Something went wrong.",
            error: true,
          },
        ]);
        return;
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data!.reply, tools_used: res.data!.tools_used },
      ]);
    });
  };

  const handleCopyConversation = async () => {
    const pairs: { user: string; ai: string }[] = [];
    for (let i = 0; i < messages.length - 1; i++) {
      if (messages[i].role === "user" && messages[i + 1].role === "assistant") {
        pairs.push({ user: messages[i].content, ai: messages[i + 1].content });
        i++;
      }
    }
    await navigator.clipboard.writeText(JSON.stringify(pairs, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-gray-100 bg-gray-50 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Live Chat Test</h2>
          <p className="text-xs text-gray-400">Test your chatbot with real questions.</p>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={handleCopyConversation}
              title="Copy conversation as JSON"
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                copied
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {copied ? <>✓ Copied!</> : <>Copy JSON</>}
            </button>
          )}
          {isKbTrained ? (
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              KB Active
            </span>
          ) : (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
              No KB yet
            </span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="min-h-[380px] max-h-[540px] flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center text-sm text-gray-400">
              <p className="mb-2 text-3xl">💬</p>
              <p className="font-medium text-gray-500">Send a message to test your chatbot</p>
              {!isKbTrained && (
                <p className="mt-1 text-xs text-amber-500">
                  Tip: Train the knowledge base first for company-specific answers.
                </p>
              )}
            </div>
          </div>
        )}

        {messages.map((msg, i) => {
          const parsed = msg.role === "assistant" ? parseAssistantContent(msg.content) : null;
          const bubbleText = parsed ? parsed.text || msg.content : msg.content;

          return (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "rounded-br-sm bg-gray-900 text-white"
                    : msg.error
                      ? "rounded-bl-sm border border-red-200 bg-red-50 text-red-700"
                      : "rounded-bl-sm bg-gray-100 text-gray-900"
                }`}
              >
                <p className="whitespace-pre-wrap">{bubbleText}</p>

                {parsed && parsed.slots.length > 0 && (
                  <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50 p-3">
                    <p className="text-xs font-semibold text-blue-700">Select an available time</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {parsed.slots.map((slot) => (
                        <button
                          key={`${i}-${slot}`}
                          type="button"
                          onClick={() => sendChatMessage(`Please confirm this slot: ${slot}`)}
                          disabled={isChatting}
                          className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {parsed && parsed.calendlyUrl && (
                  <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                    <p className="text-xs font-semibold text-emerald-700">Confirm appointment</p>
                    <a
                      href={parsed.calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Open confirmation page
                    </a>
                  </div>
                )}

                {msg.tools_used && msg.tools_used.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {msg.tools_used.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-medium text-gray-500"
                      >
                        Tool: {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isChatting && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Input bar */}
      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendChatMessage(chatInput)}
            placeholder="Ask something about your company…"
            disabled={isChatting}
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => sendChatMessage(chatInput)}
            disabled={isChatting || !chatInput.trim()}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send"
          >
            {isChatting ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.28 4.255A.75.75 0 0 0 4.272 8H10a.75.75 0 0 1 0 1.5H4.272a.75.75 0 0 0-.714.507l-1.279 4.255a.75.75 0 0 0 .826.95 28.896 28.896 0 0 0 15.293-7.154.75.75 0 0 0 0-1.115A28.897 28.897 0 0 0 3.105 2.288Z" />
              </svg>
            )}
          </button>
        </div>
        <p className="mt-1.5 text-center text-[10px] text-gray-400">
          Session: <code className="font-mono">{sessionId}</code>
        </p>
      </div>
    </div>
  );
}
