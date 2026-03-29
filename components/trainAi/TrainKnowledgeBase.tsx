"use client";

import { askChatAction, type AskActionResponse } from "@/app/actions/ask";
import {
  getKnowledgeStatusAction,
  trainKnowledgeBaseAction,
  type TrainResult,
  type TrainStatus,
} from "@/app/actions/knowledgeBase";
import { useEffect, useRef, useState, useTransition } from "react";

// â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type Props = {
  companyId: string;
  companyName?: string;
  companyType?: string;
  websiteUrl?: string;
};

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
    }
  );

  const rawCalendlyMatch = normalized.match(/https?:\/\/calendly\.com\/[^\s)]+/i);
  if (!calendlyUrl && rawCalendlyMatch) {
    calendlyUrl = rawCalendlyMatch[0];
  }

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

// â”€â”€ Small reusable UI pieces â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 75
      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
      : score >= 45
      ? "bg-amber-100 text-amber-700 border-amber-200"
      : "bg-red-100 text-red-700 border-red-200";
  const label =
    score >= 75 ? "Excellent" : score >= 45 ? "Good" : "Needs improvement";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${color}`}
    >
      {score.toFixed(1)} / 100 - {label}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <span className="text-lg">{icon}</span>
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

// â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function TrainKnowledgeBase({
  companyId,
  companyName = "",
  companyType = "other",
  websiteUrl = "",
}: Props) {
  // â”€â”€ Training state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [url, setUrl]           = useState(websiteUrl);
  const [name, setName]         = useState(companyName);
  const [type, setType]         = useState(companyType);
  const [error, setError]       = useState<string | null>(null);
  const [trainResult, setTrainResult] = useState<TrainResult | null>(null);
  const [status, setStatus]     = useState<TrainStatus | null>(null);
  const [isPending, startTransition] = useTransition();

  // â”€â”€ Chat tester state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [messages, setMessages]   = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatting, startChat]   = useTransition();
  const [sessionId]               = useState(() => `test-${Date.now()}`);
  const [copied, setCopied]       = useState(false);
  const chatBottomRef             = useRef<HTMLDivElement>(null);
  const [userTimezone]            = useState(() => {
    try {
      if (typeof window !== "undefined") {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      }
    } catch {}
    return "";
  });

  // â”€â”€ Load status on mount â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    if (!companyId) return;
    getKnowledgeStatusAction(companyId).then((res) => {
      if (res.ok && res.data) setStatus(res.data);
    });
  }, [companyId]);

  // â”€â”€ Auto-scroll chat â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // â”€â”€ Handle training â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleTrain = () => {
    setError(null);
    setTrainResult(null);
    if (!url.trim()) { setError("Website URL is required."); return; }
    try { new URL(url.trim()); } catch {
      setError("Please enter a valid URL (e.g. https://example.com)."); return;
    }
    startTransition(async () => {
      const res = await trainKnowledgeBaseAction(
        companyId, url.trim(), name.trim() || companyName, type
      );
      if (!res.ok) { setError(res.error || "Training failed."); return; }
      setTrainResult(res.data!);
      const statusRes = await getKnowledgeStatusAction(companyId);
      if (statusRes.ok && statusRes.data) setStatus(statusRes.data);
    });
  };

  // â”€â”€ Handle chat send â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const sendChatMessage = (rawMessage: string) => {
    const msg = rawMessage.trim();
    if (!msg || isChatting) return;

    if (rawMessage === chatInput) {
      setChatInput("");
    }

    const userMsg: ChatMessage = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);

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
        {
          role: "assistant",
          content: res.data!.reply,
          tools_used: res.data!.tools_used,
        },
      ]);
    });
  };

  const handleChat = () => {
    sendChatMessage(chatInput);
  };

  const updatesLeft = status
    ? (status.update_limit ?? 10) - (status.update_count ?? 0)
    : null;

  // â”€â”€ Copy conversation as JSON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleCopyConversation = async () => {
    const pairs: { user: string; ai: string }[] = [];
    for (let i = 0; i < messages.length - 1; i++) {
      if (messages[i].role === "user" && messages[i + 1].role === "assistant") {
        pairs.push({ user: messages[i].content, ai: messages[i + 1].content });
        i++; // skip the assistant message we just consumed
      }
    }
    await navigator.clipboard.writeText(JSON.stringify(pairs, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // â”€â”€ Render â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  return (
    <div className="mx-auto w-full max-w-full space-y-6">

      {/* â”€â”€ Top header â”€â”€ */}
      <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-900 to-gray-700 p-6 text-white shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">AI Knowledge Base</h1>
            <p className="mt-1 text-sm text-gray-300">
              Train your chatbot from your website, then test it live - side by side.
            </p>
          </div>
          {status?.is_trained && (
            <span className="shrink-0 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
              Trained
            </span>
          )}
        </div>
        {status && (
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-gray-400">
              <span>Training runs used</span>
              <span>{status.update_count}/{status.update_limit}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-600">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all"
                style={{
                  width: `${Math.min(100, ((status.update_count ?? 0) / (status.update_limit ?? 10)) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* â”€â”€ Split panel â”€â”€ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€ LEFT: Train Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="flex flex-col gap-6">

          {/* Train form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900">Train from Website</h2>
            <p className="mt-0.5 text-sm text-gray-500">
              We'll crawl up to 30 pages, search the web for context, and let the AI pick what's worth storing.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Website URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourcompany.com"
                  disabled={isPending}
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Carter Injury Law"
                  disabled={isPending}
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Company Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  disabled={isPending}
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:opacity-50"
                >
                  <option value="law-firm">Law Firm</option>
                  <option value="tech-company">Tech Company</option>
                  <option value="healthcare-company">Healthcare</option>
                  <option value="realestate-company">Real Estate</option>
                  <option value="consultancy-company">Consultancy</option>
                  <option value="agency-company">Agency</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                <span>Warning</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleTrain}
              disabled={isPending || (updatesLeft !== null && updatesLeft <= 0)}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Training... this can take 1-3 minutes
                </>
              ) : (
                <>Start Training</>
              )}
            </button>

            {updatesLeft !== null && updatesLeft <= 0 && (
              <p className="mt-2 text-center text-xs text-red-500">
                Training limit reached. Upgrade your plan to continue.
              </p>
            )}
          </div>

          {/* Training result */}
          {trainResult && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-emerald-800">Training Complete</h2>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard icon="P" label="Pages crawled" value={trainResult.pages_crawled} />
                <StatCard icon="S" label="Web results" value={trainResult.search_results} />
                <StatCard icon="F" label="Facts stored" value={trainResult.entries_stored} />
                <StatCard icon="Q" label="Quality score" value={trainResult.quality_score.toFixed(1)} />
              </div>
              {trainResult.categories.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {trainResult.categories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium capitalize text-emerald-700"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-3 text-xs text-emerald-600">
                Pinecone index: <strong>{trainResult.vector_store_id}</strong> -
                namespace: <strong>{trainResult.namespace}</strong>
              </p>
            </div>
          )}

          {/* Knowledge base status */}
          {status?.is_trained && (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-semibold text-gray-900">Current Knowledge Base</h2>
                <ScoreBadge score={status.quality_score ?? 0} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard icon="F" label="Facts stored" value={status.entries_stored ?? 0} />
                <StatCard icon="P" label="Pages crawled" value={status.pages_crawled ?? 0} />
                <StatCard icon="R" label="Runs left" value={`${updatesLeft ?? 0}/${status.update_limit ?? 10}`} />
                <StatCard
                  icon="L"
                  label="Last trained"
                  value={status.last_updated ? new Date(status.last_updated).toLocaleDateString() : "-"}
                />
              </div>
              {status.categories?.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-gray-500">Extracted categories</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {status.categories.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs capitalize text-gray-600"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-3 text-xs text-gray-500 space-y-1">
                <p><span className="font-medium text-gray-700">Pinecone index:</span> {status.vector_store_id ?? "-"}</p>
                <p><span className="font-medium text-gray-700">Namespace:</span> {status.namespace ?? "-"}</p>
                <p>
                  <span className="font-medium text-gray-700">Last updated:</span>{" "}
                  {status.last_updated ? new Date(status.last_updated).toLocaleString() : "-"}
                </p>
              </div>
            </div>
          )}

          {/* Untrained placeholder */}
          {status && !status.is_trained && !trainResult && (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
              <p className="text-2xl">-</p>
              <p className="mt-1 font-medium text-gray-700">No knowledge base yet</p>
              <p className="mt-0.5 text-xs">Enter your website URL above and click Train to get started.</p>
            </div>
          )}
        </div>

        {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€ RIGHT: Chat Tester Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center justify-between gap-2 border-b border-gray-100 bg-gray-50 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Live Chat Test</h2>
              <p className="text-xs text-gray-400">
                Test your chatbot with real questions right here.
              </p>
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
                  {copied ? (
                    <>Copied!</>
                  ) : (
                    <>Copy JSON</>
                  )}
                </button>
              )}
              {status?.is_trained ? (
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

          {/* Messages area */}
          <div className="flex-1 min-h-[380px] max-h-[540px] overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-sm text-gray-400">
                  <p className="text-3xl mb-2">-</p>
                  <p className="font-medium text-gray-500">Send a message to test your chatbot</p>
                  {!status?.is_trained && (
                    <p className="mt-1 text-xs text-amber-500">
                      Tip: Train the knowledge base first for company-specific answers.
                    </p>
                  )}
                </div>
              </div>
            )}

            {messages.map((msg, i) => {
              const parsedAssistant =
                msg.role === "assistant" ? parseAssistantContent(msg.content) : null;
              const bubbleText =
                msg.role === "assistant" && parsedAssistant
                  ? parsedAssistant.text || msg.content
                  : msg.content;

              return (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-gray-900 text-white rounded-br-sm"
                        : msg.error
                        ? "bg-red-50 text-red-700 border border-red-200 rounded-bl-sm"
                        : "bg-gray-100 text-gray-900 rounded-bl-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{bubbleText}</p>

                    {msg.role === "assistant" &&
                      parsedAssistant &&
                      parsedAssistant.slots.length > 0 && (
                        <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50 p-3">
                          <p className="text-xs font-semibold text-blue-700">
                            Select an available time
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {parsedAssistant.slots.map((slot) => (
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

                    {msg.role === "assistant" &&
                      parsedAssistant &&
                      parsedAssistant.calendlyUrl && (
                        <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                          <p className="text-xs font-semibold text-emerald-700">
                            Confirm appointment
                          </p>
                          <a
                            href={parsedAssistant.calendlyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
                          >
                            Open confirmation page
                          </a>
                        </div>
                      )}

                    {/* Tools used badge */}
                    {msg.role === "assistant" && msg.tools_used && msg.tools_used.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {msg.tools_used.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-full bg-white border border-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-500"
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

            {/* Typing indicator */}
            {isChatting && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                    <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                    <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
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
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleChat()}
                placeholder="Ask something about your company..."
                disabled={isChatting}
                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={handleChat}
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
      </div>
    </div>
  );
}

