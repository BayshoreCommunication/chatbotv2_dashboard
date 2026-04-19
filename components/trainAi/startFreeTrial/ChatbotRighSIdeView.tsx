"use client";

import { askChatAction } from "@/app/actions/ask";
import {
  getWidgetSettingsAction,
  type WidgetSettingsResponse,
} from "@/app/actions/widgetSettings";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BiBot, BiSend, BiUser, BiX } from "react-icons/bi";

const DEFAULT_COLOR = "#2563eb";

// --- Types ---
interface TrainingData {
  totalSources?: number;
  quality?: string;
  qualityPercentage?: number;
  companyName?: string;
  alreadyTrained?: boolean;
}

interface ChatbotRightSideViewProps {
  companyId?: string;
  companyName: string;
  isTrainingComplete?: boolean;
  trainingData?: TrainingData | null;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

// --- Helper Component: Typing Effect ---
const TypewriterText = ({
  text,
  onComplete,
  scrollToBottom,
}: {
  text: string;
  onComplete?: () => void;
  scrollToBottom: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
        // Trigger a tiny scroll adjustment on every character to keep view at bottom
        scrollToBottom();
      }, 15);
      return () => clearTimeout(timeout);
    } else {
      if (onComplete) onComplete();
    }
  }, [currentIndex, text, onComplete, scrollToBottom]);

  return (
    <p className="whitespace-pre-wrap text-sm leading-relaxed">
      {displayedText}
    </p>
  );
};

