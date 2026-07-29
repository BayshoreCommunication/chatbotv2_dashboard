"use client";

import { askChatAction } from "@/app/actions/ask";
import type { FoundItem } from "@/app/actions/knowledgeBase";
import {
  getWidgetSettingsAction,
  type WidgetSettingsResponse,
} from "@/app/actions/widgetSettings";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  BiBot,
  BiCheckCircle,
  BiGlobe,
  BiMessageRoundedDots,
  BiRightArrowAlt,
  BiSend,
  BiX,
} from "react-icons/bi";
import type { LiveProgress } from "./TrainLeftSideForm";

// Site brand's --color-thunder-black (app/globals.css) — the free-trial
// preview always shows the site's own brand color regardless of any
// previously saved widget theme, so it reads as "your new AI assistant"
// rather than leftover config from an earlier test. Real color customization
// happens later in the actual widget-settings page.
const BRAND_COLOR = "#2d2d2d";

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
  liveProgress?: LiveProgress | null;
  /** Fires with the number of messages the user has sent in this preview chat. */
  onConversationCountChange?: (count: number) => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

// --- Helper Function: Render **bold** markdown as real <strong> ---
const renderWithBold = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );

// --- Helper Component: Typing Effect ---
const TypewriterText = ({
  text,
  onComplete,
  scrollToBottom,
  className = "whitespace-pre-wrap text-sm leading-relaxed",
}: {
  text: string;
  onComplete?: () => void;
  scrollToBottom: () => void;
  className?: string;
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

  return <p className={className}>{renderWithBold(displayedText)}</p>;
};

// --- Helper Function: Build a "found" line for the live feed ---
const buildFoundLine = (item: FoundItem): string =>
  `✓ Found ${item.category}${item.label ? ` — ${item.label}` : ""}${
    item.source_url && item.source_url !== "web_search"
      ? ` on ${item.source_url}`
      : ""
  }`;

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
  liveProgress = null,
  onConversationCountChange,
}: ChatbotRightSideViewProps) => {
  const displayName = companyName || "Your Company";
  void trainingData;

  const [widgetSettings, setWidgetSettings] =
    useState<WidgetSettingsResponse | null>(null);

  useEffect(() => {
    getWidgetSettingsAction().then((res) => {
      if (res.ok && res.data) setWidgetSettings(res.data);
    });
  }, []);

  const primaryColor = BRAND_COLOR;
  const botName = widgetSettings?.bot_name || displayName;
  const welcomeMessage = widgetSettings?.content?.welcome_message || null;
  const inputPlaceholder =
    widgetSettings?.content?.input_placeholder || "Ask me anything...";
  const brandImageUrl = widgetSettings?.launcher?.brand_image_url || "";
  const welcomeVideo = widgetSettings?.content?.welcome_video || "";
  const welcomeVideoAutoplay =
    widgetSettings?.content?.welcome_video_autoplay || false;

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

  // Ref for the message input — refocused after each send so the user can
  // keep typing without having to click back into the field. The input is
  // disabled while isLoading, so this has to wait until React has actually
  // committed it back to enabled before focus() will take.
  const inputRef = useRef<HTMLInputElement>(null);
  const hasSentRef = useRef(false);
  useEffect(() => {
    if (!isLoading && hasSentRef.current) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  // Ref for the scrollable container (the div with overflow-y-auto)
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Ref for the console log box — auto-scrolls to the latest line as new
  // findings stream in, like `tail -f`.
  const consoleRef = useRef<HTMLDivElement>(null);

  // Stay on the skeleton until an actual finding has landed — early polls
  // (1%, 2%...) can have a message but no findings yet, and an empty feed
  // area looked stuck/broken rather than "still searching".
  const hasLiveData = !!liveProgress?.found?.length;

  // Findings arrive from the poll in batches, but should be revealed one at
  // a time — typedCount is how many are currently shown. Each one fades/
  // slides in quickly rather than typing itself out character by character,
  // so a big batch finishes revealing fast instead of dragging on.
  const [typedCount, setTypedCount] = useState(0);
  const foundLength = liveProgress?.found?.length ?? 0;

  useEffect(() => {
    if (foundLength === 0) {
      setTypedCount(0);
    }
  }, [foundLength]);

  useEffect(() => {
    if (typedCount >= foundLength) return;
    const timeout = setTimeout(() => {
      setTypedCount((c) => c + 1);
      if (consoleRef.current) {
        consoleRef.current.scrollTo({
          top: consoleRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 220);
    return () => clearTimeout(timeout);
  }, [typedCount, foundLength]);

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

  // Report how many messages the user has actually sent in this preview
  // chat, so the parent can surface a "set this up on your site" CTA once
  // they've gotten a real feel for it (not just immediately on page load).
  useEffect(() => {
    const sentCount = messages.filter((m) => m.role === "user").length;
    onConversationCountChange?.(sentCount);
  }, [messages, onConversationCountChange]);

  // Initialize Welcome Message — re-fires the instant isTrainingComplete
  // flips true (right after the live-findings overlay above disappears),
  // so the typing effect plays the "ready" message immediately.
  useEffect(() => {
    const defaultContent = isTrainingComplete
      ? `🎉 Your chatbot is ready!\nI've learned about ${botName} — you can now start chatting.`
      : `Welcome to ${botName}! 👋\n\nI can answer questions about your data instantly.`;
    const welcomeMsg: Message = {
      id: "welcome",
      role: "assistant",
      content: isTrainingComplete
        ? defaultContent
        : welcomeMessage || defaultContent,
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
    hasSentRef.current = true;

    try {
      const response = await askChatAction(
        companyId,
        userText,
        sessionId,
        userTimezone,
      );

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

  // Before training has actually started (and after it's done), there's no
  // live data to show in a chatbot mockup — show a static promo card
  // instead. The phone mockup only appears while training is live or once
  // it's complete.
  const isIdle = !liveProgress?.isTraining && !isTrainingComplete;

  if (isIdle) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex w-full justify-center px-4 pb-4"
      >
        <div className="relative w-full max-w-[380px]">
          {/* Decorative glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-purple-500/10 to-pink-500/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-primary/5 via-white to-purple-50 p-6">
            <h3 className="mb-5 text-2xl font-extrabold leading-snug tracking-tight text-thunder-black">
              Your AI assistant goes live in minutes.
            </h3>

            {/* Flow graphic: your site -> your AI -> your customers */}
            <div className="mb-6 flex items-center justify-center gap-3">
              {[
                { icon: BiGlobe, label: "Your site" },
                { icon: BiBot, label: "Your AI", filled: true },
                { icon: BiMessageRoundedDots, label: "Customers" },
              ].map((node, i, arr) => (
                <div key={node.label} className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                        node.filled
                          ? "border-thunder-black bg-thunder-black"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <node.icon
                        className={`h-5 w-5 ${node.filled ? "text-white" : "text-gray-500"}`}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-gray-400">
                      {node.label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <BiRightArrowAlt className="h-4 w-4 shrink-0 text-gray-300" />
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Trains itself on your website",
                  desc: "Reads your pages, services & FAQs — no manual setup.",
                },
                {
                  title: "Answers & captures leads 24/7",
                  desc: "Replies instantly and books appointments around the clock.",
                },
                {
                  title: "Live with one snippet",
                  desc: "No coding — paste it into your site and you're done.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <BiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-bold text-thunder-black">
                      {item.title}
                    </p>
                    <p className="text-xs leading-relaxed text-gray-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick stats */}
            <div className="mt-8 grid grid-cols-3 divide-x divide-gray-200 border-t border-gray-200 pt-5">
              {[
                { value: "<5 min", label: "Setup time" },
                { value: "24/7", label: "Availability" },
                { value: "50+", label: "Languages" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="px-2 text-center first:pl-0 last:pr-0"
                >
                  <p className="text-lg font-extrabold text-thunder-black">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="flex w-full justify-center"
    >
      <div className="relative w-full max-w-[380px]">
        {/* Decorative Glow */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-purple-500/20 to-pink-500/20 blur-3xl" />

        {/* Main Chat Container */}
        <div className="relative mx-auto flex h-[600px] w-[380px] shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
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
                    <BiBot
                      className="h-5 w-5 text-white"
                      style={{ color: primaryColor }}
                    />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-tight">
                  {botName}
                </h3>
                <p className="text-[10px] text-white/80">Online</p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-full p-1.5 transition-colors hover:bg-white/20"
            >
              <BiX size={20} />
            </button>
          </div>

          {/* --- Messages Area --- */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4"
            style={{ scrollBehavior: "auto" }}
          >
            {liveProgress?.isTraining ? (
              !hasLiveData ? (
                /* Loading — top-aligned skeleton with a shimmer sweep, shown
                 until the very first real finding lands. */
                <div className="flex h-full flex-col gap-2.5 px-1 pt-1">
                  {["w-5/6", "w-full", "w-2/3", "w-full", "w-3/4", "w-1/2"].map(
                    (w, i) => (
                      <motion.div
                        key={w + i}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        className={`relative h-2.5 overflow-hidden rounded bg-gray-200 ${w}`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.12,
                          }}
                        />
                      </motion.div>
                    ),
                  )}
                </div>
              ) : (
                /* Once real data starts arriving, reveal each finding one at a
                 time with a quick smooth fade/slide — no per-character
                 typing — so a big batch finishes revealing fast, and the
                 list scrolls smoothly as each new line lands. */
                <div
                  ref={consoleRef}
                  className="flex h-full flex-col gap-2 overflow-y-auto px-1 py-1 text-left"
                >
                  <AnimatePresence initial={false}>
                    {liveProgress.found.slice(0, typedCount).map((item, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="whitespace-pre-wrap break-words text-xs leading-relaxed text-gray-600"
                      >
                        {buildFoundLine(item)}
                      </motion.p>
                    ))}
                  </AnimatePresence>
                </div>
              )
            ) : (
              <>
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
                  {messages.map((msg) => {
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        layout
                        className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        {/* Bubble */}
                        <div
                          className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                            msg.role === "user"
                              ? "rounded-tr-sm text-white"
                              : "rounded-tl-sm border border-gray-100 bg-white text-gray-800"
                          }`}
                          style={
                            msg.role === "user"
                              ? { backgroundColor: primaryColor }
                              : undefined
                          }
                        >
                          {msg.role === "assistant" && msg.isTyping ? (
                            <TypewriterText
                              text={msg.content}
                              scrollToBottom={() => scrollToBottom("auto")}
                              onComplete={() => {}}
                              className={
                                msg.id === "welcome"
                                  ? "whitespace-pre-wrap text-xs leading-relaxed"
                                  : undefined
                              }
                            />
                          ) : (
                            <p
                              className={`whitespace-pre-wrap ${msg.id === "welcome" ? "text-xs" : ""}`}
                            >
                              {renderWithBold(msg.content)}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Loading Indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex gap-2"
                  >
                    <div className="rounded-2xl rounded-tl-sm border border-gray-100 bg-white px-4 py-3">
                      <div className="flex gap-1">
                        {[0, 0.2, 0.4].map((delay) => (
                          <motion.div
                            key={delay}
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay,
                            }}
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: primaryColor }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="h-2" />
              </>
            )}
          </div>

          {/* --- Input Area --- */}
          <div className="border-t border-gray-200 bg-white p-3">
            <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 py-1.5 pl-4 pr-2 transition-all focus-within:ring-2 focus-within:ring-gray-200">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                placeholder={inputPlaceholder}
                style={{ colorScheme: "light" }}
                className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-all duration-200 ${
                  !inputValue.trim() || isLoading
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:scale-105 active:scale-95"
                }`}
                style={{ backgroundColor: primaryColor }}
              >
                <BiSend size={14} className="ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatbotRightSideView;
