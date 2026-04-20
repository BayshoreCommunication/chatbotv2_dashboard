"use client";

import { useCallback, useMemo, useState } from "react";
import ChatHistoryBody from "./ChatHistoryBody";
import ChatHistoryList from "./ChatHistoryList";
import RightNotification from "./RightNotification";
import type { ConversationHistoryItem, ConversationHistoryResponse } from "@/types/conversation-history";
import type { RecentSession, VisitorStats } from "@/app/actions/dashboard";

type ChatHistoryViewProps = {
  companyId: string;
  initialData?: ConversationHistoryResponse;
  initialError?: string;
  recentSessions?: RecentSession[];
  visitors?: VisitorStats | null;
};

type LiveSessions = Record<string, ConversationHistoryItem>;

const ChatHistoryView = ({ companyId, initialData, initialError, recentSessions = [], visitors = null }: ChatHistoryViewProps) => {
  const initialSessions = useMemo(() => initialData?.sessions ?? [], [initialData]);

  const [liveSessions, setLiveSessions] = useState<LiveSessions>({});

  const sessions = useMemo(() => {
    const live = Object.values(liveSessions).filter(
      (s) => !initialSessions.some((i) => i.session_id === s.session_id)
    );
    return [...live, ...initialSessions];
  }, [initialSessions, liveSessions]);

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    initialSessions[0]?.session_id ?? null
  );

  const selectedSession = useMemo(
    () => sessions.find((item) => item.session_id === selectedSessionId) ?? null,
    [selectedSessionId, sessions]
  );

  const handleSessionActivity = useCallback(
    (sessionId: string, role: string, content: string, timestamp: string | null) => {
      const now = timestamp ?? new Date().toISOString();
      setLiveSessions((prev) => {
        const existing = prev[sessionId];
        if (existing) {
          const msgs = existing.messages;
          const lastMsg = msgs[msgs.length - 1];
          const alreadyAdded =
            lastMsg?.role === role && lastMsg?.content === content && lastMsg?.timestamp === timestamp;
          return {
            ...prev,
            [sessionId]: {
              ...existing,
              updated_at: now,
              messages: alreadyAdded ? msgs : [...msgs, { role, content, timestamp }],
            },
          };
        }
        return {
          ...prev,
          [sessionId]: {
            session_id: sessionId,
            exchange_count: 1,
            lead_captured: false,
            lead_name: null,
            lead_phone: null,
            lead_email: null,
            created_at: now,
            updated_at: now,
            tools_used_history: [],
            messages: [{ role, content, timestamp }],
          },
        };
      });
    },
    []
  );

  return (
    <div className="flex h-screen bg-gray-50 rounded">
      {initialError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded bg-red-100 px-4 py-2 text-sm text-red-700">
          {initialError}
        </div>
      )}

      <ChatHistoryList
        sessions={sessions}
        onChatSelect={setSelectedSessionId}
        selectedSessionId={selectedSessionId}
      />

      <ChatHistoryBody
        companyId={companyId}
        selectedSession={selectedSession}
        onSessionActivity={handleSessionActivity}
      />

      <div className="flex items-start pl-4">
        <RightNotification recentSessions={recentSessions} visitors={visitors} />
      </div>
    </div>
  );
};

export default ChatHistoryView;