// --- Helper Function: Clean markdown ---
const cleanMarkdown = (text: string): string => {
  return text
    .replace(/^```\w*\n?/gm, "")
    .replace(/\n?```$/gm, "")
    .replace(/```\n?/g, "")
    .trim();
};

// --- Main Component ---
const ChatbotRightSideView = ({
  companyId = "",
  companyName,
  isTrainingComplete = false,
  trainingData = null,
}: ChatbotRightSideViewProps) => {
  const displayName = companyName || "Your Company";
  void trainingData;

  const [widgetSettings, setWidgetSettings] = useState<WidgetSettingsResponse | null>(null);

  useEffect(() => {
    getWidgetSettingsAction().then((res) => {
      if (res.ok && res.data) setWidgetSettings(res.data);
    });
  }, []);

  const primaryColor = widgetSettings?.theme?.primary_color || DEFAULT_COLOR;
  const botName = widgetSettings?.bot_name || displayName;
  const welcomeMessage = widgetSettings?.content?.welcome_message || null;
  const inputPlaceholder = widgetSettings?.content?.input_placeholder || "Ask me anything...";
  const brandImageUrl = widgetSettings?.launcher?.brand_image_url || "";
  const welcomeVideo = widgetSettings?.content?.welcome_video || "";
  const welcomeVideoAutoplay = widgetSettings?.content?.welcome_video_autoplay || false;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Persistent sessionId using localStorage
  const [sessionId] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("chatbot_session_id");
      if (stored) return stored;
      // Generate a new session id (timestamp + random)
      const newId = `session_${Date.now()}_${Math.floor(Math.random() * 1e9)}`;
      window.localStorage.setItem("chatbot_session_id", newId);
      return newId;
    }
    // Fallback for SSR (shouldn't happen in browser)
    return `session_${Date.now()}_${Math.floor(Math.random() * 1e9)}`;
  });
  const [userTimezone] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      }
    } catch {}
    return "";
  });

  // Ref for the scrollable container (the div with overflow-y-auto)
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // --- Smooth Scroll Function ---
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      const maxScrollTop = scrollHeight - clientHeight;

      // Only scroll if there is actually content to scroll
      if (maxScrollTop > 0) {
        scrollContainerRef.current.scrollTo({
          top: maxScrollTop,
          behavior: behavior,
        });
      }
    }
  };

  // Scroll when messages change or loading starts
  useEffect(() => {
    // Use a small timeout to ensure DOM has updated with new message height
    const timeoutId = setTimeout(() => {
      scrollToBottom("smooth");
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, isLoading]);

  // Initialize Welcome Message
  useEffect(() => {
    const defaultContent = `Welcome to **${botName}**! 👋\n\n${
      isTrainingComplete
        ? "I'm trained on your data. How can I help you today?"
        : "I can answer questions about your data instantly."
    }`;
    const welcomeMsg: Message = {
      id: "welcome",
      role: "assistant",
      content: welcomeMessage || defaultContent,
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages([welcomeMsg]);
  }, [botName, isTrainingComplete, welcomeMessage]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue("");

    // 1. Add User Message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await askChatAction(companyId, userText, sessionId, userTimezone);

      let botContent = "Sorry, I encountered an error.";
      if (response.ok && response.data) {
        botContent = cleanMarkdown(response.data.reply);
      } else if (response.error) {
        botContent = `Error: ${response.error}`;
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: botContent,
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
        timestamp: new Date(),
        isTyping: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="flex w-full justify-center p-4"
    >
      <div className="relative w-full max-w-[380px]">
        {/* Decorative Glow */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />

        {/* Main Chat Container */}
        <div className="relative mx-auto flex h-[600px] w-[380px] shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-xl">

          {/* --- Header --- */}
          <div
            className="flex items-center justify-between p-4 text-white"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 overflow-hidden rounded-full bg-white p-1">
                {brandImageUrl ? (
                  <img
                    src={brandImageUrl}
                    alt="Logo"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white/20">
                    <BiBot className="h-5 w-5 text-white" style={{ color: primaryColor }} />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-tight">{botName}</h3>
                <p className="text-[10px] text-white/80">Online</p>
              </div>
            </div>
            <button type="button" className="rounded-full p-1.5 transition-colors hover:bg-white/20">
              <BiX size={20} />
            </button>
          </div>

          {/* --- Messages Area --- */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4"
            style={{ scrollBehavior: "auto" }}
          >
            {/* Welcome Video */}
            {welcomeVideo && (
              <div className="w-full overflow-hidden rounded-xl bg-black aspect-video relative">
                <video
                  src={welcomeVideo}
                  className="h-full w-full object-cover"
                  preload="metadata"
                  muted
                  autoPlay={welcomeVideoAutoplay}
                  playsInline
                />
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  layout
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  {msg.role === "assistant" ? (
                    <div className="mt-1 h-7 w-7 shrink-0 overflow-hidden rounded-full border border-gray-100 bg-gray-200 p-0.5">
                      {brandImageUrl ? (
                        <img src={brandImageUrl} alt="Bot" className="h-full w-full rounded-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-300">
                          <BiBot size={14} className="text-gray-600" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <BiUser size={14} className="text-blue-600" />
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "rounded-tr-sm text-white"
                        : "rounded-tl-sm border border-gray-100 bg-white text-gray-800"
                    }`}
                    style={msg.role === "user" ? { backgroundColor: primaryColor } : undefined}
                  >
                    {msg.role === "assistant" && msg.isTyping ? (
                      <TypewriterText
                        text={msg.content}
                        scrollToBottom={() => scrollToBottom("auto")}
                        onComplete={() => {}}
                      />
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex gap-2"
              >
                <div className="mt-1 h-7 w-7 shrink-0 overflow-hidden rounded-full border border-gray-100 bg-gray-200 p-0.5">
                  {brandImageUrl ? (
                    <img src={brandImageUrl} alt="Bot" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-300">
                      <BiBot size={14} className="text-gray-600" />
                    </div>
                  )}
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-gray-100 bg-white px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    {[0, 0.2, 0.4].map((delay) => (
                      <motion.div
                        key={delay}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay }}
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: primaryColor }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div className="h-2" />
          </div>

          {/* --- Input Area --- */}
          <div className="border-t border-gray-200 bg-white p-3">
            <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 py-1.5 pl-4 pr-2 transition-all focus-within:ring-2 focus-within:ring-gray-200">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                placeholder={inputPlaceholder}
                className="w-full bg-transparent text-sm outline-none placeholder-gray-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-all duration-200 ${
                  !inputValue.trim() || isLoading ? "opacity-40 cursor-not-allowed" : "hover:scale-105 active:scale-95"
                }`}
                style={{ backgroundColor: primaryColor }}
              >
                <BiSend size={14} className="ml-0.5" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-center gap-1 text-center text-[10px] text-gray-400">
              ⚡ Powered by <strong>Bayshore Communication</strong>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ChatbotRightSideView;
