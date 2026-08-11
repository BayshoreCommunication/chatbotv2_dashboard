"use client";

import {
  uploadWidgetImageAction,
  uploadWidgetVideoAction,
} from "@/app/actions/uploadFile";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  BiCheck,
  BiChevronDown,
  BiChevronLeft,
  BiChevronRight,
  BiCode,
  BiCopy,
  BiImageAdd,
  BiPlay,
  BiRefresh,
  BiSave,
  BiVideoPlus,
} from "react-icons/bi";
import { FaWordpress } from "react-icons/fa";

export type WidgetSettingsForm = {
  bot_name: string;
  theme: {
    primary_color: string;
    font_family: string;
  };
  behavior: {
    auto_open: boolean;
    open_delay: number;
    show_welcome_message: boolean;
  };
  content: {
    welcome_message: string;
    welcome_video: string;
    welcome_video_autoplay: boolean;
    input_placeholder: string;
  };
  launcher: {
    position: string;
    icon_style: string;
    show_bubbles: boolean;
    brand_image_url: string;
  };
  embed_type: "custom" | "wordpress";
};

export const defaultSettings: WidgetSettingsForm = {
  bot_name: "Go Converto",
  theme: {
    primary_color: "#474747",
    font_family: "Inter",
  },
  behavior: {
    auto_open: false,
    open_delay: 2000,
    show_welcome_message: true,
  },
  content: {
    welcome_message:
      "Hello! 👋 Welcome to GoConverto. How can I assist you today?",
    welcome_video: "",
    welcome_video_autoplay: true,
    input_placeholder: "Type your question here...",
  },
  launcher: {
    position: "bottom-right",
    icon_style: "default",
    show_bubbles: true,
    brand_image_url: "",
  },
  embed_type: "custom",
};

const FONTS = [
  "Inter",
  "Roboto",
  "Poppins",
  "Outfit",
  "Open Sans",
  "Montserrat",
  "Lato",
];

type TabId = "appearance" | "behavior" | "content" | "website";

const TABS: { id: TabId; label: string }[] = [
  { id: "appearance", label: "Appearance & Theme" },
  { id: "behavior", label: "Widget Behavior" },
  { id: "content", label: "Content & Media" },
  { id: "website", label: "Website" },
];

const EMBED_OPTIONS: {
  value: "custom" | "wordpress";
  label: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "custom",
    label: "Custom Website",
    desc: "Add a script tag to any site",
    icon: <BiCode size={16} />,
  },
  {
    value: "wordpress",
    label: "WordPress Plugin",
    desc: "Connect through our WordPress plugin",
    icon: <FaWordpress size={16} className="text-[#21759b]" />,
  },
];

interface WidgetSettingUpdateProps {
  form: WidgetSettingsForm;
  setForm: React.Dispatch<React.SetStateAction<WidgetSettingsForm>>;
  settings: WidgetSettingsForm;
  editing: boolean;
  onSave: () => void;
  saving: boolean;
  companyId?: string;
}

// Helpers
function isRemoteUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

function fileNameFromUrl(url: string) {
  try {
    return decodeURIComponent(url.split("/").pop()?.split("?")[0] ?? "");
  } catch {
    return "video";
  }
}

