"use client";

import { useMemo, useState } from "react";
import ChatHistoryBody from "./ChatHistoryBody";
import ChatHistoryList from "./ChatHistoryList";
import RightNotification from "./RightNotification";
import type { ConversationHistoryResponse } from "@/types/conversation-history";

type ChatHistoryViewProps = {
  initialData?: ConversationHistoryResponse;
  initialError?: string;
};

const ChatHistoryView = ({ initialData, initialError }: ChatHistoryViewProps) => {
  const sessions = initialData?.sessions ?? [];
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    sessions[0]?.session_id ?? null
  );

  const selectedSession = useMemo(
    () => sessions.find((item) => item.session_id === selectedSessionId) ?? null,
    [selectedSessionId, sessions]
  );

  return (
    <div className="flex h-screen bg-gray-50 rounded ">
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

      <ChatHistoryBody selectedSession={selectedSession} />

      <div className="flex items-start pl-4">
        <RightNotification />
      </div>
    </div>
  );
};

export default ChatHistoryView;
