"use client";

import { useEffect } from "react";
import { BiImage, BiSend, BiX } from "react-icons/bi";
import { WidgetSettingsForm } from "./WidgetSettingUpdate";

interface ChatbotPreviewProps {
  data: WidgetSettingsForm;
}

const ChatbotPreview = ({ data }: ChatbotPreviewProps) => {
  const primaryColor = data.theme.primary_color || "#474747";
  const fontFamily = data.theme.font_family || "Inter";

  useEffect(() => {
    if (!fontFamily || fontFamily === "Inter") return;
    const id = `gfont-preview-${fontFamily.replace(/ /g, "-")}`;
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, "+")}:wght@400;500;600;700&display=swap`;
      document.head.appendChild(link);
    }
  }, [fontFamily]);

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto" style={{ fontFamily }}>

      {/* Chat Window Preview */}
      <div className="flex justify-center px-2 pt-2">
        <div
          className="flex h-[600px] w-[380px] shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
          style={{ transformOrigin: "bottom right" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-4 text-white"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-white p-1 overflow-hidden flex items-center justify-center">
                {data.launcher.brand_image_url ? (
                  <img
                    src={data.launcher.brand_image_url}
                    alt="Logo"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <BiImage size={18} className="text-gray-300" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-tight">{data.bot_name}</h3>
                <p className="text-[10px] text-white/80">Online</p>
              </div>
            </div>
            <button type="button" className="rounded-full p-1.5 hover:bg-white/20 transition-colors">
              <BiX size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">
            {data.content.welcome_video && (
              <div className="w-full rounded-xl bg-black overflow-hidden aspect-video relative">
                <video
                  src={data.content.welcome_video}
                  className="h-full w-full object-cover"
                  preload="metadata"
                  muted
                  playsInline
                />
              </div>
            )}

            {data.behavior.show_welcome_message && (
              <div className="flex gap-2">
                <div className="rounded-2xl rounded-tl-sm bg-white p-3 text-sm text-gray-800 shadow-sm border border-gray-100 max-w-[85%] leading-relaxed">
                  {data.content.welcome_message}
                </div>
              </div>
            )}

            <div className="flex gap-2 flex-row-reverse mt-6">
              <div
                className="rounded-2xl rounded-tr-sm p-3 text-sm text-white shadow-sm max-w-[80%] leading-relaxed"
                style={{ backgroundColor: primaryColor }}
              >
                I&apos;m just testing the widget preview.
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-white p-3">
            <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 pr-2 pl-4 py-1.5 focus-within:ring-2 focus-within:ring-gray-200 transition-all">
              <input
                type="text"
                readOnly
                placeholder={data.content.input_placeholder || "Type your question here..."}
                className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
              />
              <div
                className="flex h-8 w-8 shrink-0 cursor-not-allowed items-center justify-center rounded-full text-white shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                <BiSend size={14} className="ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChatbotPreview;
