"use client";

import { useEffect, useRef, useState } from "react";
import {
  BiBell,
  BiCheck,
  BiCopy,
  BiDotsVerticalRounded,
  BiDownArrowAlt,
  BiPaperclip,
  BiSearch,
  BiSend,
} from "react-icons/bi";
import type { ConversationHistoryItem } from "@/types/conversation-history";

interface ChatHistoryBodyProps {
  selectedSession: ConversationHistoryItem | null;
}

function getSessionTitle(session: ConversationHistoryItem): string {
  if (session.lead_captured && session.lead_name?.trim()) {
    return session.lead_name.trim();
  }
  return session.session_id;
}

function formatTimestamp(value: string | null): string {
  if (!value) return "";
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleString();
}

async function copyToClipboard(text: string): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  if (typeof document === "undefined") {
    throw new Error("Clipboard is not available.");
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  const ok = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!ok) {
    throw new Error("Copy failed.");
  }
}

const ChatHistoryBody = ({ selectedSession }: ChatHistoryBodyProps) => {
  const [message, setMessage] = useState("");
  const [copiedJson, setCopiedJson] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleCopyConversationJson = async () => {
    if (!selectedSession) return;
    const lastMessage =
      selectedSession.messages[selectedSession.messages.length - 1] ?? null;
    const payload = { messages: selectedSession.messages, lastMessage };

    try {
      await copyToClipboard(JSON.stringify(payload, null, 2));
      setCopiedJson(true);
      window.setTimeout(() => setCopiedJson(false), 2000);
    } catch (err) {
      console.error("Failed to copy conversation JSON", err);
      setCopiedJson(false);
    }
  };

  const scrollToLatest = (behavior: ScrollBehavior = "smooth") => {
    endRef.current?.scrollIntoView({ behavior, block: "end" });
  };

  useEffect(() => {
    if (!selectedSession) return;
    scrollToLatest("auto");
  }, [selectedSession?.session_id]);

  if (!selectedSession) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 text-lg">
            Select a conversation to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white border border-gray-200">
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
            {getSessionTitle(selectedSession).charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {getSessionTitle(selectedSession)}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyConversationJson}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
            title="Copy full conversation as JSON"
            type="button"
          >
            {copiedJson ? (
              <>
                <BiCheck size={18} className="text-gray-600" />
                Copied
              </>
            ) : (
              <>
                <BiCopy size={18} className="text-gray-600" />
                Copy JSON
              </>
            )}
          </button>
          <button
            onClick={() => scrollToLatest("smooth")}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
            title="Jump to latest message"
            type="button"
          >
            <BiDownArrowAlt size={18} className="text-gray-600" />
            Latest
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-gray-600"
            >
              <rect
                x="2"
                y="3"
                width="12"
                height="10"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M5 3V2C5 1.44772 5.44772 1 6 1H10C10.5523 1 11 1.44772 11 2V3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            Take Over
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <BiBell size={20} className="text-gray-600" />
          </button>
          <button className="px-3 py-2 bg-green-50 text-green-600 text-sm font-medium rounded-lg flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Live
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <BiSearch size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <BiDotsVerticalRounded size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="space-y-4">
          {selectedSession.messages.map((msg, index) => (
            <div
              key={`${msg.role}-${index}-${msg.timestamp ?? "na"}`}
              className={`flex ${
                msg.role === "assistant" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role !== "assistant" && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                    V
                  </div>
                  <div>
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tl-sm max-w-md">
                      {msg.content}
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  </div>
                </div>
              )}
              {msg.role === "assistant" && (
                <div className="flex items-start gap-2 flex-row-reverse">
                  <div className="flex flex-col items-end">
                    <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-2xl rounded-tr-sm max-w-md">
                      {msg.content}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(msg.timestamp)}
                      </span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded">
                        AI
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {selectedSession.messages.length === 0 && (
            <p className="text-sm text-gray-500">No messages in this session.</p>
          )}
          <div ref={endRef} />
        </div>
      </div>

      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <BiPaperclip size={20} className="text-gray-600" />
          </button>
          <input
            type="text"
            placeholder="Agent mode required to send messages"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            disabled
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BiSend size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHistoryBody;
