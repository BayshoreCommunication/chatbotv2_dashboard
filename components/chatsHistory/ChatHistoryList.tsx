"use client";

import { useState } from "react";
import { BiRefresh, BiSearch } from "react-icons/bi";
import type { ConversationHistoryItem } from "@/types/conversation-history";

type LiveActivity = Record<string, { lastMessage: string; updatedAt: string }>;

interface ChatHistoryListProps {
  sessions: ConversationHistoryItem[];
  onChatSelect: (sessionId: string) => void;
  selectedSessionId: string | null;
  liveActivity?: LiveActivity;
}

function formatTitle(session: ConversationHistoryItem): string {
  if (session.lead_captured && session.lead_name?.trim()) {
    return session.lead_name.trim();
  }
  return session.session_id;
}

function getInitials(value: string): string {
  const clean = value.trim();
  if (!clean) return "S";
  const words = clean.split(/\s+/).slice(0, 2);
  if (words.length === 1) return words[0][0]?.toUpperCase() ?? "S";
  return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
}

function formatTime(value: string | null): string {
  if (!value) return "";
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleString();
}

const ChatHistoryList = ({
  sessions,
  onChatSelect,
  selectedSessionId,
  liveActivity = {},
}: ChatHistoryListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const filteredChats = sessions
    .filter((session) =>
      formatTitle(session).toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aTime = new Date(a.updated_at ?? a.created_at ?? 0).getTime();
      const bTime = new Date(b.updated_at ?? b.created_at ?? 0).getTime();
      return sortBy === "newest" ? bTime - aTime : aTime - bTime;
    });

  return (
    <div className="w-80 border-l border-t border-b border-gray-200 bg-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Messages</h2>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <BiRefresh size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="relative mb-3">
          <BiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Sort by</span>
          <button
            onClick={() => setSortBy(sortBy === "newest" ? "oldest" : "newest")}
            className="text-gray-900 font-medium hover:text-gray-700"
          >
            {sortBy === "newest" ? "Newest" : "Oldest"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {filteredChats.map((chat) => {
          const title = formatTitle(chat);
          const live = liveActivity[chat.session_id];
          const lastMessage = live?.lastMessage ?? chat.messages[chat.messages.length - 1]?.content ?? "";
          const updatedAt = live?.updatedAt ?? chat.updated_at;
          return (
            <div
              key={chat.session_id}
              onClick={() => onChatSelect(chat.session_id)}
              className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border-b border-gray-100 ${
                selectedSessionId === chat.session_id ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                  {getInitials(title)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">{title}</h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <p className="truncate flex-1">{lastMessage}</p>
                  <span className="whitespace-nowrap">{formatTime(updatedAt)}</span>
                </div>
              </div>
            </div>
          );
        })}
        {filteredChats.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 gap-2 text-gray-400">
            <BiSearch size={28} />
            <p className="text-sm">{sessions.length === 0 ? "No conversations yet" : "No results found"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistoryList;
