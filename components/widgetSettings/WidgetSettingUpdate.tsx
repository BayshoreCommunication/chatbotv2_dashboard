"use client";

import { useState } from "react";
import {
  BiCog,
  BiImageAdd,
  BiMessageRoundedDots,
  BiPlay,
  BiRefresh,
  BiVideoPlus,
} from "react-icons/bi";
import toast from "react-hot-toast";
import {
  uploadWidgetImageAction,
  uploadWidgetVideoAction,
} from "@/app/actions/uploadFile";

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
};

export const defaultSettings: WidgetSettingsForm = {
  bot_name: "BayAI Assistant",
  theme: {
    primary_color: "#807045",
    font_family: "Inter",
  },
  behavior: {
    auto_open: false,
    open_delay: 2000,
    show_welcome_message: true,
  },
  content: {
    welcome_message: "Hello! 👋 Welcome to Bayshore Communication. How can I assist you today?",
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
};

const FONTS = ["Inter", "Roboto", "Poppins", "Outfit", "Open Sans", "Montserrat", "Lato"];

interface WidgetSettingUpdateProps {
  form: WidgetSettingsForm;
  setForm: React.Dispatch<React.SetStateAction<WidgetSettingsForm>>;
  settings: WidgetSettingsForm;
  editing: boolean;
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

const WidgetSettingUpdate = ({ form, setForm, settings, editing }: WidgetSettingUpdateProps) => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

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
        setForm((prev) => ({ ...prev, launcher: { ...prev.launcher, brand_image_url: result.url! } }));
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
        setForm((prev) => ({ ...prev, content: { ...prev.content, welcome_video: result.url! } }));
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
    <div className="w-full space-y-8 min-h-screen">
      <div className="space-y-8">

        {/* ── APPEARANCE SECTION ── */}
        <section className="rounded border border-gray-200 bg-white p-7 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <BiImageAdd size={22} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Appearance & Theme</h3>
          </div>

          <div className="grid gap-7 xl:grid-cols-2">
            <div className="space-y-5">
              {/* Bot Name */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Bot Name</label>
                {editing ? (
                  <input
                    type="text"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                    value={form.bot_name}
                    onChange={(e) => setForm({ ...form, bot_name: e.target.value })}
                  />
                ) : (
                  <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900">{settings.bot_name}</div>
                )}
              </div>

              {/* Color + Font */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Primary Color</label>
                  {editing ? (
                    <div className="flex h-[46px] items-center gap-2 rounded-xl border border-gray-300 bg-gray-50 px-3 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100 transition-all">
                      <input type="color" className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0" value={form.theme.primary_color} onChange={(e) => setForm({ ...form, theme: { ...form.theme, primary_color: e.target.value } })} />
                      <input type="text" className="w-full bg-transparent text-sm font-medium uppercase outline-none" value={form.theme.primary_color} onChange={(e) => setForm({ ...form, theme: { ...form.theme, primary_color: e.target.value } })} />
                    </div>
                  ) : (
                    <div className="flex h-[46px] items-center gap-3 rounded-xl bg-gray-50 px-4">
                      <div className="h-5 w-5 rounded-full shadow-inner" style={{ backgroundColor: settings.theme.primary_color }} />
                      <span className="text-sm font-medium text-gray-900 uppercase">{settings.theme.primary_color}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Font Family</label>
                  {editing ? (
                    <select className="w-full h-[46px] rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all" value={form.theme.font_family} onChange={(e) => setForm({ ...form, theme: { ...form.theme, font_family: e.target.value } })}>
                      {FONTS.map((f) => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
                    </select>
                  ) : (
                    <div className="flex h-[46px] items-center rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-900" style={{ fontFamily: settings.theme.font_family }}>{settings.theme.font_family}</div>
                  )}
                </div>
              </div>

              {/* Position + Icon */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Position</label>
                  {editing ? (
                    <select className="w-full h-[46px] rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all" value={form.launcher.position} onChange={(e) => setForm({ ...form, launcher: { ...form.launcher, position: e.target.value } })}>
                      <option value="bottom-right">Bottom Right</option>
                      <option value="bottom-left">Bottom Left</option>
                    </select>
                  ) : (
                    <div className="flex h-[46px] items-center rounded-xl bg-gray-50 px-4 text-sm font-medium capitalize text-gray-900">{settings.launcher.position.replace("-", " ")}</div>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Icon Style</label>
                  {editing ? (
                    <select className="w-full h-[46px] rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all" value={form.launcher.icon_style} onChange={(e) => setForm({ ...form, launcher: { ...form.launcher, icon_style: e.target.value } })}>
                      <option value="default">Default</option>
                      <option value="minimal">Minimal</option>
                      <option value="solid">Solid</option>
                    </select>
                  ) : (
                    <div className="flex h-[46px] items-center rounded-xl bg-gray-50 px-4 text-sm font-medium capitalize text-gray-900">{settings.launcher.icon_style}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Brand Image Upload */}
            <div className="flex flex-col h-full">
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Launcher Brand Logo</label>
              <div className={`relative flex flex-1 flex-col items-center justify-center rounded border-2 border-dashed ${editing ? "border-gray-300 bg-gray-50 hover:bg-gray-100" : "border-transparent bg-gray-50"} p-6 transition-all min-h-[220px]`}>
                {editing ? (
                  <>
                    {!uploadingImage && (
                      <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleImageUpload} className="absolute inset-0 z-10 cursor-pointer opacity-0" />
                    )}
                    {uploadingImage ? (
                      <div className="flex flex-col items-center gap-3 text-gray-500">
                        <BiRefresh className="animate-spin text-blue-500" size={36} />
                        <p className="text-sm font-medium">Uploading logo...</p>
                      </div>
                    ) : form.launcher.brand_image_url ? (
                      <div className="flex flex-col items-center gap-3">
                        <img src={form.launcher.brand_image_url} alt="Brand Logo" className="h-24 w-24 rounded object-cover shadow-sm ring-4 ring-white" />
                        <p className="text-sm font-semibold text-blue-600 bg-white/80 px-3 py-1 rounded-full shadow-sm">Click to replace image</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <div className="rounded-full bg-white p-4 shadow-sm border border-gray-100">
                          <BiImageAdd size={32} className="text-blue-500" />
                        </div>
                        <p className="text-sm font-medium">Upload logo image</p>
                        <p className="text-xs">PNG, JPG, WebP up to 5 MB</p>
                      </div>
                    )}
                  </>
                ) : settings.launcher.brand_image_url ? (
                  <div className="flex flex-col items-center gap-3">
                    <img src={settings.launcher.brand_image_url} alt="Active Brand Logo" className="h-24 w-24 rounded object-cover shadow-md ring-4 ring-white" />
                    <p className="text-xs font-medium text-gray-400">Current Logo</p>
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
        </section>

        {/* ── BEHAVIOR SECTION ── */}
        <section className="rounded border border-gray-200 bg-white p-7 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <BiCog size={22} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Widget Behavior</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className={`flex items-center justify-between rounded border ${editing ? "border-gray-200" : "border-transparent"} bg-gray-50 p-5 transition-all`}>
              <div>
                <h4 className="font-semibold text-gray-900">Auto Open Chat</h4>
                <p className="text-xs text-gray-500 mt-0.5">Open widget on page load</p>
              </div>
              {editing ? (
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" checked={form.behavior.auto_open} onChange={(e) => setForm({ ...form, behavior: { ...form.behavior, auto_open: e.target.checked } })} />
                  <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white" />
                </label>
              ) : (
                <div className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${settings.behavior.auto_open ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>
                  {settings.behavior.auto_open ? "Enabled" : "Disabled"}
                </div>
              )}
            </div>

            <div className={`flex items-center justify-between rounded border ${editing ? "border-gray-200" : "border-transparent"} bg-gray-50 p-5 transition-all`}>
              <div>
                <h4 className="font-semibold text-gray-900">Greeting Bubbles</h4>
                <p className="text-xs text-gray-500 mt-0.5">Show bubbles above launcher</p>
              </div>
              {editing ? (
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" checked={form.launcher.show_bubbles} onChange={(e) => setForm({ ...form, launcher: { ...form.launcher, show_bubbles: e.target.checked } })} />
                  <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white" />
                </label>
              ) : (
                <div className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${settings.launcher.show_bubbles ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>
                  {settings.launcher.show_bubbles ? "Visible" : "Hidden"}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Open Delay (ms)</label>
              {editing ? (
                <input type="number" className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all" value={form.behavior.open_delay} onChange={(e) => setForm({ ...form, behavior: { ...form.behavior, open_delay: parseInt(e.target.value) || 0 } })} />
              ) : (
                <div className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900">{settings.behavior.open_delay} ms</div>
              )}
            </div>
          </div>
        </section>

        {/* ── CONTENT & MEDIA SECTION ── */}
        <section className="rounded border border-gray-200 bg-white p-7 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <BiMessageRoundedDots size={22} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Content & Media</h3>
          </div>

          <div className="grid gap-7 xl:grid-cols-2">
            <div className="space-y-5">
              {/* Show Welcome Message toggle */}
              <div className={`flex items-center justify-between rounded-xl p-4 transition-all ${editing ? "border border-blue-200 bg-blue-50/50" : "bg-gray-50"}`}>
                <div>
                  <h4 className={`font-semibold text-sm ${editing ? "text-blue-900" : "text-gray-900"}`}>Show Welcome Message</h4>
                  <p className={`text-xs mt-0.5 ${editing ? "text-blue-700/80" : "text-gray-500"}`}>Display greeting when chat opens</p>
                </div>
                {editing ? (
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" checked={form.behavior.show_welcome_message} onChange={(e) => setForm({ ...form, behavior: { ...form.behavior, show_welcome_message: e.target.checked } })} />
                    <div className="peer h-5 w-9 rounded-full bg-blue-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full" />
                  </label>
                ) : (
                  <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">{settings.behavior.show_welcome_message ? "On" : "Off"}</span>
                )}
              </div>

              {/* Welcome Message */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Welcome Message Text</label>
                {editing ? (
                  <textarea rows={4} className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all" value={form.content.welcome_message} onChange={(e) => setForm({ ...form, content: { ...form.content, welcome_message: e.target.value } })} />
                ) : (
                  <div className="min-h-[100px] rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 leading-relaxed">{settings.content.welcome_message}</div>
                )}
              </div>

              {/* Input Placeholder */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Input Placeholder Text</label>
                {editing ? (
                  <input type="text" className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all" value={form.content.input_placeholder} onChange={(e) => setForm({ ...form, content: { ...form.content, input_placeholder: e.target.value } })} />
                ) : (
                  <div className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900">{settings.content.input_placeholder}</div>
                )}
              </div>
            </div>

            {/* Video Upload */}
            <div className="flex flex-col h-full">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Welcome Video Highlight</label>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Autoplay</span>
                  {editing ? (
                    <input type="checkbox" className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={form.content.welcome_video_autoplay} onChange={(e) => setForm({ ...form, content: { ...form.content, welcome_video_autoplay: e.target.checked } })} />
                  ) : (
                    <span className={`h-2.5 w-2.5 rounded-full shadow-sm ${settings.content.welcome_video_autoplay ? "bg-green-500" : "bg-gray-300"}`} />
                  )}
                </div>
              </div>

              <div className={`relative flex flex-1 flex-col items-center justify-center rounded border-2 border-dashed ${editing ? "border-gray-300 bg-gray-50 hover:bg-gray-100" : "border-transparent bg-gray-50"} p-6 transition-all min-h-[260px] text-center`}>
                {editing ? (
                  <>
                    {!uploadingVideo && (
                      <input type="file" accept="video/mp4,video/webm,video/ogg" onChange={handleVideoUpload} className="absolute inset-0 z-10 cursor-pointer opacity-0" />
                    )}
                    {uploadingVideo ? (
                      <div className="flex flex-col items-center gap-3 text-gray-500">
                        <BiRefresh className="animate-spin text-blue-500" size={36} />
                        <p className="text-sm font-medium">Uploading video...</p>
                      </div>
                    ) : isRemoteUrl(form.content.welcome_video) ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm border border-green-50">
                          <BiPlay size={32} className="ml-1" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 px-3 truncate max-w-[200px]">{fileNameFromUrl(form.content.welcome_video)}</p>
                          <p className="text-xs font-semibold text-blue-600 mt-2 bg-white/80 py-1 px-3 rounded-full shadow-sm inline-block">Click to replace video</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <div className="rounded-full bg-white p-4 shadow-sm border border-gray-100">
                          <BiVideoPlus size={32} className="text-blue-500" />
                        </div>
                        <p className="text-sm font-medium mt-1">Upload presentation video</p>
                        <p className="text-xs">MP4, WebM up to 25 MB</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex w-full flex-col items-center gap-3">
                    {settings.content.welcome_video && isRemoteUrl(settings.content.welcome_video) ? (
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
                      <p className="text-sm text-gray-400">No video configured</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default WidgetSettingUpdate;