const WidgetSettingUpdate = ({
  form,
  setForm,
  settings,
  editing,
  onSave,
  saving,
  companyId,
}: WidgetSettingUpdateProps) => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("appearance");
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [embedDropdownOpen, setEmbedDropdownOpen] = useState(false);
  const embedDropdownRef = useRef<HTMLDivElement>(null);
  const activeIndex = TABS.findIndex((t) => t.id === activeTab);
  const isLastTab = activeIndex === TABS.length - 1;
  const hasChanges = JSON.stringify(form) !== JSON.stringify(settings);

  const widgetUrl =
    process.env.NEXT_PUBLIC_WIDGET_URL || "https://chat.your-domain.com";
  const embedApiKey = companyId ? `org-${companyId}` : "YOUR_API_KEY_HERE";
  const embedScript = `<script\n  src="${widgetUrl}/widget.js"\n  data-api-key="${embedApiKey}">\n</script>`;
  const displayedEmbedType = editing ? form.embed_type : settings.embed_type;
  const displayedEmbedCode =
    displayedEmbedType === "custom" ? embedScript : embedApiKey;
  const wordpressPluginUrl = process.env.NEXT_PUBLIC_WORDPRESS_PLUGIN_URL || "#";

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(displayedEmbedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  useEffect(() => {
    if (!editing) setEmbedDropdownOpen(false);
  }, [editing]);

  useEffect(() => {
    if (!embedDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        embedDropdownRef.current &&
        !embedDropdownRef.current.contains(e.target as Node)
      ) {
        setEmbedDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [embedDropdownOpen]);
  const goBack = () => setActiveTab(TABS[Math.max(0, activeIndex - 1)].id);
  const goNext = () =>
    setActiveTab(TABS[Math.min(TABS.length - 1, activeIndex + 1)].id);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // reset input so same file can be re-selected
    if (!file) return;

    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const result = await uploadWidgetImageAction(fd);
      if (result.ok && result.url) {
        setForm((prev) => ({
          ...prev,
          launcher: { ...prev.launcher, brand_image_url: result.url! },
        }));
        toast.success("Logo uploaded.");
      } else {
        toast.error(result.error || "Image upload failed.");
      }
    } catch {
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadingVideo(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const result = await uploadWidgetVideoAction(fd);
      if (result.ok && result.url) {
        setForm((prev) => ({
          ...prev,
          content: { ...prev.content, welcome_video: result.url! },
        }));
        toast.success("Video uploaded.");
      } else {
        toast.error(result.error || "Video upload failed.");
      }
    } catch {
      toast.error("Video upload failed. Please try again.");
    } finally {
      setUploadingVideo(false);
    }
  };

  return (
    <div className="w-full space-y-6 min-h-screen">
      {/* ── STEPPER ── */}
      <div className="flex items-center">
        {TABS.map((tab, i) => {
          const isDone = i < activeIndex;
          const isActive = i === activeIndex;
          return (
            <div
              key={tab.id}
              className="flex items-center flex-1 last:flex-none"
            >
              <button
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-row items-center gap-2 shrink-0"
              >
                <motion.span
                  animate={{
                    backgroundColor: isDone
                      ? "#16a34a"
                      : isActive
                        ? "#171717"
                        : "#e5e7eb",
                    color: isDone || isActive ? "#ffffff" : "#6b7280",
                  }}
                  transition={{ duration: 0.25 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
                >
                  {isDone ? <BiCheck size={18} /> : i + 1}
                </motion.span>
                <span
                  className={`whitespace-nowrap text-xs font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-gray-900"
                      : isDone
                        ? "text-green-600"
                        : "text-gray-400"
                  }`}
                >
                  {tab.label}
                </span>
              </button>

              {i < TABS.length - 1 && (
                <div className="flex h-9 flex-1 items-center px-1">
                  <svg
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                    className="h-5 w-full"
                  >
                    <path
                      d="M0,10 Q50,-2 100,10"
                      fill="none"
                      stroke={isDone ? "#16a34a" : "#d1d5db"}
                      strokeWidth="2.5"
                      strokeDasharray="1 8"
                      strokeLinecap="round"
                      className="transition-[stroke] duration-300"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {/* ── APPEARANCE SECTION ── */}
          {activeTab === "appearance" && (
            <motion.section
              key="appearance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex h-[500px] flex-col rounded border border-gray-200 bg-white p-7 shadow-sm"
            >
              <div className="flex-1 overflow-y-auto pr-1">
              <div className="grid gap-7 xl:grid-cols-2">
                <div className="space-y-5">
                  {/* Bot Name */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                      Bot Name
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                        value={form.bot_name}
                        onChange={(e) =>
                          setForm({ ...form, bot_name: e.target.value })
                        }
                      />
                    ) : (
                      <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900">
                        {settings.bot_name}
                      </div>
                    )}
                  </div>

                  {/* Color + Font */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Primary Color
                      </label>
                      {editing ? (
                        <div className="flex h-[46px] items-center gap-2 rounded-xl border border-gray-300 bg-gray-50 px-3 focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                          <input
                            type="color"
                            className="text-gray-900 h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0"
                            value={form.theme.primary_color}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                theme: {
                                  ...form.theme,
                                  primary_color: e.target.value,
                                },
                              })
                            }
                          />
                          <input
                            type="text"
                            className="text-gray-900 w-full bg-transparent text-sm font-medium uppercase outline-none"
                            value={form.theme.primary_color}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                theme: {
                                  ...form.theme,
                                  primary_color: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      ) : (
                        <div className="flex h-[46px] items-center gap-3 rounded-xl bg-gray-50 px-4">
                          <div
                            className="h-5 w-5 rounded-full shadow-inner"
                            style={{
                              backgroundColor: settings.theme.primary_color,
                            }}
                          />
                          <span className="text-sm font-medium text-gray-900 uppercase">
                            {settings.theme.primary_color}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Font Family
                      </label>
                      {editing ? (
                        <select
                          className="text-gray-900 w-full h-[46px] rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm font-medium focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                          value={form.theme.font_family}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              theme: {
                                ...form.theme,
                                font_family: e.target.value,
                              },
                            })
                          }
                        >
                          {FONTS.map((f) => (
                            <option key={f} value={f} style={{ fontFamily: f }}>
                              {f}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div
                          className="flex h-[46px] items-center rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-900"
                          style={{ fontFamily: settings.theme.font_family }}
                        >
                          {settings.theme.font_family}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Position + Icon */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Position
                      </label>
                      {editing ? (
                        <select
                          className="text-gray-900 w-full h-[46px] rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm font-medium focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                          value={form.launcher.position}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              launcher: {
                                ...form.launcher,
                                position: e.target.value,
                              },
                            })
                          }
                        >
                          <option value="bottom-right">Bottom Right</option>
                          <option value="bottom-left">Bottom Left</option>
                        </select>
                      ) : (
                        <div className="flex h-[46px] items-center rounded-xl bg-gray-50 px-4 text-sm font-medium capitalize text-gray-900">
                          {settings.launcher.position.replace("-", " ")}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Icon Style
                      </label>
                      {editing ? (
                        <select
                          className="text-gray-900 w-full h-[46px] rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm font-medium focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                          value={form.launcher.icon_style}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              launcher: {
                                ...form.launcher,
                                icon_style: e.target.value,
                              },
                            })
                          }
                        >
                          <option value="default">Default</option>
                          <option value="minimal">Minimal</option>
                          <option value="solid">Solid</option>
                        </select>
                      ) : (
                        <div className="flex h-[46px] items-center rounded-xl bg-gray-50 px-4 text-sm font-medium capitalize text-gray-900">
                          {settings.launcher.icon_style}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Brand Image Upload */}
                <div className="flex flex-col h-full">
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                    Launcher Brand Logo
                  </label>
                  <div
                    className={`relative flex flex-1 flex-col items-center justify-center rounded border-2 border-dashed ${editing ? "border-gray-300 bg-gray-50 hover:bg-gray-100" : "border-transparent bg-gray-50"} p-6 transition-all min-h-[220px]`}
                  >
                    {editing ? (
                      <>
                        {!uploadingImage && (
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={handleImageUpload}
                            className="absolute inset-0 z-10 cursor-pointer opacity-0"
                          />
                        )}
                        {uploadingImage ? (
                          <div className="flex flex-col items-center gap-3 text-gray-500">
                            <BiRefresh
                              className="animate-spin text-primary"
                              size={36}
                            />
                            <p className="text-sm font-medium">
                              Uploading logo...
                            </p>
                          </div>
                        ) : form.launcher.brand_image_url ? (
                          <div className="flex flex-col items-center gap-3">
                            <img
                              src={form.launcher.brand_image_url}
                              alt="Brand Logo"
                              className="h-24 w-24 rounded object-cover shadow-sm ring-4 ring-white"
                            />
                            <p className="text-sm font-semibold text-primary-dark bg-white/80 px-3 py-1 rounded-full shadow-sm">
                              Click to replace image
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-gray-500">
                            <div className="rounded-full bg-white p-4 shadow-sm border border-gray-100">
                              <BiImageAdd size={32} className="text-primary" />
                            </div>
                            <p className="text-sm font-medium">
                              Upload logo image
                            </p>
                            <p className="text-xs">PNG, JPG, WebP up to 5 MB</p>
                          </div>
                        )}
                      </>
                    ) : settings.launcher.brand_image_url ? (
                      <div className="flex flex-col items-center gap-3">
                        <img
                          src={settings.launcher.brand_image_url}
                          alt="Active Brand Logo"
                          className="h-24 w-24 rounded object-cover shadow-md ring-4 ring-white"
                        />
                        <p className="text-xs font-medium text-gray-400">
                          Current Logo
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <div className="flex h-24 w-24 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50">
                          <BiImageAdd size={32} className="text-gray-300" />
                        </div>
                        <p className="text-xs font-medium">No logo uploaded</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              </div>
            </motion.section>
          )}

          {/* ── BEHAVIOR SECTION ── */}
          {activeTab === "behavior" && (
            <motion.section
              key="behavior"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex h-[500px] flex-col rounded border border-gray-200 bg-white p-7 shadow-sm"
            >
              <div className="flex-1 overflow-y-auto pr-1">

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div
                  className={`flex items-center justify-between rounded border ${editing ? "border-gray-200" : "border-transparent"} bg-gray-50 p-5 transition-all`}
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Auto Open Chat
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Open widget on page load
                    </p>
                  </div>
                  {editing ? (
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={form.behavior.auto_open}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            behavior: {
                              ...form.behavior,
                              auto_open: e.target.checked,
                            },
                          })
                        }
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
                    </label>
                  ) : (
                    <div
                      className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${settings.behavior.auto_open ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}
                    >
                      {settings.behavior.auto_open ? "Enabled" : "Disabled"}
                    </div>
                  )}
                </div>

                <div
                  className={`flex items-center justify-between rounded border ${editing ? "border-gray-200" : "border-transparent"} bg-gray-50 p-5 transition-all`}
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Greeting Bubbles
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Show bubbles above launcher
                    </p>
                  </div>
                  {editing ? (
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={form.launcher.show_bubbles}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            launcher: {
                              ...form.launcher,
                              show_bubbles: e.target.checked,
                            },
                          })
                        }
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
                    </label>
                  ) : (
                    <div
                      className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${settings.launcher.show_bubbles ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}
                    >
                      {settings.launcher.show_bubbles ? "Visible" : "Hidden"}
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center">
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                    Open Delay (ms)
                  </label>
                  {editing ? (
                    <input
                      type="number"
                      className="text-gray-900 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                      value={form.behavior.open_delay}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          behavior: {
                            ...form.behavior,
                            open_delay: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                    />
                  ) : (
                    <div className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900">
                      {settings.behavior.open_delay} ms
                    </div>
                  )}
                </div>
              </div>
              </div>
            </motion.section>
          )}

          {/* ── CONTENT & MEDIA SECTION ── */}
          {activeTab === "content" && (
            <motion.section
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex h-[500px] flex-col rounded border border-gray-200 bg-white p-7 shadow-sm"
            >
              <div className="flex-1 overflow-y-auto pr-1">
              <div className="grid gap-7 xl:grid-cols-2">
                <div className="space-y-5">
                  {/* Show Welcome Message toggle */}
                  <div
                    className={`flex items-center justify-between rounded-xl p-4 transition-all ${editing ? "border border-primary/20 bg-primary/5" : "bg-gray-50"}`}
                  >
                    <div>
                      <h4
                        className={`font-semibold text-sm ${editing ? "text-primary-dark" : "text-gray-900"}`}
                      >
                        Show Welcome Message
                      </h4>
                      <p
                        className={`text-xs mt-0.5 ${editing ? "text-primary-dark/80" : "text-gray-500"}`}
                      >
                        Display greeting when chat opens
                      </p>
                    </div>
                    {editing ? (
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={form.behavior.show_welcome_message}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              behavior: {
                                ...form.behavior,
                                show_welcome_message: e.target.checked,
                              },
                            })
                          }
                        />
                        <div className="peer h-5 w-9 rounded-full bg-primary/20 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full" />
                      </label>
                    ) : (
                      <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">
                        {settings.behavior.show_welcome_message ? "On" : "Off"}
                      </span>
                    )}
                  </div>

                  {/* Welcome Message */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                      Welcome Message Text
                    </label>
                    {editing ? (
                      <textarea
                        rows={4}
                        className="text-gray-900 w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                        value={form.content.welcome_message}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            content: {
                              ...form.content,
                              welcome_message: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      <div className="min-h-[100px] rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 leading-relaxed">
                        {settings.content.welcome_message}
                      </div>
                    )}
                  </div>

                  {/* Input Placeholder */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                      Input Placeholder Text
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        className="text-gray-900 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                        value={form.content.input_placeholder}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            content: {
                              ...form.content,
                              input_placeholder: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      <div className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900">
                        {settings.content.input_placeholder}
                      </div>
                    )}
                  </div>
                </div>

                {/* Video Upload */}
                <div className="flex flex-col h-full">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Welcome Video Highlight
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                        Autoplay
                      </span>
                      {editing ? (
                        <input
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary-dark focus:ring-primary"
                          checked={form.content.welcome_video_autoplay}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              content: {
                                ...form.content,
                                welcome_video_autoplay: e.target.checked,
                              },
                            })
                          }
                        />
                      ) : (
                        <span
                          className={`h-2.5 w-2.5 rounded-full shadow-sm ${settings.content.welcome_video_autoplay ? "bg-green-500" : "bg-gray-300"}`}
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className={`relative flex flex-1 flex-col items-center justify-center rounded border-2 border-dashed ${editing ? "border-gray-300 bg-gray-50 hover:bg-gray-100" : "border-transparent bg-gray-50"} p-6 transition-all min-h-[260px] text-center`}
                  >
                    {editing ? (
                      <>
                        {!uploadingVideo && (
                          <input
                            type="file"
                            accept="video/mp4,video/webm,video/ogg"
                            onChange={handleVideoUpload}
                            className="absolute inset-0 z-10 cursor-pointer opacity-0"
                          />
                        )}
                        {uploadingVideo ? (
                          <div className="flex flex-col items-center gap-3 text-gray-500">
                            <BiRefresh
                              className="animate-spin text-primary"
                              size={36}
                            />
                            <p className="text-sm font-medium">
                              Uploading video...
                            </p>
                          </div>
                        ) : isRemoteUrl(form.content.welcome_video) ? (
                          <div className="flex flex-col items-center gap-3">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm border border-green-50">
                              <BiPlay size={32} className="ml-1" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900 px-3 truncate max-w-[200px]">
                                {fileNameFromUrl(form.content.welcome_video)}
                              </p>
                              <p className="text-xs font-semibold text-primary-dark mt-2 bg-white/80 py-1 px-3 rounded-full shadow-sm inline-block">
                                Click to replace video
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-gray-500">
                            <div className="rounded-full bg-white p-4 shadow-sm border border-gray-100">
                              <BiVideoPlus size={32} className="text-primary" />
                            </div>
                            <p className="text-sm font-medium mt-1">
                              Upload presentation video
                            </p>
                            <p className="text-xs">MP4, WebM up to 25 MB</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex w-full flex-col items-center gap-3">
                        {settings.content.welcome_video &&
                        isRemoteUrl(settings.content.welcome_video) ? (
                          <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 shadow-md bg-black aspect-video">
                            <video
                              src={settings.content.welcome_video}
                              className="h-full w-full object-cover"
                              controls
                              preload="metadata"
                              playsInline
                            />
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400">
                            No video configured
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              </div>
            </motion.section>
          )}

          {/* ── WEBSITE SECTION ── */}
          {activeTab === "website" && (
            <motion.section
              key="website"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex h-[500px] flex-col rounded border border-gray-200 bg-white p-7 shadow-sm"
            >
              <div className="flex-1 overflow-y-auto pr-1">
              <p className="mb-4 text-sm text-gray-500">
                Add your chatbot to a website using a custom script tag, or
                connect it through the WordPress plugin.
              </p>

              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                  Integration Type
                </label>

                {editing ? (
                  <div ref={embedDropdownRef} className="relative w-[350px]">
                    <button
                      type="button"
                      onClick={() => setEmbedDropdownOpen((v) => !v)}
                      className="flex w-full items-center justify-between gap-3 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 transition-all hover:border-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm">
                          {form.embed_type === "wordpress" ? (
                            <FaWordpress size={14} className="text-[#21759b]" />
                          ) : (
                            <BiCode size={14} />
                          )}
                        </span>
                        {form.embed_type === "wordpress"
                          ? "WordPress Plugin"
                          : "Custom Website"}
                      </span>
                      <BiChevronDown
                        size={18}
                        className={`text-gray-400 transition-transform duration-200 ${
                          embedDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {embedDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
                        >
                          {EMBED_OPTIONS.map((opt) => {
                            const isSelected = form.embed_type === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setForm({ ...form, embed_type: opt.value });
                                  setEmbedDropdownOpen(false);
                                }}
                                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                                  isSelected ? "bg-primary/5" : "hover:bg-gray-50"
                                }`}
                              >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm">
                                  {opt.icon}
                                </span>
                                <span className="flex-1">
                                  <span className="block text-sm font-semibold text-gray-900">
                                    {opt.label}
                                  </span>
                                  <span className="block text-xs text-gray-400">
                                    {opt.desc}
                                  </span>
                                </span>
                                {isSelected && (
                                  <BiCheck size={18} className="shrink-0 text-primary" />
                                )}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex w-[350px] items-center gap-2.5 rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm">
                      {settings.embed_type === "wordpress" ? (
                        <FaWordpress size={14} className="text-[#21759b]" />
                      ) : (
                        <BiCode size={14} />
                      )}
                    </span>
                    {settings.embed_type === "wordpress"
                      ? "WordPress Plugin"
                      : "Custom Website"}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-2.5">
                  <div className="flex items-center gap-2 text-gray-700">
                    <BiCode size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {displayedEmbedType === "custom" ? "Script tag" : "API key"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmbed}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
                  >
                    {copiedEmbed ? (
                      <>
                        <BiCheck size={14} className="text-green-500" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <BiCopy size={14} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto bg-gray-950 px-4 py-3 text-[11px] leading-relaxed text-gray-300">
                  <code>{displayedEmbedCode}</code>
                </pre>
              </div>

              {displayedEmbedType === "custom" ? (
                <div className="mt-4 rounded-xl bg-gray-50 p-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                    How to install
                  </p>
                  <ol className="list-decimal space-y-1.5 pl-4 text-xs leading-relaxed text-gray-500">
                    <li>Copy the script tag above.</li>
                    <li>
                      Paste it before the closing{" "}
                      <code className="rounded bg-gray-200 px-1 text-gray-600">
                        &lt;/body&gt;
                      </code>{" "}
                      tag on your website.
                    </li>
                    <li>Save and publish — the widget appears automatically.</li>
                  </ol>
                </div>
              ) : (
                <div className="mt-4 rounded-xl bg-gray-50 p-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                    How to install
                  </p>
                  <ol className="list-decimal space-y-1.5 pl-4 text-xs leading-relaxed text-gray-500">
                    <li>
                      In your WordPress dashboard, go to{" "}
                      <span className="font-semibold text-gray-700">
                        Plugins → Add New
                      </span>
                      .
                    </li>
                    <li>
                      Search for{" "}
                      <span className="font-semibold text-gray-700">
                        &quot;Go Converto&quot;
                      </span>
                      .
                    </li>
                    <li>Install and activate the plugin.</li>
                    <li>
                      Paste the API key above into the plugin&apos;s{" "}
                      <span className="font-semibold text-gray-700">API Key</span>{" "}
                      field.
                    </li>
                  </ol>
                  <a
                    href={wordpressPluginUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-dark hover:underline"
                  >
                    <FaWordpress size={14} />
                    View the Go Converto WordPress plugin
                  </a>
                </div>
              )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── STEP NAV ── */}
        <div className="flex items-center justify-center gap-4">
          {activeIndex > 0 && (
            <button
              type="button"
              onClick={goBack}
              aria-label="Previous section"
              className="flex items-center gap-1.5 rounded border border-gray-200 bg-white py-2 pl-2.5 pr-4 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              <BiChevronLeft size={20} />
              Back
            </button>
          )}

          {isLastTab ? (
            <button
              type="button"
              onClick={onSave}
              disabled={saving || !hasChanges}
              aria-label="Save configuration"
              className="flex items-center gap-1.5 rounded bg-thunder-black py-2 pl-4 pr-4 text-sm font-semibold text-white shadow-md shadow-thunder-black/20 transition-all hover:bg-thunder-black/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving ? (
                <BiRefresh className="animate-spin" size={18} />
              ) : (
                <BiSave size={18} />
              )}
              {saving ? "Saving..." : "Save"}
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              aria-label="Next section"
              className="flex items-center gap-1.5 rounded border border-gray-200 bg-white py-2 pl-4 pr-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Next
              <BiChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WidgetSettingUpdate;
